import { z } from 'zod'

const text = z.string().trim().min(1).max(400)
const id = z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/)
const timestamp = z.iso.datetime()
const list = z.array(text).max(40)
export const modeSchema = z.enum(['guided', 'demo', 'live'])
export type Mode = z.infer<typeof modeSchema>

export const fitnessInputSchema = z.strictObject({
  experience: z.enum(['beginner', 'intermediate', 'advanced']),
  durationMinutes: z.number().int().min(15).max(60),
  equipment: list,
  excludedMovements: list.optional(),
  intensity: z.enum(['low', 'moderate', 'high']).optional(),
})
export const nutritionInputSchema = z.strictObject({
  dietaryPattern: text,
  meals: z.number().int().min(1).max(6),
  servings: z.number().int().min(1).max(12),
  preparationMinutes: z.number().int().min(1).max(180),
  allergyAcknowledgement: z.enum(['none', 'listed', 'unknown', 'prefer-not-to-say']),
  excludedIngredients: list,
  cuisine: text.optional(), dislikes: list.optional(), budgetBand: text.optional(),
}).superRefine((value, ctx) => {
  if (value.allergyAcknowledgement === 'listed' && !value.excludedIngredients.length) {
    ctx.addIssue({ code: 'custom', path: ['excludedIngredients'], message: 'List the excluded ingredients.' })
  }
})
const profileBase = {
  guide: z.enum(['Jane', 'Kay']),
  dataOrigin: z.enum(['fictional', 'personal']),
  sampleId: id.optional(),
  displayName: z.string().trim().max(80).optional(),
  adultEligibility: z.enum(['adult', 'under-18', 'unknown']),
  goal: text,
  units: z.enum(['us-customary', 'metric']),
}
export const profileSchema = z.discriminatedUnion('journey', [
  z.strictObject({ ...profileBase, journey: z.literal('fitness'), inputs: fitnessInputSchema }),
  z.strictObject({ ...profileBase, journey: z.literal('nutrition'), inputs: nutritionInputSchema }),
]).superRefine((profile, ctx) => {
  if ((profile.dataOrigin === 'fictional') !== Boolean(profile.sampleId)) {
    ctx.addIssue({ code: 'custom', path: ['sampleId'], message: 'Only fictional profiles require a sample identifier.' })
  }
})
export type Profile = z.infer<typeof profileSchema>

export const provenanceSchema = z.discriminatedUnion('mode', [
  z.strictObject({ mode: z.literal('guided'), source: z.literal('sample'), fixtureId: id, createdAt: timestamp }),
  z.strictObject({ mode: z.literal('demo'), source: z.literal('sample'), fixtureId: id, createdAt: timestamp }),
  z.strictObject({ mode: z.literal('live'), source: z.literal('provider'), provider: text, latencyMs: z.number().int().nonnegative(), createdAt: timestamp }),
]).readonly()
export type Provenance = z.infer<typeof provenanceSchema>

export const planRequestSchema = z.strictObject({ mode: modeSchema, profile: profileSchema }).superRefine((request, ctx) => {
  if (request.mode !== 'live' && request.profile.dataOrigin !== 'fictional') {
    ctx.addIssue({ code: 'custom', path: ['profile', 'dataOrigin'], message: 'Guided/demo uses fictional profiles.' })
  }
  if (request.mode === 'live' && request.profile.dataOrigin === 'personal' && request.profile.adultEligibility !== 'adult') {
    ctx.addIssue({ code: 'custom', path: ['profile', 'adultEligibility'], message: 'Personal live journeys require adult eligibility.' })
  }
  if (request.mode === 'live' && request.profile.journey === 'nutrition' && ['unknown', 'prefer-not-to-say'].includes(request.profile.inputs.allergyAcknowledgement)) {
    ctx.addIssue({ code: 'custom', path: ['profile', 'inputs', 'allergyAcknowledgement'], message: 'Use generic preview until acknowledgement is available.' })
  }
})
export type PlanRequest = z.infer<typeof planRequestSchema>

const actionSchema = z.strictObject({
  id, kind: z.enum(['warm-up', 'exercise', 'cooldown']), title: text,
  movementId: text, equipment: list,
  instructions: z.array(text).min(1).max(40),
  workSeconds: z.number().int().positive(),
  restSeconds: z.number().int().nonnegative(), transitionSeconds: z.number().int().nonnegative(),
  sets: z.number().int().positive(), repetitions: z.number().int().positive().optional(),
  easierAlternative: text,
})
export const fitnessPlanSchema = z.strictObject({
  journey: z.literal('fitness'), input: fitnessInputSchema,
  explanation: text, actions: z.array(actionSchema).min(3).max(40),
  estimatedTotalSeconds: z.number().int().positive(),
}).superRefine((plan, ctx) => {
  const issue = (message: string) => ctx.addIssue({ code: 'custom', message })
  if (new Set(plan.actions.map(a => a.id)).size !== plan.actions.length) issue('Action IDs must be unique.')
  if (plan.actions[0]?.kind !== 'warm-up' || plan.actions.at(-1)?.kind !== 'cooldown' || !plan.actions.some(a => a.kind === 'exercise')) issue('Include ordered warm-up, exercise and cooldown.')
  // workSeconds is the whole block, including its sets. Rest and transitions are explicit totals.
  const sum = plan.actions.reduce((total, a) => total + a.workSeconds + a.restSeconds + a.transitionSeconds, 0)
  if (sum !== plan.estimatedTotalSeconds || sum > plan.input.durationMinutes * 60) issue('Component total must match and fit the time budget.')
  for (const action of plan.actions) {
    if (action.equipment.some(e => !plan.input.equipment.includes(e))) issue('Unavailable equipment.')
    if (plan.input.excludedMovements?.includes(action.movementId)) issue('Excluded movement.')
  }
})
export type FitnessPlan = z.infer<typeof fitnessPlanSchema>

const quantitySchema = z.strictObject({ ingredientId: id, name: text, unit: z.enum(['g', 'ml', 'count']), amount: z.number().positive(), pantry: z.boolean() })
export const nutritionPlanSchema = z.strictObject({
  journey: z.literal('nutrition'), input: nutritionInputSchema, explanation: text,
  meals: z.array(z.strictObject({
    id, title: text, servings: z.number().int().positive(), quantityBasis: z.literal('per-recipe'), portion: text,
    preparationMinutes: z.number().positive(), instructions: z.array(text).min(1).max(40),
    ingredients: z.array(quantitySchema).min(1).max(80), substitutions: z.array(text).max(40),
  })).min(1).max(6),
  shoppingList: z.array(quantitySchema).min(1).max(160),
}).superRefine((plan, ctx) => {
  const issue = (message: string) => ctx.addIssue({ code: 'custom', message })
  if (plan.meals.length !== plan.input.meals || new Set(plan.meals.map(m => m.id)).size !== plan.meals.length) issue('Meal count and IDs must match.')
  const totals = new Map<string, number>()
  for (const meal of plan.meals) {
    if (meal.servings !== plan.input.servings || meal.preparationMinutes > plan.input.preparationMinutes) issue('Servings and preparation must match inputs.')
    for (const ingredient of meal.ingredients) {
      if (plan.input.excludedIngredients.some(e => [ingredient.ingredientId.toLowerCase(), ingredient.name.toLowerCase()].includes(e.toLowerCase()))) issue('Excluded ingredient.')
      const key = `${ingredient.ingredientId}:${ingredient.unit}:${ingredient.pantry}`
      totals.set(key, (totals.get(key) ?? 0) + ingredient.amount)
    }
  }
  const seen = new Set<string>()
  for (const item of plan.shoppingList) {
    const key = `${item.ingredientId}:${item.unit}:${item.pantry}`
    if (seen.has(key) || !totals.has(key) || Math.abs((totals.get(key) ?? 0) - item.amount) > 0.000001) issue('Shopping quantities must consolidate recipe ingredients.')
    seen.add(key)
  }
  if (seen.size !== totals.size) issue('Shopping list is incomplete.')
})
export type NutritionPlan = z.infer<typeof nutritionPlanSchema>
export const planSchema = z.discriminatedUnion('journey', [fitnessPlanSchema, nutritionPlanSchema])
export const savedPlanSchema = z.strictObject({
  id, version: z.number().int().positive(), profileSnapshot: profileSchema,
  provenance: provenanceSchema, plan: planSchema,
}).superRefine((saved, ctx) => {
  const request = planRequestSchema.safeParse({ mode: saved.provenance.mode, profile: saved.profileSnapshot })
  if (!request.success || saved.profileSnapshot.journey !== saved.plan.journey || JSON.stringify(saved.profileSnapshot.inputs) !== JSON.stringify(saved.plan.input)) {
    ctx.addIssue({ code: 'custom', message: 'Snapshot, plan inputs and original mode must agree.' })
  }
})
export type SavedPlan = z.infer<typeof savedPlanSchema>
// Reopening validates the original envelope, never the current screen's mode. No storage or mutation.
export function reopenSavedPlan(snapshot: unknown): SavedPlan { return savedPlanSchema.parse(snapshot) }

export const progressEventSchema = z.strictObject({
  eventId: id, planId: id, planVersion: z.number().int().positive(), actionId: id,
  journey: z.enum(['fitness', 'nutrition']), operation: z.enum(['complete', 'undo']), occurredAt: timestamp,
})
export type ProgressEvent = z.infer<typeof progressEventSchema>
export const entitlementSchema = z.discriminatedUnion('tier', [
  z.strictObject({ simulated: z.literal(true), tier: z.literal('Free'), comparisonEnabled: z.literal(false) }),
  z.strictObject({ simulated: z.literal(true), tier: z.literal('Plus'), comparisonEnabled: z.literal(true) }),
])
export type SimulatedEntitlement = z.infer<typeof entitlementSchema>
export const healthSchema = z.strictObject({ status: z.literal('ok'), service: z.literal('you-n-me-api') })
export type Health = z.infer<typeof healthSchema>
export const apiErrorSchema = z.strictObject({ error: z.strictObject({
  code: z.enum(['VALIDATION_ERROR', 'INVALID_JSON', 'UNSUPPORTED_MEDIA_TYPE', 'PAYLOAD_TOO_LARGE', 'CAPABILITY_UNAVAILABLE', 'NOT_FOUND', 'INTERNAL_ERROR']),
  message: text,
  issues: z.array(z.strictObject({ path: z.array(z.union([z.string(), z.number()])), code: text })).optional(),
}) })
export type ApiError = z.infer<typeof apiErrorSchema>

// Additive next-generation preview contracts. Legacy schemas above remain unchanged.
export const guideSelectionSchema = z.enum(['Jane', 'Kay', 'Both'])
export type GuideSelection = z.infer<typeof guideSelectionSchema>
export const memoryChipsSchema = z.strictObject({
  occasion: text.optional(), motivation: text.optional(),
  durationMinutes: z.number().int().min(1).max(180).optional(),
  equipment: list.optional(), exclusions: list.optional(), dietaryPattern: text.optional(),
  pantryItems: list.optional(), dressCode: text.optional(), scentPreference: text.optional(),
})
export type MemoryChips = z.infer<typeof memoryChipsSchema>
const previewProvenanceSchema = z.strictObject({
  mode: z.enum(['guided', 'demo']), source: z.literal('sample'),
  engine: z.literal('local-deterministic-v1'), persisted: z.literal(false),
})
export const intakeRequestSchema = z.strictObject({
  guideSelection: guideSelectionSchema,
  userMessage: z.string().trim().min(1).max(4000),
  journey: z.enum(['fitness', 'nutrition', 'fashion']).default('fitness'),
  mode: z.enum(['guided', 'demo']).default('demo'),
  // Caller may resubmit reviewed chips from a prior turn; no server memory is implied.
  memoryChips: memoryChipsSchema.default({}),
})
export type IntakeRequest = z.infer<typeof intakeRequestSchema>
const intakeRequiredChips = {
  fitness: ['motivation', 'durationMinutes', 'equipment', 'exclusions'],
  nutrition: ['motivation', 'durationMinutes', 'dietaryPattern', 'pantryItems', 'exclusions'],
  fashion: ['occasion', 'dressCode'],
} as const
function missingChips(journey: IntakeRequest['journey'], chips: MemoryChips): string[] {
  return intakeRequiredChips[journey].filter(key => chips[key] === undefined)
}
export const conversationTurnSchema = z.strictObject({
  guideSelection: guideSelectionSchema, userMessage: z.string().trim().min(1).max(4000),
  journey: z.enum(['fitness', 'nutrition', 'fashion']), memoryChips: memoryChipsSchema,
  readiness: z.strictObject({ readyToBuildProgram: z.boolean(), missingDataPoints: list }),
  guideResponses: z.array(z.strictObject({ guide: z.enum(['Jane', 'Kay']), message: text })).min(1).max(2),
  provenance: previewProvenanceSchema,
}).superRefine((turn, ctx) => {
  const expected = turn.guideSelection === 'Both' ? ['Jane', 'Kay'] : [turn.guideSelection]
  if (turn.guideResponses.length !== expected.length || expected.some(guide => turn.guideResponses.filter(r => r.guide === guide).length !== 1)) {
    ctx.addIssue({ code: 'custom', path: ['guideResponses'], message: 'Return exactly one response per selected guide.' })
  }
  if (new Set(turn.guideResponses.map(r => r.message)).size !== turn.guideResponses.length) {
    ctx.addIssue({ code: 'custom', path: ['guideResponses'], message: 'Guide responses must be distinct.' })
  }
  const missing = missingChips(turn.journey, turn.memoryChips)
  if (turn.readiness.readyToBuildProgram !== (missing.length === 0) || JSON.stringify(turn.readiness.missingDataPoints) !== JSON.stringify(missing)) {
    ctx.addIssue({ code: 'custom', path: ['readiness'], message: 'Readiness must match the reviewed intake fields.' })
  }
})
export type ConversationTurn = z.infer<typeof conversationTurnSchema>

/** Deliberately limited extraction: labelled clauses and unambiguous minute phrases.
 * Unknown prose stays in userMessage; never invent equipment, exclusions or intent.
 */
export function makeConversationTurn(input: unknown): ConversationTurn {
  const request = intakeRequestSchema.parse(input)
  const chips: MemoryChips = { ...request.memoryChips }
  const stringKeys = ['occasion', 'motivation', 'dietaryPattern', 'dressCode', 'scentPreference'] as const
  const arrayKeys = ['equipment', 'exclusions', 'pantryItems'] as const
  for (const clause of request.userMessage.split(/[;\n]/)) {
    const match = /^\s*([a-zA-Z]+)\s*:\s*(.+?)\s*$/.exec(clause)
    if (!match) continue
    for (const key of stringKeys) {
      if (key.toLowerCase() === match[1].toLowerCase() && match[2].length <= 400) chips[key] = match[2]
    }
    for (const key of arrayKeys) {
      if (key.toLowerCase() !== match[1].toLowerCase()) continue
      const items = /^none$/i.test(match[2]) ? [] : match[2].split(',').map(s => s.trim()).filter(Boolean)
      if (list.safeParse(items).success) chips[key] = items
    }
  }
  const durations = [...request.userMessage.matchAll(/(?:^|[^\w.])(-?\d+(?:\.\d+)?)\s*(?:minutes?|mins?)\b/gi)]
  if (durations.length === 1) {
    const duration = Number(durations[0][1])
    // Invalid/ambiguous durations cannot silently leave an old valid duration ready.
    if (Number.isInteger(duration) && duration >= 1 && duration <= 180) chips.durationMinutes = duration
    else delete chips.durationMinutes
  } else if (durations.length > 1) delete chips.durationMinutes
  const missing = missingChips(request.journey, chips)
  const next = missing.length ? `Please review: ${missing.join(', ')}.` : 'Your intake fields are ready for review; no program has been generated.'
  const guides = request.guideSelection === 'Both' ? ['Jane', 'Kay'] as const : [request.guideSelection]
  return conversationTurnSchema.parse({
    guideSelection: request.guideSelection, userMessage: request.userMessage, journey: request.journey,
    memoryChips: chips, readiness: { readyToBuildProgram: missing.length === 0, missingDataPoints: missing },
    guideResponses: guides.map(guide => ({ guide, message: guide === 'Jane'
      ? `Sample guidance: We can take this one step at a time and keep your priorities in view. ${next}`
      : `Sample guidance: Let's organize the constraints before building a program. ${next}` })),
    provenance: { mode: request.mode, source: 'sample', engine: 'local-deterministic-v1', persisted: false },
  })
}

export const muscleGroupSchema = z.enum(['chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 'core', 'quads', 'hamstrings', 'glutes', 'calves', 'full-body'])
export type MuscleGroup = z.infer<typeof muscleGroupSchema>
export const bodyMeasurementEntrySchema = z.strictObject({
  dayIndex: z.number().int().nonnegative(), recordedAt: timestamp,
  measurements: z.strictObject({
    waistCm: z.number().positive(), chestCm: z.number().positive(), shouldersCm: z.number().positive(),
    hipsCm: z.number().positive(), armCm: z.number().positive(), thighCm: z.number().positive(), calfCm: z.number().positive(),
    scaleWeightKg: z.number().positive().optional(),
  }),
  // Completion flag only: no photo bytes, URL, storage or body-image analysis.
  photoCheckInCompleted: z.boolean(),
})
export type BodyMeasurementEntry = z.infer<typeof bodyMeasurementEntrySchema>
const recompInputShape = {
  baseline: bodyMeasurementEntrySchema,
  latest: bodyMeasurementEntrySchema.optional(),
  checkInDay: z.number().int().positive(), checkInDue: z.boolean(),
  mode: z.enum(['guided', 'demo']).default('demo'),
}
function validateRecompOrder(value: { baseline: BodyMeasurementEntry; latest?: BodyMeasurementEntry; checkInDay: number }, ctx: z.RefinementCtx) {
  if (value.baseline.dayIndex !== 0) ctx.addIssue({ code: 'custom', path: ['baseline', 'dayIndex'], message: 'Baseline must be Day Zero.' })
  if (value.latest && (value.latest.dayIndex <= 0 || value.latest.dayIndex > value.checkInDay || Date.parse(value.latest.recordedAt) <= Date.parse(value.baseline.recordedAt))) {
    ctx.addIssue({ code: 'custom', path: ['latest'], message: 'Latest must follow baseline and not exceed the assessed day.' })
  }
}
export const recompAssessmentRequestSchema = z.strictObject(recompInputShape).superRefine(validateRecompOrder)
export type RecompAssessmentRequest = z.infer<typeof recompAssessmentRequestSchema>
const roundDelta = (value: number) => Number(value.toFixed(3))
function recompResult(input: RecompAssessmentRequest) {
  const waistChangeCm = input.latest ? roundDelta(input.latest.measurements.waistCm - input.baseline.measurements.waistCm) : null
  const startWeight = input.baseline.measurements.scaleWeightKg
  const endWeight = input.latest?.measurements.scaleWeightKg
  const weightChangeKg = startWeight !== undefined && endWeight !== undefined ? roundDelta(endWeight - startWeight) : null
  const possible = waistChangeCm !== null && weightChangeKg !== null && waistChangeCm <= -1 && Math.abs(weightChangeKg) <= 0.5
  return {
    waistChangeCm, weightChangeKg,
    assessment: waistChangeCm === null || weightChangeKg === null ? 'insufficient-data' as const : possible ? 'possible-recomposition' as const : 'no-pattern-detected' as const,
    // Once per due check-in, even when both measurements and photo are missing.
    checkInStarImpact: input.checkInDue && (!input.latest || input.latest.dayIndex !== input.checkInDay || !input.latest.photoCheckInCompleted) ? -1 as const : 0 as const,
  }
}
export const recompAssessmentSchema = z.strictObject({
  ...recompInputShape,
  waistChangeCm: z.number().nullable(), weightChangeKg: z.number().nullable(),
  assessment: z.enum(['insufficient-data', 'possible-recomposition', 'no-pattern-detected']),
  checkInStarImpact: z.union([z.literal(-1), z.literal(0)]),
  interpretation: text, provenance: previewProvenanceSchema,
}).superRefine((value, ctx) => {
  validateRecompOrder(value, ctx)
  const expected = recompResult(value)
  for (const key of ['waistChangeCm', 'weightChangeKg', 'assessment', 'checkInStarImpact'] as const) {
    if (value[key] !== expected[key]) ctx.addIssue({ code: 'custom', path: [key], message: 'Assessment must match submitted entries and due check-in.' })
  }
  if (value.mode !== value.provenance.mode) ctx.addIssue({ code: 'custom', path: ['provenance'], message: 'Mode must match request.' })
})
export type RecompAssessment = z.infer<typeof recompAssessmentSchema>
export function assessRecomposition(input: unknown): RecompAssessment {
  const request = recompAssessmentRequestSchema.parse(input)
  return recompAssessmentSchema.parse({
    ...request, ...recompResult(request),
    interpretation: 'Sample trend only: a waist decrease of at least 1 cm with weight within 0.5 kg flags possible recomposition. Measurements cannot establish fat loss or lean muscle gain. These are illustrative thresholds, not a clinical assessment.',
    provenance: { mode: request.mode, source: 'sample', engine: 'local-deterministic-v1', persisted: false },
  })
}

export const fashionPlanSchema = z.strictObject({
  occasion: text, venueType: text, weather: text,
  primaryOutfit: text, alternateOutfit: text, accessories: list,
  fragranceProfile: z.strictObject({ scentFamily: text, notes: list, applicationTip: text }),
  groomingChecklist: z.strictObject({
    deodorantAntiperspirantTiming: text, garmentCare: list, hygieneReminders: list,
  }),
})
export type FashionPlan = z.infer<typeof fashionPlanSchema>

export const globalHeritageSchema = z.enum(['south_asian', 'latin_american', 'african', 'mediterranean', 'east_asian', 'southeast_asian', 'swana', 'pacific_islander', 'indigenous', 'central_asian'])
export type GlobalHeritage = z.infer<typeof globalHeritageSchema>
export const personaWardrobeSelectionSchema = z.strictObject({
  topCategory: z.enum(['blazer', 'jacket', 'hoodie', 'tshirt_tight', 'tshirt_baggy']), topItem: text,
  bottomCategory: z.enum(['jeans', 'sweat_pants', 'tailored_trousers']), bottomItem: text,
  eyewear: text, socks: text, shoes: text, shotType: z.enum(['head', 'full']),
})
export type PersonaWardrobeSelection = z.infer<typeof personaWardrobeSelectionSchema>
export const personaTokenEvalRequestSchema = z.strictObject({
  action: z.enum(['evaluate', 'claim-initial-set', 'restyle', 'animate']),
  firstSetClaimed: z.boolean(), studioTokens: z.number().int().nonnegative(),
  dailyAdsWatched: z.number().int().min(0).max(10),
  // Unredeemed cumulative watches, not a replay of already redeemed history.
  weeklyAdsWatched: z.number().int().nonnegative(),
  mode: z.enum(['guided', 'demo']).default('demo'),
}).superRefine((input, ctx) => {
  if (!Number.isSafeInteger(input.studioTokens + Math.floor(input.weeklyAdsWatched / 60))) {
    ctx.addIssue({ code: 'custom', path: ['studioTokens'], message: 'Resulting token balance must be a safe integer.' })
  }
})
export type PersonaTokenEvalRequest = z.infer<typeof personaTokenEvalRequestSchema>
export const personaTokenStateSchema = z.strictObject({
  action: personaTokenEvalRequestSchema.shape.action,
  allowed: z.boolean(), reason: z.enum(['evaluated', 'initial-set-claimed', 'initial-set-already-claimed', 'token-spent', 'insufficient-tokens']),
  firstSetClaimed: z.boolean(), studioTokens: z.number().int().nonnegative(),
  tokenCost: z.union([z.literal(0), z.literal(1)]), tokensMinted: z.number().int().nonnegative(),
  dailyAdsWatched: z.number().int().min(0).max(10), remainingWeeklyAds: z.number().int().min(0).max(59),
  provenance: previewProvenanceSchema,
})
export type PersonaTokenState = z.infer<typeof personaTokenStateSchema>
/** Pure preview transition, not an authoritative wallet or proof of ad viewing.
 * Reuse the returned balance/remainder/claim flag on the next evaluation.
 */
export function evaluatePersonaTokenState(input: unknown): PersonaTokenState {
  const request = personaTokenEvalRequestSchema.parse(input)
  const tokensMinted = Math.floor(request.weeklyAdsWatched / 60)
  let studioTokens = request.studioTokens + tokensMinted
  let firstSetClaimed = request.firstSetClaimed
  let allowed = true
  let tokenCost: 0 | 1 = 0
  let reason: PersonaTokenState['reason'] = 'evaluated'
  if (request.action === 'claim-initial-set') {
    allowed = !firstSetClaimed
    reason = allowed ? 'initial-set-claimed' : 'initial-set-already-claimed'
    firstSetClaimed = true
  } else if (request.action === 'restyle' || request.action === 'animate') {
    allowed = studioTokens >= 1
    reason = allowed ? 'token-spent' : 'insufficient-tokens'
    if (allowed) { tokenCost = 1; studioTokens -= 1 }
  }
  return personaTokenStateSchema.parse({
    action: request.action, allowed, reason, firstSetClaimed, studioTokens, tokenCost, tokensMinted,
    dailyAdsWatched: request.dailyAdsWatched, remainingWeeklyAds: request.weeklyAdsWatched % 60,
    provenance: { mode: request.mode, source: 'sample', engine: 'local-deterministic-v1', persisted: false },
  })
}
