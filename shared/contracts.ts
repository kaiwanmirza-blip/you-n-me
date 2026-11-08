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
