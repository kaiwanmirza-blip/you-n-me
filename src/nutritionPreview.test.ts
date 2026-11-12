import { describe, expect, it } from 'vitest'
import { nutritionPlanSchema } from '../shared/contracts'
import {
  defaultKitchenDevices,
  defaultNutritionInputs,
  defaultPantryInventory,
  formatQuantity,
  makeNutritionSamplePlan,
  setMealCompletion,
} from './nutritionPreview'
import { calculateHabitStars, resolveActiveWardrobe } from './experienceData'

describe('Nutrition sample planner and contract compliance', () => {
  it('generates a contract-valid 1-day meal plan with consolidated shopping list and pantry vs shortage breakdown', () => {
    const result = makeNutritionSamplePlan({
      mode: 'guided',
      guide: 'Jane',
      goal: 'Cook balanced meals from my kitchen in 30 minutes',
      units: 'us-customary',
      input: { ...defaultNutritionInputs },
    })
    expect(nutritionPlanSchema.safeParse(result.plan).success).toBe(true)
    expect(result.plan.meals).toHaveLength(3)
    expect(result.shoppingBreakdown.length).toBeGreaterThan(0)
    expect(result.isGenericAllergyPreview).toBe(false)
  })

  it('scales recipe quantities and shopping list accurately when changing 1 serving to 2 with Vegetarian and no tomatoes', () => {
    const single = makeNutritionSamplePlan({
      mode: 'demo',
      guide: 'Kay',
      goal: 'Vegetarian day',
      units: 'metric',
      input: {
        ...defaultNutritionInputs,
        dietaryPattern: 'Vegetarian',
        servings: 1,
        allergyAcknowledgement: 'none',
        excludedIngredients: [],
      },
    })
    const doubled = makeNutritionSamplePlan({
      mode: 'demo',
      guide: 'Kay',
      goal: 'Vegetarian day for two without tomatoes',
      units: 'metric',
      input: {
        ...defaultNutritionInputs,
        dietaryPattern: 'Vegetarian',
        servings: 2,
        allergyAcknowledgement: 'listed',
        excludedIngredients: ['tomatoes'],
      },
    })
    expect(nutritionPlanSchema.safeParse(doubled.plan).success).toBe(true)
    expect(doubled.plan.meals[0].servings).toBe(2)
    expect(doubled.plan.meals[0].ingredients[0].amount).toBe(single.plan.meals[0].ingredients[0].amount * 2)
    for (const meal of doubled.plan.meals) {
      for (const ing of meal.ingredients) {
        expect(ing.name.toLowerCase()).not.toContain('tomato')
        expect(ing.ingredientId.toLowerCase()).not.toContain('tomato')
      }
    }
  })

  it('applies interactive ingredient substitutions and re-validates both recipe and consolidated shopping list', () => {
    const base = makeNutritionSamplePlan({
      mode: 'guided',
      guide: 'Jane',
      goal: 'Home dinner with substitution',
      units: 'us-customary',
      input: { ...defaultNutritionInputs, meals: 3, servings: 2 },
    })
    const dinnerMeal = base.plan.meals.find(m => m.id === 'meal-dinner-chicken-rice')
    expect(dinnerMeal).toBeDefined()

    const withSub = makeNutritionSamplePlan({
      mode: 'guided',
      guide: 'Jane',
      goal: 'Home dinner with substitution',
      units: 'us-customary',
      input: { ...defaultNutritionInputs, meals: 3, servings: 2 },
      appliedSubstitutions: { 'meal-dinner-chicken-rice': 'sub-spinach-kale' },
    })
    expect(nutritionPlanSchema.safeParse(withSub.plan).success).toBe(true)
    const updatedDinner = withSub.plan.meals.find(m => m.id === 'meal-dinner-chicken-rice')!
    expect(updatedDinner.ingredients.some(i => i.ingredientId === 'baby-kale')).toBe(true)
    expect(updatedDinner.ingredients.some(i => i.ingredientId === 'spinach')).toBe(false)
    expect(withSub.plan.shoppingList.some(i => i.ingredientId === 'baby-kale')).toBe(true)
  })

  it('produces a generic labelled preview for unknown/prefer-not-to-say allergies and rejects clinical or impossible budgets', () => {
    const generic = makeNutritionSamplePlan({
      mode: 'guided',
      guide: 'Jane',
      goal: 'Explore sample meals',
      units: 'us-customary',
      input: {
        ...defaultNutritionInputs,
        allergyAcknowledgement: 'unknown',
        excludedIngredients: [],
      },
    })
    expect(generic.isGenericAllergyPreview).toBe(true)
    expect(generic.plan.explanation).toContain('GENERIC PREVIEW ONLY')
    expect(generic.provenance.mode).toBe('guided')

    expect(() =>
      makeNutritionSamplePlan({
        mode: 'guided',
        guide: 'Jane',
        goal: 'Prescribe a renal dialysis diet',
        units: 'us-customary',
        input: defaultNutritionInputs,
      })
    ).toThrow('everyday Balanced and Vegetarian')

    expect(() =>
      makeNutritionSamplePlan({
        mode: 'guided',
        guide: 'Jane',
        goal: 'Holiday turkey feast',
        units: 'us-customary',
        input: {
          ...defaultNutritionInputs,
          preparationMinutes: 180,
          budgetBand: 'Tight (under $5/day)',
        },
        devices: defaultKitchenDevices,
        pantryInventory: defaultPantryInventory,
      })
    ).toThrow('Selected budget')
  })

  it('supports 180-minute turkey scenario with separate prep/cook/rest breakdown and idempotent meal completion', () => {
    const turkeyPlan = makeNutritionSamplePlan({
      mode: 'demo',
      guide: 'Jane',
      goal: 'Prepare a 3-hour turkey centerpiece meal',
      units: 'us-customary',
      input: {
        ...defaultNutritionInputs,
        meals: 1,
        servings: 4,
        preparationMinutes: 180,
      },
    })
    expect(turkeyPlan.plan.meals[0].id).toBe('meal-feast-turkey-180')
    const meta = turkeyPlan.mealMeta['meal-feast-turkey-180']
    expect(meta.prepMinutes + meta.activeCookMinutes + meta.restMinutes).toBe(180)
    expect(meta.safeTempDeferralNote).toContain('official food-safety')

    const c1 = setMealCompletion([], 'meal-feast-turkey-180', true, turkeyPlan.plan)
    expect(setMealCompletion(c1, 'meal-feast-turkey-180', true, turkeyPlan.plan)).toEqual(['meal-feast-turkey-180'])
    expect(setMealCompletion(c1, 'meal-feast-turkey-180', false, turkeyPlan.plan)).toEqual([])
    expect(formatQuantity(100, 'g', 'metric')).toBe('100 g')
    expect(formatQuantity(100, 'g', 'us-customary')).toContain('oz')
  })

  it('computes 70/20/10 habit stars and shows Not enough activity yet when empty', () => {
    const emptyStars = calculateHabitStars({
      completedFitnessActionIds: [],
      totalFitnessActionsInPlan: 3,
      completedNutritionMealIds: [],
      totalNutritionMealsInPlan: 3,
      activeDaysThisWeek: 0,
      checkInDaysThisWeek: 0,
      useDemoHistoryWindow: false,
    })
    expect(emptyStars[0].notEnoughActivity).toBe(true)
    expect(emptyStars[0].whatMovedRating).toContain('Not enough activity yet')

    const activeStars = calculateHabitStars({
      completedFitnessActionIds: ['warm-up', 'main'],
      totalFitnessActionsInPlan: 3,
      completedNutritionMealIds: ['meal-breakfast-oats'],
      totalNutritionMealsInPlan: 3,
      activeDaysThisWeek: 3,
      checkInDaysThisWeek: 4,
      useDemoHistoryWindow: true,
    })
    expect(activeStars[0].notEnoughActivity).toBe(false)
    expect(activeStars[0].actionCompletionShare).toBeLessThanOrEqual(70)
    expect(activeStars[0].consistencyShare).toBeLessThanOrEqual(20)
    expect(activeStars[0].checkInShare).toBeLessThanOrEqual(10)
    expect(resolveActiveWardrobe('Fitness', 'fashion', 'overview')).toBe('gym-partner')
    expect(resolveActiveWardrobe('Nutrition', 'fashion', 'cooking')).toBe('chef')
    expect(resolveActiveWardrobe('Explore', 'fashion', 'overview')).toBe('stylist')
  })
})
