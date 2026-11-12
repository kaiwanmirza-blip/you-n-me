import { describe, expect, it } from 'vitest'
import { entitlementSchema, fitnessPlanSchema, nutritionPlanSchema, planRequestSchema, profileSchema, progressEventSchema, provenanceSchema, reopenSavedPlan, savedPlanSchema } from './contracts'
import { fitnessInput, fitnessPlan, ingredient, liveProvenance, nutritionInput, nutritionPlan, nutritionProfile, profile, progress, provenance, saved } from '../tests/fixtures'
import { guideSelectionSchema, memoryChipsSchema, conversationTurnSchema, makeConversationTurn, muscleGroupSchema, bodyMeasurementEntrySchema, recompAssessmentRequestSchema, recompAssessmentSchema, assessRecomposition, fashionPlanSchema } from './contracts'
import { globalHeritageSchema, personaWardrobeSelectionSchema, personaTokenEvalRequestSchema, personaTokenStateSchema, evaluatePersonaTokenState } from './contracts'

describe('v0.8 persona studio and preview token economy', () => {
  const input = { action: 'evaluate', firstSetClaimed: false, studioTokens: 0, dailyAdsWatched: 0, weeklyAdsWatched: 0 }
  it.each(['south_asian', 'latin_american', 'african', 'mediterranean', 'east_asian', 'southeast_asian', 'swana', 'pacific_islander', 'indigenous', 'central_asian'])('accepts heritage %s', heritage => {
    expect(globalHeritageSchema.parse(heritage)).toBe(heritage)
  })
  it('validates strict wardrobe selections without widening legacy guide/profile contracts', () => {
    const wardrobe = { topCategory: 'blazer', topItem: 'Linen blazer', bottomCategory: 'tailored_trousers', bottomItem: 'Navy trousers', eyewear: 'None', socks: 'Cotton', shoes: 'Loafers', shotType: 'full' }
    expect(personaWardrobeSelectionSchema.safeParse(wardrobe).success).toBe(true)
    expect(personaWardrobeSelectionSchema.safeParse({ ...wardrobe, topCategory: 'unknown' }).success).toBe(false)
    expect(personaWardrobeSelectionSchema.safeParse({ ...wardrobe, topItem: ' ' }).success).toBe(false)
    expect(personaWardrobeSelectionSchema.safeParse({ ...wardrobe, extra: true }).success).toBe(false)
    expect(globalHeritageSchema.safeParse('unknown').success).toBe(false)
  })
  it('claims the initial set for free once without consuming an existing token', () => {
    const result = evaluatePersonaTokenState({ ...input, action: 'claim-initial-set', studioTokens: 2 })
    expect(result).toMatchObject({ allowed: true, tokenCost: 0, studioTokens: 2, firstSetClaimed: true })
    expect(evaluatePersonaTokenState({ ...input, action: 'claim-initial-set', firstSetClaimed: true })).toMatchObject({ allowed: false, tokenCost: 0, reason: 'initial-set-already-claimed' })
  })
  it.each(['restyle', 'animate'])('%s spends one token or refuses without a negative balance', action => {
    expect(evaluatePersonaTokenState({ ...input, action, firstSetClaimed: true, studioTokens: 2 })).toMatchObject({ allowed: true, studioTokens: 1, tokenCost: 1 })
    expect(evaluatePersonaTokenState({ ...input, action, firstSetClaimed: true })).toMatchObject({ allowed: false, studioTokens: 0, tokenCost: 0, reason: 'insufficient-tokens' })
  })
  it.each([-1, 11, 1.5, '10'])('rejects daily watches %s', dailyAdsWatched => {
    expect(personaTokenEvalRequestSchema.safeParse({ ...input, dailyAdsWatched }).success).toBe(false)
  })
  it.each([[59, 0, 59], [60, 1, 0], [61, 1, 1], [120, 2, 0], [125, 2, 5]])('redeems %s cumulative watches for %s tokens and remainder %s', (weeklyAdsWatched, tokensMinted, remainder) => {
    const result = evaluatePersonaTokenState({ ...input, dailyAdsWatched: 10, weeklyAdsWatched })
    expect(result).toMatchObject({ tokensMinted, remainingWeeklyAds: remainder, studioTokens: tokensMinted })
    expect(personaTokenStateSchema.safeParse(result).success).toBe(true)
    const next = evaluatePersonaTokenState({ ...input, studioTokens: result.studioTokens, weeklyAdsWatched: result.remainingWeeklyAds })
    expect(next.tokensMinted).toBe(0)
    expect(next.studioTokens).toBe(tokensMinted)
  })
  it('can spend a newly minted token and never mutates input or pretends to persist', () => {
    const request = Object.freeze({ ...input, action: 'animate', weeklyAdsWatched: 60, mode: 'guided' })
    const result = evaluatePersonaTokenState(request)
    expect(result).toMatchObject({ allowed: true, tokensMinted: 1, tokenCost: 1, studioTokens: 0 })
    expect(result.provenance).toEqual({ mode: 'guided', source: 'sample', engine: 'local-deterministic-v1', persisted: false })
    expect(request.weeklyAdsWatched).toBe(60)
    expect(evaluatePersonaTokenState(request)).toEqual(result)
  })
  it('rejects invalid balances, unsafe sums, unknown actions and live mode', () => {
    for (const patch of [{ studioTokens: -1 }, { studioTokens: 0.5 }, { weeklyAdsWatched: -1 }, { weeklyAdsWatched: 0.5 }, { studioTokens: Number.MAX_SAFE_INTEGER, weeklyAdsWatched: 60 }, { action: 'buy' }, { mode: 'live' }]) {
      expect(personaTokenEvalRequestSchema.safeParse({ ...input, ...patch }).success).toBe(false)
    }
  })
})

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

describe('additive conversational intake contracts', () => {
  const message = 'motivation: Build consistency; equipment: dumbbells, bench; exclusions: none; I have 30 minutes'
  it.each(['Jane', 'Kay', 'Both'] as const)('returns distinct selected guides for %s with honest provenance', guideSelection => {
    expect(guideSelectionSchema.parse(guideSelection)).toBe(guideSelection)
    const turn = makeConversationTurn({ guideSelection, userMessage: message, mode: 'guided' })
    expect(conversationTurnSchema.safeParse(turn).success).toBe(true)
    expect(turn.guideResponses.map(r => r.guide)).toEqual(guideSelection === 'Both' ? ['Jane', 'Kay'] : [guideSelection])
    expect(turn.readiness).toEqual({ readyToBuildProgram: true, missingDataPoints: [] })
    expect(turn.memoryChips).toEqual({ motivation: 'Build consistency', equipment: ['dumbbells', 'bench'], exclusions: [], durationMinutes: 30 })
    expect(turn.provenance).toEqual({ mode: 'guided', source: 'sample', engine: 'local-deterministic-v1', persisted: false })
  })
  it('rejects duplicate, missing, wrong-guide and identical dual responses', () => {
    const turn = makeConversationTurn({ guideSelection: 'Both', userMessage: message })
    const jane = turn.guideResponses[0]
    for (const responses of [[jane], [jane, jane], [jane, { guide: 'Kay', message: jane.message }], [...turn.guideResponses, jane]]) {
      expect(conversationTurnSchema.safeParse({ ...turn, guideResponses: responses }).success).toBe(false)
    }
    expect(conversationTurnSchema.safeParse({ ...turn, guideSelection: 'Kay', guideResponses: [jane] }).success).toBe(false)
  })
  it('leaves unknown prose unspecified and rejects false readiness', () => {
    const turn = makeConversationTurn({ guideSelection: 'Jane', userMessage: 'Help me get started' })
    expect(turn.memoryChips).toEqual({})
    expect(turn.readiness.missingDataPoints).toEqual(['motivation', 'durationMinutes', 'equipment', 'exclusions'])
    expect(conversationTurnSchema.safeParse({ ...turn, readiness: { readyToBuildProgram: true, missingDataPoints: [] } }).success).toBe(false)
  })
  it('supports all chips and journey-specific readiness without mutating caller memory', () => {
    const chips = Object.freeze({ motivation: 'Make meals easier', equipment: [], exclusions: [] })
    const turn = makeConversationTurn({ guideSelection: 'Kay', journey: 'nutrition', memoryChips: chips,
      userMessage: 'occasion: dinner; dietaryPattern: Vegetarian; pantryItems: rice, beans; dressCode: casual; scentPreference: unscented; 20 minutes' })
    expect(turn.memoryChips.pantryItems).toEqual(['rice', 'beans'])
    expect(turn.memoryChips.scentPreference).toBe('unscented')
    expect(turn.readiness.readyToBuildProgram).toBe(true)
    expect(chips).not.toHaveProperty('durationMinutes')
    const fashion = makeConversationTurn({ guideSelection: 'Both', journey: 'fashion', userMessage: 'occasion: wedding; dressCode: formal' })
    expect(fashion.readiness.readyToBuildProgram).toBe(true)
  })
  it.each(['0 minutes', '-20 minutes', '181 minutes', '20.5 minutes', '20 minutes or 30 minutes'])('does not retain stale duration for %s', userMessage => {
    const turn = makeConversationTurn({ guideSelection: 'Jane', userMessage, memoryChips: { durationMinutes: 30 } })
    expect(turn.memoryChips).not.toHaveProperty('durationMinutes')
  })
  it('bounds memory chips and rejects unknown properties', () => {
    expect(memoryChipsSchema.safeParse({ durationMinutes: '30' }).success).toBe(false)
    expect(memoryChipsSchema.safeParse({ equipment: Array(41).fill('bench') }).success).toBe(false)
    expect(memoryChipsSchema.safeParse({ apiKey: 'not-permitted' }).success).toBe(false)
  })
})

describe('measurement and recomposition preview contracts', () => {
  const baseline = { dayIndex: 0, recordedAt: '2026-01-01T00:00:00Z', photoCheckInCompleted: true,
    measurements: { waistCm: 90, chestCm: 100, shouldersCm: 110, hipsCm: 100, armCm: 30, thighCm: 55, calfCm: 35, scaleWeightKg: 80 } }
  const latest = { ...baseline, dayIndex: 14, recordedAt: '2026-01-15T00:00:00Z', measurements: { ...baseline.measurements, waistCm: 88 } }
  const request = { baseline, latest, checkInDay: 14, checkInDue: true }
  it('supports the entire muscle map without changing legacy Fitness schema', () => {
    const groups = ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 'core', 'quads', 'hamstrings', 'glutes', 'calves', 'full-body']
    expect(groups.every(g => muscleGroupSchema.safeParse(g).success)).toBe(true)
    expect(muscleGroupSchema.safeParse('unknown-muscle').success).toBe(false)
    expect(fitnessPlanSchema.safeParse({ ...fitnessPlan, muscles: ['chest'] }).success).toBe(false)
    expect(profileSchema.safeParse({ ...profile, guide: 'Both' }).success).toBe(false)
  })
  it('compares Day Zero with latest using a labelled possible pattern, never proven tissue change', () => {
    const result = assessRecomposition(request)
    expect(result.assessment).toBe('possible-recomposition')
    expect(result.waistChangeCm).toBe(-2)
    expect(result.weightChangeKg).toBe(0)
    expect(result.checkInStarImpact).toBe(0)
    expect(result.interpretation).toContain('cannot establish fat loss or lean muscle gain')
    expect(recompAssessmentSchema.safeParse({ ...result, weightChangeKg: 5 }).success).toBe(false)
    expect(recompAssessmentSchema.safeParse({ ...result, checkInStarImpact: -1 }).success).toBe(false)
    expect(recompAssessmentSchema.safeParse({ ...result, provenance: { ...result.provenance, mode: 'guided' } }).success).toBe(false)
  })
  it.each([[-1, 0.5, 'possible-recomposition'], [-1, -0.5, 'possible-recomposition'], [-0.999, 0, 'no-pattern-detected'], [-2, 0.501, 'no-pattern-detected'], [1, 0, 'no-pattern-detected']] as const)('applies illustrative threshold (%s cm, %s kg)', (waistDelta, weightDelta, expected) => {
    const result = assessRecomposition({ ...request, latest: { ...latest, measurements: { ...latest.measurements, waistCm: 90 + waistDelta, scaleWeightKg: 80 + weightDelta } } })
    expect(result.assessment).toBe(expected)
  })
  it('accepts optional weight without inferring tissue changes; photo is only a flag', () => {
    const noWeight = { ...latest, measurements: { ...latest.measurements, scaleWeightKg: undefined } }
    expect(bodyMeasurementEntrySchema.safeParse(noWeight).success).toBe(true)
    const result = assessRecomposition({ ...request, latest: noWeight })
    expect(result.assessment).toBe('insufficient-data')
    expect(result.weightChangeKg).toBeNull()
    expect(result.checkInStarImpact).toBe(0)
    expect(bodyMeasurementEntrySchema.safeParse({ ...latest, photoUrl: 'https://example.invalid/photo' }).success).toBe(false)
  })
  it('penalizes a due missing photo, measurements or stale check-in once; not a baseline or non-due check-in', () => {
    expect(assessRecomposition({ ...request, latest: { ...latest, photoCheckInCompleted: false } }).checkInStarImpact).toBe(-1)
    expect(assessRecomposition({ ...request, latest: undefined }).checkInStarImpact).toBe(-1)
    expect(assessRecomposition({ ...request, checkInDay: 28 }).checkInStarImpact).toBe(-1)
    expect(assessRecomposition({ ...request, latest: undefined, checkInDue: false }).checkInStarImpact).toBe(0)
    expect(assessRecomposition({ ...request, baseline: { ...baseline, photoCheckInCompleted: false } }).checkInStarImpact).toBe(0)
  })
  it('rejects invalid ordering, timestamps, nonpositive/incomplete measurements and non-integer days', () => {
    for (const patch of [{ baseline: { ...baseline, dayIndex: 1 } }, { latest: baseline }, { checkInDay: 7 }, { latest: { ...latest, recordedAt: baseline.recordedAt } }]) {
      expect(recompAssessmentRequestSchema.safeParse({ ...request, ...patch }).success).toBe(false)
    }
    for (const patch of [{ dayIndex: -1 }, { dayIndex: 0.5 }, { recordedAt: 'yesterday' }, { measurements: {} }, { measurements: { ...baseline.measurements, waistCm: 0 } }, { measurements: { ...baseline.measurements, scaleWeightKg: Infinity } }]) {
      expect(bodyMeasurementEntrySchema.safeParse({ ...baseline, ...patch }).success).toBe(false)
    }
  })
})

describe('Fashion, scent and grooming contract', () => {
  const fashion = { occasion: 'Dinner', venueType: 'Restaurant', weather: 'Cool and dry', primaryOutfit: 'Jacket and trousers', alternateOutfit: 'Sweater and trousers', accessories: ['Watch'],
    fragranceProfile: { scentFamily: 'Unscented', notes: [], applicationTip: 'Respect fragrance-free venues.' },
    groomingChecklist: { deodorantAntiperspirantTiming: 'Follow product directions.', garmentCare: ['Check care label'], hygieneReminders: ['Clean clothes'] } }
  it('validates a complete preview plan while keeping Fashion out of legacy saved plans', () => {
    expect(fashionPlanSchema.safeParse(fashion).success).toBe(true)
    expect(savedPlanSchema.safeParse({ ...saved, plan: fashion }).success).toBe(false)
  })
  it('rejects missing alternate outfit, invalid scent notes and incomplete grooming', () => {
    for (const patch of [{ alternateOutfit: '' }, { fragranceProfile: { ...fashion.fragranceProfile, notes: 'wood' } }, { groomingChecklist: { garmentCare: [] } }]) {
      expect(fashionPlanSchema.safeParse({ ...fashion, ...patch }).success).toBe(false)
    }
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
