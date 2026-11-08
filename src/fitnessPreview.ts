import { fitnessInputSchema, fitnessPlanSchema, planRequestSchema, provenanceSchema, type FitnessPlan, type PlanRequest } from '../shared/contracts'

export const defaultInputs = { experience: 'beginner' as const, durationMinutes: 20, equipment: [] as string[], excludedMovements: [] as string[] }
export const movementOptions = ['march', 'side-step', 'squat', 'curl']
export const modeLabel = (mode: 'guided' | 'demo') => mode === 'guided' ? 'Guided demonstration · sample response' : 'Demo · sample response · not live AI'

export function makeSamplePlan(request: PlanRequest, now = new Date().toISOString()) {
  const checked = planRequestSchema.parse(request)
  if (checked.mode === 'live') throw new Error('Live AI is unavailable. Choose Guided or Demo explicitly to explore sample responses.')
  if (checked.profile.journey !== 'fitness') throw new Error('Only Fitness is available in this preview.')
  const input = fitnessInputSchema.parse(checked.profile.inputs)
  if (input.equipment.some(e => e !== 'dumbbells')) throw new Error('This sample supports no equipment or dumbbells. Edit equipment to continue.')
  if (input.excludedMovements?.some(m => !movementOptions.includes(m))) throw new Error('Choose an exclusion from the supported movement list.')
  if (input.intensity && input.intensity !== 'low') throw new Error('This sample supports low intensity only. Choose Low or leave intensity unspecified.')
  const available = movementOptions.filter(m => !input.excludedMovements?.includes(m) && (m !== 'curl' || input.equipment.includes('dumbbells')))
  if (!available.length) throw new Error('No supported movements remain. Review exclusions or add dumbbells if curl is suitable. Do not remove a necessary restriction just to continue.')
  const first = available[0]
  const exercise = available.includes('curl') ? 'curl' : available.includes('squat') ? 'squat' : available.at(-1)!
  const titles: Record<string, string> = { march: 'Easy march in place', 'side-step': 'Gentle side steps', squat: 'Shallow bodyweight squats', curl: 'Light dumbbell curls' }
  const cues: Record<string, string> = { march: 'Take small, comfortable steps in place, with relaxed arms.', 'side-step': 'Step gently from side to side, keeping a comfortable range.', squat: 'Bend your knees a little, send hips back, then return to standing. Stay in a comfortable range.', curl: 'With light dumbbells by your sides, slowly bend and straighten your elbows. Keep your shoulders relaxed.' }
  const rounds = input.durationMinutes - 6
  const action = (id: string, kind: 'warm-up' | 'exercise' | 'cooldown', movement: string, workSeconds: number, restSeconds: number, sets: number) => ({
    id, kind, title: `${kind === 'warm-up' ? 'Warm up: ' : kind === 'cooldown' ? 'Cool down: ' : ''}${titles[movement]}`, movementId: movement,
    equipment: movement === 'curl' ? ['dumbbells'] : [], instructions: [cues[movement], kind === 'exercise' ? `${sets} rounds: 30 seconds moving, then 30 seconds resting. Pause or stop whenever needed.` : 'Move slowly for 2 minutes. Take the following minute to rest.'],
    workSeconds, restSeconds, transitionSeconds: 0, sets, easierAlternative: movement === 'curl' ? 'Use lighter dumbbells and a smaller range; pause sooner.' : 'Slow down, use a smaller comfortable range, or stop and rest.',
  })
  const plan: FitnessPlan = fitnessPlanSchema.parse({ journey: 'fitness', input,
    explanation: `A low-intensity sample for ${input.experience} experience. ${input.durationMinutes} minutes includes all movement and rest. ${input.intensity ? 'Low intensity selected.' : 'Intensity unspecified; conservative low intensity used.'}`,
    actions: [action('warm-up', 'warm-up', first, 120, 60, 1), action('main', 'exercise', exercise, rounds * 30, rounds * 30, rounds), action('cooldown', 'cooldown', first, 120, 60, 1)], estimatedTotalSeconds: input.durationMinutes * 60 })
  return { plan, provenance: provenanceSchema.parse({ mode: checked.mode, source: 'sample', fixtureId: 'fitness-bounded-v1', createdAt: now }) }
}

export function setCompletion(completed: string[], actionId: string, complete: boolean, plan: FitnessPlan): string[] {
  if (!plan.actions.some(a => a.id === actionId)) return completed
  const next = new Set(completed)
  if (complete) next.add(actionId); else next.delete(actionId)
  return [...next]
}
