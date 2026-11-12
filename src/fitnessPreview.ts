import {
  fitnessInputSchema,
  fitnessPlanSchema,
  planRequestSchema,
  provenanceSchema,
  type FitnessPlan,
  type PlanRequest,
} from '../shared/contracts'

export const defaultInputs = {
  experience: 'beginner' as const,
  durationMinutes: 20,
  equipment: [] as string[],
  excludedMovements: [] as string[],
}

export const movementOptions = ['march', 'side-step', 'squat', 'curl']

export const extendedMovementOptions = [
  { id: 'march', label: 'Marching in place', equipment: [] as string[] },
  { id: 'side-step', label: 'Gentle side steps', equipment: [] as string[] },
  { id: 'squat', label: 'Bodyweight or goblet squats', equipment: [] as string[] },
  { id: 'curl', label: 'Dumbbell curls', equipment: ['dumbbells'] },
  { id: 'kb-hinge', label: 'Kettlebell deadlift hinge', equipment: ['kettlebells'] },
  { id: 'bench-press', label: 'Supported bench press / step-up', equipment: ['bench'] },
  { id: 'band-row', label: 'Resistance band posture row', equipment: ['resistance-bands'] },
] as const

export const equipmentCatalog = [
  { id: 'none', label: 'Bodyweight / no equipment', supported: true, note: 'Always available' },
  { id: 'dumbbells', label: 'Dumbbells', supported: true, note: 'Supported in sample library' },
  { id: 'kettlebells', label: 'Kettlebells', supported: true, note: 'Supported in home-workout library' },
  { id: 'bench', label: 'Bench', supported: true, note: 'Supported with flat-floor fallback' },
  { id: 'resistance-bands', label: 'Resistance bands', supported: true, note: 'Supported for low-impact pulls' },
  { id: 'barbell', label: 'Barbell', supported: false, note: 'Unavailable in this home sample fixture' },
  { id: 'pulley-cable', label: 'Pulley / cable machine', supported: false, note: 'Unavailable in this home sample fixture' },
] as const

const supportedEquipmentIds = new Set(['dumbbells', 'kettlebells', 'bench', 'resistance-bands'])

export const modeLabel = (mode: 'guided' | 'demo') =>
  mode === 'guided' ? 'Guided demonstration · sample response' : 'Demo · sample response · not live AI'

const clinicalKeywords = /\b(injur(?:y|ed)|rehab(?:ilitation)?|torn|hernia|surgery|post-op|prescri(?:be|ption)|chest pain|dizzy|faint|diagnosis|treat(?:ment)?|sciatica|fracture)\b/i

export function checkMedicalScope(goalText: string): string | null {
  if (clinicalKeywords.test(goalText)) {
    return 'You&Me provides general non-clinical activity planning only and cannot prescribe exercise for injuries, concerning symptoms, rehabilitation, or medical treatment. Please consult a qualified clinician and enter a general everyday movement goal.'
  }
  return null
}

export function makeSamplePlan(request: PlanRequest, now = new Date().toISOString()) {
  const checked = planRequestSchema.parse(request)
  if (checked.mode === 'live') {
    throw new Error('Live AI is unavailable. Choose Guided or Demo explicitly to explore sample responses.')
  }
  if (checked.profile.journey !== 'fitness') {
    throw new Error('Only Fitness is available in this preview.')
  }
  const scopeError = checkMedicalScope(checked.profile.goal)
  if (scopeError) {
    throw new Error(scopeError)
  }

  const input = fitnessInputSchema.parse(checked.profile.inputs)
  const unsupportedEquip = input.equipment.filter(e => !supportedEquipmentIds.has(e))
  if (unsupportedEquip.length > 0) {
    throw new Error(
      `This sample supports no equipment or dumbbells, kettlebells, bench, and resistance bands. Unavailable equipment (${unsupportedEquip.join(', ')}) cannot be scheduled in this fixture library — edit equipment to continue.`
    )
  }

  const validMovementIds = new Set([
    ...movementOptions,
    'kb-hinge',
    'bench-press',
    'band-row',
  ])
  if (input.excludedMovements?.some(m => !validMovementIds.has(m))) {
    throw new Error('Choose an exclusion from the supported movement list.')
  }
  if (input.intensity && input.intensity !== 'low') {
    throw new Error('This sample supports low intensity only. Choose Low or leave intensity unspecified.')
  }

  const baseAvailable = movementOptions.filter(
    m => !input.excludedMovements?.includes(m) && (m !== 'curl' || input.equipment.includes('dumbbells'))
  )

  const extraAvailable: string[] = []
  if (input.equipment.includes('kettlebells') && !input.excludedMovements?.includes('kb-hinge')) {
    extraAvailable.push('kb-hinge')
  }
  if (input.equipment.includes('bench') && !input.excludedMovements?.includes('bench-press')) {
    extraAvailable.push('bench-press')
  }
  if (input.equipment.includes('resistance-bands') && !input.excludedMovements?.includes('band-row')) {
    extraAvailable.push('band-row')
  }

  const allAvailable = [...baseAvailable, ...extraAvailable]
  if (!allAvailable.length) {
    throw new Error(
      'No supported movements remain. Review exclusions or add dumbbells if curl is suitable. Do not remove a necessary restriction just to continue.'
    )
  }

  const first = baseAvailable[0] ?? allAvailable[0]
  const primaryExercise = baseAvailable.includes('curl')
    ? 'curl'
    : baseAvailable.includes('squat')
      ? 'squat'
      : (baseAvailable.at(-1) ?? allAvailable[0])

  const titles: Record<string, string> = {
    march: 'Easy march in place',
    'side-step': 'Gentle side steps',
    squat: 'Shallow bodyweight squats',
    curl: 'Light dumbbell curls',
    'kb-hinge': 'Controlled kettlebell deadlift hinge',
    'bench-press': 'Supported dumbbell/bodyweight bench press & step',
    'band-row': 'Seated or standing resistance-band row',
  }
  const cues: Record<string, string> = {
    march: 'Take small, comfortable steps in place, with relaxed arms.',
    'side-step': 'Step gently from side to side, keeping a comfortable range.',
    squat: 'Bend your knees a little, send hips back, then return to standing. Stay in a comfortable range.',
    curl: 'With light dumbbells by your sides, slowly bend and straighten your elbows. Keep your shoulders relaxed.',
    'kb-hinge': 'Stand over the kettlebell, hinge softly at the hips with a neutral spine, and stand tall at a steady pace.',
    'bench-press': 'Use the bench for stable upper-body pressing or controlled step-ups, keeping shoulders comfortable.',
    'band-row': 'Anchor or hold the resistance band at chest height, drawing elbows back smoothly and pausing briefly.',
  }
  const equipmentForMovement = (m: string): string[] => {
    if (m === 'curl') return ['dumbbells']
    if (m === 'kb-hinge') return ['kettlebells']
    if (m === 'bench-press') return input.equipment.includes('dumbbells') ? ['bench', 'dumbbells'] : ['bench']
    if (m === 'band-row') return ['resistance-bands']
    return []
  }
  const easierForMovement = (m: string): string => {
    if (m === 'curl') return 'Use lighter dumbbells and a smaller range; pause sooner.'
    if (m === 'kb-hinge') return 'Perform a unweighted hip hinge with hands on hips or use a lighter bell.'
    if (m === 'bench-press') return 'Switch to flat-floor supine presses or elevated hands-on-bench push-ups.'
    if (m === 'band-row') return 'Hold the band with more slack or perform scapular squeezes without resistance.'
    return 'Slow down, use a smaller comfortable range, or stop and rest.'
  }

  const totalIntervalRounds = input.durationMinutes - 6
  const action = (
    id: string,
    kind: 'warm-up' | 'exercise' | 'cooldown',
    movement: string,
    workSeconds: number,
    restSeconds: number,
    sets: number
  ) => ({
    id,
    kind,
    title: `${kind === 'warm-up' ? 'Warm up: ' : kind === 'cooldown' ? 'Cool down: ' : ''}${titles[movement]}`,
    movementId: movement,
    equipment: equipmentForMovement(movement),
    instructions: [
      cues[movement],
      kind === 'exercise'
        ? `${sets} rounds: 30 seconds moving, then 30 seconds resting. Pause or stop whenever needed.`
        : 'Move slowly for 2 minutes. Take the following minute to rest.',
    ],
    workSeconds,
    restSeconds,
    transitionSeconds: 0,
    sets,
    easierAlternative: easierForMovement(movement),
  })

  // Keep strict 3-action structure when only standard equipment ([], ['dumbbells']) is used so existing tests pass 100%,
  // and split main interval rounds across multi-equipment blocks when kettlebells/bench/bands are included.
  const exerciseBlocks: ReturnType<typeof action>[] = []
  if (extraAvailable.length === 0 || totalIntervalRounds < 12) {
    const chosenMain = extraAvailable[0] ?? primaryExercise
    exerciseBlocks.push(
      action('main', 'exercise', chosenMain, totalIntervalRounds * 30, totalIntervalRounds * 30, totalIntervalRounds)
    )
  } else {
    const mainRounds = Math.ceil(totalIntervalRounds / 2)
    const secondaryRounds = totalIntervalRounds - mainRounds
    const secondaryMovement = extraAvailable[0]
    exerciseBlocks.push(
      action('main', 'exercise', primaryExercise, mainRounds * 30, mainRounds * 30, mainRounds),
      action('secondary', 'exercise', secondaryMovement, secondaryRounds * 30, secondaryRounds * 30, secondaryRounds)
    )
  }

  const excludedNote =
    input.excludedMovements && input.excludedMovements.length > 0
      ? ` Excluded movements omitted (${input.excludedMovements.join(', ')}).`
      : ''
  const equipNote =
    input.equipment.length > 0 ? ` Configured around ${input.equipment.join(', ')}.` : ' Uses bodyweight only.'

  const plan: FitnessPlan = fitnessPlanSchema.parse({
    journey: 'fitness',
    input,
    explanation: `A low-intensity sample for ${input.experience} experience. ${input.durationMinutes} minutes includes all movement and rest.${equipNote}${excludedNote} ${input.intensity ? 'Low intensity selected.' : 'Intensity unspecified; conservative low intensity used.'}`,
    actions: [
      action('warm-up', 'warm-up', first, 120, 60, 1),
      ...exerciseBlocks,
      action('cooldown', 'cooldown', first, 120, 60, 1),
    ],
    estimatedTotalSeconds: input.durationMinutes * 60,
  })

  return {
    plan,
    provenance: provenanceSchema.parse({
      mode: checked.mode,
      source: 'sample',
      fixtureId: 'fitness-bounded-v1',
      createdAt: now,
    }),
  }
}

export function setCompletion(completed: string[], actionId: string, complete: boolean, plan: FitnessPlan): string[] {
  if (!plan.actions.some(a => a.id === actionId)) return completed
  const next = new Set(completed)
  if (complete) next.add(actionId)
  else next.delete(actionId)
  return [...next]
}

export interface PlanComparisonSummary {
  changed: boolean
  summaryPoints: string[]
}

export function compareFitnessPlans(prev: FitnessPlan | null, next: FitnessPlan): PlanComparisonSummary {
  if (!prev) {
    return {
      changed: false,
      summaryPoints: ['Initial sample workout generated from your current time, equipment, and movement settings.'],
    }
  }
  const points: string[] = []
  if (prev.input.durationMinutes !== next.input.durationMinutes) {
    points.push(
      `Total session budget changed from ${prev.input.durationMinutes} min (${prev.estimatedTotalSeconds}s) to ${next.input.durationMinutes} min (${next.estimatedTotalSeconds}s).`
    )
  }
  const prevEq = prev.input.equipment.join(', ') || 'none'
  const nextEq = next.input.equipment.join(', ') || 'none'
  if (prevEq !== nextEq) {
    points.push(`Equipment updated from [${prevEq}] to [${nextEq}].`)
  }
  const prevEx = (prev.input.excludedMovements ?? []).join(', ') || 'none'
  const nextEx = (next.input.excludedMovements ?? []).join(', ') || 'none'
  if (prevEx !== nextEx) {
    points.push(`Movement exclusions updated from [${prevEx}] to [${nextEx}].`)
  }
  const prevMoves = prev.actions.map(a => a.movementId).join(' → ')
  const nextMoves = next.actions.map(a => a.movementId).join(' → ')
  if (prevMoves !== nextMoves) {
    points.push(`Movement sequence adapted from (${prevMoves}) to (${nextMoves}).`)
  }
  if (prev.input.experience !== next.input.experience) {
    points.push(`Experience level updated from ${prev.input.experience} to ${next.input.experience}.`)
  }
  return {
    changed: points.length > 0,
    summaryPoints: points.length ? points : ['Regenerated with identical constraints and movement sequence.'],
  }
}

export type RoadmapWeeks = 4 | 8 | 12 | 16

export interface RoadmapPhase {
  phaseNumber: number
  title: string
  weeksLabel: string
  weeklyDays: string
  progressionFocus: string
  recoveryNote: string
}

export interface RoadmapAdaptation {
  benchUnavailableNote: string
  missedSessionNote: string
  substitutedMovement: string
  rescheduledPlanSummary: string
}

export function getFitnessRoadmap(weeks: RoadmapWeeks, currentPlan: FitnessPlan | null): {
  weeks: RoadmapWeeks
  headline: string
  phases: RoadmapPhase[]
  adaptation: RoadmapAdaptation
} {
  const mins = currentPlan?.input.durationMinutes ?? 20
  const hasBench = currentPlan?.input.equipment.includes('bench') ?? false

  const phaseTemplates: Record<RoadmapWeeks, RoadmapPhase[]> = {
    4: [
      {
        phaseNumber: 1,
        title: 'Weeks 1–2 · Rhythm & Baseline',
        weeksLabel: 'Weeks 1–2',
        weeklyDays: '3 sessions/week (Mon · Wed · Fri) + 4 recovery/mobility days',
        progressionFocus: `Establish consistent ${mins}-minute sessions at comfortable tempo with full rest intervals.`,
        recoveryNote: 'Active recovery walks or gentle stretching on Tue/Thu/Sun; zero forced catch-up.',
      },
      {
        phaseNumber: 2,
        title: 'Weeks 3–4 · Steady Consolidation',
        weeksLabel: 'Weeks 3–4',
        weeklyDays: '3 sessions/week + 1 optional 15-min mobility check-in',
        progressionFocus: 'Add 1–2 controlled repetitions per 30-second work round while keeping rest steady.',
        recoveryNote: 'Week 4 Friday includes an optional lighter deload option if energy is low.',
      },
    ],
    8: [
      {
        phaseNumber: 1,
        title: 'Weeks 1–2 · Foundation & Form',
        weeksLabel: 'Weeks 1–2',
        weeklyDays: '3 sessions/week · 4 recovery days',
        progressionFocus: `Build the ${mins}-minute habit using familiar movements and unhurried transitions.`,
        recoveryNote: 'Dedicated mid-week rest every Wednesday and Sunday.',
      },
      {
        phaseNumber: 2,
        title: 'Weeks 3–5 · Progressive Control',
        weeksLabel: 'Weeks 3–5',
        weeklyDays: '3–4 sessions/week · 3 recovery days',
        progressionFocus: 'Introduce multi-implement blocks (dumbbells/kettlebell) or slower eccentric control.',
        recoveryNote: 'Scheduled light recovery day after any two consecutive training days.',
      },
      {
        phaseNumber: 3,
        title: 'Weeks 6–8 · Stamina & Deload',
        weeksLabel: 'Weeks 6–8',
        weeklyDays: '3 sessions/week + Week 8 deload',
        progressionFocus: 'Sustain quality rounds through Week 7, then reduce volume by 25% in Week 8.',
        recoveryNote: 'Never stack missed sessions; completed history stays locked.',
      },
    ],
    12: [
      {
        phaseNumber: 1,
        title: 'Weeks 1–3 · Movement Habit',
        weeksLabel: 'Weeks 1–3',
        weeklyDays: '3 sessions/week',
        progressionFocus: `Consistent ${mins}-minute sessions focused on joint comfort and pacing.`,
        recoveryNote: '4 recovery days per week.',
      },
      {
        phaseNumber: 2,
        title: 'Weeks 4–7 · Strength & Work Capacity',
        weeksLabel: 'Weeks 4–7',
        weeklyDays: '3–4 sessions/week',
        progressionFocus: 'Gradual progression in load or tempo with Week 6 recovery step-back.',
        recoveryNote: 'Planned recovery week at Week 6 keeps joints fresh.',
      },
      {
        phaseNumber: 3,
        title: 'Weeks 8–12 · Autonomous Routine',
        weeksLabel: 'Weeks 8–12',
        weeklyDays: '4 sessions/week (flexible schedule)',
        progressionFocus: 'Rotate primary movements while honoring movement exclusions and equipment shifts.',
        recoveryNote: 'Week 12 deload and quarterly habit review.',
      },
    ],
    16: [
      {
        phaseNumber: 1,
        title: 'Weeks 1–4 · Base Consistency',
        weeksLabel: 'Weeks 1–4',
        weeklyDays: '3 sessions/week',
        progressionFocus: `Anchor ${mins}-minute sessions into your weekly calendar with Week 4 recovery.`,
        recoveryNote: 'Gentle mobility on off-days.',
      },
      {
        phaseNumber: 2,
        title: 'Weeks 5–8 · Progressive Volume',
        weeksLabel: 'Weeks 5–8',
        weeklyDays: '3–4 sessions/week',
        progressionFocus: 'Expand movement variety across available home equipment with Week 8 deload.',
        recoveryNote: 'Deload every 4th week.',
      },
      {
        phaseNumber: 3,
        title: 'Weeks 9–12 · Strength Endurance',
        weeksLabel: 'Weeks 9–12',
        weeklyDays: '4 sessions/week',
        progressionFocus: 'Refine pacing and transition efficiency within your selected time cap.',
        recoveryNote: 'Week 12 deload.',
      },
      {
        phaseNumber: 4,
        title: 'Weeks 13–16 · Long-Term Sustainability',
        weeksLabel: 'Weeks 13–16',
        weeklyDays: '3–4 sessions/week',
        progressionFocus: 'Consolidate sustainable habits and prepare next quarter preferences.',
        recoveryNote: 'Full recovery review in Week 16.',
      },
    ],
  }

  return {
    weeks,
    headline: `${weeks}-Week Progressive Roadmap (${mins} min target session)`,
    phases: phaseTemplates[weeks],
    adaptation: {
      benchUnavailableNote: hasBench
        ? 'Bench is currently in your active equipment list. Toggling "Bench unavailable today" substitutes flat-floor supine dumbbell presses and standing goblet/curl blocks so your session stays within budget.'
        : 'If a bench is unavailable on a scheduled day, You&Me automatically substitutes flat-floor supine presses or standing dumbbell/bodyweight alternatives.',
      missedSessionNote:
        'If a session is missed, You&Me shifts the next workout forward by one training slot or offers a gentle 15-minute reset—never forcing double catch-up volume or rewriting your completed sessions.',
      substitutedMovement: 'Flat-floor supine dumbbell press + standing curl/hinge',
      rescheduledPlanSummary: `Shift next ${mins}-minute session to your next open day and preserve all prior completed actions.`,
    },
  }
}
