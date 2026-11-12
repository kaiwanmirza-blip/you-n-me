import { describe, expect, it } from 'vitest'
import { entitlementSchema, fitnessPlanSchema, nutritionPlanSchema, planRequestSchema, profileSchema, progressEventSchema, provenanceSchema, reopenSavedPlan, savedPlanSchema } from './contracts'
import { fitnessInput, fitnessPlan, ingredient, liveProvenance, nutritionInput, nutritionPlan, nutritionProfile, profile, progress, provenance, saved } from '../tests/fixtures'

describe('profiles and request eligibility', () => {
  it('accepts both journeys and leaves optional intensity unspecified', () => {
    expect(profileSchema.parse(profile).inputs).not.toHaveProperty('intensity')
    expect(profileSchema.safeParse(nutritionProfile).success).toBe(true)
  })
  it.each([14, 61, 20.5, '20'])('rejects invalid Fitness duration %s', durationMinutes => {
    expect(profileSchema.safeParse({ ...profile, inputs: { ...fitnessInput, durationMinutes } }).success).toBe(false)
  })
  it('rejects missing fields, unknown personal fields and wrong guide identity', () => {
    expect(profileSchema.safeParse({ ...profile, guide: 'Sample A' }).success).toBe(false)
    expect(profileSchema.safeParse({ ...profile, email: 'not-collected@example.invalid' }).success).toBe(false)
    expect(profileSchema.safeParse({ ...profile, inputs: {} }).success).toBe(false)
    expect(profileSchema.safeParse({ ...profile, dataOrigin: 'personal' }).success).toBe(false)
  })
  it.each(['under-18', 'unknown'])('blocks personal live for %s', adultEligibility => {
    expect(planRequestSchema.safeParse({ mode: 'live', profile: { ...profile, dataOrigin: 'personal', sampleId: undefined, adultEligibility } }).success).toBe(false)
  })
  it('accepts adult personal live but rejects personal guided and unknown live allergies', () => {
    const personal = { ...profile, dataOrigin: 'personal', sampleId: undefined }
    expect(planRequestSchema.safeParse({ mode: 'live', profile: personal }).success).toBe(true)
    expect(planRequestSchema.safeParse({ mode: 'guided', profile: personal }).success).toBe(false)
    expect(planRequestSchema.safeParse({ mode: 'live', profile: { ...nutritionProfile, inputs: { ...nutritionInput, allergyAcknowledgement: 'unknown' } } }).success).toBe(false)
    expect(profileSchema.safeParse({ ...nutritionProfile, inputs: { ...nutritionInput, allergyAcknowledgement: 'listed' } }).success).toBe(false)
  })
})

describe('plan contracts', () => {
  it('validates complete Fitness and Nutrition structures', () => {
    expect(fitnessPlanSchema.safeParse(fitnessPlan).success).toBe(true)
    expect(nutritionPlanSchema.safeParse(nutritionPlan).success).toBe(true)
  })
  it('rejects incorrect totals, over-budget blocks, duplicate actions and missing cooldown', () => {
    expect(fitnessPlanSchema.safeParse({ ...fitnessPlan, estimatedTotalSeconds: 451 }).success).toBe(false)
    const actions = fitnessPlan.actions.map(a => ({ ...a, workSeconds: 1000 }))
    expect(fitnessPlanSchema.safeParse({ ...fitnessPlan, actions, estimatedTotalSeconds: 3090 }).success).toBe(false)
    expect(fitnessPlanSchema.safeParse({ ...fitnessPlan, actions: fitnessPlan.actions.map(a => ({ ...a, id: 'same' })) }).success).toBe(false)
    expect(fitnessPlanSchema.safeParse({ ...fitnessPlan, actions: fitnessPlan.actions.map(a => ({ ...a, kind: 'exercise' })) }).success).toBe(false)
  })
  it('rejects unavailable equipment and excluded movement IDs', () => {
    expect(fitnessPlanSchema.safeParse({ ...fitnessPlan, input: { ...fitnessInput, excludedMovements: ['movement-1'] } }).success).toBe(false)
    expect(fitnessPlanSchema.safeParse({ ...fitnessPlan, actions: fitnessPlan.actions.map(a => ({ ...a, equipment: ['dumbbells'] })) }).success).toBe(false)
  })
  it('checks scaled servings and consolidated ingredients', () => {
    const scaled = { ...nutritionPlan, input: { ...nutritionInput, servings: 2 }, meals: nutritionPlan.meals.map(m => ({ ...m, servings: 2, ingredients: [{ ...ingredient, amount: 200 }] })), shoppingList: [{ ...ingredient, amount: 200 }] }
    expect(nutritionPlanSchema.safeParse(scaled).success).toBe(true)
    expect(nutritionPlanSchema.safeParse({ ...scaled, shoppingList: [ingredient] }).success).toBe(false)
    expect(nutritionPlanSchema.safeParse({ ...nutritionPlan, shoppingList: [] }).success).toBe(false)
    expect(nutritionPlanSchema.safeParse({ ...nutritionPlan, shoppingList: [ingredient, ingredient] }).success).toBe(false)
  })
  it('rejects exclusions, excessive prep time and mismatched servings', () => {
    expect(nutritionPlanSchema.safeParse({ ...nutritionPlan, input: { ...nutritionInput, excludedIngredients: ['rice'] } }).success).toBe(false)
    expect(nutritionPlanSchema.safeParse({ ...nutritionPlan, input: { ...nutritionInput, preparationMinutes: 5 } }).success).toBe(false)
    expect(nutritionPlanSchema.safeParse({ ...nutritionPlan, input: { ...nutritionInput, servings: 2 } }).success).toBe(false)
  })
})

describe('provenance, saved envelopes, events and simulated entitlements', () => {
  it.each(['guided', 'demo'])('keeps %s samples distinct from providers', mode => {
    expect(provenanceSchema.safeParse({ ...provenance, mode }).success).toBe(true)
    expect(provenanceSchema.safeParse({ ...provenance, mode: 'live' }).success).toBe(false)
    expect(provenanceSchema.safeParse({ ...liveProvenance, mode }).success).toBe(false)
  })
  it('accepts live metadata without credentials; rejects missing/negative latency', () => {
    expect(provenanceSchema.safeParse(liveProvenance).success).toBe(true)
    expect(provenanceSchema.safeParse({ ...liveProvenance, latencyMs: -1 }).success).toBe(false)
    expect(provenanceSchema.safeParse({ ...liveProvenance, apiKey: 'not-allowed' }).success).toBe(false)
  })
  it('reopens a sample snapshot independently from a live screen; does not mutate the original', () => {
    const screenMode = 'live'
    const reopened = reopenSavedPlan(JSON.parse(JSON.stringify(saved)))
    expect(reopened.provenance).toEqual(provenance)
    expect(reopened.provenance.mode).not.toBe(screenMode)
    expect(Reflect.set(reopened.provenance, 'mode', 'guided')).toBe(false)
    expect(reopened.provenance.mode).toBe('demo')
    expect(saved.provenance.mode).toBe('demo')
    expect(savedPlanSchema.safeParse({ ...saved, profileSnapshot: { ...profile, inputs: { ...fitnessInput, durationMinutes: 30 } } }).success).toBe(false)
    expect(savedPlanSchema.safeParse({ ...saved, activeMode: 'live' }).success).toBe(false)
  })
  it('validates complete and undo events without claiming to apply them', () => {
    expect(progressEventSchema.safeParse(progress).success).toBe(true)
    expect(progressEventSchema.safeParse({ ...progress, operation: 'undo' }).success).toBe(true)
    expect(progressEventSchema.safeParse({ ...progress, operation: 'pay' }).success).toBe(false)
    expect(progressEventSchema.safeParse({ ...progress, planVersion: 0 }).success).toBe(false)
  })
  it('represents reversible simulated tiers and rejects real or inconsistent entitlements', () => {
    const free = { simulated: true, tier: 'Free', comparisonEnabled: false }
    const plus = { simulated: true, tier: 'Plus', comparisonEnabled: true }
    expect([free, plus, free].every(e => entitlementSchema.safeParse(e).success)).toBe(true)
    expect(entitlementSchema.safeParse({ ...plus, simulated: false }).success).toBe(false)
    expect(entitlementSchema.safeParse({ ...free, comparisonEnabled: true }).success).toBe(false)
  })
})
