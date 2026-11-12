export type GuestTrialStage = 'active' | 'near-expiry' | 'expired'

export interface TrialClockInfo {
  stage: GuestTrialStage
  label: string
  fictionalNow: string
  hoursRemaining: number
  bannerMessage: string
  canGenerateAsGuest: boolean
}

export const trialStageCatalog: Record<GuestTrialStage, TrialClockInfo> = {
  active: {
    stage: 'active',
    label: 'Guest start · 48h window active',
    fictionalNow: 'Nov 11, 2026 · 09:00 AM CST (Hour 0 of 48)',
    hoursRemaining: 48,
    bannerMessage:
      'Guest standard guidance active (48 hours remaining). Explore deterministic Fitness and Nutrition plans before registering.',
    canGenerateAsGuest: true,
  },
  'near-expiry': {
    stage: 'near-expiry',
    label: 'Near expiry · 2h remaining',
    fictionalNow: 'Nov 13, 2026 · 07:00 AM CST (Hour 46 of 48)',
    hoursRemaining: 2,
    bannerMessage:
      '2 hours left in your 48-hour guest window. Register an email and choose a simulated plan anytime to keep your preferences for repeat planning.',
    canGenerateAsGuest: true,
  },
  expired: {
    stage: 'expired',
    label: 'Expired · 48h window ended',
    fictionalNow: 'Nov 13, 2026 · 09:05 AM CST (48h elapsed)',
    hoursRemaining: 0,
    bannerMessage:
      'Your 48-hour guest trial has ended. Complete mock email verification and select a simulated tier below to continue generating plans.',
    canGenerateAsGuest: false,
  },
}

export type AgeBand = 'under-16' | '16-17' | '18-24' | '25-39' | '40-54' | '55-plus'

export interface AgeBandInfo {
  id: AgeBand
  label: string
  eligibleForProduct: boolean
  eligibleForInitialPilot: boolean
  suggestedGuideAge: GuideAgeLook
  policyNote: string
}

export const ageBandCatalog: AgeBandInfo[] = [
  {
    id: 'under-16',
    label: 'Under 16',
    eligibleForProduct: false,
    eligibleForInitialPilot: false,
    suggestedGuideAge: '20s-peer',
    policyNote: 'You&Me is designed for people aged 16 and up. Accounts under 16 are not eligible.',
  },
  {
    id: '16-17',
    label: '16–17 years old (Teen)',
    eligibleForProduct: true,
    eligibleForInitialPilot: false,
    suggestedGuideAge: '20s-peer',
    policyNote:
      'Product eligibility is 16+, with private defaults, restricted pairing/sharing, no weight-loss scoring, and sample-only mode until teen safety, age assurance, and AI provider terms are reviewed. Initial 45-day pilot recruitment is 18+.',
  },
  {
    id: '18-24',
    label: '18–24 years old',
    eligibleForProduct: true,
    eligibleForInitialPilot: true,
    suggestedGuideAge: '20s-peer',
    policyNote: 'Eligible for the 18+ invite-only web pilot. You may choose a peer guide or a 45-ish mentor.',
  },
  {
    id: '25-39',
    label: '25–39 years old',
    eligibleForProduct: true,
    eligibleForInitialPilot: true,
    suggestedGuideAge: '30s-peer',
    policyNote: 'Eligible for the 18+ invite-only web pilot. Full choice of peer or mentor guide personas.',
  },
  {
    id: '40-54',
    label: '40–54 years old',
    eligibleForProduct: true,
    eligibleForInitialPilot: true,
    suggestedGuideAge: '45-mentor',
    policyNote: 'Eligible for the 18+ invite-only web pilot.',
  },
  {
    id: '55-plus',
    label: '55+ years old',
    eligibleForProduct: true,
    eligibleForInitialPilot: true,
    suggestedGuideAge: '60s-mentor',
    policyNote: 'Eligible for the 18+ invite-only web pilot.',
  },
]

export type BundleOfferingId =
  | 'fitness'
  | 'nutrition'
  | 'fashion'
  | 'fitness-nutrition'
  | 'nutrition-fashion'
  | 'all-three'

export interface BundleOffering {
  id: BundleOfferingId
  title: string
  journeysIncluded: string[]
  involvesUpcoming: boolean
  statusBadge: string
  defaultConfigurablePrice: string
}

export const bundleOfferingsCatalog: BundleOffering[] = [
  {
    id: 'fitness',
    title: 'Fitness',
    journeysIncluded: ['Fitness'],
    involvesUpcoming: false,
    statusBadge: 'Working journey in preview',
    defaultConfigurablePrice: 'Pricing to be confirmed',
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    journeysIncluded: ['Nutrition'],
    involvesUpcoming: false,
    statusBadge: 'Working journey in preview',
    defaultConfigurablePrice: 'Pricing to be confirmed',
  },
  {
    id: 'fashion',
    title: 'Fashion',
    journeysIncluded: ['Fashion'],
    involvesUpcoming: true,
    statusBadge: 'Upcoming journey · preview only',
    defaultConfigurablePrice: 'Pricing to be confirmed',
  },
  {
    id: 'fitness-nutrition',
    title: 'Fitness + Nutrition',
    journeysIncluded: ['Fitness', 'Nutrition'],
    involvesUpcoming: false,
    statusBadge: 'Core Day-45 pilot bundle',
    defaultConfigurablePrice: 'Pricing to be confirmed',
  },
  {
    id: 'nutrition-fashion',
    title: 'Nutrition + Fashion',
    journeysIncluded: ['Nutrition', 'Fashion'],
    involvesUpcoming: true,
    statusBadge: 'Includes upcoming Fashion journey',
    defaultConfigurablePrice: 'Pricing to be confirmed',
  },
  {
    id: 'all-three',
    title: 'Fitness + Nutrition + Fashion',
    journeysIncluded: ['Fitness', 'Nutrition', 'Fashion'],
    involvesUpcoming: true,
    statusBadge: 'Full trio · Fashion upcoming',
    defaultConfigurablePrice: 'Pricing to be confirmed',
  },
]

export type AiServiceTierId = 'Guest' | 'Basic' | 'Plus' | 'Pro'

export interface AiServiceTier {
  id: AiServiceTierId
  label: string
  proposedService: string
  recallWindow: string
  comparisonEnabled: boolean
  downgradeNote: string
}

export const aiServiceTiersCatalog: AiServiceTier[] = [
  {
    id: 'Guest',
    label: 'Guest (48-Hour Trial)',
    proposedService: 'Curated, deterministic sample plan library during the 48-hour window.',
    recallWindow: 'Current browser session only',
    comparisonEnabled: false,
    downgradeNote: 'Expires after 48 hours; handoff to registration preserves selected inputs upon consent.',
  },
  {
    id: 'Basic',
    label: 'Basic · Simulation · no charge',
    proposedService: 'Tailored plans using current inputs and relevant recent history.',
    recallWindow: '1 month proposed AI recall window',
    comparisonEnabled: false,
    downgradeNote:
      'On downgrade from Plus/Pro, older AI recall beyond 1 month stops shaping prompts; user-saved plans and progress remain intact.',
  },
  {
    id: 'Plus',
    label: 'Plus · Simulation · no charge',
    proposedService: 'More detailed side-by-side version comparisons and replanning with a higher usage allowance.',
    recallWindow: '2 months proposed AI recall window',
    comparisonEnabled: true,
    downgradeNote:
      'Enables side-by-side plan version comparison. Switching back to Basic/Free disables the comparison view without deleting versions or progress.',
  },
  {
    id: 'Pro',
    label: 'Pro · Simulation · no charge',
    proposedService: 'Deeper multi-step planning (4–16 week roadmaps & batch prep) and larger usage allowance within enabled journeys.',
    recallWindow: '3 months proposed max AI recall window (under S-01 review)',
    comparisonEnabled: true,
    downgradeNote:
      'Three months is the proposed maximum AI recall window. Account records, saved plans, and quarter summaries have separate retention policies.',
  },
]

export type GuideAgeLook = '20s-peer' | '30s-peer' | '45-mentor' | '60s-mentor'
export type GuideSkinTone = 'warm-amber' | 'deep-espresso' | 'olive-sand' | 'fair-rose'
export type GuideFeatureStyle = 'soft-rounded' | 'defined-classic' | 'expressive-editorial'
export type GuideWardrobeRole =
  | 'everyday-mentor'
  | 'gym-partner'
  | 'nutrition-guide'
  | 'chef'
  | 'stylist'
  | 'event-planner'

export interface GuideAppearance {
  ageLook: GuideAgeLook
  skinTone: GuideSkinTone
  featureStyle: GuideFeatureStyle
  wardrobeOverride?: GuideWardrobeRole | 'auto'
}

export const wardrobeDescriptions: Record<
  GuideWardrobeRole,
  { title: string; attireSummary: string; badgeColor: string; taskContext: string }
> = {
  'everyday-mentor': {
    title: 'Everyday Guide',
    attireSummary: 'Relaxed linen overshirt & warm neutral knit',
    badgeColor: '#284d3f',
    taskContext: 'Welcome, Home, Progress & Settings',
  },
  'gym-partner': {
    title: 'Gym Partner',
    attireSummary: 'Breathable sage athletic zip-top & training timer band',
    badgeColor: '#1f5c4b',
    taskContext: 'Fitness Workout & Roadmap Planner',
  },
  'nutrition-guide': {
    title: 'Nutrition Guide',
    attireSummary: 'Crisp market tote jacket & botanical apron collar',
    badgeColor: '#5c4d26',
    taskContext: 'Nutrition Pantry & Shopping List',
  },
  chef: {
    title: 'Home Kitchen Chef',
    attireSummary: 'Cross-back canvas chef apron & rolled Linen sleeves',
    badgeColor: '#8b4513',
    taskContext: 'Active Meal Prep & 15–180 Min Cooking',
  },
  stylist: {
    title: 'Occasion Stylist',
    attireSummary: 'Structured charcoal blazer & draped silk pocket square',
    badgeColor: '#4a3b5c',
    taskContext: 'Dress for an Occasion (Upcoming Preview)',
  },
  'event-planner': {
    title: 'Local Date & Evening Planner',
    attireSummary: 'Evening terracotta smart-casual jacket & venue folio',
    badgeColor: '#7a3b2e',
    taskContext: 'Date Night & Local Dining (Upcoming Preview)',
  },
}

export function resolveActiveWardrobe(
  screen: string,
  exploreSubTab: string,
  nutritionSubView: string,
  override?: GuideWardrobeRole | 'auto'
): GuideWardrobeRole {
  if (override && override !== 'auto') return override
  if (screen === 'Fitness') return 'gym-partner'
  if (screen === 'Nutrition') return nutritionSubView === 'cooking' ? 'chef' : 'nutrition-guide'
  if (screen === 'Explore') {
    if (exploreSubTab === 'fashion') return 'stylist'
    if (exploreSubTab === 'local') return 'event-planner'
  }
  return 'everyday-mentor'
}

export interface HabitStarsInput {
  completedFitnessActionIds: string[]
  totalFitnessActionsInPlan: number
  completedNutritionMealIds: string[]
  totalNutritionMealsInPlan: number
  activeDaysThisWeek: number // 0..7, each day counted once
  checkInDaysThisWeek: number // 0..7, each day counted once
  useDemoHistoryWindow: boolean
}

export interface HabitStarWindowResult {
  windowLabel: 'Weekly' | 'Monthly' | 'Quarterly'
  notEnoughActivity: boolean
  starRating: number | null // 1.0 to 5.0 when sufficient activity
  weightedScorePercent: number
  actionCompletionShare: number // max 70
  consistencyShare: number // max 20
  checkInShare: number // max 10
  denominatorSummary: string
  whatMovedRating: string
  suggestedNextStep: string
}

export function calculateHabitStars(input: HabitStarsInput): HabitStarWindowResult[] {
  const uniqueFitnessCompleted = new Set(input.completedFitnessActionIds).size
  const uniqueNutritionCompleted = new Set(input.completedNutritionMealIds).size
  const totalCompletedActions = uniqueFitnessCompleted + uniqueNutritionCompleted
  const totalDenominatorActions =
    Math.max(0, input.totalFitnessActionsInPlan) + Math.max(0, input.totalNutritionMealsInPlan)

  if (!input.useDemoHistoryWindow && totalCompletedActions === 0) {
    const emptyMsg =
      'Not enough activity yet. Select a Fitness or Nutrition plan and mark at least one action complete to calculate your private habit stars.'
    return (['Weekly', 'Monthly', 'Quarterly'] as const).map(windowLabel => ({
      windowLabel,
      notEnoughActivity: true,
      starRating: null,
      weightedScorePercent: 0,
      actionCompletionShare: 0,
      consistencyShare: 0,
      checkInShare: 0,
      denominatorSummary:
        totalDenominatorActions > 0
          ? `0 of ${totalDenominatorActions} chosen session actions completed`
          : 'No active session goals in denominator yet',
      whatMovedRating: emptyMsg,
      suggestedNextStep:
        'Complete your warm-up block in Fitness or one prepared meal in Nutrition to record your first action.',
    }))
  }

  const effectiveDenominator = Math.max(1, totalDenominatorActions || 3)
  const actionRatio = Math.min(1, totalCompletedActions / effectiveDenominator)
  const daysRatio = Math.min(1, Math.max(1, input.activeDaysThisWeek) / 4) // 4 active days/week target
  const checkInRatio = Math.min(1, Math.max(1, input.checkInDaysThisWeek) / 5) // capped 10% check-in share

  const weeklyActionShare = Math.round(actionRatio * 70)
  const weeklyConsistencyShare = Math.round(daysRatio * 20)
  const weeklyCheckInShare = Math.round(checkInRatio * 10)
  const weeklyTotal = Math.min(100, weeklyActionShare + weeklyConsistencyShare + weeklyCheckInShare)
  const toStars = (pct: number) => Math.round((1 + (pct / 100) * 4) * 10) / 10

  const weeklyResult: HabitStarWindowResult = {
    windowLabel: 'Weekly',
    notEnoughActivity: false,
    starRating: toStars(weeklyTotal),
    weightedScorePercent: weeklyTotal,
    actionCompletionShare: weeklyActionShare,
    consistencyShare: weeklyConsistencyShare,
    checkInShare: weeklyCheckInShare,
    denominatorSummary: `${totalCompletedActions} of ${effectiveDenominator} chosen actions (${uniqueFitnessCompleted} Fitness, ${uniqueNutritionCompleted} Nutrition) · ${Math.max(1, input.activeDaysThisWeek)}/4 target active days`,
    whatMovedRating: `Chosen action completions contributed ${weeklyActionShare}/70 pts, weekly consistency contributed ${weeklyConsistencyShare}/20 pts, and capped daily check-ins contributed ${weeklyCheckInShare}/10 pts.`,
    suggestedNextStep:
      actionRatio < 1
        ? `Complete 1 more scheduled action in your active plan to lift the 70% completion component.`
        : 'All actions in your current session are complete. Space your next session after a recovery day.',
  }

  if (!input.useDemoHistoryWindow) {
    return [
      weeklyResult,
      {
        windowLabel: 'Monthly',
        notEnoughActivity: true,
        starRating: null,
        weightedScorePercent: 0,
        actionCompletionShare: 0,
        consistencyShare: 0,
        checkInShare: 0,
        denominatorSummary: 'Requires at least 2 weeks of recorded activity (current session only)',
        whatMovedRating:
          'Not enough activity yet for a 30-day trend. Toggle "Preview sample 90-day history" to inspect simulated monthly and quarterly habit stars.',
        suggestedNextStep: 'Keep completing chosen actions across multiple weeks or enable the sample history preview.',
      },
      {
        windowLabel: 'Quarterly',
        notEnoughActivity: true,
        starRating: null,
        weightedScorePercent: 0,
        actionCompletionShare: 0,
        consistencyShare: 0,
        checkInShare: 0,
        denominatorSummary: 'Requires at least 4 weeks of recorded activity (current session only)',
        whatMovedRating:
          'Not enough activity yet for a 90-day quarterly rollup. Toggle "Preview sample 90-day history" to inspect how quarterly consistency is explained.',
        suggestedNextStep: 'Review your weekly action completion first; quarterly stars aggregate 12 weeks of chosen goals.',
      },
    ]
  }

  // Simulated 90-day demo history window enabled for reviewer inspection
  const monthlyAction = Math.min(70, Math.max(52, weeklyActionShare))
  const monthlyCons = 16
  const monthlyCheck = 8
  const monthlyTotal = monthlyAction + monthlyCons + monthlyCheck

  const quarterlyAction = Math.min(70, Math.max(56, weeklyActionShare))
  const quarterlyCons = 18
  const quarterlyCheck = 9
  const quarterlyTotal = quarterlyAction + quarterlyCons + quarterlyCheck

  return [
    weeklyResult,
    {
      windowLabel: 'Monthly',
      notEnoughActivity: false,
      starRating: toStars(monthlyTotal),
      weightedScorePercent: monthlyTotal,
      actionCompletionShare: monthlyAction,
      consistencyShare: monthlyCons,
      checkInShare: monthlyCheck,
      denominatorSummary: 'Sample 4-week history: 18 of 24 chosen Fitness & Nutrition actions · 13 active days',
      whatMovedRating: `Simulated 30-day sample: ${monthlyAction}/70 pts from completed workout blocks and meals, ${monthlyCons}/20 pts from 3+ active days/week, and ${monthlyCheck}/10 pts from capped daily check-ins.`,
      suggestedNextStep: 'Add one balanced meal preparation on Wednesday to raise monthly consistency from 16/20 to 19/20.',
    },
    {
      windowLabel: 'Quarterly',
      notEnoughActivity: false,
      starRating: toStars(quarterlyTotal),
      weightedScorePercent: quarterlyTotal,
      actionCompletionShare: quarterlyAction,
      consistencyShare: quarterlyCons,
      checkInShare: quarterlyCheck,
      denominatorSummary: 'Sample 12-week history: 58 of 72 chosen actions across Fitness & Nutrition · 10 consistent weeks',
      whatMovedRating: `Simulated 90-day sample: steady completion across deload weeks kept action share at ${quarterlyAction}/70 pts. Weight, support tickets, billing tier, and AI usage never affect habit stars.`,
      suggestedNextStep: 'Maintain 3 sessions per week through your next deload phase to preserve your quarterly star trend.',
    },
  ]
}

export type RelationshipLabel =
  | 'unlabelled'
  | 'spouse'
  | 'child'
  | 'parent'
  | 'aunt-uncle'
  | 'sibling'
  | 'colleague'
  | 'neighbor'
  | 'friend'

export type PairingStatus = 'pending-incoming' | 'pending-outgoing' | 'accepted' | 'declined' | 'blocked' | 'unlinked'

export interface ParticipantPair {
  participantId: string
  displayName: string
  status: PairingStatus
  relationshipLabel: RelationshipLabel
  ageBand: 'adult' | '16-17'
  sharedChallengeId?: string
  partnerDateNightRating?: {
    venueName: string
    rating: number
    privateNote: string
  }
}

export const MAX_ACTIVE_PAIRS = 50

export const initialParticipantPairs: ParticipantPair[] = [
  {
    participantId: 'YM-PARTNER-204',
    displayName: 'Alex Rivera (Sample Partner)',
    status: 'accepted',
    relationshipLabel: 'spouse',
    ageBand: 'adult',
    sharedChallengeId: 'challenge-meals-3',
    partnerDateNightRating: {
      venueName: 'Trattoria Verde (Quiet Neighbourhood Patio)',
      rating: 5,
      privateNote: 'Privately rated 5/5 · "Loves the quiet corner table and vegetarian lemon-herb pasta option."',
    },
  },
  {
    participantId: 'YM-FRIEND-118',
    displayName: 'Samira Patel (Sample Gym Buddy)',
    status: 'pending-incoming',
    relationshipLabel: 'friend',
    ageBand: 'adult',
  },
  {
    participantId: 'YM-COLLEAGUE-309',
    displayName: 'Jordan Lee (Sample Colleague)',
    status: 'declined',
    relationshipLabel: 'colleague',
    ageBand: 'adult',
  },
]

export interface SharedBehaviorChallenge {
  id: string
  title: string
  category: 'fitness' | 'nutrition'
  targetSummary: string
  userCompletedCount: number
  partnerCompletedCount: number
  targetCount: number
  joined: boolean
  privacyNote: string
}

export const initialChallenges: SharedBehaviorChallenge[] = [
  {
    id: 'challenge-meals-3',
    title: 'Cook 3 Home Meals This Week',
    category: 'nutrition',
    targetSummary: 'Complete 3 home-prepared meals from your Nutrition plan (behavior-only; recipes and exclusions stay private).',
    userCompletedCount: 1,
    partnerCompletedCount: 2,
    targetCount: 3,
    joined: true,
    privacyNote: 'Only completion count is shared. Exact ingredients, food exclusions, budget, and body weight are never shared.',
  },
  {
    id: 'challenge-workouts-2',
    title: 'Complete 2 Movement Sessions This Week',
    category: 'fitness',
    targetSummary: 'Finish 2 scheduled workouts of 15+ minutes at your own pace (no calorie or weight-loss competition).',
    userCompletedCount: 1,
    partnerCompletedCount: 1,
    targetCount: 2,
    joined: false,
    privacyNote: 'Behavior-based badge only. Weight-loss competitions and teen weight scoring are prohibited.',
  },
]

export interface FashionOccasionFixture {
  id: 'game-casual' | 'dinner-black-tie' | 'dinner-business-casual' | 'gym-session'
  occasionTitle: string
  venueAndDressCode: string
  weatherAndSetting: string
  closetItems: Array<{
    id: string
    name: string
    sourceModality: 'Text entry' | 'Dictated transcript' | 'Garment-only photo sample'
    transcriptOrNote: string
  }>
  primaryOutfit: {
    title: string
    pieces: string[]
    rationale: string
  }
  alternateOutfit: {
    title: string
    pieces: string[]
    rationale: string
  }
  accessoryComparisons: Array<{
    category: 'Footwear' | 'Socks / Hosiery' | 'Watch' | 'Belt' | 'Bag / Carry'
    optionA: string
    optionB: string
    recommendation: string
  }>
}

export const fashionOccasionCatalog: FashionOccasionFixture[] = [
  {
    id: 'game-casual',
    occasionTitle: 'Weekend Game · Casual Stadium or Lounge',
    venueAndDressCode: 'Indoor arena / neighborhood watch lounge · Elevated Casual',
    weatherAndSetting: 'Cool evening, 58°F · walking + stadium seating',
    closetItems: [
      {
        id: 'cl-1',
        name: 'Indigo selvedge straight-leg denim',
        sourceModality: 'Text entry',
        transcriptOrNote: 'Typed closet entry: "Dark indigo straight jeans, comfortable for sitting 3 hours"',
      },
      {
        id: 'cl-2',
        name: 'Olive merino crew sweater & crisp white tee',
        sourceModality: 'Dictated transcript',
        transcriptOrNote: 'Voice transcript sample: "My olive merino crew neck and heavyweight white cotton t-shirt"',
      },
      {
        id: 'cl-3',
        name: 'Low-profile white leather court sneakers',
        sourceModality: 'Garment-only photo sample',
        transcriptOrNote: 'Fictional garment-only flat-lay sample (no face/body data; EXIF stripped)',
      },
    ],
    primaryOutfit: {
      title: 'Primary Look: Layered Olive Merino + Indigo Denim + Court Sneakers',
      pieces: [
        'Heavyweight white tee under olive merino crew sweater',
        'Indigo straight-leg denim',
        'Low-profile white leather court sneakers',
      ],
      rationale:
        'Balances arena temperature swings with easy walking comfort and clean lines that read intentional without feeling overdressed.',
    },
    alternateOutfit: {
      title: 'Alternate Look: Textured Overshirt + Charcoal Chino + Suede Runner',
      pieces: [
        'Brushed cotton overshirt over ribbed tee',
        'Stretch charcoal tailored chino',
        'Neutral grey suede retro runner',
      ],
      rationale:
        'Slightly softer stretch through the knee for long bleacher or lounge seating while keeping a sharp casual silhouette.',
    },
    accessoryComparisons: [
      {
        category: 'Footwear',
        optionA: 'White leather court sneakers',
        optionB: 'Grey suede retro runners',
        recommendation: 'Wipeable leather court sneakers handle stadium concourses and spills better than suede.',
      },
      {
        category: 'Socks / Hosiery',
        optionA: 'Heather oatmeal ribbed crew socks',
        optionB: 'Charcoal cushioned ankle socks',
        recommendation: 'Oatmeal ribbed crew socks bridge the denim hem and sneaker collar cleanly.',
      },
      {
        category: 'Watch',
        optionA: 'Brushed steel field watch on olive nylon strap',
        optionB: 'Minimalist black resin sport chronograph',
        recommendation: 'Steel field watch on nylon echoes the olive sweater while staying lightweight.',
      },
      {
        category: 'Belt',
        optionA: 'Matte tan Bridle leather belt',
        optionB: 'Woven charcoal stretch belt',
        recommendation: 'Woven charcoal stretch belt adds seated comfort during a 3-hour game.',
      },
    ],
  },
  {
    id: 'dinner-black-tie',
    occasionTitle: 'Exclusive Evening Dinner · Black-Tie Optional / Formal',
    venueAndDressCode: 'Private dining room · Black Tie / Formal Evening',
    weatherAndSetting: 'Indoor climate-controlled · valet or short evening walk',
    closetItems: [
      {
        id: 'bt-1',
        name: 'Midnight wool tuxedo or structured formal evening drape',
        sourceModality: 'Garment-only photo sample',
        transcriptOrNote: 'Fictional garment-only hanger sample · satin lapel / evening silhouette',
      },
      {
        id: 'bt-2',
        name: 'Crisp pleated evening shirt or silk formal shell',
        sourceModality: 'Text entry',
        transcriptOrNote: 'Typed closet entry: "Formal ivory silk shell / pleated dress shirt"',
      },
      {
        id: 'bt-3',
        name: 'Patent leather dress shoes / satin evening pumps',
        sourceModality: 'Dictated transcript',
        transcriptOrNote: 'Voice transcript sample: "Black patent oxfords or low-heel satin evening shoes"',
      },
    ],
    primaryOutfit: {
      title: 'Primary Look: Midnight Formal Tailoring with Satin Accents',
      pieces: [
        'Midnight wool evening jacket & formal trouser/column drape',
        'Crisp ivory evening shirt / silk shell',
        'Polished black patent dress footwear',
      ],
      rationale:
        'Midnight wool photographs richer than flat black under warm candlelight and meets strict black-tie host expectations effortlessly.',
    },
    alternateOutfit: {
      title: 'Alternate Look: Deep Charcoal Velvet Evening Jacket Combination',
      pieces: [
        'Deep charcoal velvet dinner jacket',
        'Tailored black formal trouser or midi evening skirt',
        'Calfskin cap-toe dress shoe / structured evening flat',
      ],
      rationale:
        'Offers slightly softer movement for a multi-course tasting menu while honoring formal dress codes.',
    },
    accessoryComparisons: [
      {
        category: 'Footwear',
        optionA: 'Black patent leather oxfords / evening heels',
        optionB: 'Polished black calfskin dress loafers / flats',
        recommendation: 'Patent leather pairs formally with satin lapels; choose calfskin if walking several blocks.',
      },
      {
        category: 'Socks / Hosiery',
        optionA: 'Over-the-calf black silk dress socks',
        optionB: 'Sheer matte black evening hosiery',
        recommendation: 'Select based on your chosen silhouette preference—both maintain an unbroken formal line.',
      },
      {
        category: 'Watch',
        optionA: 'Ultra-thin dress watch on black alligator-grain leather',
        optionB: 'No watch (classic black-tie rule)',
        recommendation: 'Either a slim dress watch under the cuff or an unadorned wrist keeps focus on the evening.',
      },
      {
        category: 'Belt',
        optionA: 'Formal side-adjusters / cummerbund sash (no belt)',
        optionB: 'Slim 25mm polished black dress belt',
        recommendation: 'Clean waist or slim polished belt depending on trouser loops.',
      },
      {
        category: 'Bag / Carry',
        optionA: 'Structured black satin evening clutch / handbag',
        optionB: 'Slim breast-pocket card case only',
        recommendation: 'Offered based on your carry preference without gender assumptions.',
      },
    ],
  },
  {
    id: 'dinner-business-casual',
    occasionTitle: 'Executive or Client Dinner · Business Casual',
    venueAndDressCode: 'Downtown bistro · Smart Business Casual',
    weatherAndSetting: 'Mild evening · indoor table reservation',
    closetItems: [
      {
        id: 'bc-1',
        name: 'Unstructured navy hopsack blazer',
        sourceModality: 'Text entry',
        transcriptOrNote: 'Typed closet entry: "Navy hopsack blazer, breathable weave"',
      },
      {
        id: 'bc-2',
        name: 'Fine-gauge stone knit polo or silk-blend blouse',
        sourceModality: 'Dictated transcript',
        transcriptOrNote: 'Voice transcript sample: "Stone merino collared knit or ivory crepe blouse"',
      },
      {
        id: 'bc-3',
        name: 'Espresso leather penny loafers / ankle boots',
        sourceModality: 'Garment-only photo sample',
        transcriptOrNote: 'Fictional garment-only shoe shelf photo sample',
      },
    ],
    primaryOutfit: {
      title: 'Primary Look: Navy Hopsack Blazer + Stone Fine-Knit + Charcoal Tailored Trouser',
      pieces: [
        'Unstructured navy hopsack blazer',
        'Stone fine-gauge knit or blouse',
        'Charcoal wool-blend tailored trouser & espresso leather loafers',
      ],
      rationale:
        'Projects calm authority without stiff boardroom formality, ideal for a 2-hour dinner conversation.',
    },
    alternateOutfit: {
      title: 'Alternate Look: Camel Cardigan Jacket + Crisp Poplin Shirt + Dark Olive Trouser',
      pieces: [
        'Structured camel knit jacket',
        'Light blue or white poplin button-down',
        'Dark olive tapered trouser',
      ],
      rationale: 'Warmer tonal palette suited for relaxed creative or hospitality venues.',
    },
    accessoryComparisons: [
      {
        category: 'Footwear',
        optionA: 'Espresso leather loafers',
        optionB: 'Chelsea dress boots',
        recommendation: 'Espresso loafers contrast nicely with navy and charcoal.',
      },
      {
        category: 'Socks / Hosiery',
        optionA: 'Mid-calf navy merino dress socks',
        optionB: 'Fine sheer or tonal trouser socks',
        recommendation: 'Match sock tone to the trouser leg for a continuous visual line.',
      },
      {
        category: 'Watch',
        optionA: 'Silver dial dress-casual watch on brown leather',
        optionB: 'Minimalist steel mesh bracelet watch',
        recommendation: 'Brown leather strap coordinates with espresso footwear and belt.',
      },
      {
        category: 'Belt',
        optionA: 'Espresso calfskin dress belt with brushed buckle',
        optionB: 'Braided dark brown leather belt',
        recommendation: 'Smooth espresso calfskin keeps the waistline tailored.',
      },
      {
        category: 'Bag / Carry',
        optionA: 'Structured leather folio or compact crossbody handbag',
        optionB: 'Minimal coat-pocket carry',
        recommendation: 'Choose the structured leather carry if bringing table documents or evening essentials.',
      },
    ],
  },
  {
    id: 'gym-session',
    occasionTitle: 'Home or Studio Training · Functional Gym Wear',
    venueAndDressCode: 'Home mat or neighborhood studio · Breathable Mobility Kit',
    weatherAndSetting: '68°F indoor training · dumbbells & floor work',
    closetItems: [
      {
        id: 'gw-1',
        name: 'Moisture-wicking sage training tee',
        sourceModality: 'Text entry',
        transcriptOrNote: 'Typed closet entry: "Flat-seam breathable training shirt"',
      },
      {
        id: 'gw-2',
        name: 'Four-way stretch 7-inch training shorts or high-recovery leggings',
        sourceModality: 'Garment-only photo sample',
        transcriptOrNote: 'Fictional garment-only activewear sample',
      },
    ],
    primaryOutfit: {
      title: 'Primary Look: Flat-Seam Training Top + Stretch Bottoms + Flat-Sole Trainers',
      pieces: [
        'Breathable sage technical tee',
        'Four-way stretch shorts or leggings',
        'Flat-sole cross-training shoes with cushioned crew socks',
      ],
      rationale:
        'Flat-sole trainers provide a stable base for dumbbell curls, kettlebell hinges, and squats without heel compression.',
    },
    alternateOutfit: {
      title: 'Alternate Look: Lightweight Quarter-Zip Warmup Layer + Jogger',
      pieces: [
        'Breathable quarter-zip over sleeveless base layer',
        'Tapered stretch woven jogger',
        'Barefoot/mat grip socks for home floor work',
      ],
      rationale: 'Great for cooler morning warmup blocks where you peel off a layer after the first 3 minutes.',
    },
    accessoryComparisons: [
      {
        category: 'Footwear',
        optionA: 'Flat-sole cross-trainers (4mm drop)',
        optionB: 'Max-cushion road running shoes',
        recommendation: 'Flat-sole trainers keep ankles stable during strength and balance intervals.',
      },
      {
        category: 'Socks / Hosiery',
        optionA: 'Cushioned arch-support athletic crew socks',
        optionB: 'Non-slip silicone grip studio socks',
        recommendation: 'Grip socks work well for home mat sessions; cushioned crew socks pair with trainers.',
      },
      {
        category: 'Watch',
        optionA: 'Lightweight interval timer / sport band',
        optionB: 'Phone timer on bench (wrist free for kettlebells)',
        recommendation: 'Take off wrist watches during kettlebell work to protect the watch crystal.',
      },
      {
        category: 'Belt',
        optionA: 'Drawcord waist (no belt needed)',
        optionB: 'Soft velcro nylon support belt (heavy lifts only)',
        recommendation: 'Unrestricted drawcord waist is ideal for low-intensity 15–60 minute mobility & strength.',
      },
    ],
  },
]

export interface LocalVenueSample {
  id: string
  name: string
  neighborhoodZip: string
  supportedModes: ('dine-in' | 'takeaway' | 'delivery')[]
  noiseLevel: 'Quiet conversation' | 'Moderate bistro'
  priceBand: 'Under $30/person' | '$30–$50/person'
  vegetarianOptions: string[]
  balancedOptions: string[]
  nutritionFitExplanation: string
  hoursAndSource: string
  lastChecked: string
  officialMenuNote: string
}

export const localVenueSamples: LocalVenueSample[] = [
  {
    id: 'venue-trattoria-verde',
    name: 'Trattoria Verde · Hearth & Garden Kitchen',
    neighborhoodZip: '60614 · Lincoln Park (Fictional Sample Listing)',
    supportedModes: ['dine-in', 'takeaway'],
    noiseLevel: 'Quiet conversation',
    priceBand: 'Under $30/person',
    vegetarianOptions: [
      'Charred Broccolini & White Bean Farro Risotto (tomato-free option)',
      'Herb-Roasted Zucchini & Chickpea Tagliatelle',
    ],
    balancedOptions: [
      'Wood-Grilled Lemon Chicken Piccata with Wilted Spinach',
      'Seared Branzino with Fennel & Olive Oil Citrus Salad',
    ],
    nutritionFitExplanation:
      'Aligns with both Balanced and Vegetarian preferences and offers explicit tomato-free citrus/herb sauces matching your Nutrition exclusion list.',
    hoursAndSource: 'Sat 5:00 PM – 10:00 PM · Source: Mocked Preview Adapter (Future: Google Places / Yelp backend adapter)',
    lastChecked: 'Sample snapshot · Nov 11, 2026 at 4:00 PM CST',
    officialMenuNote: 'Official venue menu link placeholder (no external network call in preview)',
  },
  {
    id: 'venue-cedar-lantern',
    name: 'Cedar & Lantern · Levantine Mezze Table',
    neighborhoodZip: '60614 · Lincoln Park / 78701 · Austin (Fictional Sample)',
    supportedModes: ['dine-in', 'takeaway', 'delivery'],
    noiseLevel: 'Quiet conversation',
    priceBand: 'Under $30/person',
    vegetarianOptions: [
      'Warm Mujadara Lentil & Jasmine Rice Bowl with Crispy Onions',
      'Lemon-Garlic Roasted Cauliflower & Tahini Platter',
    ],
    balancedOptions: [
      'Sumac Chicken Skewers over Herbed Rice & Greens',
      'Pomegranate Glazed Salmon with Quinoa Tabbouleh',
    ],
    nutritionFitExplanation:
      'High-legume and whole-grain menu that mirrors your pantry staples (rice, chickpeas, lemon, olive oil) and packs cleanly for takeaway or delivery.',
    hoursAndSource: 'Sat 4:30 PM – 9:30 PM · Source: Mocked Preview Adapter (Future: Google Places / Yelp backend adapter)',
    lastChecked: 'Sample snapshot · Nov 11, 2026 at 4:00 PM CST',
    officialMenuNote: 'Official ordering/menu link placeholder (offline preview)',
  },
  {
    id: 'venue-botanica-table',
    name: 'Botanica Slow Kitchen',
    neighborhoodZip: '78701 · Downtown / Neighborhood Sample',
    supportedModes: ['dine-in', 'delivery'],
    noiseLevel: 'Moderate bistro',
    priceBand: '$30–$50/person',
    vegetarianOptions: [
      'Saffron Quinoa & Roasted Root Vegetable Tajine',
      'Crispy Tofu & Baby Kale Sesame Noodle Bowl',
    ],
    balancedOptions: [
      'Herb-Crusted Roast Poultry with Wild Rice Pilaf',
    ],
    nutritionFitExplanation:
      'Features dedicated plant-forward entrées and clear ingredient breakdowns suitable for shared date nights.',
    hoursAndSource: 'Sat 5:30 PM – 10:30 PM · Source: Mocked Preview Adapter (Future: Google Places / Yelp backend adapter)',
    lastChecked: 'Sample snapshot · Nov 11, 2026 at 4:00 PM CST',
    officialMenuNote: 'Official venue menu link placeholder (offline preview)',
  },
]

export const faqCatalog = [
  {
    id: 'faq-trial',
    question: 'How does the 48-hour guest period work?',
    answer:
      'Guests can try standard guidance across Fitness and Nutrition for up to 48 hours using our curated deterministic plan library. When the 48-hour window nears expiry or ends, You&Me prompts you to register an email and select a plan tier. In this review prototype, the trial clock lives in browser memory and can be simulated with the top review controls; in the approved hosted pilot, start time is server-controlled so refreshing does not restart the clock.',
  },
  {
    id: 'faq-memory',
    question: 'How does personalization use my inputs and memories?',
    answer:
      'Responses are tailored to the information you enter and the memories you allow You&Me to use—such as your available home equipment, pantry staples, kitchen appliances, and dietary exclusions. You can inspect, edit, opt out of, or delete any saved memory at any time in Profile & Settings.',
  },
  {
    id: 'faq-age',
    question: 'What are the age and sign-in requirements?',
    answer:
      'You&Me is designed for people aged 16 and up. Sign-in uses an inbox verification code/link plus a confirmed display name and a separate age-band screen (an email code verifies inbox control, not legal name or age). Initial 45-day private pilot recruitment is 18+ while teen safety, age assurance, and AI provider terms for 16–17-year-olds complete review.',
  },
  {
    id: 'faq-pricing',
    question: 'How do pricing, bundles, and AI tiers work?',
    answer:
      'Members choose both their journey bundle (Fitness, Nutrition, Fashion [upcoming], Fitness + Nutrition, Nutrition + Fashion, or all three) and their AI capability/recall tier (Basic with 1-month recall, Plus with 2-month recall and side-by-side plan comparison, or Pro with up to 3-month proposed max AI recall). All prices in this prototype are configurable proposals marked "Pricing to be confirmed · Simulation · no charge."',
  },
  {
    id: 'faq-stars',
    question: 'How are Weekly, Monthly, and Quarterly Habit Stars calculated?',
    answer:
      'Habit Stars are private by default and use a proposed 70/20/10 weighting: 70% weight on completing chosen Fitness and Nutrition actions, 20% on weekly consistency, and a capped 10% share on purposeful daily check-ins. Each action or day counts once. When activity is too low, You&Me honestly displays "Not enough activity yet." Body weight, complaints, billing status, and AI spend never affect your Habit Stars.',
  },
  {
    id: 'faq-unlink',
    question: 'How does pairing and unlinking work in Friends & Challenges?',
    answer:
      'Pairing requires knowing a person’s participant ID and their explicit acceptance. Either person can unlink immediately and unilaterally at any time. Accounts are limited to 50 active pairs. Optional relationship labels (such as spouse, sibling, friend, or parent) are private organizational tags and grant zero additional data access or parental authority.',
  },
  {
    id: 'faq-abuse',
    question: 'How do I report abuse or leave a challenge?',
    answer:
      'Every pairing and challenge includes a one-tap Leave Challenge action, immediate Block, and a Report Misconduct flow. Harassment, threats, or repeated abuse go to a documented human review queue with warning, suspension, or termination and appeal paths. Frustrated product feedback is handled separately in the support queue and never penalized.',
  },
  {
    id: 'faq-images',
    question: 'How are photos and Instagram shares handled for privacy?',
    answer:
      'During the pilot, You&Me uses preset avatars and curated garment-only samples. For Instagram share previews, You&Me strips location/EXIF metadata, excludes private weight, progress, and partner details by default, and requires your explicit approval of both the card and destination. Direct API publishing is never simulated as completed.',
  },
  {
    id: 'faq-deletion',
    question: 'What happens when I clear my session, downgrade, or delete my account?',
    answer:
      'In this preview, "Restart walkthrough" resets guided fixture state, while "Clear this preview session" erases all in-memory plans, progress, and settings (reloading the page also clears memory). In the hosted architecture under S-01 review, downgrading reduces the active AI recall window (3mo → 2mo → 1mo) without deleting your saved plans, and account deletion removes session-owned database records.',
  },
]

export const pilotCheckpointsCatalog = [
  {
    checkpoint: 'Nov 17 · Day 7',
    requiredResult:
      'Document account/storage (S-01) and provider decisions, teen safety/eligibility boundary, delivery and support ownership, and 18+ initial recruitment plan.',
    currentEvidenceStatus:
      'Preview specification & S-01/provider decision gates documented in repo; live provider & production storage remain gated pending sign-off.',
  },
  {
    checkpoint: 'Dec 1 · Day 21',
    requiredResult:
      'Test invite sign-in, both Fitness and Nutrition journeys, save and undo, feedback triage, and live-provider validation in a test environment.',
    currentEvidenceStatus:
      'Sample Fitness & Nutrition journeys, idempotent complete/undo, and simulated sign-in/feedback prototype verified in memory; live provider & S-01 persistence untested.',
  },
  {
    checkpoint: 'Dec 10 · Day 30',
    requiredResult:
      'Run staff checks on physical Apple/Android phones and tablets and verify two-account isolation, deletion, AI failure, usage controls, and support readiness before external onboarding.',
    currentEvidenceStatus:
      'Responsive phone (390×844) and tablet (1024×768) browser viewports inspected; physical device certification and two-account DB isolation pending.',
  },
  {
    checkpoint: 'Dec 17 · Day 37',
    requiredResult: 'Verify at least 15 unique activated pilot users as a pacing target.',
    currentEvidenceStatus: 'Pilot cohort recruitment scheduled post Day-30 go/no-go gate (0 live pilot users claimed in preview).',
  },
  {
    checkpoint: 'Dec 25 · Day 45',
    requiredResult:
      'Verify a minimum of 25 unique activated pilot users (invited non-staff users who verify sign-in and complete ≥1 Fitness or Nutrition action).',
    currentEvidenceStatus: 'Target milestone · 45 calendar days ending Dec 25, 2026 11:59 PM Central.',
  },
]
