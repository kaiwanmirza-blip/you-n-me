import {
  nutritionInputSchema,
  nutritionPlanSchema,
  planRequestSchema,
  provenanceSchema,
  type Mode,
  type NutritionPlan,
  type Provenance,
} from '../shared/contracts'

export type KitchenDeviceId =
  | 'stovetop'
  | 'oven'
  | 'microwave'
  | 'air-fryer'
  | 'slow-cooker'
  | 'pressure-cooker'
  | 'blender'

export const kitchenDeviceCatalog: ReadonlyArray<{
  id: KitchenDeviceId
  label: string
  supportedInFixtures: boolean
  note: string
}> = [
  { id: 'stovetop', label: 'Stovetop', supportedInFixtures: true, note: 'Skillet, saucepan, and sauté meals' },
  { id: 'air-fryer', label: 'Air fryer', supportedInFixtures: true, note: 'Fast 15–30 min crispy proteins & vegetables' },
  { id: 'oven', label: 'Oven', supportedInFixtures: true, note: 'Sheet-pan roasts & 180-min holiday turkey scenario' },
  { id: 'microwave', label: 'Microwave', supportedInFixtures: true, note: 'Quick grain & steam prep (15-min options)' },
  { id: 'blender', label: 'Blender', supportedInFixtures: true, note: 'Smoothie bowls, dressings & blended soups' },
  { id: 'pressure-cooker', label: 'Pressure cooker', supportedInFixtures: true, note: '30–60 min legume & grain batches' },
  { id: 'slow-cooker', label: 'Slow cooker', supportedInFixtures: true, note: '60–180 min hands-off braises & stews' },
]

export const elapsedCookPresets = [15, 30, 60, 180] as const
export type ElapsedCookPreset = (typeof elapsedCookPresets)[number]

export interface PantryItem {
  ingredientId: string
  name: string
  unit: 'g' | 'ml' | 'count'
  onHandAmount: number
  category: 'protein' | 'produce' | 'grains-pantry'
}

export const defaultPantryInventory: PantryItem[] = [
  { ingredientId: 'chicken', name: 'Chicken breast', unit: 'g', onHandAmount: 350, category: 'protein' },
  { ingredientId: 'rice', name: 'Jasmine rice', unit: 'g', onHandAmount: 250, category: 'grains-pantry' },
  { ingredientId: 'spinach', name: 'Fresh spinach', unit: 'g', onHandAmount: 120, category: 'produce' },
  { ingredientId: 'lemon', name: 'Lemon', unit: 'count', onHandAmount: 2, category: 'produce' },
  { ingredientId: 'olive-oil', name: 'Olive oil', unit: 'ml', onHandAmount: 60, category: 'grains-pantry' },
  { ingredientId: 'oats', name: 'Rolled oats', unit: 'g', onHandAmount: 160, category: 'grains-pantry' },
  { ingredientId: 'chickpeas', name: 'Cooked chickpeas', unit: 'g', onHandAmount: 240, category: 'protein' },
  { ingredientId: 'tofu', name: 'Firm tofu', unit: 'g', onHandAmount: 300, category: 'protein' },
  { ingredientId: 'quinoa', name: 'Tri-color quinoa', unit: 'g', onHandAmount: 200, category: 'grains-pantry' },
  { ingredientId: 'bell-pepper', name: 'Sweet bell pepper', unit: 'count', onHandAmount: 2, category: 'produce' },
  { ingredientId: 'garlic', name: 'Garlic cloves', unit: 'count', onHandAmount: 4, category: 'produce' },
]

export const exclusionIngredientCatalog = [
  { id: 'tomatoes', label: 'Tomatoes' },
  { id: 'spinach', label: 'Spinach' },
  { id: 'chicken', label: 'Chicken' },
  { id: 'lemon', label: 'Lemon' },
  { id: 'rice', label: 'Jasmine rice' },
  { id: 'oats', label: 'Rolled oats' },
  { id: 'chickpeas', label: 'Chickpeas' },
] as const

export interface SubstitutionOption {
  id: string
  mealId: string
  label: string
  fromIngredientId: string
  toIngredient: {
    ingredientId: string
    name: string
    unit: 'g' | 'ml' | 'count'
    baseAmountPerServing: number
  }
  rationale: string
}

export interface MealExtendedMeta {
  mealId: string
  appliancesUsed: KitchenDeviceId[]
  prepMinutes: number
  activeCookMinutes: number
  restMinutes: number
  elapsedMinutes: number
  safeTempDeferralNote?: string
  availableSubstitutions: SubstitutionOption[]
  appliedSubstitution?: SubstitutionOption
}

export interface ShoppingBreakdownItem {
  ingredientId: string
  name: string
  unit: 'g' | 'ml' | 'count'
  requiredAmount: number
  onHandAmount: number
  shortageAmount: number
  pantry: boolean
}

export interface NutritionPreviewResult {
  plan: NutritionPlan
  provenance: Provenance
  goal: string
  mealMeta: Record<string, MealExtendedMeta>
  shoppingBreakdown: ShoppingBreakdownItem[]
  isGenericAllergyPreview: boolean
  allergySafetyNotice: string
  elapsedCookBudgetMinutes: number
  devicesSelected: KitchenDeviceId[]
}

export const defaultNutritionInputs: NutritionPlan['input'] = {
  dietaryPattern: 'Balanced',
  meals: 3,
  servings: 1,
  preparationMinutes: 30,
  allergyAcknowledgement: 'none',
  excludedIngredients: [],
  cuisine: 'Mediterranean & Everyday',
  budgetBand: 'Standard ($12–$20/serving)',
}

export const defaultKitchenDevices: KitchenDeviceId[] = ['stovetop', 'air-fryer', 'oven', 'microwave']

const clinicalDietRegex = /\b(keto(?:genic)?\s+therapeutic|renal|dialysis|diabetic\s+prescription|medical\s+fast|calorie\s+deficit\s+treatment|eating\s+disorder|supplement\s+stack|enteral)\b/i

interface RecipeTemplate {
  id: string
  slot: 'breakfast' | 'lunch' | 'dinner' | 'feast'
  title: string
  dietary: ('Balanced' | 'Vegetarian')[]
  requiredDevices: KitchenDeviceId[]
  prepMinutes: number
  activeCookMinutes: number
  restMinutes: number
  elapsedMinutes: number
  minBudgetTier: 'tight' | 'modest' | 'standard'
  portionPerServing: string
  safeTempDeferralNote?: string
  instructions: string[]
  baseIngredientsPerServing: Array<{
    ingredientId: string
    name: string
    unit: 'g' | 'ml' | 'count'
    amount: number
  }>
  substitutions: SubstitutionOption[]
}

const recipeCatalog: RecipeTemplate[] = [
  {
    id: 'meal-breakfast-oats',
    slot: 'breakfast',
    title: 'Warm Cinnamon Citrus Oat Bowl',
    dietary: ['Balanced', 'Vegetarian'],
    requiredDevices: ['stovetop'],
    prepMinutes: 5,
    activeCookMinutes: 7,
    restMinutes: 0,
    elapsedMinutes: 12,
    minBudgetTier: 'tight',
    portionPerServing: '1 warm bowl (~260g prepared)',
    instructions: [
      'Combine rolled oats with water in a small saucepan over medium stovetop heat (or microwave-safe bowl).',
      'Simmer gently for 5–7 minutes, stirring occasionally until creamy.',
      'Finish with fresh lemon zest and a drizzle of olive oil or fruit.',
    ],
    baseIngredientsPerServing: [
      { ingredientId: 'oats', name: 'Rolled oats', unit: 'g', amount: 80 },
      { ingredientId: 'lemon', name: 'Lemon', unit: 'count', amount: 1 },
    ],
    substitutions: [
      {
        id: 'sub-oats-quinoa',
        mealId: 'meal-breakfast-oats',
        label: 'Swap Rolled oats → Tri-color quinoa flakes',
        fromIngredientId: 'oats',
        toIngredient: {
          ingredientId: 'quinoa',
          name: 'Tri-color quinoa',
          unit: 'g',
          baseAmountPerServing: 75,
        },
        rationale: 'Uses pantry quinoa for a higher-protein warm breakfast grain bowl within the same 12-minute window.',
      },
    ],
  },
  {
    id: 'meal-breakfast-quinoa-scramble',
    slot: 'breakfast',
    title: 'Quick Skillet Herb Quinoa & Bell Pepper Hash',
    dietary: ['Balanced', 'Vegetarian'],
    requiredDevices: ['stovetop'],
    prepMinutes: 6,
    activeCookMinutes: 8,
    restMinutes: 0,
    elapsedMinutes: 14,
    minBudgetTier: 'tight',
    portionPerServing: '1 skillet plate (~240g)',
    instructions: [
      'Warm olive oil in a skillet over medium heat and diced sweet bell pepper for 4 minutes.',
      'Fold in pre-rinsed tri-color quinoa and warm through with a splash of water.',
      'Serve warm with cracked black pepper.',
    ],
    baseIngredientsPerServing: [
      { ingredientId: 'quinoa', name: 'Tri-color quinoa', unit: 'g', amount: 85 },
      { ingredientId: 'bell-pepper', name: 'Sweet bell pepper', unit: 'count', amount: 1 },
      { ingredientId: 'olive-oil', name: 'Olive oil', unit: 'ml', amount: 10 },
    ],
    substitutions: [
      {
        id: 'sub-pepper-zucchini',
        mealId: 'meal-breakfast-quinoa-scramble',
        label: 'Swap Sweet bell pepper → Diced Zucchini',
        fromIngredientId: 'bell-pepper',
        toIngredient: {
          ingredientId: 'zucchini',
          name: 'Fresh zucchini',
          unit: 'count',
          baseAmountPerServing: 1,
        },
        rationale: 'Replaces bell pepper with tender diced zucchini at the same 14-minute skillet cook time.',
      },
    ],
  },
  {
    id: 'meal-lunch-chickpea-bowl',
    slot: 'lunch',
    title: 'Crisp Mediterranean Chickpea & Quinoa Skillet',
    dietary: ['Balanced', 'Vegetarian'],
    requiredDevices: ['stovetop'],
    prepMinutes: 6,
    activeCookMinutes: 9,
    restMinutes: 0,
    elapsedMinutes: 15,
    minBudgetTier: 'tight',
    portionPerServing: '1 hearty grain & legume bowl (~320g)',
    instructions: [
      'Warm olive oil and crushed garlic in a skillet over medium heat for 1 minute.',
      'Toss in chickpeas and tri-color quinoa, warming for 8 minutes until lightly toasted.',
      'Finish with fresh lemon juice or herbs before serving.',
    ],
    baseIngredientsPerServing: [
      { ingredientId: 'chickpeas', name: 'Cooked chickpeas', unit: 'g', amount: 120 },
      { ingredientId: 'quinoa', name: 'Tri-color quinoa', unit: 'g', amount: 90 },
      { ingredientId: 'olive-oil', name: 'Olive oil', unit: 'ml', amount: 15 },
      { ingredientId: 'garlic', name: 'Garlic cloves', unit: 'count', amount: 1 },
    ],
    substitutions: [
      {
        id: 'sub-chickpeas-tofu',
        mealId: 'meal-lunch-chickpea-bowl',
        label: 'Swap Cooked chickpeas → Cubed Firm Tofu',
        fromIngredientId: 'chickpeas',
        toIngredient: {
          ingredientId: 'tofu',
          name: 'Firm tofu',
          unit: 'g',
          baseAmountPerServing: 130,
        },
        rationale: 'Swaps chickpeas for golden pan-seared tofu cubes while keeping the meal 100% plant-based and under 15 minutes.',
      },
    ],
  },
  {
    id: 'meal-dinner-chicken-rice',
    slot: 'dinner',
    title: 'Air-Fryer Lemon Herb Chicken with Jasmine Rice & Wilted Spinach',
    dietary: ['Balanced'],
    requiredDevices: ['air-fryer', 'stovetop'],
    prepMinutes: 8,
    activeCookMinutes: 18,
    restMinutes: 4,
    elapsedMinutes: 30,
    minBudgetTier: 'modest',
    portionPerServing: '175g chicken breast, 1 cup jasmine rice & sautéed greens',
    safeTempDeferralNote:
      'Let poultry rest 4 minutes before slicing. Follow reviewed USDA/official food-safety temperature guidelines for poultry preparation.',
    instructions: [
      'Rinse jasmine rice and simmer covered in a saucepan on the stovetop for 15 minutes.',
      'Season chicken breast with olive oil, garlic, and half the lemon juice; cook in the air fryer at 390°F for 16–18 minutes.',
      'In the final 3 minutes, wilt fresh spinach in a warm skillet with a squeeze of lemon, rest the chicken 4 minutes, and plate together.',
    ],
    baseIngredientsPerServing: [
      { ingredientId: 'chicken', name: 'Chicken breast', unit: 'g', amount: 175 },
      { ingredientId: 'rice', name: 'Jasmine rice', unit: 'g', amount: 100 },
      { ingredientId: 'spinach', name: 'Fresh spinach', unit: 'g', amount: 60 },
      { ingredientId: 'lemon', name: 'Lemon', unit: 'count', amount: 1 },
      { ingredientId: 'olive-oil', name: 'Olive oil', unit: 'ml', amount: 15 },
    ],
    substitutions: [
      {
        id: 'sub-spinach-kale',
        mealId: 'meal-dinner-chicken-rice',
        label: 'Swap Fresh spinach → Tender Baby Kale',
        fromIngredientId: 'spinach',
        toIngredient: {
          ingredientId: 'baby-kale',
          name: 'Tender baby kale',
          unit: 'g',
          baseAmountPerServing: 65,
        },
        rationale: 'Replaces spinach with baby kale for firmer texture; adds 65g per serving to the shopping list.',
      },
      {
        id: 'sub-rice-quinoa',
        mealId: 'meal-dinner-chicken-rice',
        label: 'Swap Jasmine rice → Tri-color quinoa',
        fromIngredientId: 'rice',
        toIngredient: {
          ingredientId: 'quinoa',
          name: 'Tri-color quinoa',
          unit: 'g',
          baseAmountPerServing: 95,
        },
        rationale: 'Substitutes jasmine rice with tri-color quinoa on the stovetop in the same 15-minute simmer window.',
      },
    ],
  },
  {
    id: 'meal-dinner-veg-tofu',
    slot: 'dinner',
    title: 'Crispy Citrus Tofu with Herbed Jasmine Rice & Sweet Bell Pepper',
    dietary: ['Balanced', 'Vegetarian'],
    requiredDevices: ['stovetop'],
    prepMinutes: 8,
    activeCookMinutes: 16,
    restMinutes: 2,
    elapsedMinutes: 26,
    minBudgetTier: 'modest',
    portionPerServing: '150g crispy tofu, 1 cup rice & roasted bell pepper ribbons',
    instructions: [
      'Simmer jasmine rice on the stovetop until fluffy (15 minutes).',
      'Press and cube firm tofu; sear in olive oil with sliced bell pepper for 12–14 minutes until golden.',
      'Finish with garlic and fresh lemon or lime juice before serving.',
    ],
    baseIngredientsPerServing: [
      { ingredientId: 'tofu', name: 'Firm tofu', unit: 'g', amount: 150 },
      { ingredientId: 'rice', name: 'Jasmine rice', unit: 'g', amount: 100 },
      { ingredientId: 'bell-pepper', name: 'Sweet bell pepper', unit: 'count', amount: 1 },
      { ingredientId: 'olive-oil', name: 'Olive oil', unit: 'ml', amount: 15 },
      { ingredientId: 'garlic', name: 'Garlic cloves', unit: 'count', amount: 1 },
    ],
    substitutions: [
      {
        id: 'sub-tofu-chickpeas',
        mealId: 'meal-dinner-veg-tofu',
        label: 'Swap Firm tofu → Crispy Spiced Chickpeas',
        fromIngredientId: 'tofu',
        toIngredient: {
          ingredientId: 'chickpeas',
          name: 'Cooked chickpeas',
          unit: 'g',
          baseAmountPerServing: 140,
        },
        rationale: 'Replaces firm tofu with skillet-crisped chickpeas and consolidates legume totals in the shopping list.',
      },
      {
        id: 'sub-veg-pepper-kale',
        mealId: 'meal-dinner-veg-tofu',
        label: 'Swap Sweet bell pepper → Baby Kale Greens',
        fromIngredientId: 'bell-pepper',
        toIngredient: {
          ingredientId: 'baby-kale',
          name: 'Tender baby kale',
          unit: 'g',
          baseAmountPerServing: 70,
        },
        rationale: 'Substitutes bell pepper with wilted baby kale greens and updates the shopping list.',
      },
    ],
  },
  {
    id: 'meal-dinner-fast-15',
    slot: 'dinner',
    title: '15-Minute Flash Skillet Lemon Garlic Chickpeas & Spinach',
    dietary: ['Balanced', 'Vegetarian'],
    requiredDevices: ['stovetop'],
    prepMinutes: 4,
    activeCookMinutes: 9,
    restMinutes: 1,
    elapsedMinutes: 14,
    minBudgetTier: 'tight',
    portionPerServing: '1 fast skillet bowl (~310g)',
    instructions: [
      'Heat olive oil and sliced garlic in a wide skillet for 1 minute.',
      'Add chickpeas and toss over medium-high heat for 6 minutes.',
      'Fold in spinach or greens until just wilted, brighten with lemon, and plate immediately.',
    ],
    baseIngredientsPerServing: [
      { ingredientId: 'chickpeas', name: 'Cooked chickpeas', unit: 'g', amount: 150 },
      { ingredientId: 'olive-oil', name: 'Olive oil', unit: 'ml', amount: 15 },
      { ingredientId: 'garlic', name: 'Garlic cloves', unit: 'count', amount: 2 },
    ],
    substitutions: [
      {
        id: 'sub-fast-chickpeas-tofu',
        mealId: 'meal-dinner-fast-15',
        label: 'Swap Cooked chickpeas → Quick-Seared Tofu Cubes',
        fromIngredientId: 'chickpeas',
        toIngredient: {
          ingredientId: 'tofu',
          name: 'Firm tofu',
          unit: 'g',
          baseAmountPerServing: 150,
        },
        rationale: 'Swaps chickpeas for diced firm tofu within the 15-minute flash skillet budget.',
      },
    ],
  },
  {
    id: 'meal-feast-turkey-180',
    slot: 'feast',
    title: '3-Hour Herb-Roasted Whole Turkey Centerpiece with Savory Jasmine Rice Pilaf',
    dietary: ['Balanced'],
    requiredDevices: ['oven', 'stovetop'],
    prepMinutes: 25,
    activeCookMinutes: 125,
    restMinutes: 30,
    elapsedMinutes: 180,
    minBudgetTier: 'standard',
    portionPerServing: '220g carved roast turkey with herbed rice pilaf & citrus pan jus',
    safeTempDeferralNote:
      'Elapsed 180 min includes 25 min prep, 125 min active oven roasting, and 30 min mandatory carving rest. Defer internal temperature verification to reviewed official food-safety guidance.',
    instructions: [
      'Prep (25 min): Pat turkey dry, rub with olive oil, crushed garlic, and lemon zest, and arrange in a roasting pan.',
      'Active cooking (125 min): Roast in preheated oven until golden; during the last 25 minutes, simmer jasmine rice and wilt spinach on the stovetop.',
      'Resting (30 min): Transfer turkey to a warm board and rest 30 minutes before carving; confirm doneness using reviewed official food-safety temperature guidance.',
    ],
    baseIngredientsPerServing: [
      { ingredientId: 'whole-turkey', name: 'Whole roasting turkey portion', unit: 'g', amount: 280 },
      { ingredientId: 'rice', name: 'Jasmine rice', unit: 'g', amount: 100 },
      { ingredientId: 'lemon', name: 'Lemon', unit: 'count', amount: 1 },
      { ingredientId: 'olive-oil', name: 'Olive oil', unit: 'ml', amount: 20 },
      { ingredientId: 'garlic', name: 'Garlic cloves', unit: 'count', amount: 2 },
    ],
    substitutions: [
      {
        id: 'sub-turkey-rice-quinoa',
        mealId: 'meal-feast-turkey-180',
        label: 'Swap Jasmine rice pilaf → Herbed Tri-Color Quinoa Pilaf',
        fromIngredientId: 'rice',
        toIngredient: {
          ingredientId: 'quinoa',
          name: 'Tri-color quinoa',
          unit: 'g',
          baseAmountPerServing: 95,
        },
        rationale: 'Swaps jasmine rice for tri-color quinoa in the stovetop pilaf while keeping the 180-minute roast timeline intact.',
      },
    ],
  },
]

export interface MakeNutritionOptions {
  mode: Mode
  guide: 'Jane' | 'Kay'
  goal: string
  units: 'us-customary' | 'metric'
  input: NutritionPlan['input']
  devices?: KitchenDeviceId[]
  pantryInventory?: PantryItem[]
  appliedSubstitutions?: Record<string, string> // mealId -> substitutionId
  now?: string
}

export function makeNutritionSamplePlan(options: MakeNutritionOptions): NutritionPreviewResult {
  const {
    mode,
    guide,
    goal,
    units,
    input: rawInput,
    devices = defaultKitchenDevices,
    pantryInventory = defaultPantryInventory,
    appliedSubstitutions = {},
    now = new Date().toISOString(),
  } = options

  if (mode === 'live') {
    throw new Error('Live AI is unavailable. Choose Guided or Demo explicitly to explore sample responses.')
  }
  if (clinicalDietRegex.test(goal) || clinicalDietRegex.test(rawInput.dietaryPattern)) {
    throw new Error(
      'You&Me supports everyday Balanced and Vegetarian meal planning only. Therapeutic diets, clinical prescriptions, calculated calorie targets, and supplement protocols are outside scope.'
    )
  }
  if (!['Balanced', 'Vegetarian'].includes(rawInput.dietaryPattern)) {
    throw new Error('Supported sample dietary patterns are Balanced and Vegetarian. Edit dietary pattern to continue.')
  }

  const checkedRequest = planRequestSchema.parse({
    mode,
    profile: {
      guide,
      journey: 'nutrition',
      dataOrigin: 'fictional',
      sampleId: 'sample-a',
      adultEligibility: 'adult',
      goal: goal.trim(),
      units,
      inputs: rawInput,
    },
  })

  const input = nutritionInputSchema.parse(checkedRequest.profile.inputs)

  if (!devices.length) {
    throw new Error(
      'Select at least one kitchen appliance (for example Stovetop, Air fryer, or Oven) so recipes can be matched to your kitchen.'
    )
  }
  if (!devices.includes('stovetop') && !devices.includes('microwave') && !devices.includes('air-fryer') && !devices.includes('oven')) {
    throw new Error(
      `Selected device combination (${devices.join(', ')}) cannot cook full daily meals alone in this sample fixture. Add Stovetop, Air fryer, Oven, or Microwave to continue.`
    )
  }

  const isTightBudget = input.budgetBand?.toLowerCase().includes('tight') || input.budgetBand?.toLowerCase().includes('under $5')
  if (isTightBudget && (input.preparationMinutes >= 180 || input.servings >= 6)) {
    throw new Error(
      `Selected budget (${input.budgetBand}) cannot cover a ${input.preparationMinutes}-minute multi-course or roast turkey plan for ${input.servings} servings. Choose Standard or Modest budget, or reduce cook time to 15–30 minutes.`
    )
  }

  const isGenericAllergyPreview =
    input.allergyAcknowledgement === 'unknown' || input.allergyAcknowledgement === 'prefer-not-to-say'

  const excludedLower = new Set(input.excludedIngredients.map(e => e.trim().toLowerCase()))
  const isIngredientExcluded = (id: string, name: string) =>
    excludedLower.has(id.toLowerCase()) ||
    excludedLower.has(name.toLowerCase()) ||
    Array.from(excludedLower).some(ex => ex.length > 2 && (id.toLowerCase().includes(ex) || name.toLowerCase().includes(ex)))

  // Filter candidate templates by dietary pattern, elapsed time budget, device compatibility, and exclusions
  const compatibleTemplates = recipeCatalog.filter(tpl => {
    if (!tpl.dietary.includes(input.dietaryPattern as 'Balanced' | 'Vegetarian')) return false
    if (tpl.elapsedMinutes > input.preparationMinutes) return false
    if (!tpl.requiredDevices.every(d => devices.includes(d))) return false
    // Check if base ingredients (after any applied substitution) violate exclusions
    const subId = appliedSubstitutions[tpl.id]
    const sub = tpl.substitutions.find(s => s.id === subId)
    for (const ing of tpl.baseIngredientsPerServing) {
      const effectiveId = sub && sub.fromIngredientId === ing.ingredientId ? sub.toIngredient.ingredientId : ing.ingredientId
      const effectiveName = sub && sub.fromIngredientId === ing.ingredientId ? sub.toIngredient.name : ing.name
      if (isIngredientExcluded(effectiveId, effectiveName)) return false
    }
    return true
  })

  // Prioritize 180-minute turkey scenario when 180 min + Balanced + oven are selected
  const orderedSelection: RecipeTemplate[] = []
  const breakfastPool = compatibleTemplates.filter(t => t.slot === 'breakfast')
  const lunchPool = compatibleTemplates.filter(t => t.slot === 'lunch')
  const feastPool = input.preparationMinutes >= 180 ? compatibleTemplates.filter(t => t.slot === 'feast') : []
  const dinnerPool = compatibleTemplates.filter(t => t.slot === 'dinner')

  const candidates = [
    ...(feastPool.length && input.meals === 1 ? feastPool : []),
    ...(breakfastPool[0] ? [breakfastPool[0]] : []),
    ...(lunchPool[0] ? [lunchPool[0]] : []),
    ...feastPool,
    ...(dinnerPool[0] ? [dinnerPool[0]] : []),
    ...dinnerPool.slice(1),
    ...breakfastPool.slice(1),
    ...lunchPool.slice(1),
    ...compatibleTemplates,
  ]

  const usedIds = new Set<string>()
  for (const tpl of candidates) {
    if (orderedSelection.length >= input.meals) break
    if (!usedIds.has(tpl.id)) {
      usedIds.add(tpl.id)
      orderedSelection.push(tpl)
    }
  }

  // If user requested more meals than distinct compatible templates, clone with distinct slot suffix
  let fallbackIndex = 1
  while (orderedSelection.length < input.meals && compatibleTemplates.length > 0) {
    const base = compatibleTemplates[(orderedSelection.length) % compatibleTemplates.length]
    orderedSelection.push({
      ...base,
      id: `${base.id}-extra-${fallbackIndex}`,
      title: `${base.title} (Evening Portion ${fallbackIndex})`,
    })
    fallbackIndex++
  }

  if (orderedSelection.length < input.meals) {
    throw new Error(
      'No supported recipes match all current exclusions, appliances, and time limits. Try relaxing one ingredient exclusion, increasing cook time to 30 minutes, or enabling Stovetop / Air fryer.'
    )
  }

  const pantryMap = new Map<string, PantryItem>()
  for (const p of pantryInventory) {
    pantryMap.set(`${p.ingredientId}:${p.unit}`, p)
  }

  const mealMeta: Record<string, MealExtendedMeta> = {}
  const consolidatedMap = new Map<
    string,
    { ingredientId: string; name: string; unit: 'g' | 'ml' | 'count'; amount: number; pantry: boolean }
  >()

  const meals: NutritionPlan['meals'] = orderedSelection.map(tpl => {
    const subId = appliedSubstitutions[tpl.id]
    const activeSub = tpl.substitutions.find(s => s.id === subId)

    const scaledIngredients = tpl.baseIngredientsPerServing.map(ing => {
      const replaced = activeSub && activeSub.fromIngredientId === ing.ingredientId
      const ingredientId = replaced ? activeSub.toIngredient.ingredientId : ing.ingredientId
      const name = replaced ? activeSub.toIngredient.name : ing.name
      const unit = replaced ? activeSub.toIngredient.unit : ing.unit
      const baseAmount = replaced ? activeSub.toIngredient.baseAmountPerServing : ing.amount
      const amount = baseAmount * input.servings
      const pantryEntry = pantryMap.get(`${ingredientId}:${unit}`)
      const isPantry = Boolean(pantryEntry && pantryEntry.onHandAmount > 0)

      const key = `${ingredientId}:${unit}:${isPantry}`
      const existing = consolidatedMap.get(key)
      if (existing) {
        existing.amount += amount
      } else {
        consolidatedMap.set(key, { ingredientId, name, unit, amount, pantry: isPantry })
      }

      return {
        ingredientId,
        name,
        unit,
        amount,
        pantry: isPantry,
      }
    })

    // Filter available substitutions so none introduce an excluded ingredient
    const validSubs = tpl.substitutions.filter(
      s => !isIngredientExcluded(s.toIngredient.ingredientId, s.toIngredient.name)
    )

    mealMeta[tpl.id] = {
      mealId: tpl.id,
      appliancesUsed: tpl.requiredDevices,
      prepMinutes: tpl.prepMinutes,
      activeCookMinutes: tpl.activeCookMinutes,
      restMinutes: tpl.restMinutes,
      elapsedMinutes: tpl.elapsedMinutes,
      safeTempDeferralNote: tpl.safeTempDeferralNote,
      availableSubstitutions: validSubs,
      appliedSubstitution: activeSub,
    }

    const substitutionStrings = activeSub
      ? [`Applied: ${activeSub.label} (${activeSub.rationale})`]
      : validSubs.map(s => `${s.label} — ${s.rationale}`)

    return {
      id: tpl.id,
      title: isGenericAllergyPreview ? `[Generic Preview] ${tpl.title}` : tpl.title,
      servings: input.servings,
      quantityBasis: 'per-recipe' as const,
      portion: `${input.servings} ${input.servings === 1 ? 'serving' : 'servings'} (${tpl.portionPerServing} each)`,
      preparationMinutes: tpl.elapsedMinutes,
      instructions: tpl.instructions,
      ingredients: scaledIngredients,
      substitutions: substitutionStrings,
    }
  })

  const shoppingList = Array.from(consolidatedMap.values())

  const shoppingBreakdown: ShoppingBreakdownItem[] = shoppingList.map(item => {
    const pantryEntry = pantryMap.get(`${item.ingredientId}:${item.unit}`)
    const onHand = pantryEntry ? pantryEntry.onHandAmount : 0
    const shortage = Math.max(0, item.amount - onHand)
    return {
      ingredientId: item.ingredientId,
      name: item.name,
      unit: item.unit,
      requiredAmount: item.amount,
      onHandAmount: onHand,
      shortageAmount: shortage,
      pantry: item.pantry,
    }
  })

  const genericNotice = isGenericAllergyPreview
    ? 'Generic non-personalized preview only: because allergy status is marked unknown or prefer not to say, You&Me does not claim this menu is tailored to your allergens.'
    : input.excludedIngredients.length > 0
      ? `Explicit exclusions honored (${input.excludedIngredients.join(', ')} omitted across all meals, substitutions, and shopping totals).`
      : 'No ingredient exclusions listed.'

  const explanation = `${isGenericAllergyPreview ? 'GENERIC PREVIEW ONLY · ' : ''}${input.dietaryPattern} one-day sample plan with ${input.meals} ${input.meals === 1 ? 'meal' : 'meals'} scaled for ${input.servings} ${input.servings === 1 ? 'serving' : 'servings'} within a ${input.preparationMinutes}-minute max elapsed cook budget using ${devices.join(', ')}. ${genericNotice}`

  const plan = nutritionPlanSchema.parse({
    journey: 'nutrition',
    input,
    explanation,
    meals,
    shoppingList,
  })

  const provenance = provenanceSchema.parse({
    mode,
    source: 'sample',
    fixtureId: isGenericAllergyPreview ? 'nutrition-generic-preview-v1' : 'nutrition-bounded-v1',
    createdAt: now,
  })

  return {
    plan,
    provenance,
    goal: goal.trim(),
    mealMeta,
    shoppingBreakdown,
    isGenericAllergyPreview,
    allergySafetyNotice:
      'Sample filters do not certify allergen-free preparation or cross-contamination safety. Always inspect package labels and confirm allergens directly.',
    elapsedCookBudgetMinutes: input.preparationMinutes,
    devicesSelected: devices,
  }
}

export function setMealCompletion(
  completedMealIds: string[],
  mealId: string,
  complete: boolean,
  plan: NutritionPlan
): string[] {
  if (!plan.meals.some(m => m.id === mealId)) return completedMealIds
  const next = new Set(completedMealIds)
  if (complete) next.add(mealId)
  else next.delete(mealId)
  return [...next]
}

export function formatQuantity(
  amount: number,
  unit: 'g' | 'ml' | 'count',
  system: 'us-customary' | 'metric'
): string {
  if (unit === 'count') {
    return `${amount} ${amount === 1 ? 'whole' : 'count'}`
  }
  if (system === 'metric') {
    return `${Math.round(amount)} ${unit}`
  }
  if (unit === 'g') {
    const oz = amount / 28.3495
    return `${oz.toFixed(1)} oz (${Math.round(amount)} g)`
  }
  const tbsp = amount / 14.7868
  if (tbsp < 4) {
    return `${tbsp.toFixed(1)} tbsp (${Math.round(amount)} ml)`
  }
  const cups = amount / 240
  return `${cups.toFixed(2)} cups (${Math.round(amount)} ml)`
}

export function compareNutritionPlans(prev: NutritionPlan | null, next: NutritionPlan): string[] {
  if (!prev) {
    return ['Initial one-day meal plan and consolidated shopping list prepared from your kitchen settings.']
  }
  const diffs: string[] = []
  if (prev.input.servings !== next.input.servings) {
    diffs.push(`Servings scaled from ${prev.input.servings} to ${next.input.servings} across all recipes and shopping totals.`)
  }
  if (prev.input.dietaryPattern !== next.input.dietaryPattern) {
    diffs.push(`Dietary pattern changed from ${prev.input.dietaryPattern} to ${next.input.dietaryPattern}.`)
  }
  if (prev.input.preparationMinutes !== next.input.preparationMinutes) {
    diffs.push(`Max elapsed cook time changed from ${prev.input.preparationMinutes} min to ${next.input.preparationMinutes} min.`)
  }
  const prevEx = prev.input.excludedIngredients.join(', ') || 'none'
  const nextEx = next.input.excludedIngredients.join(', ') || 'none'
  if (prevEx !== nextEx) {
    diffs.push(`Excluded ingredients updated from [${prevEx}] to [${nextEx}].`)
  }
  const prevMeals = prev.meals.map(m => m.title).join(' · ')
  const nextMeals = next.meals.map(m => m.title).join(' · ')
  if (prevMeals !== nextMeals) {
    diffs.push(`Menu updated to: ${nextMeals}.`)
  }
  return diffs.length ? diffs : ['Updated candidate with applied ingredient substitution and recalculated shopping list.']
}
