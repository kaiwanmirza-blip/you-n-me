import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  compareFitnessPlans,
  defaultInputs,
  equipmentCatalog,
  extendedMovementOptions,
  getFitnessRoadmap,
  makeSamplePlan,
  modeLabel,
  setCompletion,
  type RoadmapWeeks,
} from './fitnessPreview'
import {
  defaultKitchenDevices,
  defaultNutritionInputs,
  defaultPantryInventory,
  makeNutritionSamplePlan,
  setMealCompletion,
  type KitchenDeviceId,
  type NutritionPreviewResult,
  type PantryItem,
} from './nutritionPreview'
import {
  ageBandCatalog,
  aiServiceTiersCatalog,
  bundleOfferingsCatalog,
  calculateHabitStars,
  initialChallenges,
  initialParticipantPairs,
  resolveActiveWardrobe,
  trialStageCatalog,
  wardrobeDescriptions,
  type AgeBand,
  type AiServiceTierId,
  type BundleOfferingId,
  type GuideAgeLook,
  type GuideAppearance,
  type GuideFeatureStyle,
  type GuideSkinTone,
  type GuideWardrobeRole,
  type GuestTrialStage,
  type ParticipantPair,
  type SharedBehaviorChallenge,
} from './experienceData'
import { GuidePortraitSvg, ageLookLabels } from './GuideAvatar'
import { NutritionPlannerView } from './NutritionPlannerView'
import { ExploreView, FaqsAndPilotHandoffView, FriendsChallengesView } from './SecondaryViews'
import type { FitnessPlan, Provenance } from '../shared/contracts'
import ApiConnection from './ApiConnection'
import { navigate, navigateBack, type Navigation, type Screen } from './navigation'
import { useAndroidBack } from './useAndroidBack'

export default function App() {
  const [navigation, setNavigation] = useState<Navigation>({ screen: 'Welcome', history: [] })
  const screen = navigation.screen

  // Theme: Light, Dark, System (default System)
  const [themePreference, setThemePreference] = useState<'system' | 'light' | 'dark'>('system')
  const [systemDark, setSystemDark] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemDark(mq.matches)
    const listener = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener?.('change', listener)
    return () => mq.removeEventListener?.('change', listener)
  }, [])

  const resolvedTheme = themePreference === 'system' ? (systemDark ? 'dark' : 'light') : themePreference

  // Guide & Persona state
  const [guide, setGuide] = useState<'Jane' | 'Kay'>('Jane')
  const [guideAppearance, setGuideAppearance] = useState<GuideAppearance>({
    ageLook: '30s-peer',
    skinTone: 'warm-amber',
    featureStyle: 'soft-rounded',
    wardrobeOverride: 'auto',
  })
  const [guideBubbleCollapsed, setGuideBubbleCollapsed] = useState(false)

  // Mode, Units, Sample Profile
  const [mode, setMode] = useState<'guided' | 'demo'>('guided')
  const [units, setUnits] = useState<'us-customary' | 'metric'>('us-customary')
  const [sampleId, setSampleId] = useState<'sample-a' | 'sample-b'>('sample-a')
  const [activeJourneyChoice, setActiveJourneyChoice] = useState<'fitness' | 'nutrition'>('fitness')

  // 48-hour Guest Trial & Simulated Registration / Tier state
  const [trialStage, setTrialStage] = useState<GuestTrialStage>('active')
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [mockEmail, setMockEmail] = useState('alex.sample@example.invalid')
  const [mockDisplayName, setMockDisplayName] = useState('Alex (Fictional Pilot Member)')
  const [displayNameConfirmed, setDisplayNameConfirmed] = useState(true)
  const [userAgeBand, setUserAgeBand] = useState<AgeBand>('25-39')
  const [verificationCode, setVerificationCode] = useState('123456')
  const [isRegisteredMember, setIsRegisteredMember] = useState(false)
  const [selectedBundle, setSelectedBundle] = useState<BundleOfferingId>('fitness-nutrition')
  const [bundlePrices, setBundlePrices] = useState<Record<BundleOfferingId, string>>({
    fitness: 'Pricing to be confirmed',
    nutrition: 'Pricing to be confirmed',
    fashion: 'Pricing to be confirmed',
    'fitness-nutrition': 'Pricing to be confirmed',
    'nutrition-fashion': 'Pricing to be confirmed',
    'all-three': 'Pricing to be confirmed',
  })
  const [selectedTier, setSelectedTier] = useState<AiServiceTierId>('Guest')

  // Memories & Personalization Opt-in State
  const [allowMemories, setAllowMemories] = useState(true)
  const [savedMemories, setSavedMemories] = useState([
    { id: 'mem-equip', category: 'Home Equipment', value: 'Dumbbells, Kettlebell & Flat Bench', enabled: true },
    { id: 'mem-move', category: 'Movement Preference', value: 'Prefer low-impact intervals; avoid squats on sore knee days', enabled: true },
    { id: 'mem-pantry', category: 'Kitchen Staples', value: 'Chicken breast, Jasmine rice, Spinach, Lemon, Olive oil, Chickpeas, Tofu', enabled: true },
    { id: 'mem-devices', category: 'Kitchen Appliances', value: 'Air fryer, Stovetop & Oven', enabled: true },
  ])

  // Usability Timing & Input Counters (First-time Guest vs Returning Member Fast-Path)
  const sessionStartRef = useRef<number>(Date.now())
  const [firstTimeInputCount, setFirstTimeInputCount] = useState(0)
  const [firstTimeElapsedMs, setFirstTimeElapsedMs] = useState<number | null>(null)
  const [returningInputCount, setReturningInputCount] = useState(0)
  const [returningElapsedMs, setReturningElapsedMs] = useState<number | null>(null)

  // Fitness Planner State
  const [goal, setGoal] = useState('I want to build a consistent fitness routine.')
  const [inputs, setInputs] = useState<FitnessPlan['input']>({ ...defaultInputs })
  const [candidate, setCandidate] = useState<{ plan: FitnessPlan; provenance: Provenance; goal: string } | null>(null)
  const [previousFitnessVersion, setPreviousFitnessVersion] = useState<{
    plan: FitnessPlan
    provenance: Provenance
    goal: string
  } | null>(null)
  const [selected, setSelected] = useState<typeof candidate>(null)
  const [completed, setCompleted] = useState<string[]>([])
  const [roadmapWeeks, setRoadmapWeeks] = useState<RoadmapWeeks>(8)
  const [simulateBenchUnavailable, setSimulateBenchUnavailable] = useState(false)
  const [simulateMissedSession, setSimulateMissedSession] = useState(false)

  // Nutrition Planner State
  const [nutritionGoal, setNutritionGoal] = useState(
    'I have chicken, rice, spinach and a lemon, plus an air fryer and a stovetop. I need two servings on the table in 30 minutes.'
  )
  const [nutritionInputs, setNutritionInputs] = useState<NutritionPreviewResult['plan']['input']>({
    ...defaultNutritionInputs,
  })
  const [kitchenDevices, setKitchenDevices] = useState<KitchenDeviceId[]>([...defaultKitchenDevices])
  const [pantryInventory, setPantryInventory] = useState<PantryItem[]>(
    defaultPantryInventory.map(p => ({ ...p }))
  )
  const [appliedSubstitutions, setAppliedSubstitutions] = useState<Record<string, string>>({})
  const [nutritionCandidate, setNutritionCandidate] = useState<NutritionPreviewResult | null>(null)
  const [previousNutritionVersion, setPreviousNutritionVersion] = useState<NutritionPreviewResult | null>(null)
  const [selectedNutrition, setSelectedNutrition] = useState<NutritionPreviewResult | null>(null)
  const [completedMeals, setCompletedMeals] = useState<string[]>([])
  const [nutritionSubView, setNutritionSubView] = useState<'overview' | 'cooking'>('overview')

  // Progress, Habit Stars & Support Feedback State
  const [activeDaysThisWeek, setActiveDaysThisWeek] = useState(1)
  const [checkInDaysThisWeek, setCheckInDaysThisWeek] = useState(1)
  const [useDemoHistoryWindow, setUseDemoHistoryWindow] = useState(false)
  const [experienceRating, setExperienceRating] = useState<number>(5)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [feedbackQueue, setFeedbackQueue] = useState<
    Array<{ id: string; rating: number; comment: string; owner: string; status: string; resolution: string }>
  >([
    {
      id: 'FB-101',
      rating: 4,
      comment: 'Sample entry: Would love a quick 15-minute kettlebell filter on phone portrait.',
      owner: 'Pilot Support Lead',
      status: 'Triaged · In Review',
      resolution: 'Added 15-minute preset bar in v0.7.4 proposal; does not affect Habit Stars.',
    },
  ])

  // Explore & Social State
  const [exploreSubTab, setExploreSubTab] = useState<'fashion' | 'local' | 'instagram' | 'domains'>('fashion')
  const [partnerDateRating, setPartnerDateRating] = useState(5)
  const [pairs, setPairs] = useState<ParticipantPair[]>(initialParticipantPairs)
  const [challenges, setChallenges] = useState<SharedBehaviorChallenge[]>(initialChallenges)

  // UI Alerts & Reset Confirmations
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [confirmClearSession, setConfirmClearSession] = useState(false)

  const shell = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    heading.current?.focus()
    shell.current?.scrollTo(0, 0)
  }, [screen])

  useEffect(() => {
    if (error) errorRef.current?.focus()
  }, [error])

  function go(next: Screen) {
    setNavigation(n => navigate(n, next))
    setError('')
    setNotice('')
  }

  useAndroidBack(() => {
    if (confirmReset || confirmClearSession) {
      setConfirmReset(false)
      setConfirmClearSession(false)
      return true
    }
    if (!navigation.history.length) return false
    setNavigation(n => navigateBack(n))
    setError('')
    setNotice('')
    return true
  })

  const currentTrialInfo = trialStageCatalog[trialStage]
  const currentTierInfo = aiServiceTiersCatalog.find(t => t.id === selectedTier) ?? aiServiceTiersCatalog[0]
  const comparisonEnabled = currentTierInfo.comparisonEnabled
  const activeWardrobe: GuideWardrobeRole = resolveActiveWardrobe(
    screen,
    exploreSubTab,
    nutritionSubView,
    guideAppearance.wardrobeOverride
  )
  const activeWardrobeMeta = wardrobeDescriptions[activeWardrobe]

  // Check if guest trial is expired and user hasn't registered a simulated member tier yet
  const isBlockedByTrialExpiry = trialStage === 'expired' && !isRegisteredMember

  async function prepareFitness(event?: FormEvent, customOverride?: { goal?: string; inputs?: FitnessPlan['input']; isFastPath?: boolean }) {
    if (event) event.preventDefault()
    setError('')
    if (isBlockedByTrialExpiry) {
      setError('Your 48-hour guest trial has expired. Complete mock email registration and choose a simulated plan tier to continue.')
      setShowRegistrationModal(true)
      return
    }
    const targetGoal = (customOverride?.goal ?? goal).trim()
    const targetInputs = customOverride?.inputs ?? inputs
    if (!targetGoal || targetGoal.length > 400) {
      setError('Enter a practical sample goal between 1 and 400 characters.')
      return
    }
    setBusy(true)
    const fastStart = performance.now()
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
    try {
      const result = makeSamplePlan({
        mode,
        profile: {
          guide,
          journey: 'fitness',
          dataOrigin: 'fictional',
          sampleId,
          adultEligibility: userAgeBand === '16-17' || userAgeBand === 'under-16' ? 'under-18' : 'adult',
          goal: targetGoal,
          units,
          inputs: targetInputs,
        },
      })
      if (candidate ?? selected) {
        setPreviousFitnessVersion(candidate ?? selected)
      }
      setCandidate({ ...result, goal: targetGoal })
      if (customOverride?.isFastPath) {
        setReturningElapsedMs(Math.max(120, Math.round(performance.now() - fastStart)))
      }
      if (screen === 'Your goal') {
        go('Fitness')
      } else {
        setNotice('Updated Fitness sample candidate. Review changes below and click "Use this plan for this session" to switch.')
      }
    } catch (e) {
      setError(
        e instanceof Error && !('issues' in e)
          ? e.message
          : 'Use 15–60 whole minutes and complete the required fields.'
      )
    } finally {
      setBusy(false)
    }
  }

  function handleGenerateNutrition(override?: {
    goal?: string
    input?: NutritionPreviewResult['plan']['input']
    devices?: KitchenDeviceId[]
    subs?: Record<string, string>
    isFastPath?: boolean
  }) {
    setError('')
    if (isBlockedByTrialExpiry) {
      setError('Your 48-hour guest trial has expired. Complete mock email registration and choose a simulated plan tier to continue.')
      setShowRegistrationModal(true)
      return
    }
    const targetGoal = (override?.goal ?? nutritionGoal).trim()
    const targetInput = override?.input ?? nutritionInputs
    const targetDevices = override?.devices ?? kitchenDevices
    const targetSubs = override?.subs ?? appliedSubstitutions

    if (!targetGoal || targetGoal.length > 400) {
      setError('Enter a practical Nutrition goal between 1 and 400 characters.')
      return
    }
    const fastStart = performance.now()
    try {
      const result = makeNutritionSamplePlan({
        mode,
        guide,
        goal: targetGoal,
        units,
        input: targetInput,
        devices: targetDevices,
        pantryInventory,
        appliedSubstitutions: targetSubs,
      })
      if (nutritionCandidate ?? selectedNutrition) {
        setPreviousNutritionVersion(nutritionCandidate ?? selectedNutrition)
      }
      setNutritionCandidate(result)
      if (override?.isFastPath) {
        setReturningElapsedMs(Math.max(110, Math.round(performance.now() - fastStart)))
      }
      if (screen === 'Your goal') {
        go('Nutrition')
      } else {
        setNotice('Nutrition sample plan updated. Review meals and consolidated shopping list below.')
      }
    } catch (e) {
      setError(
        e instanceof Error && !('issues' in e)
          ? e.message
          : 'Check required Nutrition fields: servings (1–12), meals (1–6), and if listing exclusions, include at least one ingredient.'
      )
    }
  }

  function applySubstitutionInMeal(mealId: string, subId: string) {
    const nextSubs = { ...appliedSubstitutions, [mealId]: subId }
    setAppliedSubstitutions(nextSubs)
    handleGenerateNutrition({ subs: nextSubs })
  }

  function restartWalkthroughOnly() {
    setConfirmReset(false)
    setMode('guided')
    setGoal('I want to build a consistent fitness routine.')
    setInputs({ ...defaultInputs })
    setCandidate(null)
    setPreviousFitnessVersion(null)
    setNutritionCandidate(null)
    setPreviousNutritionVersion(null)
    setAppliedSubstitutions({})
    setNavigation({ screen: 'Welcome', history: [] })
    setError('')
    setNotice('Walkthrough reset to guided defaults. Selected session plans and settings remain until you clear the session.')
  }

  function clearFullPreviewSession() {
    setConfirmClearSession(false)
    setConfirmReset(false)
    setGuide('Jane')
    setMode('guided')
    setUnits('us-customary')
    setSampleId('sample-a')
    setTrialStage('active')
    setIsRegisteredMember(false)
    setSelectedTier('Guest')
    setSelectedBundle('fitness-nutrition')
    setGoal('I want to build a consistent fitness routine.')
    setInputs({ ...defaultInputs })
    setCandidate(null)
    setPreviousFitnessVersion(null)
    setSelected(null)
    setCompleted([])
    setNutritionGoal(
      'I have chicken, rice, spinach and a lemon, plus an air fryer and a stovetop. I need two servings on the table in 30 minutes.'
    )
    setNutritionInputs({ ...defaultNutritionInputs })
    setKitchenDevices([...defaultKitchenDevices])
    setPantryInventory(defaultPantryInventory.map(p => ({ ...p })))
    setAppliedSubstitutions({})
    setNutritionCandidate(null)
    setPreviousNutritionVersion(null)
    setSelectedNutrition(null)
    setCompletedMeals([])
    setFirstTimeInputCount(0)
    setFirstTimeElapsedMs(null)
    setReturningInputCount(0)
    setReturningElapsedMs(null)
    sessionStartRef.current = Date.now()
    setNavigation({ screen: 'Welcome', history: [] })
    setError('')
    setNotice('')
  }

  const displayedFitness = candidate ?? selected
  const isFitnessSelected = displayedFitness !== null && displayedFitness === selected
  const fitnessDiff = displayedFitness
    ? compareFitnessPlans(previousFitnessVersion?.plan ?? null, displayedFitness.plan)
    : null
  const activeRoadmap = getFitnessRoadmap(roadmapWeeks, displayedFitness?.plan ?? null)

  const displayedNutrition = nutritionCandidate ?? selectedNutrition

  const habitStarWindows = calculateHabitStars({
    completedFitnessActionIds: completed,
    totalFitnessActionsInPlan: selected?.plan.actions.length ?? 0,
    completedNutritionMealIds: completedMeals,
    totalNutritionMealsInPlan: selectedNutrition?.plan.meals.length ?? 0,
    activeDaysThisWeek,
    checkInDaysThisWeek,
    useDemoHistoryWindow,
  })

  const greeting =
    guide === 'Jane'
      ? 'A small step is a good place to start.'
      : 'Let’s make room for a little movement and a good meal.'

  const primaryNavItems: Array<{ screen: Screen; icon: string; label: string }> = [
    { screen: 'Home', icon: '⌂', label: 'Home' },
    { screen: 'Fitness', icon: '↗', label: 'Fitness' },
    { screen: 'Nutrition', icon: '◒', label: 'Nutrition' },
    { screen: 'Progress', icon: '◷', label: 'Progress' },
    { screen: 'Explore', icon: '✧', label: 'Explore' },
    { screen: 'Friends', icon: '♡', label: 'Friends' },
    { screen: 'FAQs', icon: '?', label: 'FAQs & Pilot' },
  ]

  return (
    <div className={`app-shell theme-${resolvedTheme}`} data-theme={resolvedTheme} ref={shell}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Top Masthead */}
      <header className="masthead">
        <button
          className="wordmark"
          onClick={() => go(candidate || nutritionCandidate ? 'Home' : 'Welcome')}
          aria-label="You and Me home"
        >
          You<span>&</span>Me<span className="brand-dot">.</span>
        </button>
        <span className="prototype-label">Investor prototype</span>
        <span className="tag">16+ Product · 18+ Pilot</span>

        <div className="masthead-actions">
          <div className="theme-pill-group" role="group" aria-label="Color theme">
            {(['system', 'light', 'dark'] as const).map(t => (
              <button
                key={t}
                type="button"
                className="theme-btn"
                aria-pressed={themePreference === t}
                onClick={() => setThemePreference(t)}
              >
                {t === 'system' ? 'System' : t === 'light' ? 'Light' : 'Dark'}
              </button>
            ))}
          </div>
          <button className="settings-link" onClick={() => go('Settings')}>
            Profile & Settings
          </button>
        </div>
      </header>

      {/* Mode, Trial Clock & Provenance Strip */}
      <div className="mode-strip" role="region" aria-label="Mode and 48-hour trial controls">
        <div className="mode-strip-left">
          <span>{modeLabel(mode)}</span>
          <span aria-hidden="true">·</span>
          <span>
            {isRegisteredMember
              ? `Simulated Member (${selectedTier} · ${bundleOfferingsCatalog.find(b => b.id === selectedBundle)?.title})`
              : `${currentTrialInfo.label} (${currentTrialInfo.fictionalNow})`}
          </span>
        </div>
        <div className="mode-strip-right">
          <span className="fine">Simulate 48h Guest Trial:</span>
          {(['active', 'near-expiry', 'expired'] as const).map(st => (
            <button
              key={st}
              type="button"
              className="mini-control-btn"
              aria-pressed={trialStage === st}
              onClick={() => {
                setTrialStage(st)
                if (st === 'expired' && !isRegisteredMember) {
                  setShowRegistrationModal(true)
                }
              }}
            >
              {st === 'active' ? 'Start (48h)' : st === 'near-expiry' ? 'Near Expiry (2h)' : 'Expired (0h)'}
            </button>
          ))}
          <button
            type="button"
            className="mini-control-btn accent"
            onClick={() => setShowRegistrationModal(s => !s)}
          >
            {isRegisteredMember ? 'Tier & Bundles' : 'Register / Tiers'}
          </button>
          <span>In memory only · refresh resets this preview</span>
        </div>
      </div>

      {/* Near-Expiry or Expired Banner + Registration & Subscription Matrix Drawer */}
      {(trialStage !== 'active' || showRegistrationModal) && (
        <section className="trial-drawer card" aria-label="Guest trial and simulated membership registration">
          <div className="section-heading">
            <p className="eyebrow">48-HOUR GUEST TRIAL & SIMULATED MEMBERSHIP HANDOFF</p>
            <span className="tag">Simulation · no charge · no real email or payment SDK</span>
          </div>
          <p>
            <strong>{currentTrialInfo.bannerMessage}</strong>
          </p>

          <div className="field-row">
            <div className="card soft stack-sm">
              <h3>Step 1: Mock Email, Confirmed Display Name & Age Screen</h3>
              <label htmlFor="reg-email">Email address (mock inbox verification)</label>
              <input
                id="reg-email"
                type="email"
                value={mockEmail}
                onChange={e => setMockEmail(e.target.value)}
              />
              <label htmlFor="reg-code">Simulated 6-digit inbox code (verifies inbox control, not legal name or age)</label>
              <input
                id="reg-code"
                type="text"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
              />
              <label htmlFor="reg-name">Chosen display name</label>
              <input
                id="reg-name"
                type="text"
                value={mockDisplayName}
                onChange={e => setMockDisplayName(e.target.value)}
              />
              <label className="inline-check">
                <input
                  type="checkbox"
                  checked={displayNameConfirmed}
                  onChange={e => setDisplayNameConfirmed(e.target.checked)}
                />
                I confirm this display name and consent to transfer my current guest preferences
              </label>

              <label htmlFor="reg-age-band">Separate Age-Band Screen (No exact birth date or government ID stored)</label>
              <select
                id="reg-age-band"
                value={userAgeBand}
                onChange={e => {
                  const nextAge = e.target.value as AgeBand
                  setUserAgeBand(nextAge)
                  const info = ageBandCatalog.find(a => a.id === nextAge)
                  if (info) {
                    setGuideAppearance(prev => ({ ...prev, ageLook: info.suggestedGuideAge }))
                  }
                }}
              >
                {ageBandCatalog.map(ab => (
                  <option key={ab.id} value={ab.id}>
                    {ab.label}
                  </option>
                ))}
              </select>
              <p className="fine">
                {ageBandCatalog.find(a => a.id === userAgeBand)?.policyNote}
              </p>
            </div>

            <div className="card soft stack-sm">
              <h3>Step 2: Choose Journey Bundle & AI Recall Tier (Simulation · no charge)</h3>
              <label htmlFor="bundle-select">Journey Offering (All 6 requested combinations)</label>
              <select
                id="bundle-select"
                value={selectedBundle}
                onChange={e => setSelectedBundle(e.target.value as BundleOfferingId)}
              >
                {bundleOfferingsCatalog.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.title} — {b.statusBadge} ({bundlePrices[b.id]})
                  </option>
                ))}
              </select>

              <label htmlFor="bundle-price-config">
                Configurable price field for {bundleOfferingsCatalog.find(b => b.id === selectedBundle)?.title}
              </label>
              <input
                id="bundle-price-config"
                type="text"
                value={bundlePrices[selectedBundle]}
                onChange={e =>
                  setBundlePrices(prev => ({ ...prev, [selectedBundle]: e.target.value }))
                }
              />
              <p className="fine">
                Currency, prices, taxes, usage caps, and billing terms remain open for commercial review.
              </p>

              <label htmlFor="tier-select">AI Capability & Recall Window Tier</label>
              <select
                id="tier-select"
                value={selectedTier}
                onChange={e => setSelectedTier(e.target.value as AiServiceTierId)}
              >
                {aiServiceTiersCatalog.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.label} ({t.recallWindow})
                  </option>
                ))}
              </select>
              <p className="fine">
                <strong>Proposed service:</strong> {currentTierInfo.proposedService} <br />
                <strong>Downgrade & retention rule:</strong> {currentTierInfo.downgradeNote}
              </p>

              <div className="button-row">
                <button
                  type="button"
                  className="primary"
                  disabled={userAgeBand === 'under-16' || !displayNameConfirmed}
                  onClick={() => {
                    setIsRegisteredMember(true)
                    if (selectedTier === 'Guest') setSelectedTier('Plus')
                    setShowRegistrationModal(false)
                    setNotice(
                      `Simulated membership active (${selectedTier === 'Guest' ? 'Plus' : selectedTier} · ${bundleOfferingsCatalog.find(b => b.id === selectedBundle)?.title}). Simulation · no charge.`
                    )
                  }}
                >
                  Activate Simulated Membership (No Charge)
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setShowRegistrationModal(false)}
                >
                  Close panel
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Workspace: Navigation + Main Content + Reserved Guide Side Rail */}
      <div className="workspace">
        <nav className="navigation" aria-label="Main navigation">
          {primaryNavItems.map(item => (
            <button
              key={item.screen}
              aria-current={screen === item.screen ? 'page' : undefined}
              onClick={() => go(item.screen)}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <main id="main-content">
          <div className="section-heading">
            <p className="eyebrow">YOUR EVERYDAY, WITH INTENTION</p>
            <span className="design-note">New design proposal · v0.7.4</span>
          </div>

          <h1 ref={heading} tabIndex={-1}>
            {screen === 'Welcome'
              ? 'Make a plan that fits your day.\nA little structure. More room for you.'
              : screen === 'Your goal'
                ? 'Choose your journey and inputs.'
                : screen === 'Home'
                  ? 'One good next step.'
                  : screen === 'Fitness'
                    ? 'Your movement session.'
                    : screen === 'Nutrition'
                      ? 'Cook from your kitchen.'
                      : screen === 'Progress'
                        ? 'Small steps & Habit Stars.'
                        : screen === 'Friends'
                          ? 'Friends & Challenges.'
                          : screen === 'FAQs'
                            ? 'FAQs & 45-Day Pilot Handoff.'
                            : screen === 'Settings'
                              ? 'Make yourself at home.'
                              : 'More of life, in view.'}
          </h1>

          {error && (
            <div className="error" role="alert" ref={errorRef} tabIndex={-1}>
              {error}
            </div>
          )}
          {notice && (
            <p className="notice" role="status">
              {notice}
            </p>
          )}

          {/* SCREEN 1: WELCOME */}
          {screen === 'Welcome' && (
            <div className="welcome-grid">
              <section className="welcome-copy">
                <p className="lead">
                  You&Me is a guided lifestyle planner for people aged 16 and up. Turn what you have on hand, how much
                  time you have, and where you want to go into a decision you can act on today.
                </p>

                <div className="guide-intro card soft">
                  <GuidePortraitSvg
                    guide={guide}
                    appearance={guideAppearance}
                    wardrobe={activeWardrobe}
                    size={64}
                  />
                  <div>
                    <span className="tag">AI Guide · Not a licensed clinician</span>
                    <div>
                      <strong>{guide}, your guide</strong> ({ageLookLabels[guideAppearance.ageLook]} ·{' '}
                      {activeWardrobeMeta.title})
                    </div>
                    <p>{greeting}</p>
                  </div>
                </div>

                <fieldset className="guide-choice">
                  <legend>Choose your AI guide (Jane default, Kay selectable)</legend>
                  {(['Jane', 'Kay'] as const).map(name => (
                    <button
                      key={name}
                      type="button"
                      aria-pressed={guide === name}
                      onClick={() => setGuide(name)}
                    >
                      {name}
                      <small>
                        {name === 'Jane'
                          ? 'Warm, empathetic & structured'
                          : 'Friendly, grounded & practical'}
                      </small>
                    </button>
                  ))}
                </fieldset>

                <div className="field-row">
                  <div>
                    <label htmlFor="welcome-guide-age">Guide apparent age / mentor look</label>
                    <select
                      id="welcome-guide-age"
                      value={guideAppearance.ageLook}
                      onChange={e =>
                        setGuideAppearance({
                          ...guideAppearance,
                          ageLook: e.target.value as GuideAgeLook,
                        })
                      }
                    >
                      <option value="20s-peer">20s Peer</option>
                      <option value="30s-peer">30s Peer</option>
                      <option value="45-mentor">45-ish Mentor (popular with young adults & peers)</option>
                      <option value="60s-mentor">60s Seasoned Mentor</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="welcome-guide-skin">Guide complexion</label>
                    <select
                      id="welcome-guide-skin"
                      value={guideAppearance.skinTone}
                      onChange={e =>
                        setGuideAppearance({
                          ...guideAppearance,
                          skinTone: e.target.value as GuideSkinTone,
                        })
                      }
                    >
                      <option value="warm-amber">Warm Amber</option>
                      <option value="deep-espresso">Deep Espresso</option>
                      <option value="olive-sand">Olive Sand</option>
                      <option value="fair-rose">Fair Rose</option>
                    </select>
                  </div>
                </div>

                <p className="muted">
                  Same capabilities. Different wording. Proposed custom vector portraits adapt wardrobe to your active
                  task.
                </p>

                <div className="button-row">
                  <button
                    type="button"
                    className="primary"
                    onClick={() => {
                      sessionStartRef.current = Date.now()
                      go('Your goal')
                    }}
                  >
                    Try standard guidance for 48 hours <span aria-hidden="true">↗</span>
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => setShowRegistrationModal(true)}
                  >
                    Email registration & plan tiers
                  </button>
                </div>
                <p className="fine">
                  Fictional sample profile · no live AI · responses are tailored to the information you enter and the
                  memories you allow You&Me to use.
                </p>
              </section>

              <aside className="welcome-card">
                <div className="orbit" aria-hidden="true">
                  <span>you</span>
                </div>
                <p className="eyebrow">DECISIONS YOU CAN ACT ON IN 5 MINUTES</p>
                <h2>
                  Your day.
                  <br />
                  Your pace.
                </h2>
                <p>
                  <strong>Working now:</strong> Home Fitness (15–60 min) & Kitchen Nutrition (15–180 min + shopping
                  list).
                  <br />
                  <strong>Upcoming previews:</strong> Dress for an Occasion & Local Date Night.
                </p>
                <div className="mini-tags">
                  <span>Fitness Planner</span>
                  <span>Kitchen & Shopping List</span>
                  <span>48h Guest Trial</span>
                  <span>Habit Stars</span>
                </div>
              </aside>
            </div>
          )}

          {/* SCREEN 2: CHOOSE YOUR JOURNEY & INPUTS ('Your goal') */}
          {screen === 'Your goal' && (
            <div className="stack-lg">
              {/* Returning Member Fast-Path Card vs First-Time Guest */}
              <section className="card featured" aria-label="Returning member fast path">
                <div className="section-heading">
                  <p className="eyebrow">FAST-PATH FOR RETURNING MEMBERS · SAVED PREFERENCES & MEMORIES</p>
                  <span className="tag">Measured separately from first-time guest flow</span>
                </div>
                <h2>Returning Member? Confirm what You&Me remembers & generate in 1 step</h2>
                <p>
                  Remembered equipment: <strong>Dumbbells, Kettlebell, Bench (No squats today)</strong> · Remembered
                  pantry: <strong>Chicken, Rice, Spinach, Lemon (Air fryer + Stovetop · 2 servings in 30m)</strong>.
                </p>
                <div className="button-row">
                  <button
                    type="button"
                    className="primary"
                    onClick={() => {
                      const nextInputs = {
                        experience: 'intermediate' as const,
                        durationMinutes: 30,
                        equipment: ['dumbbells', 'kettlebells', 'bench'],
                        excludedMovements: ['squat'],
                      }
                      const nextGoal =
                        'I have 30 minutes, dumbbells, a kettlebell and a bench. I don’t want to do squats today.'
                      setGoal(nextGoal)
                      setInputs(nextInputs)
                      setReturningInputCount(c => c + 1)
                      void prepareFitness(undefined, {
                        goal: nextGoal,
                        inputs: nextInputs,
                        isFastPath: true,
                      })
                    }}
                  >
                    Fast-Path: Generate 30m Home Workout (Dumbbells + Kettlebell + Bench, No Squats) ↗
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
                      const nextInput = {
                        ...defaultNutritionInputs,
                        meals: 1,
                        servings: 2,
                        preparationMinutes: 30,
                      }
                      const nextDevs: KitchenDeviceId[] = ['air-fryer', 'stovetop']
                      setNutritionInputs(nextInput)
                      setKitchenDevices(nextDevs)
                      setReturningInputCount(c => c + 1)
                      handleGenerateNutrition({
                        goal: 'I have chicken, rice, spinach and a lemon, plus an air fryer and a stovetop. I need two servings on the table in 30 minutes.',
                        input: nextInput,
                        devices: nextDevs,
                        isFastPath: true,
                      })
                    }}
                  >
                    Fast-Path: Generate 30m Kitchen Meal (Chicken, Rice, Spinach & Lemon · 2 Servings) ↗
                  </button>
                </div>
              </section>

              {/* Journey Selector & Fictional Profile Summary */}
              <div className="content-grid">
                <div className="card form-card">
                  <div className="section-heading">
                    <span className="tag">
                      Fictional {sampleId === 'sample-a' ? 'Sample A' : 'Sample B'} · Editable defaults
                    </span>
                    <span className="fine">Sample A/B are fixture IDs, not guide identities</span>
                  </div>

                  <fieldset className="guide-choice">
                    <legend>1. Choose your working journey outcome</legend>
                    <button
                      type="button"
                      aria-pressed={activeJourneyChoice === 'fitness'}
                      onClick={() => setActiveJourneyChoice('fitness')}
                    >
                      Fitness · Plan one workout
                      <small>15–60 min ordered session with warm-up, intervals & cooldown</small>
                    </button>
                    <button
                      type="button"
                      aria-pressed={activeJourneyChoice === 'nutrition'}
                      onClick={() => setActiveJourneyChoice('nutrition')}
                    >
                      Nutrition · Plan one day of meals
                      <small>15–180 min recipes, substitutions & pantry vs shortage list</small>
                    </button>
                  </fieldset>

                  <div className="field-row">
                    <div>
                      <label htmlFor="sample-fixture-select">Fictional sample profile</label>
                      <select
                        id="sample-fixture-select"
                        value={sampleId}
                        onChange={e => {
                          setSampleId(e.target.value as 'sample-a' | 'sample-b')
                          setFirstTimeInputCount(c => c + 1)
                        }}
                      >
                        <option value="sample-a">Sample A · Weeknight Home Routine (Fictional)</option>
                        <option value="sample-b">Sample B · Busy Dual-Schedule Household (Fictional)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="setup-mode-select">Guidance mode</label>
                      <select
                        id="setup-mode-select"
                        value={mode}
                        onChange={e => {
                          setMode(e.target.value as 'guided' | 'demo')
                          setFirstTimeInputCount(c => c + 1)
                        }}
                      >
                        <option value="guided">Guided mode (prefills & explains)</option>
                        <option value="demo">Demo mode (explore supported fixtures freely)</option>
                      </select>
                    </div>
                  </div>

                  {activeJourneyChoice === 'fitness' ? (
                    <form onSubmit={e => void prepareFitness(e)} noValidate>
                      <label htmlFor="goal">What would you like to make room for?</label>
                      <textarea
                        id="goal"
                        value={goal}
                        maxLength={400}
                        onChange={e => {
                          setGoal(e.target.value)
                          setFirstTimeInputCount(c => c + 1)
                        }}
                        rows={3}
                      />
                      <p className="help">
                        A practice goal for this sample, not medical guidance. Goal wording is displayed; concerning
                        symptoms or injury prescriptions are declined.
                      </p>

                      <div className="field-row">
                        <div>
                          <label htmlFor="experience">Experience</label>
                          <select
                            id="experience"
                            value={inputs.experience}
                            onChange={e => {
                              setInputs({
                                ...inputs,
                                experience: e.target.value as FitnessPlan['input']['experience'],
                              })
                              setFirstTimeInputCount(c => c + 1)
                            }}
                          >
                            <option value="beginner">Beginner (default)</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="duration">Available minutes (15–60 whole minutes)</label>
                          <input
                            id="duration"
                            type="number"
                            min={15}
                            max={60}
                            step={1}
                            value={Number.isNaN(inputs.durationMinutes) ? '' : inputs.durationMinutes}
                            onChange={e => {
                              setInputs({
                                ...inputs,
                                durationMinutes: e.target.value === '' ? NaN : Number(e.target.value),
                              })
                              setFirstTimeInputCount(c => c + 1)
                            }}
                            aria-describedby="duration-help"
                          />
                          <small id="duration-help">Default: 20 minutes. Rejects &lt;15 or &gt;60.</small>
                        </div>
                      </div>

                      <fieldset className="exclusions">
                        <legend>Available equipment (Multi-select · Default: No equipment)</legend>
                        <div className="checkbox-grid">
                          {equipmentCatalog
                            .filter(eq => eq.id !== 'none')
                            .map(eq => (
                              <label key={eq.id}>
                                <input
                                  type="checkbox"
                                  checked={inputs.equipment.includes(eq.id)}
                                  onChange={e => {
                                    const nextEq = e.target.checked
                                      ? [...inputs.equipment, eq.id]
                                      : inputs.equipment.filter(x => x !== eq.id)
                                    setInputs({ ...inputs, equipment: nextEq })
                                    setFirstTimeInputCount(c => c + 1)
                                  }}
                                />
                                {eq.label}{' '}
                                <small className="muted">
                                  ({eq.supported ? eq.note : 'Unavailable in fixture · tests rejection'})
                                </small>
                              </label>
                            ))}
                        </div>
                      </fieldset>

                      <label htmlFor="intensity">
                        Preferred intensity <span className="muted">(optional · skippable)</span>
                      </label>
                      <select
                        id="intensity"
                        value={inputs.intensity ?? ''}
                        onChange={e => {
                          setInputs({
                            ...inputs,
                            intensity: (e.target.value || undefined) as FitnessPlan['input']['intensity'],
                          })
                          setFirstTimeInputCount(c => c + 1)
                        }}
                      >
                        <option value="">Unspecified · use conservative low intensity</option>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate · unavailable in this sample</option>
                        <option value="high">High · unavailable in this sample</option>
                      </select>

                      <fieldset className="exclusions">
                        <legend>
                          Movements to avoid <span className="muted">(optional · skippable)</span>
                        </legend>
                        <div className="checkbox-grid">
                          {extendedMovementOptions.map(m => (
                            <label key={m.id}>
                              <input
                                type="checkbox"
                                checked={inputs.excludedMovements?.includes(m.id) ?? false}
                                onChange={e => {
                                  const nextEx = e.target.checked
                                    ? [...(inputs.excludedMovements ?? []), m.id]
                                    : inputs.excludedMovements?.filter(x => x !== m.id)
                                  setInputs({ ...inputs, excludedMovements: nextEx })
                                  setFirstTimeInputCount(c => c + 1)
                                }}
                              />
                              {m.label}
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <button className="primary" disabled={busy} type="submit">
                        {busy ? 'Preparing local sample…' : 'Preview sample plan'}
                      </button>
                    </form>
                  ) : (
                    <div className="stack-md">
                      <p className="help">
                        Configure your one-day meal plan, pantry inventory, appliances, and allergy acknowledgement
                        below or directly in the full Nutrition planner.
                      </p>
                      <button
                        type="button"
                        className="primary"
                        onClick={() => handleGenerateNutrition()}
                      >
                        Preview Nutrition Sample Plan & Shopping List ↗
                      </button>
                    </div>
                  )}
                </div>

                <aside className="card soft stack-sm">
                  <p className="eyebrow">BEFORE YOU GENERATE</p>
                  <h2>Transparent inputs. Instant deterministic preview.</h2>
                  <p>
                    <strong>Guide:</strong> {guide} ({activeWardrobeMeta.title})
                  </p>
                  <p>
                    <strong>Profile origin:</strong> Fictional {sampleId.toUpperCase()} · {units}
                  </p>
                  <p>
                    <strong>Memory disclosure:</strong> Responses are tailored to the information you enter and the
                    memories you allow You&Me to use ({allowMemories ? 'Memories enabled' : 'Memories opted out'}).
                  </p>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => go(candidate || nutritionCandidate ? 'Home' : 'Welcome')}
                  >
                    ← Back
                  </button>
                </aside>
              </div>
            </div>
          )}

          {/* SCREEN 3: HOME */}
          {screen === 'Home' && (
            <div className="stack-lg">
              <p className="lead">
                {guide} ({activeWardrobeMeta.title}): {greeting}
              </p>

              <div className="content-grid">
                <section className="card featured">
                  <p className="eyebrow">WORKING JOURNEY 1 · FITNESS AT HOME</p>
                  <h2>{selected ? selected.goal : goal}</h2>
                  <p>
                    {displayedFitness
                      ? `${displayedFitness.plan.input.durationMinutes} min session (${displayedFitness.plan.actions.length} blocks) · Equipment: ${displayedFitness.plan.input.equipment.join(', ') || 'Bodyweight only'}.`
                      : 'No Fitness session generated yet. Start with 20 minutes & no equipment or customize your home gym.'}
                  </p>
                  <p className="fine">
                    Next Fitness action:{' '}
                    <strong>
                      {selected
                        ? selected.plan.actions.find(a => !completed.includes(a.id))?.title ??
                          'All workout blocks complete!'
                        : 'Select a workout session to track actions'}
                    </strong>
                  </p>
                  <div className="button-row">
                    <button
                      type="button"
                      className="primary"
                      onClick={() => go(displayedFitness ? 'Fitness' : 'Your goal')}
                    >
                      {displayedFitness ? 'Continue Fitness Plan' : 'Plan a Workout'} ↗
                    </button>
                  </div>
                </section>

                <section className="card featured">
                  <p className="eyebrow">WORKING JOURNEY 2 · COOK FROM YOUR KITCHEN</p>
                  <h2>{selectedNutrition ? selectedNutrition.goal : nutritionGoal}</h2>
                  <p>
                    {displayedNutrition
                      ? `${displayedNutrition.plan.input.dietaryPattern} · ${displayedNutrition.plan.meals.length} meal(s) · ${displayedNutrition.plan.input.servings} serving(s) · ${displayedNutrition.elapsedCookBudgetMinutes}m max elapsed cook time.`
                      : 'Confirm pantry, appliances, servings, and exclusions to generate a 1-day meal plan and consolidated shopping list.'}
                  </p>
                  <p className="fine">
                    Next Nutrition action:{' '}
                    <strong>
                      {selectedNutrition
                        ? selectedNutrition.plan.meals.find(m => !completedMeals.includes(m.id))?.title ??
                          'All meals marked prepared!'
                        : 'Generate & select a meal plan to track meals'}
                    </strong>
                  </p>
                  <div className="button-row">
                    <button
                      type="button"
                      className="primary"
                      onClick={() => {
                        if (!displayedNutrition) handleGenerateNutrition()
                        go('Nutrition')
                      }}
                    >
                      {displayedNutrition ? 'Continue Nutrition Plan' : 'Plan One Day of Meals'} ↗
                    </button>
                  </div>
                </section>
              </div>

              {/* Prominent Upcoming Journeys: Fashion & Local Plans */}
              <section className="future-section" aria-label="Upcoming journeys and quick destinations">
                <h2>Prominent Upcoming Journeys & Pilot Destinations</h2>
                <div className="preview-grid">
                  <article className="card soft">
                    <p className="eyebrow">UPCOMING JOURNEY · PREVIEW PROTOTYPE</p>
                    <h3>Dress for an Occasion (Fashion)</h3>
                    <p>
                      Compare game-day casual, business casual, gym wear, and black-tie combinations from sample text,
                      voice transcripts, and garment-only photos.
                    </p>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => {
                        setExploreSubTab('fashion')
                        go('Explore')
                      }}
                    >
                      Explore Occasion Stylist Preview →
                    </button>
                  </article>

                  <article className="card soft">
                    <p className="eyebrow">UPCOMING JOURNEY · PREVIEW PROTOTYPE</p>
                    <h3>Plan a Date Night or Dinner In (Local Plans)</h3>
                    <p>
                      Compare quiet neighborhood dine-in, takeaway, and delivery options aligned with your Nutrition
                      preferences and private partner ratings.
                    </p>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => {
                        setExploreSubTab('local')
                        go('Explore')
                      }}
                    >
                      Explore Date Night Preview →
                    </button>
                  </article>

                  <article className="card soft">
                    <p className="eyebrow">HABIT STARS & SOCIAL PAIRING</p>
                    <h3>Progress, Friends & 45-Day Pilot</h3>
                    <p>
                      Inspect your 70/20/10 Habit Stars, test participant ID pairing & unilateral unlink, or review
                      FAQs and pilot checkpoints.
                    </p>
                    <div className="button-row">
                      <button type="button" className="text-button" onClick={() => go('Progress')}>
                        Habit Stars →
                      </button>
                      <button type="button" className="text-button" onClick={() => go('Friends')}>
                        Friends & Challenges →
                      </button>
                      <button type="button" className="text-button" onClick={() => go('FAQs')}>
                        FAQs & Pilot →
                      </button>
                    </div>
                  </article>
                </div>
              </section>
            </div>
          )}

          {/* SCREEN 4: FITNESS PLANNER */}
          {screen === 'Fitness' && (
            <div className="stack-lg">
              {/* Reviewer Comparison Preset Bar */}
              <section className="card soft" aria-label="Fitness reviewer comparison presets">
                <div className="section-heading">
                  <p className="eyebrow">REVIEWER SCENARIO PRESETS · FITNESS</p>
                  <span className="fine">Start with 20m / no equipment, then compare 15m / dumbbells / no squats</span>
                </div>
                <div className="button-row">
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
                      const nextInputs = { ...defaultInputs }
                      setGoal('Build a consistent 20-minute bodyweight routine.')
                      setInputs(nextInputs)
                      void prepareFitness(undefined, {
                        goal: 'Build a consistent 20-minute bodyweight routine.',
                        inputs: nextInputs,
                      })
                    }}
                  >
                    1. Start Baseline: 20 min · No Equipment · Beginner
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
                      const nextInputs = {
                        experience: 'beginner' as const,
                        durationMinutes: 15,
                        equipment: ['dumbbells'],
                        excludedMovements: ['squat'],
                      }
                      const nextGoal = '15 minutes with dumbbells, avoiding squats today.'
                      setGoal(nextGoal)
                      setInputs(nextInputs)
                      void prepareFitness(undefined, { goal: nextGoal, inputs: nextInputs })
                    }}
                  >
                    2. Reviewer Comparison: 15 min · Dumbbells · No Squats
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
                      const nextInputs = {
                        experience: 'intermediate' as const,
                        durationMinutes: 30,
                        equipment: ['dumbbells', 'kettlebells', 'bench'],
                        excludedMovements: ['squat'],
                      }
                      const nextGoal =
                        'I have 30 minutes, dumbbells, a kettlebell and a bench. I don’t want to do squats today.'
                      setGoal(nextGoal)
                      setInputs(nextInputs)
                      void prepareFitness(undefined, { goal: nextGoal, inputs: nextInputs })
                    }}
                  >
                    3. Home Gym Prompt: 30 min · Dumbbells + Kettlebell + Bench · No Squats
                  </button>
                </div>
              </section>

              {/* Inline Editable Fitness Constraints */}
              <details className="card form-card" open={!displayedFitness}>
                <summary>
                  <strong>
                    {displayedFitness
                      ? `Edit Fitness Constraints (${inputs.durationMinutes} min · ${inputs.equipment.join(', ') || 'No equipment'} · Exclude: ${inputs.excludedMovements?.join(', ') || 'None'})`
                      : 'Configure Fitness Constraints (15–60 whole minutes)'}
                  </strong>
                </summary>
                <form onSubmit={e => void prepareFitness(e)} noValidate className="stack-sm">
                  <label htmlFor="fit-inline-goal">Workout Goal Note</label>
                  <input
                    id="fit-inline-goal"
                    type="text"
                    value={goal}
                    onChange={e => setGoal(e.target.value)}
                  />
                  <div className="field-row">
                    <div>
                      <label htmlFor="fit-inline-duration">Duration (15–60 whole minutes)</label>
                      <input
                        id="fit-inline-duration"
                        type="number"
                        min={15}
                        max={60}
                        step={1}
                        value={Number.isNaN(inputs.durationMinutes) ? '' : inputs.durationMinutes}
                        onChange={e =>
                          setInputs({
                            ...inputs,
                            durationMinutes: e.target.value === '' ? NaN : Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="fit-inline-exp">Experience level</label>
                      <select
                        id="fit-inline-exp"
                        value={inputs.experience}
                        onChange={e =>
                          setInputs({
                            ...inputs,
                            experience: e.target.value as FitnessPlan['input']['experience'],
                          })
                        }
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <fieldset className="exclusions">
                    <legend>Equipment Multi-Select</legend>
                    <div className="checkbox-grid">
                      {equipmentCatalog
                        .filter(eq => eq.id !== 'none')
                        .map(eq => (
                          <label key={eq.id}>
                            <input
                              type="checkbox"
                              checked={inputs.equipment.includes(eq.id)}
                              onChange={e => {
                                const nextEq = e.target.checked
                                  ? [...inputs.equipment, eq.id]
                                  : inputs.equipment.filter(x => x !== eq.id)
                                setInputs({ ...inputs, equipment: nextEq })
                              }}
                            />
                            {eq.label} {!eq.supported && <small className="muted">(Unavailable)</small>}
                          </label>
                        ))}
                    </div>
                  </fieldset>

                  <fieldset className="exclusions">
                    <legend>Movements to Exclude</legend>
                    <div className="checkbox-grid">
                      {extendedMovementOptions.map(m => (
                        <label key={m.id}>
                          <input
                            type="checkbox"
                            checked={inputs.excludedMovements?.includes(m.id) ?? false}
                            onChange={e => {
                              const nextEx = e.target.checked
                                ? [...(inputs.excludedMovements ?? []), m.id]
                                : inputs.excludedMovements?.filter(x => x !== m.id)
                              setInputs({ ...inputs, excludedMovements: nextEx })
                            }}
                          />
                          Exclude {m.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <button type="submit" className="primary" disabled={busy}>
                    {displayedFitness ? 'Update sample plan' : 'Preview sample plan'}
                  </button>
                </form>
              </details>

              {displayedFitness ? (
                <>
                  {fitnessDiff && fitnessDiff.changed && (
                    <div className="notice" role="status">
                      <strong>What changed & why on regeneration:</strong>
                      <ul>
                        {fitnessDiff.summaryPoints.map(pt => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {comparisonEnabled && previousFitnessVersion && previousFitnessVersion !== displayedFitness && (
                    <section className="card soft" aria-label="Side-by-side Fitness version comparison">
                      <p className="eyebrow">SIMULATED PLUS / PRO · SIDE-BY-SIDE VERSION COMPARISON</p>
                      <div className="field-row">
                        <div>
                          <h3>Previous / Selected Version ({previousFitnessVersion.plan.input.durationMinutes} min)</h3>
                          <p className="fine">
                            Equipment: {previousFitnessVersion.plan.input.equipment.join(', ') || 'None'} · Excluded:{' '}
                            {previousFitnessVersion.plan.input.excludedMovements?.join(', ') || 'None'}
                          </p>
                          <ul>
                            {previousFitnessVersion.plan.actions.map(a => (
                              <li key={a.id}>
                                {a.title} ({(a.workSeconds + a.restSeconds) / 60} min)
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3>Current Candidate Version ({displayedFitness.plan.input.durationMinutes} min)</h3>
                          <p className="fine">
                            Equipment: {displayedFitness.plan.input.equipment.join(', ') || 'None'} · Excluded:{' '}
                            {displayedFitness.plan.input.excludedMovements?.join(', ') || 'None'}
                          </p>
                          <ul>
                            {displayedFitness.plan.actions.map(a => (
                              <li key={a.id}>
                                {a.title} ({(a.workSeconds + a.restSeconds) / 60} min)
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  )}

                  <div className="plan-layout">
                    <aside className="card plan-summary">
                      <p className="tag">{modeLabel(displayedFitness.provenance.mode as 'guided' | 'demo')}</p>
                      <p className="duration">
                        <strong>{displayedFitness.plan.estimatedTotalSeconds / 60}</strong> min
                      </p>
                      <h2>Move at your own pace.</h2>
                      <p>{displayedFitness.plan.explanation}</p>
                      <dl>
                        <dt>Sample goal used</dt>
                        <dd>{displayedFitness.goal}</dd>
                        <dt>Experience used</dt>
                        <dd>{displayedFitness.plan.input.experience}</dd>
                        <dt>Equipment used</dt>
                        <dd>{displayedFitness.plan.input.equipment.join(', ') || 'None'}</dd>
                        <dt>Exclusions used</dt>
                        <dd>{displayedFitness.plan.input.excludedMovements?.join(', ') || 'Unspecified'}</dd>
                        <dt>Component timing validation</dt>
                        <dd>
                          Sum of blocks = {displayedFitness.plan.estimatedTotalSeconds}s (
                          {displayedFitness.plan.estimatedTotalSeconds / 60} min) · Fits budget
                        </dd>
                        <dt>Original source</dt>
                        <dd>Sample · fitness-bounded-v1</dd>
                      </dl>
                      <p className="fine">
                        Created {new Date(displayedFitness.provenance.createdAt).toLocaleTimeString()} · no provider
                        call
                      </p>

                      {!isFitnessSelected && (
                        <button
                          className="primary"
                          onClick={() => {
                            setSelected(displayedFitness)
                            setCompleted([])
                            setNotice('Plan selected for this session. Refresh will reset it.')
                          }}
                        >
                          Use this plan for this session
                        </button>
                      )}
                      {isFitnessSelected && (
                        <p role="status" className="selected-note">
                          ✓ Using this plan · {completed.length} / {displayedFitness.plan.actions.length} actions
                          complete
                        </p>
                      )}
                      {selected && selected !== displayedFitness && (
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => {
                            setCandidate(selected)
                            setNotice('Reverted view to your currently selected session plan and preserved progress.')
                          }}
                        >
                          Keep my existing selected plan ({selected.plan.input.durationMinutes} min)
                        </button>
                      )}
                      <p className="fine">
                        General fictional example, not a safety assessment. Stop if uncomfortable. Only warm-up,
                        exercise blocks, and cooldown count as completable actions—not individual rests.
                      </p>
                    </aside>

                    <section className="action-list" aria-label="Session actions">
                      {displayedFitness.plan.actions.map((action, index) => (
                        <article
                          className={`card action-card ${isFitnessSelected && completed.includes(action.id) ? 'done' : ''}`}
                          key={action.id}
                        >
                          <div className="action-top">
                            <span className="step-number">0{index + 1}</span>
                            <span className="eyebrow">{action.kind}</span>
                            <span>{(action.workSeconds + action.restSeconds) / 60} min</span>
                          </div>
                          <h2>{action.title}</h2>
                          {action.instructions.map(text => (
                            <p key={text}>{text}</p>
                          ))}
                          <div className="timing">
                            <span>Movement {action.workSeconds / 60} min</span>
                            <span>Rest {action.restSeconds / 60} min</span>
                            <span>Transitions included: {action.transitionSeconds / 60} min</span>
                            <span>Sets/Rounds: {action.sets}</span>
                          </div>
                          <details>
                            <summary>Easier alternative</summary>
                            <p>{action.easierAlternative}</p>
                          </details>
                          <button
                            className="secondary"
                            disabled={!isFitnessSelected}
                            onClick={() => {
                              const willComplete = !completed.includes(action.id)
                              setCompleted(c =>
                                setCompletion(c, action.id, willComplete, displayedFitness.plan)
                              )
                              if (willComplete && firstTimeElapsedMs === null) {
                                setFirstTimeElapsedMs(Date.now() - sessionStartRef.current)
                              }
                              setNotice(willComplete ? 'Action marked complete.' : 'Action undone.')
                            }}
                          >
                            {isFitnessSelected && completed.includes(action.id)
                              ? 'Undo completion'
                              : 'Mark action complete'}
                          </button>
                          {!isFitnessSelected && <small>Choose this plan before recording progress.</small>}
                        </article>
                      ))}
                    </section>
                  </div>

                  {/* 4 / 8 / 12 / 16-Week Roadmap & Adaptation Preview */}
                  <section className="card stack-md" aria-label="Multi-week roadmap and adaptation preview">
                    <div className="section-heading">
                      <p className="eyebrow">4 / 8 / 12 / 16-WEEK ROADMAP & SESSION ADAPTATION PREVIEW</p>
                      <span className="tag">Compare progression phases & equipment/schedule adjustments</span>
                    </div>
                    <h2>{activeRoadmap.headline}</h2>
                    <div className="button-row" role="group" aria-label="Select roadmap duration">
                      {([4, 8, 12, 16] as RoadmapWeeks[]).map(w => (
                        <button
                          key={w}
                          type="button"
                          className="secondary"
                          aria-pressed={roadmapWeeks === w}
                          onClick={() => setRoadmapWeeks(w)}
                        >
                          {w}-Week Track
                        </button>
                      ))}
                    </div>

                    <div className="preview-grid">
                      {activeRoadmap.phases.map(ph => (
                        <article className="preview-card" key={ph.phaseNumber}>
                          <p className="eyebrow">{ph.weeksLabel}</p>
                          <h3>{ph.title}</h3>
                          <p>
                            <strong>Schedule:</strong> {ph.weeklyDays}
                          </p>
                          <p>{ph.progressionFocus}</p>
                          <p className="fine">
                            <strong>Recovery:</strong> {ph.recoveryNote}
                          </p>
                        </article>
                      ))}
                    </div>

                    <div className="card soft stack-sm">
                      <h3>Simulate Real-Life Adaptations (Never rewrites completed history or forces catch-up volume)</h3>
                      <div className="button-row">
                        <label className="inline-check">
                          <input
                            type="checkbox"
                            checked={simulateBenchUnavailable}
                            onChange={e => setSimulateBenchUnavailable(e.target.checked)}
                          />
                          Simulate: Bench unavailable today
                        </label>
                        <label className="inline-check">
                          <input
                            type="checkbox"
                            checked={simulateMissedSession}
                            onChange={e => setSimulateMissedSession(e.target.checked)}
                          />
                          Simulate: Missed Wednesday session
                        </label>
                      </div>
                      {simulateBenchUnavailable && (
                        <p className="notice">
                          <strong>Equipment Substitution Applied:</strong> {activeRoadmap.adaptation.benchUnavailableNote}{' '}
                          → <em>{activeRoadmap.adaptation.substitutedMovement}</em>.
                        </p>
                      )}
                      {simulateMissedSession && (
                        <p className="notice">
                          <strong>Manageable Schedule Adjustment:</strong> {activeRoadmap.adaptation.missedSessionNote}{' '}
                          → <em>{activeRoadmap.adaptation.rescheduledPlanSummary}</em>
                        </p>
                      )}
                    </div>
                  </section>
                </>
              ) : (
                <Empty onStart={() => void prepareFitness()} />
              )}
            </div>
          )}

          {/* SCREEN 5: NUTRITION PLANNER */}
          {screen === 'Nutrition' && (
            <NutritionPlannerView
              guide={guide}
              units={units}
              nutritionGoal={nutritionGoal}
              onChangeNutritionGoal={val => {
                setNutritionGoal(val)
                setFirstTimeInputCount(c => c + 1)
              }}
              nutritionInput={nutritionInputs}
              onChangeNutritionInput={next => {
                setNutritionInputs(next)
                setFirstTimeInputCount(c => c + 1)
              }}
              devices={kitchenDevices}
              onChangeDevices={next => {
                setKitchenDevices(next)
                setFirstTimeInputCount(c => c + 1)
              }}
              pantry={pantryInventory}
              onChangePantry={setPantryInventory}
              candidate={nutritionCandidate}
              selected={selectedNutrition}
              previousVersion={previousNutritionVersion}
              completedMeals={completedMeals}
              comparisonEnabled={comparisonEnabled}
              onGenerate={override => handleGenerateNutrition(override)}
              onApplySubstitution={applySubstitutionInMeal}
              onSelectSessionPlan={() => {
                if (!displayedNutrition) return
                setSelectedNutrition(displayedNutrition)
                setCompletedMeals([])
                setNotice('Nutrition plan selected for this session. Mark prepared meals complete below.')
              }}
              onToggleMealComplete={mealId => {
                if (!displayedNutrition) return
                const willComplete = !completedMeals.includes(mealId)
                setCompletedMeals(c => setMealCompletion(c, mealId, willComplete, displayedNutrition.plan))
                if (willComplete && firstTimeElapsedMs === null) {
                  setFirstTimeElapsedMs(Date.now() - sessionStartRef.current)
                }
                setNotice(willComplete ? 'Meal marked prepared & complete.' : 'Meal completion undone.')
              }}
              onSubViewChange={setNutritionSubView}
            />
          )}

          {/* SCREEN 6: PROGRESS, HABIT STARS & ANALYTICS */}
          {screen === 'Progress' && (
            <div className="stack-lg">
              <div className="content-grid">
                <section className="card" aria-label="Fitness session progress">
                  <p className="eyebrow">FITNESS SESSION PROGRESS (IDEMPOTENT COMPLETE & UNDO)</p>
                  {selected ? (
                    <>
                      <h2>
                        {completed.length} of {selected.plan.actions.length} workout blocks complete
                      </h2>
                      <progress value={completed.length} max={selected.plan.actions.length} />
                      <p className="fine">
                        Only warm-up, exercise blocks, and cooldown count. Rests are included in block timing.
                      </p>
                      {selected.plan.actions.map(a => (
                        <div className="progress-row" key={a.id}>
                          <span>
                            <strong>{a.title}</strong> <small className="muted">({a.id})</small>
                          </span>
                          <button
                            className="secondary"
                            onClick={() =>
                              setCompleted(c => setCompletion(c, a.id, !c.includes(a.id), selected.plan))
                            }
                          >
                            {completed.includes(a.id) ? 'Undo completion' : 'Mark action complete'}
                          </button>
                        </div>
                      ))}
                      <p className="fine">
                        Original provenance: {modeLabel(selected.provenance.mode as 'guided' | 'demo')}.
                      </p>
                    </>
                  ) : (
                    <Empty onStart={() => go('Fitness')} />
                  )}
                </section>

                <section className="card" aria-label="Nutrition session progress">
                  <p className="eyebrow">NUTRITION SESSION PROGRESS (MEALS COUNT · SHOPPING DOES NOT)</p>
                  {selectedNutrition ? (
                    <>
                      <h2>
                        {completedMeals.length} of {selectedNutrition.plan.meals.length} meals prepared
                      </h2>
                      <progress value={completedMeals.length} max={selectedNutrition.plan.meals.length} />
                      <p className="fine">
                        Each prepared meal counts as one action. Shopping list items and ingredients do not count as
                        progress.
                      </p>
                      {selectedNutrition.plan.meals.map(m => (
                        <div className="progress-row" key={m.id}>
                          <span>
                            <strong>{m.title}</strong> <small className="muted">({m.id})</small>
                          </span>
                          <button
                            className="secondary"
                            onClick={() =>
                              setCompletedMeals(c =>
                                setMealCompletion(c, m.id, !c.includes(m.id), selectedNutrition.plan)
                              )
                            }
                          >
                            {completedMeals.includes(m.id) ? 'Undo completion' : 'Mark meal complete'}
                          </button>
                        </div>
                      ))}
                      <p className="fine">
                        Original provenance: {modeLabel(selectedNutrition.provenance.mode as 'guided' | 'demo')}.
                      </p>
                    </>
                  ) : (
                    <div className="stack-sm">
                      <h3>No Nutrition plan selected yet</h3>
                      <p className="fine">
                        Generate and select a one-day meal plan in Nutrition to record completed meals here.
                      </p>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => {
                          if (!displayedNutrition) handleGenerateNutrition()
                          go('Nutrition')
                        }}
                      >
                        Open Nutrition Planner →
                      </button>
                    </div>
                  )}
                </section>
              </div>

              {/* Habit Stars (Weekly, Monthly, Quarterly · Proposed 70/20/10 Weighting) */}
              <section className="card stack-md" aria-label="Habit stars and 70/20/10 breakdown">
                <div className="section-heading">
                  <p className="eyebrow">PRIVATE HABIT STARS · PROPOSED 70 / 20 / 10 EXAMPLE MODEL</p>
                  <span className="tag">Private by default · Weight, billing & complaints never affect stars</span>
                </div>
                <h2>Weekly, Monthly & Quarterly Habit Stars</h2>
                <p className="help">
                  Proposed weighting: <strong>70% completed chosen actions</strong>,{' '}
                  <strong>20% weekly consistency</strong>, and a <strong>capped 10% share for daily check-ins</strong>{' '}
                  (each action or day counted once). When recorded activity is too low, You&Me shows “Not enough
                  activity yet.”
                </p>

                <div className="field-row">
                  <div>
                    <label htmlFor="sim-active-days">
                      Active days this week (each day counted once · 0–7)
                    </label>
                    <input
                      id="sim-active-days"
                      type="number"
                      min={0}
                      max={7}
                      value={activeDaysThisWeek}
                      onChange={e => setActiveDaysThisWeek(Math.max(0, Math.min(7, Number(e.target.value) || 0)))}
                    />
                  </div>
                  <div>
                    <label htmlFor="sim-checkin-days">
                      Purposeful daily check-in days (capped at 10% share · 0–7)
                    </label>
                    <input
                      id="sim-checkin-days"
                      type="number"
                      min={0}
                      max={7}
                      value={checkInDaysThisWeek}
                      onChange={e => setCheckInDaysThisWeek(Math.max(0, Math.min(7, Number(e.target.value) || 0)))}
                    />
                  </div>
                </div>

                <label className="inline-check">
                  <input
                    type="checkbox"
                    checked={useDemoHistoryWindow}
                    onChange={e => setUseDemoHistoryWindow(e.target.checked)}
                  />
                  Preview sample 90-day demo history (distinguished from recorded session activity)
                </label>

                <div className="preview-grid">
                  {habitStarWindows.map(win => (
                    <article className="card soft" key={win.windowLabel}>
                      <p className="eyebrow">{win.windowLabel.toUpperCase()} HABIT STARS</p>
                      {win.notEnoughActivity ? (
                        <>
                          <h3>Not enough activity yet</h3>
                          <p className="fine">{win.whatMovedRating}</p>
                        </>
                      ) : (
                        <>
                          <p className="duration">
                            <strong>{win.starRating?.toFixed(1)}</strong> / 5.0 ★ ({win.weightedScorePercent}%)
                          </p>
                          <p className="fine">
                            <strong>70/20/10 Breakdown:</strong> Actions {win.actionCompletionShare}/70 · Consistency{' '}
                            {win.consistencyShare}/20 · Check-ins {win.checkInShare}/10
                          </p>
                          <p className="fine">
                            <strong>Goals in denominator:</strong> {win.denominatorSummary}
                          </p>
                          <p className="fine">
                            <strong>What moved this rating:</strong> {win.whatMovedRating}
                          </p>
                        </>
                      )}
                      <p className="fine">
                        <strong>Suggested next step:</strong> {win.suggestedNextStep}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              {/* Separate Experience Rating & Support Feedback Queue */}
              <section className="card stack-md" aria-label="Separate experience rating and support feedback">
                <div className="section-heading">
                  <p className="eyebrow">SEPARATE EXPERIENCE RATING & SUPPORT QUEUE</p>
                  <span className="tag">Never penalizes or alters your Habit Stars</span>
                </div>
                <h2>Share Product Feedback or Frustration Separately</h2>
                <div className="field-row">
                  <div>
                    <label htmlFor="exp-rating-select">App experience rating (1–5)</label>
                    <select
                      id="exp-rating-select"
                      value={experienceRating}
                      onChange={e => setExperienceRating(Number(e.target.value))}
                    >
                      <option value={5}>5 · Smooth & clear</option>
                      <option value={4}>4 · Helpful with minor friction</option>
                      <option value={3}>3 · Neutral / needs refinement</option>
                      <option value={2}>2 · Frustrated with a constraint</option>
                      <option value={1}>1 · Blocked / needs support</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="exp-feedback-note">Support note (routed to human-reviewed queue)</label>
                    <input
                      id="exp-feedback-note"
                      type="text"
                      placeholder="Describe any frustration, missing equipment, or suggestion…"
                      value={feedbackComment}
                      onChange={e => setFeedbackComment(e.target.value)}
                    />
                  </div>
                </div>
                <div className="button-row">
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
                      if (!feedbackComment.trim()) return
                      setFeedbackQueue([
                        {
                          id: `FB-${102 + feedbackQueue.length}`,
                          rating: experienceRating,
                          comment: feedbackComment.trim(),
                          owner: 'Pilot Support Triage',
                          status: 'Queued for Human Review',
                          resolution: 'Logged in private support queue; Habit Stars remain untouched.',
                        },
                        ...feedbackQueue,
                      ])
                      setFeedbackComment('')
                      setNotice('Feedback logged in separate support queue. Your Habit Stars are completely unaffected.')
                    }}
                  >
                    Submit to Support Queue
                  </button>
                </div>
                <div className="stack-sm">
                  {feedbackQueue.map(item => (
                    <div className="progress-row" key={item.id}>
                      <div>
                        <strong>
                          {item.id} · Rating {item.rating}/5
                        </strong>
                        : {item.comment}
                        <p className="fine">
                          Owner: {item.owner} · Status: {item.status} · {item.resolution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* SCREEN 7: EXPLORE */}
          {screen === 'Explore' && (
            <ExploreView
              guide={guide}
              activeSubTab={exploreSubTab}
              onSelectSubTab={setExploreSubTab}
              partnerRating={partnerDateRating}
              onUpdatePartnerRating={setPartnerDateRating}
              onNotice={setNotice}
            />
          )}

          {/* SCREEN 8: FRIENDS & CHALLENGES */}
          {screen === 'Friends' && (
            <FriendsChallengesView
              userAgeBand={userAgeBand}
              pairs={pairs}
              onUpdatePairs={setPairs}
              challenges={challenges}
              onUpdateChallenges={setChallenges}
              onNotice={setNotice}
            />
          )}

          {/* SCREEN 9: FAQS & 45-DAY PILOT HANDOFF */}
          {screen === 'FAQs' && (
            <FaqsAndPilotHandoffView
              firstTimeElapsedMs={firstTimeElapsedMs}
              firstTimeInputCount={firstTimeInputCount}
              returningElapsedMs={returningElapsedMs}
              returningInputCount={returningInputCount}
            />
          )}

          {/* SCREEN 10: PROFILE & SETTINGS */}
          {screen === 'Settings' && (
            <section className="card settings-card stack-md">
              <div className="section-heading">
                <p className="eyebrow">PROFILE, PERSONA, THEME, MEMORIES & SESSION CONTROLS</p>
                <span className="tag">Reload resets in-memory preview</span>
              </div>

              <h2>Your AI Guide & Persona Customization</h2>
              <div className="button-row">
                {(['Jane', 'Kay'] as const).map(name => (
                  <button
                    className="secondary"
                    aria-pressed={guide === name}
                    onClick={() => setGuide(name)}
                    key={name}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <p className="fine">
                Switching between Jane and Kay changes interpersonal phrasing only. Your inputs, selected plans, and
                progress stay intact.
              </p>

              <div className="field-row">
                <div>
                  <label htmlFor="settings-guide-age">Apparent age / mentor preference</label>
                  <select
                    id="settings-guide-age"
                    value={guideAppearance.ageLook}
                    onChange={e =>
                      setGuideAppearance({ ...guideAppearance, ageLook: e.target.value as GuideAgeLook })
                    }
                  >
                    <option value="20s-peer">20s Peer</option>
                    <option value="30s-peer">30s Peer</option>
                    <option value="45-mentor">45-ish Mentor</option>
                    <option value="60s-mentor">60s Seasoned Mentor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="settings-guide-skin">Complexion</label>
                  <select
                    id="settings-guide-skin"
                    value={guideAppearance.skinTone}
                    onChange={e =>
                      setGuideAppearance({ ...guideAppearance, skinTone: e.target.value as GuideSkinTone })
                    }
                  >
                    <option value="warm-amber">Warm Amber</option>
                    <option value="deep-espresso">Deep Espresso</option>
                    <option value="olive-sand">Olive Sand</option>
                    <option value="fair-rose">Fair Rose</option>
                  </select>
                </div>
              </div>

              <div className="field-row">
                <div>
                  <label htmlFor="settings-guide-features">Facial feature style</label>
                  <select
                    id="settings-guide-features"
                    value={guideAppearance.featureStyle}
                    onChange={e =>
                      setGuideAppearance({
                        ...guideAppearance,
                        featureStyle: e.target.value as GuideFeatureStyle,
                      })
                    }
                  >
                    <option value="soft-rounded">Soft & Rounded</option>
                    <option value="defined-classic">Defined Classic</option>
                    <option value="expressive-editorial">Expressive Editorial</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="settings-guide-wardrobe">Task wardrobe preview</label>
                  <select
                    id="settings-guide-wardrobe"
                    value={guideAppearance.wardrobeOverride ?? 'auto'}
                    onChange={e =>
                      setGuideAppearance({
                        ...guideAppearance,
                        wardrobeOverride: e.target.value as GuideWardrobeRole | 'auto',
                      })
                    }
                  >
                    <option value="auto">Auto-match current screen / task (Recommended)</option>
                    <option value="gym-partner">Gym Partner (Fitness)</option>
                    <option value="nutrition-guide">Nutrition Guide (Meal & Shopping)</option>
                    <option value="chef">Home Kitchen Chef (Cooking)</option>
                    <option value="stylist">Occasion Stylist (Fashion)</option>
                    <option value="event-planner">Event Planner (Local Date Night)</option>
                    <option value="everyday-mentor">Everyday Guide (Home)</option>
                  </select>
                </div>
              </div>

              <h2>Appearance Theme & Measurement Units</h2>
              <div className="field-row">
                <div>
                  <label>Color Palette (Default: System)</label>
                  <div className="button-row">
                    {(['system', 'light', 'dark'] as const).map(t => (
                      <button
                        key={t}
                        type="button"
                        className="secondary"
                        aria-pressed={themePreference === t}
                        onClick={() => setThemePreference(t)}
                      >
                        {t === 'system' ? `System (${resolvedTheme})` : t === 'light' ? 'Light' : 'Dark'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label>Kitchen & Workout Units</label>
                  <div className="button-row">
                    <button
                      type="button"
                      className="secondary"
                      aria-pressed={units === 'us-customary'}
                      onClick={() => setUnits('us-customary')}
                    >
                      US Customary (oz, cups)
                    </button>
                    <button
                      type="button"
                      className="secondary"
                      aria-pressed={units === 'metric'}
                      onClick={() => setUnits('metric')}
                    >
                      Metric (g, ml)
                    </button>
                  </div>
                </div>
              </div>

              <h2>Response Mode & Simulated Entitlements</h2>
              <div className="button-row">
                {(['guided', 'demo'] as const).map(m => (
                  <button
                    className="secondary"
                    aria-pressed={mode === m}
                    key={m}
                    onClick={() => {
                      setMode(m)
                      setNotice('Mode changed for the next plan. Existing results keep their original provenance.')
                    }}
                  >
                    {m === 'guided' ? 'Guided' : 'Demo'}
                  </button>
                ))}
                <button
                  className="secondary"
                  onClick={() =>
                    setNotice(
                      'Live AI unavailable: no provider is configured. Your sample mode and inputs are unchanged.'
                    )
                  }
                >
                  Live · unavailable
                </button>
              </div>
              <div className="button-row">
                {aiServiceTiersCatalog.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className="secondary"
                    aria-pressed={selectedTier === t.id}
                    onClick={() => {
                      setSelectedTier(t.id)
                      setIsRegisteredMember(t.id !== 'Guest')
                      setNotice(`Switched simulated tier to ${t.label} (${t.recallWindow}).`)
                    }}
                  >
                    {t.id} ({t.recallWindow})
                  </button>
                ))}
              </div>

              <h2>Personalization Memories & Recall Controls</h2>
              <p className="notice">
                “Responses are tailored to the information you enter and the memories you allow You&Me to use.”
              </p>
              <label className="inline-check">
                <input
                  type="checkbox"
                  checked={allowMemories}
                  onChange={e => setAllowMemories(e.target.checked)}
                />
                Allow You&Me to use my approved equipment, pantry, and exclusion memories for fast repeat planning
              </label>
              <div className="stack-sm">
                {savedMemories.map(mem => (
                  <div className="progress-row" key={mem.id}>
                    <div>
                      <strong>{mem.category}:</strong> {mem.value}
                    </div>
                    <div className="button-row">
                      <button
                        type="button"
                        className="secondary"
                        onClick={() =>
                          setSavedMemories(
                            savedMemories.map(m => (m.id === mem.id ? { ...m, enabled: !m.enabled } : m))
                          )
                        }
                      >
                        {mem.enabled ? 'Opted In (Pause)' : 'Paused (Enable)'}
                      </button>
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => setSavedMemories(savedMemories.filter(m => m.id !== mem.id))}
                      >
                        Delete memory
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <h2>Restart Walkthrough or Clear Preview Session</h2>
              <p className="fine">
                “Restart walkthrough” resets the guided fixture inputs while keeping your session settings. “Clear this
                preview session” wipes all in-memory plans, progress, pairings, and settings.
              </p>
              <div className="button-row">
                <button className="secondary" onClick={() => setConfirmReset(true)}>
                  Restart walkthrough
                </button>
                <button className="secondary" onClick={() => setConfirmClearSession(true)}>
                  Clear this preview session
                </button>
              </div>

              {confirmReset && (
                <div className="notice" role="alert">
                  <p>Reset the guided walkthrough inputs to their starting defaults?</p>
                  <div className="button-row">
                    <button className="secondary" onClick={() => setConfirmReset(false)}>
                      Keep current walkthrough
                    </button>
                    <button className="primary" onClick={restartWalkthroughOnly}>
                      Confirm walkthrough restart
                    </button>
                  </div>
                </div>
              )}

              {confirmClearSession && (
                <div className="error" role="alert">
                  <p>Clear the entire in-memory preview session, including all plans, completed actions, and settings?</p>
                  <div className="button-row">
                    <button className="secondary" onClick={() => setConfirmClearSession(false)}>
                      Cancel
                    </button>
                    <button className="primary" onClick={clearFullPreviewSession}>
                      Confirm clear session
                    </button>
                  </div>
                </div>
              )}

              <ApiConnection />
            </section>
          )}
        </main>

        {/* Reserved Guide Side Rail on Tablet/Desktop */}
        <aside className="guide-side-rail" aria-label={`${guide} AI guide companion rail`}>
          <div className="card soft guide-rail-card">
            <div className="guide-rail-header">
              <GuidePortraitSvg
                guide={guide}
                appearance={guideAppearance}
                wardrobe={activeWardrobe}
                size={68}
              />
              <div>
                <span className="eyebrow">AI GUIDE · {activeWardrobeMeta.title.toUpperCase()}</span>
                <h3>{guide}</h3>
                <p className="fine">{ageLookLabels[guideAppearance.ageLook]}</p>
              </div>
            </div>
            <p className="fine">
              <strong>Attire:</strong> {activeWardrobeMeta.attireSummary}
            </p>
            <p className="guide-rail-quote">“{greeting}”</p>
            <div className="button-row">
              <button
                type="button"
                className="secondary"
                onClick={() => setGuide(g => (g === 'Jane' ? 'Kay' : 'Jane'))}
              >
                Switch to {guide === 'Jane' ? 'Kay' : 'Jane'}
              </button>
              <button type="button" className="text-button" onClick={() => go('Settings')}>
                Customize look →
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Compact Collapsible Side Avatar Bubble for Phone & Quick Access */}
      <div className="guide-bubble">
        {guideBubbleCollapsed ? (
          <button
            aria-label={`Expand ${guide} AI guide bubble`}
            onClick={() => setGuideBubbleCollapsed(false)}
          >
            <span aria-hidden="true">{guide[0]}</span>
            <span>{guide}</span>
          </button>
        ) : (
          <div className="guide-bubble-expanded">
            <button
              aria-label={`Change guide or customize ${guide} (${activeWardrobeMeta.title})`}
              onClick={() => go('Settings')}
            >
              <span aria-hidden="true">{guide[0]}</span>
              <span>
                {guide} · {activeWardrobeMeta.title}
              </span>
            </button>
            <button
              type="button"
              className="bubble-collapse-btn"
              aria-label="Collapse guide bubble"
              onClick={() => setGuideBubbleCollapsed(true)}
            >
              –
            </button>
          </div>
        )}
      </div>

      <footer>
        <span>One thoughtful step at a time.</span>
        <span>Sample preview · no durable save · no payments · S-01 & live provider gated</span>
      </footer>
    </div>
  )
}

function Empty({ onStart }: { onStart: () => void }) {
  return (
    <section className="card">
      <h2>Your next step starts here.</h2>
      <p>No plan selected yet. Review the editable sample goal and constraints.</p>
      <button className="primary" onClick={onStart}>
        Set up a Fitness sample
      </button>
    </section>
  )
}
