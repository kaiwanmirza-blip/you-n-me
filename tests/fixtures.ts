// Fictional contract fixtures only. Never returned by an API endpoint as generated output.
export const fitnessInput = { experience: 'beginner', durationMinutes: 20, equipment: [], excludedMovements: [] }
export const nutritionInput = { dietaryPattern: 'balanced', meals: 1, servings: 1, preparationMinutes: 20, allergyAcknowledgement: 'none', excludedIngredients: [] }
export const profile = { guide: 'Jane', dataOrigin: 'fictional', sampleId: 'sample-a', adultEligibility: 'adult', goal: 'Build a routine', units: 'us-customary', journey: 'fitness', inputs: fitnessInput }
export const nutritionProfile = { ...profile, journey: 'nutrition', inputs: nutritionInput }
export const provenance = { mode: 'demo', source: 'sample', fixtureId: 'fixture-a', createdAt: '2026-11-02T12:00:00Z' }
export const liveProvenance = { mode: 'live', source: 'provider', provider: 'test-provider', latencyMs: 100, createdAt: provenance.createdAt }
export const fitnessPlan = {
  journey: 'fitness', input: fitnessInput, explanation: 'Fictional validation fixture',
  actions: ['warm-up', 'exercise', 'cooldown'].map((kind, i) => ({
    id: `action-${i}`, kind, title: 'Test block', movementId: `movement-${i}`, equipment: [],
    instructions: ['Test instruction'], workSeconds: 120, restSeconds: 20, transitionSeconds: 10,
    sets: 1, easierAlternative: 'Reduce intensity',
  })), estimatedTotalSeconds: 450,
}
export const ingredient = { ingredientId: 'rice', name: 'Rice', unit: 'g', amount: 100, pantry: false }
export const nutritionPlan = {
  journey: 'nutrition', input: nutritionInput, explanation: 'Fictional meal fixture',
  meals: [{ id: 'meal-1', title: 'Test meal', servings: 1, quantityBasis: 'per-recipe', portion: 'One serving', preparationMinutes: 10, instructions: ['Test preparation'], ingredients: [ingredient], substitutions: [] }],
  shoppingList: [ingredient],
}
export const saved = { id: 'plan-1', version: 1, profileSnapshot: profile, provenance, plan: fitnessPlan }
export const progress = { eventId: 'event-1', planId: 'plan-1', planVersion: 1, actionId: 'action-1', journey: 'fitness', operation: 'complete', occurredAt: provenance.createdAt }
