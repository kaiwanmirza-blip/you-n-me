import { useState } from 'react'
import { assessRecomposition } from '../shared/contracts'
import {
  wardrobeDescriptions,
  type GuideAgeLook,
  type GuideAppearance,
  type GuideSkinTone,
  type GuideWardrobeRole,
} from './experienceData'

export type GuideSelection = 'Jane' | 'Kay' | 'Both'

export type GlobalHeritageKey =
  | 'south_asian'
  | 'latin_american'
  | 'african'
  | 'mediterranean'
  | 'east_asian'
  | 'southeast_asian'
  | 'swana'
  | 'pacific_islander'
  | 'indigenous'
  | 'central_asian'

export const GLOBAL_HERITAGE_ROSTER: ReadonlyArray<{
  key: GlobalHeritageKey
  label: string
  skinToneMap: GuideSkinTone
  regionContext: string
}> = [
  {
    key: 'south_asian',
    label: 'South Asian (Indian · Subcontinent)',
    skinToneMap: 'warm-amber',
    regionContext: 'V-taper & visceral-recomp aware · spice-forward high-protein kitchen versatility',
  },
  {
    key: 'latin_american',
    label: 'Latin American (Cuban · Peruvian · Andean · Caribbean)',
    skinToneMap: 'olive-sand',
    regionContext: 'Clavicle-to-hip proportion aware · warm-climate breathable weaves & hydration',
  },
  {
    key: 'african',
    label: 'African & Diaspora (Kenyan · Zimbabwean · African-American)',
    skinToneMap: 'deep-espresso',
    regionContext: 'Fast-twitch & endurance biomechanics aware · rich complexion & humidity styling',
  },
  {
    key: 'mediterranean',
    label: 'European & Mediterranean (Iberian · Italian · Continental)',
    skinToneMap: 'olive-sand',
    regionContext: 'Mediterranean anti-inflammatory nutrition & unstructured tailored layering',
  },
  {
    key: 'east_asian',
    label: 'East Asian (Chinese · Japanese · Korean)',
    skinToneMap: 'fair-rose',
    regionContext: 'Postural mobility, ankle/hip flexion & minimalist architectural tailoring',
  },
  {
    key: 'southeast_asian',
    label: 'Southeast Asian (Filipino · Thai · Vietnamese · Nusantara)',
    skinToneMap: 'warm-amber',
    regionContext: 'Tropical heat/humidity electrolyte balance & lightweight technical linen',
  },
  {
    key: 'swana',
    label: 'Middle Eastern & North African (SWANA)',
    skinToneMap: 'olive-sand',
    regionContext: 'High-heat hydration, rich oud/citrus scent layering & structured eveningwear',
  },
  {
    key: 'pacific_islander',
    label: 'Pacific Islander & Oceanic (Polynesian · Maori · Pasifika)',
    skinToneMap: 'warm-amber',
    regionContext: 'Power-frame joint protection, heavy hinge strength & coastal climate gear',
  },
  {
    key: 'indigenous',
    label: 'Indigenous & First Nations',
    skinToneMap: 'warm-amber',
    regionContext: 'Functional outdoor endurance, holistic recovery & grounded earth-tone styling',
  },
  {
    key: 'central_asian',
    label: 'Central Asian (Silk Road · Steppe)',
    skinToneMap: 'fair-rose',
    regionContext: 'High-altitude stamina, rotational core strength & four-season layering',
  },
]

export const WARDROBE_DRESSUP_CATALOG = {
  tops: {
    blazer: [
      'Tailored charcoal technical-silk blazer',
      'Structured deep navy peak-lapel blazer',
      'Minimalist unlined slate architectural blazer',
    ],
    jacket: [
      'Elevated emerald-green and obsidian athleisure zip jacket',
      'Structured ivory-and-charcoal stylist jacket',
      'Matte black minimalist technical bomber jacket',
      'Luxury charcoal cashmere-linen overshirt jacket',
    ],
    hoodie: [
      'Heavyweight boxy fleece hoodie in obsidian',
      'Heavyweight French terry drop-shoulder hoodie in heather grey',
      'Sleek ergonomic technical zip-up workout hoodie',
    ],
    tshirt_tight: [
      'Form-fitting athletic performance compression tee in matte black',
      'Athletic ribbed technical knit tee in charcoal',
      'Seamless ergonomic fitness crewneck in deep navy',
    ],
    tshirt_baggy: [
      'Heavyweight oversized boxy drop-shoulder tee in washed black',
      'Relaxed vintage heavyweight boxy tee in chalk ivory',
      'Streetwear-inspired boxy heavyweight tee in muted moss',
    ],
  },
  bottoms: {
    jeans: [
      'Dark indigo selvedge raw denim jeans',
      'Relaxed straight-leg washed black denim jeans',
      'Slim-tapered charcoal stretch denim jeans',
    ],
    sweat_pants: [
      'Tapered technical fleece sweatpants with concealed zip pockets',
      'Relaxed luxury French terry sweatpants with drawstrings',
      'Ergonomic panel athletic sweatpants in obsidian black',
    ],
    tailored_trousers: [
      'Tailored tapered performance technical-silk trousers',
      'Relaxed tailored slate-grey stretch chinos',
      'Breezy tailored charcoal linen-cotton relaxed trousers',
    ],
  },
  eyewear: [
    'None (Natural eyes)',
    'Minimal ultra-thin titanium wireframe glasses',
    'Bold modern black acetate architectural frames',
    'Sophisticated warm amber tortoise shell frames',
  ],
  socks: [
    'Invisible no-show performance athletic socks',
    'Minimalist ribbed charcoal quarter-crew athletic socks',
    'Clean white sport ribbed crew socks',
    'Fine-gauge dark merino wool luxury dress socks',
  ],
  shoes: [
    'Minimalist designer black leather low-top trainers',
    'Pristine white luxury calfskin leather sneakers',
    'High-performance responsive running shoes with dark soles',
    'Sleek black matte leather Chelsea boots',
    'Minimalist luxury leather slide sandals',
  ],
} as const

export function getPersonaPortraitUrl(
  guide: 'Jane' | 'Kay',
  heritageKey: GlobalHeritageKey = 'south_asian',
  shotType: 'head' | 'full' = 'head',
): string {
  if (heritageKey === 'south_asian' && shotType === 'head') {
    return guide === 'Jane' ? '/guides/jane-realistic.jpg' : '/guides/kay-realistic.jpg'
  }
  const prefix = guide === 'Jane' ? 'jane' : 'kay'
  return `/guides/personas/${prefix}-${heritageKey}-${shotType}.jpg`
}

export const ageLookLabels: Record<GuideAgeLook, string> = {
  '20s-peer': '20s Peer',
  '30s-peer': '30s Peer',
  '45-mentor': '45-ish Mentor',
  '60s-mentor': '60s+ Longevity Mentor',
}

export const heritageLookCatalog: ReadonlyArray<{
  id: GuideSkinTone
  label: string
  regionNote: string
}> = [
  {
    id: 'warm-amber',
    label: 'South Asian / Southeast Asian / Pacific / Indigenous',
    regionNote: 'V-taper & visceral-recomp aware · South Asian & global culinary versatility',
  },
  {
    id: 'olive-sand',
    label: 'Latin American / Mediterranean / SWANA (Cuban · Peruvian · Iberian)',
    regionNote: 'Frame-proportion aware (clavicle vs hip ratio) & climate-adaptive hydration',
  },
  {
    id: 'deep-espresso',
    label: 'African / Diaspora (Kenyan · Zimbabwean · African-American)',
    regionNote: 'Fast-twitch & endurance biomechanics aware · rich skin & heat-humidity styling',
  },
  {
    id: 'fair-rose',
    label: 'East Asian / Central Asian / Northern European',
    regionNote: 'Postural mobility, bone-density & climate-layered wardrobe guidance',
  },
]

const wardrobeAccentColor: Record<GuideWardrobeRole, string> = {
  'everyday-mentor': '#8b5cf6',
  'gym-partner': '#10b981',
  'nutrition-guide': '#f59e0b',
  chef: '#f97316',
  stylist: '#ec4899',
  'event-planner': '#06b6d4',
}

export function GuidePortraitSvg({
  guide,
  appearance,
  wardrobe,
  size = 64,
  showCoGuide = false,
  heritageKey = 'south_asian',
}: {
  guide: 'Jane' | 'Kay'
  appearance: GuideAppearance
  wardrobe: GuideWardrobeRole
  size?: number
  showCoGuide?: boolean
  heritageKey?: GlobalHeritageKey
}) {
  const accent = wardrobeAccentColor[wardrobe] ?? '#8b5cf6'
  const roleTitle = wardrobeDescriptions[wardrobe]?.title ?? 'AI Guide'
  const janeSrc = getPersonaPortraitUrl('Jane', heritageKey, 'head')
  const kaySrc = getPersonaPortraitUrl('Kay', heritageKey, 'head')
  const imgSrc = guide === 'Jane' ? janeSrc : kaySrc

  if (showCoGuide) {
    return (
      <div
        className="guide-duo-portrait"
        role="img"
        aria-label={`Jane and Kay Co-Guides together in ${roleTitle} mode`}
        style={{ width: size * 1.45, height: size }}
      >
        <div
          className="guide-photo-ring duo-first"
          style={{ width: size, height: size, borderColor: accent }}
        >
          <img src={janeSrc} alt="Jane AI Guide" className="guide-photo-img" />
        </div>
        <div
          className="guide-photo-ring duo-second"
          style={{ width: size, height: size, borderColor: '#06b6d4' }}
        >
          <img src={kaySrc} alt="Kay AI Guide" className="guide-photo-img" />
        </div>
        <span className="guide-role-pill" style={{ background: accent }}>
          Jane + Kay
        </span>
      </div>
    )
  }

  return (
    <div
      className="guide-single-portrait"
      role="img"
      aria-label={`${guide} AI guide portrait in ${roleTitle} attire (${ageLookLabels[appearance.ageLook]})`}
      style={{ width: size, height: size }}
    >
      <div
        className="guide-photo-ring"
        style={{ width: size, height: size, borderColor: accent }}
      >
        <img src={imgSrc} alt={`${guide} photorealistic portrait`} className="guide-photo-img" />
      </div>
      <span className="guide-presence-dot" style={{ background: accent }} aria-hidden="true" />
    </div>
  )
}

export interface ConversationalMemoryState {
  motivationAndOccasion: string
  currentBodyFrame: string
  targetPhysiqueIspiration: string
  culturalAndClimateContext: string
  ageAndMobilityTier: 'standard-adult' | 'senior-65-plus-chair-bands' | 'athletic-recomp'
  availableMinutes: number
  equipment: string[]
  excludedMovements: string[]
  kitchenIngredients: string[]
  kitchenDevices: string[]
  dietaryPattern: 'Balanced' | 'Vegetarian'
  excludedIngredients: string[]
  fashionOccasion: string
  sweatAndClimateProfile: string
  fragrancePreference: string
  anythingElseNote: string
  confirmedReady: boolean
}

export const defaultConversationalMemory: ConversationalMemoryState = {
  motivationAndOccasion: 'Summer beach & confidence reset — feel athletic, lean out the waist, and show up sharp',
  currentBodyFrame: 'South Asian frame (soft midsection / 35.5" waist, scale weight holding steady at 81 kg)',
  targetPhysiqueIspiration: 'John Abraham V-Taper (broad capped delts, thick upper clavicular chest, lean 31.5" waist)',
  culturalAndClimateContext: 'Indian heritage living in Dallas, TX (95°F heat · high-protein spice-forward meals)',
  ageAndMobilityTier: 'athletic-recomp',
  availableMinutes: 30,
  equipment: ['dumbbells', 'kettlebells', 'bench'],
  excludedMovements: ['squat'],
  kitchenIngredients: ['Chicken breast', 'Jasmine rice', 'Fresh spinach', 'Lemon', 'Chickpeas'],
  kitchenDevices: ['air-fryer', 'stovetop'],
  dietaryPattern: 'Balanced',
  excludedIngredients: [],
  fashionOccasion: 'Executive Dinner & Weekend Stadium Game',
  sweatAndClimateProfile: 'Warm Texas climate · breathable natural weaves + night-before clinical antiperspirant',
  fragrancePreference: 'Bergamot, Dry Vetiver & Warm Cedarwood (clean heat-stable projection)',
  anythingElseNote: '',
  confirmedReady: true,
}

export interface MuscleTarget {
  id: 'shoulders' | 'chest' | 'lats' | 'biceps' | 'triceps' | 'core' | 'quads' | 'hamstrings' | 'glutes' | 'calves'
  label: string
  intensity: 'primary' | 'secondary' | 'recovery'
  recompRole: string
  scienceCitation: string
}

export const vTaperMuscleMap: MuscleTarget[] = [
  {
    id: 'shoulders',
    label: 'Lateral & Anterior Deltoids',
    intensity: 'primary',
    recompRole: 'Widens biacromial shoulder breadth to create the optical V-taper illusion against the waist.',
    scienceCitation: 'NSCA / Schoenfeld (2021): Lateral deltoid hypertrophy maximizes shoulder-to-waist ratio.',
  },
  {
    id: 'chest',
    label: 'Clavicular (Upper) Pectorals',
    intensity: 'primary',
    recompRole: 'Builds upper-torso armor and posture lift (signature John Abraham upper-chest shelf).',
    scienceCitation: 'Lauver et al. (Eur J Sport Sci): 30° incline & floor/bench pressing peaks upper-pec EMG.',
  },
  {
    id: 'lats',
    label: 'Latissimus Dorsi & Upper Back',
    intensity: 'primary',
    recompRole: 'Expands back width and pulls shoulders back to decompress the ribcage and flatten the stomach.',
    scienceCitation: 'ACSM Resistance Guidelines: Horizontal & hinge pulls counteract desk kyphosis.',
  },
  {
    id: 'biceps',
    label: 'Biceps Brachii & Forearms',
    intensity: 'secondary',
    recompRole: 'Fills out short-sleeve and rolled-cuff silhouettes with controlled eccentric tension.',
    scienceCitation: 'Oliveira et al.: Neutral-to-supinated dumbbell curls optimize long-head peak.',
  },
  {
    id: 'core',
    label: 'Transverse Abdominis & Obliques',
    intensity: 'primary',
    recompRole: 'Tightens internal abdominalcorset while visceral fat drops—shrinking waist inches even at stable scale weight.',
    scienceCitation: 'ISSN Position Stand (Body Recomposition): Resistance training + 1.6–2.2g/kg protein drives simultaneous visceral fat loss and lean mass gain.',
  },
  {
    id: 'glutes',
    label: 'Posterior Chain & Glutes (Knee-Friendly Hinge)',
    intensity: 'secondary',
    recompRole: 'High metabolic drive via kettlebell hinges without knee-shearing deep squats.',
    scienceCitation: 'Contreras et al.: Hip hinges deliver high glute/hamstring recruitment with minimal patellofemoral stress.',
  },
]

export interface BodyPartMeasurements {
  label: string
  date: string
  waistInches: number
  chestInches: number
  shouldersInches: number
  armsInches: number
  thighsInches: number
  hipsInches: number
  scaleWeightLbs: number
  photoCaptured: boolean
}

export function InteractiveStudioHub({
  guide,
  coGuideMode,
  onToggleCoGuide,
  memory,
  onChangeMemory,
  onApplyToPlanners,
}: {
  guide: 'Jane' | 'Kay'
  coGuideMode: boolean
  onToggleCoGuide: (val: boolean) => void
  memory: ConversationalMemoryState
  onChangeMemory: (next: ConversationalMemoryState) => void
  onApplyToPlanners: (preset: 'john-abraham-recomp' | 'senior-chair-mobility' | 'cuban-peruvian-frame' | 'custom') => void
}) {
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState<
    Array<{
      sender: 'user' | 'Jane' | 'Kay'
      text: string
      citation?: string
    }>
  >([
    {
      sender: 'Jane',
      text: 'Forget spreadsheets—just talk to us. What’s inspiring you right now? Is it an upcoming trip, an occasion, feeling energetic in your clothes, or a specific physique you’ve always admired?',
    },
    {
      sender: 'Kay',
      text: 'And tell me what we’re working with in real life—your frame, any joints we should protect, what’s in your kitchen, or if you want our 65+ Chair & Band Longevity track. Once we have your core data points, we’ll ask if there’s anything else before building your synchronized Fitness, Nutrition & Style program.',
      citation: 'ISSN & ACSM Evidence-Based Intake Protocol',
    },
  ])

  const [dayZeroMeas] = useState<BodyPartMeasurements>({
    label: 'Day 0 Baseline',
    date: 'Oct 14, 2026',
    waistInches: 35.5,
    chestInches: 40.0,
    shouldersInches: 46.0,
    armsInches: 14.2,
    thighsInches: 22.5,
    hipsInches: 39.0,
    scaleWeightLbs: 178.5,
    photoCaptured: true,
  })

  const [currentMeas, setCurrentMeas] = useState<BodyPartMeasurements>({
    label: 'Day 28 Check-In (Today)',
    date: 'Nov 11, 2026',
    waistInches: 33.4,
    chestInches: 41.2,
    shouldersInches: 47.4,
    armsInches: 14.9,
    thighsInches: 23.0,
    hipsInches: 38.2,
    scaleWeightLbs: 178.0,
    photoCaptured: true,
  })

  const [selectedMuscle, setSelectedMuscle] = useState<MuscleTarget>(vTaperMuscleMap[0])
  const [checkInGraceStatus, setCheckInGraceStatus] = useState<'completed' | '48h-grace' | 'missed-star-penalty'>('completed')

  const waistDelta = +(currentMeas.waistInches - dayZeroMeas.waistInches).toFixed(1)
  const shoulderDelta = +(currentMeas.shouldersInches - dayZeroMeas.shouldersInches).toFixed(1)
  const chestDelta = +(currentMeas.chestInches - dayZeroMeas.chestInches).toFixed(1)
  const weightDelta = +(currentMeas.scaleWeightLbs - dayZeroMeas.scaleWeightLbs).toFixed(1)
  const vTaperRatioDay0 = +(dayZeroMeas.shouldersInches / dayZeroMeas.waistInches).toFixed(2)
  const vTaperRatioNow = +(currentMeas.shouldersInches / currentMeas.waistInches).toFixed(2)

  const contractRecomp = assessRecomposition({
    baseline: {
      dayIndex: 0,
      recordedAt: '2026-10-14T08:00:00Z',
      measurements: {
        waistCm: +(dayZeroMeas.waistInches * 2.54).toFixed(2),
        chestCm: +(dayZeroMeas.chestInches * 2.54).toFixed(2),
        shouldersCm: +(dayZeroMeas.shouldersInches * 2.54).toFixed(2),
        hipsCm: +(dayZeroMeas.hipsInches * 2.54).toFixed(2),
        armCm: +(dayZeroMeas.armsInches * 2.54).toFixed(2),
        thighCm: +(dayZeroMeas.thighsInches * 2.54).toFixed(2),
        calfCm: 38.1,
        scaleWeightKg: +(dayZeroMeas.scaleWeightLbs * 0.453592).toFixed(2),
      },
      photoCheckInCompleted: true,
    },
    latest: {
      dayIndex: 28,
      recordedAt: '2026-11-11T08:00:00Z',
      measurements: {
        waistCm: +(currentMeas.waistInches * 2.54).toFixed(2),
        chestCm: +(currentMeas.chestInches * 2.54).toFixed(2),
        shouldersCm: +(currentMeas.shouldersInches * 2.54).toFixed(2),
        hipsCm: +(currentMeas.hipsInches * 2.54).toFixed(2),
        armCm: +(currentMeas.armsInches * 2.54).toFixed(2),
        thighCm: +(currentMeas.thighsInches * 2.54).toFixed(2),
        calfCm: 38.6,
        scaleWeightKg: +(currentMeas.scaleWeightLbs * 0.453592).toFixed(2),
      },
      photoCheckInCompleted: checkInGraceStatus !== 'missed-star-penalty',
    },
    checkInDay: 28,
    checkInDue: true,
    mode: 'demo',
  })

  function handleSendChat(customMessage?: string, presetKey?: 'john-abraham-recomp' | 'senior-chair-mobility' | 'cuban-peruvian-frame') {
    const text = (customMessage ?? chatInput).trim()
    if (!text) return
    setChatInput('')

    const nextTurns = [...chatHistory, { sender: 'user' as const, text }]

    if (presetKey === 'john-abraham-recomp' || /john abraham|v-taper|waist|dallas|india/i.test(text)) {
      const updated: ConversationalMemoryState = {
        ...memory,
        motivationAndOccasion: 'Build lean athletic presence & V-taper body recomposition',
        currentBodyFrame: 'South Asian frame (35.5" → 33.4" waist recomp · scale stable at 178 lbs)',
        targetPhysiqueIspiration: 'John Abraham Aesthetic (broad lateral delts, thick upper chest, 31.5" waist)',
        culturalAndClimateContext: 'Indian heritage in Dallas, TX · high-protein air-fryer & skillet spices',
        ageAndMobilityTier: 'athletic-recomp',
        availableMinutes: 30,
        equipment: ['dumbbells', 'kettlebells', 'bench'],
        excludedMovements: ['squat'],
        confirmedReady: true,
      }
      onChangeMemory(updated)
      nextTurns.push({
        sender: 'Jane',
        text: 'I love that vision. When your waist drops over 2 inches while the scale barely moves, that is textbook body recomposition—you are shedding visceral midsection fat while packing dense muscle onto your shoulders and chest.',
      })
      nextTurns.push({
        sender: 'Kay',
        text: 'Locked into memory: 30-minute V-Taper Recomp (Dumbbells + Kettlebell + Bench, zero squats to keep knees fresh), paired with a 30-minute high-protein Lemon-Herb Chicken & Spinach skillet, plus heat-ready Dallas evening styling. Is there anything else you’d like to add or share before we lock your program?',
        citation: 'ISSN Body Recomposition Stand (Barakat et al., 2020) · ACSM Hypertrophy Guidelines',
      })
      setChatHistory(nextTurns)
      onApplyToPlanners('john-abraham-recomp')
      return
    }

    if (presetKey === 'senior-chair-mobility' || /65|70|75|chair|senior|bands|knee/i.test(text)) {
      const updated: ConversationalMemoryState = {
        ...memory,
        motivationAndOccasion: 'Age 68+ Joint Longevity, Balance & Chair + Resistance Band Vitality',
        currentBodyFrame: 'Senior longevity focus · protect knees, hips & lower back',
        targetPhysiqueIspiration: 'Pain-free posture, steady core stability & daily independence',
        ageAndMobilityTier: 'senior-65-plus-chair-bands',
        availableMinutes: 20,
        equipment: ['resistance-bands'],
        excludedMovements: ['squat'],
        confirmedReady: true,
      }
      onChangeMemory(updated)
      nextTurns.push({
        sender: 'Jane',
        text: 'We’ve got you completely covered. Movement at 65, 70, or 75+ should feel empowering, safe, and restorative—never jarring on your joints.',
      })
      nextTurns.push({
        sender: 'Kay',
        text: 'Switched your program to our Seated Chair & Resistance-Band Longevity protocol: 20 minutes of supported posture rows, gentle marches, and anti-stiffness mobility. Anything else you want us to note before you start?',
        citation: 'ACSM / CDC Older Adult Physical Activity & Fall-Prevention Guidelines',
      })
      setChatHistory(nextTurns)
      onApplyToPlanners('senior-chair-mobility')
      return
    }

    if (presetKey === 'cuban-peruvian-frame' || /cuban|peruvian|latin|african|kenya|frame|sweat/i.test(text)) {
      const updated: ConversationalMemoryState = {
        ...memory,
        motivationAndOccasion: 'Frame-proportioned sculpting, glute/shoulder symmetry & climate-smart styling',
        currentBodyFrame: 'Regional biomechanics & torso-to-limb proportion calibration',
        targetPhysiqueIspiration: 'Balanced hourglass / athletic symmetry with joint-friendly progression',
        culturalAndClimateContext: 'Adapted for regional body proportions, sweat rate & culinary roots',
        ageAndMobilityTier: 'standard-adult',
        availableMinutes: 30,
        equipment: ['dumbbells', 'resistance-bands'],
        excludedMovements: [],
        confirmedReady: true,
      }
      onChangeMemory(updated)
      nextTurns.push({
        sender: 'Jane',
        text: 'Every ancestral frame carries strength differently—whether you have a longer femur and high hip-to-waist ratio or broader clavicles and a compact torso. We tailor movement angles to *your* bone structure, not a generic template.',
      })
      nextTurns.push({
        sender: 'Kay',
        text: 'We also calibrated your nutrition exclusions, hydration/electrolyte needs, and breathable fabric + deodorant timing for your climate. Anything else to share before we update all three journeys?',
        citation: 'Journal of Sports Sciences — Anthropometric & Regional Frame Biomechanics',
      })
      setChatHistory(nextTurns)
      onApplyToPlanners('cuban-peruvian-frame')
      return
    }

    // Custom natural language input
    const updated: ConversationalMemoryState = {
      ...memory,
      anythingElseNote: text,
      confirmedReady: true,
    }
    onChangeMemory(updated)
    nextTurns.push({
      sender: 'Jane',
      text: `Got it—I’ve captured "${text}" in your active session context so your plans reflect how you actually live.`,
    })
    if (coGuideMode || guide === 'Kay') {
      nextTurns.push({
        sender: 'Kay',
        text: 'All 6 core data points are verified (Motivation, Frame & Target Aesthetic, Time & Gear, Kitchen & Exclusions, Climate & Scent). Anything else you’d like to add before you jump into your updated plans?',
        citation: 'You&Me Unified Co-Guide Brain v2.0',
      })
    }
    setChatHistory(nextTurns)
    onApplyToPlanners('custom')
  }

  return (
    <div className="stack-lg">
      {/* 1. CONVERSATIONAL CO-GUIDE STUDIO (JANE + KAY ONE BRAIN, TWO VOICES) */}
      <section className="card glass-panel stack-md" aria-label="Conversational Co-Guide Intake Studio">
        <div className="section-heading">
          <p className="eyebrow">2027 CONVERSATIONAL AI STUDIO · NO MORE EXCEL FORMS</p>
          <div className="button-row">
            <button
              type="button"
              className="secondary"
              aria-pressed={coGuideMode}
              onClick={() => onToggleCoGuide(!coGuideMode)}
            >
              {coGuideMode ? '✓ Co-Guide Mode: Jane + Kay Together (2 Voices, 1 Brain)' : 'Solo Guide Mode (Click for Jane + Kay Together)'}
            </button>
          </div>
        </div>

        <div className="co-guide-banner">
          <GuidePortraitSvg
            guide={guide}
            appearance={{ ageLook: '30s-peer', skinTone: 'warm-amber', featureStyle: 'expressive-editorial' }}
            wardrobe="everyday-mentor"
            size={68}
            showCoGuide={coGuideMode}
          />
          <div>
            <h2>
              {coGuideMode
                ? 'Talk to Jane & Kay Together — Fluid Memory Intake'
                : `Talk to ${guide} — Fluid Memory Intake`}
            </h2>
            <p className="fine">
              Tell us your occasion, your dream physique (e.g., <strong>John Abraham V-taper</strong>), your ancestral
              frame & climate, or if you want our <strong>65–75+ Chair & Band Longevity</strong> track. Better than a
              $400/mo trainer—backed by cited sports & nutrition science.
            </p>
          </div>
        </div>

        {/* One-Tap Conversational Story Prompts */}
        <div className="button-row">
          <button
            type="button"
            className="secondary"
            onClick={() =>
              handleSendChat(
                'I’m from India living in Dallas TX. My waist dropped 2 inches even though the scale hasn’t moved. I want a John Abraham V-taper physique—30 mins with dumbbells, kettlebell & bench, no squats, plus high-protein meals and heat-smart evening style.',
                'john-abraham-recomp'
              )
            }
          >
            💬 “I want a John Abraham V-taper (Dallas TX · 30m Home Gym · Waist Recomp)”
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() =>
              handleSendChat(
                'I’m 70 years old and want safe chair exercises and resistance-band mobility that protect my knees and balance.',
                'senior-chair-mobility'
              )
            }
          >
            💬 “65–75+ Longevity: Chair Exercises & Resistance Bands”
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() =>
              handleSendChat(
                'Calibrate for regional body proportions (Latin American / African / Asian torso-to-hip mechanics), sweat rate, and fragrance/hygiene layering.',
                'cuban-peruvian-frame'
              )
            }
          >
            💬 “Calibrate for Regional Body Structure, Sweat Rate & Style”
          </button>
        </div>

        {/* Chat Stream */}
        <div className="chat-stream" role="log" aria-label="Conversation with Jane and Kay">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : `guide-bubble-${msg.sender.toLowerCase()}`}`}>
              <div className="chat-bubble-header">
                <strong>
                  {msg.sender === 'user'
                    ? 'You'
                    : msg.sender === 'Jane'
                      ? 'Jane · Empathetic & Vision Guide'
                      : 'Kay · Biomechanics, Kitchen & Style Strategist'}
                </strong>
                {msg.citation && <span className="citation-pill">📚 {msg.citation}</span>}
              </div>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Natural Language Input Bar */}
        <form
          className="chat-input-bar"
          onSubmit={e => {
            e.preventDefault()
            handleSendChat()
          }}
        >
          <input
            type="text"
            aria-label="Tell Jane and Kay about yourself, your goal physique, or anything else to add"
            placeholder="Tell Jane & Kay about your goal, target physique, occasion, kitchen, or anything else before we build…"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
          />
          <button type="submit" className="primary">
            Share with {coGuideMode ? 'Jane & Kay' : guide} ↗
          </button>
        </form>

        {/* Live Extracted Memory Crystal Matrix */}
        <div className="memory-crystal-grid" aria-label="AI extracted memory data points">
          <div className="memory-pill-card">
            <span className="eyebrow">1. MOTIVATION & OCCASION</span>
            <strong>{memory.motivationAndOccasion}</strong>
          </div>
          <div className="memory-pill-card">
            <span className="eyebrow">2. CURRENT FRAME vs. TARGET PHYSIQUE</span>
            <strong>
              {memory.currentBodyFrame} → <em>{memory.targetPhysiqueIspiration}</em>
            </strong>
          </div>
          <div className="memory-pill-card">
            <span className="eyebrow">3. CLIMATE, HERITAGE & MOBILITY TIER</span>
            <strong>
              {memory.culturalAndClimateContext} ({memory.ageAndMobilityTier})
            </strong>
          </div>
          <div className="memory-pill-card">
            <span className="eyebrow">4. WORKOUT & KITCHEN CONSTRAINTS</span>
            <strong>
              {memory.availableMinutes}m · {memory.equipment.join(', ') || 'Bodyweight'} · Avoid:{' '}
              {memory.excludedMovements.join(', ') || 'None'}
            </strong>
          </div>
          <div className="memory-pill-card">
            <span className="eyebrow">5. STYLE, FRAGRANCE & HYGIENE</span>
            <strong>
              {memory.fragrancePreference} · {memory.sweatAndClimateProfile}
            </strong>
          </div>
          <div className="memory-pill-card ready-card">
            <span className="eyebrow">6. AI READINESS CHECK</span>
            <strong>
              ✓ Minimum data points verified — “Is there anything else you’d like to share before we build your
              program?”
            </strong>
          </div>
        </div>
      </section>

      {/* 2. GYMMANE-GRADE ANATOMICAL MUSCLE MAP & BIOMECHANICS CITATIONS */}
      <section className="card glass-panel stack-md" aria-label="GymMane style anatomical muscle map and V-taper biomechanics">
        <div className="section-heading">
          <p className="eyebrow">GYMMANE-GRADE BIOMECHANICS · ANATOMICAL MUSCLE MAP & V-TAPER ENGINE</p>
          <span className="tag">Replaces $400/mo Trainer · Cited Sports Science</span>
        </div>
        <h2>Interactive Front & Posterior Muscle Map ({memory.targetPhysiqueIspiration})</h2>

        <div className="muscle-studio-grid">
          {/* Interactive SVG Anatomical Body Map (Front + Back) */}
          <div className="anatomical-svg-box">
            <svg viewBox="0 0 320 260" className="anatomical-svg" role="img" aria-label="Front and back anatomical muscle map">
              {/* Front Silhouette Label */}
              <text x="80" y="18" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="700">
                ANTERIOR (FRONT)
              </text>
              {/* Head & Neck */}
              <circle cx="80" cy="38" r="12" fill="rgba(148,163,184,0.35)" />
              {/* Lateral Delts (Shoulders) - Highlighted for V-Taper */}
              <path
                d="M42 56 Q55 48 65 56 L62 78 Q45 74 42 56 Z M118 56 Q105 48 95 56 L98 78 Q115 74 118 56 Z"
                fill={selectedMuscle.id === 'shoulders' ? '#f43f5e' : '#10b981'}
                className="muscle-node"
                onClick={() => setSelectedMuscle(vTaperMuscleMap[0])}
              />
              {/* Upper & Mid Chest */}
              <path
                d="M64 56 L96 56 L93 84 L67 84 Z"
                fill={selectedMuscle.id === 'chest' ? '#f43f5e' : '#10b981'}
                className="muscle-node"
                onClick={() => setSelectedMuscle(vTaperMuscleMap[1])}
              />
              {/* Biceps / Arms */}
              <rect
                x="44"
                y="79"
                width="14"
                height="36"
                rx="6"
                fill={selectedMuscle.id === 'biceps' ? '#f43f5e' : '#38bdf8'}
                className="muscle-node"
                onClick={() => setSelectedMuscle(vTaperMuscleMap[3])}
              />
              <rect
                x="102"
                y="79"
                width="14"
                height="36"
                rx="6"
                fill={selectedMuscle.id === 'biceps' ? '#f43f5e' : '#38bdf8'}
                className="muscle-node"
                onClick={() => setSelectedMuscle(vTaperMuscleMap[3])}
              />
              {/* Core / Transverse Abdominis (Tapered Waist) */}
              <polygon
                points="67,86 93,86 88,132 72,132"
                fill={selectedMuscle.id === 'core' ? '#f43f5e' : '#10b981'}
                className="muscle-node"
                onClick={() => setSelectedMuscle(vTaperMuscleMap[4])}
              />
              {/* Quads */}
              <rect x="64" y="135" width="14" height="54" rx="6" fill="rgba(148,163,184,0.35)" />
              <rect x="82" y="135" width="14" height="54" rx="6" fill="rgba(148,163,184,0.35)" />
              {/* Calves */}
              <rect x="65" y="194" width="12" height="44" rx="5" fill="rgba(148,163,184,0.28)" />
              <rect x="83" y="194" width="12" height="44" rx="5" fill="rgba(148,163,184,0.28)" />

              {/* Posterior Silhouette Label */}
              <text x="240" y="18" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="700">
                POSTERIOR (BACK)
              </text>
              <circle cx="240" cy="38" r="12" fill="rgba(148,163,184,0.35)" />
              {/* Rear Delts */}
              <path
                d="M202 56 Q215 48 225 56 L222 78 Q205 74 202 56 Z M278 56 Q265 48 255 56 L258 78 Q275 74 278 56 Z"
                fill={selectedMuscle.id === 'shoulders' ? '#f43f5e' : '#10b981'}
                className="muscle-node"
                onClick={() => setSelectedMuscle(vTaperMuscleMap[0])}
              />
              {/* Lats (V-Taper Wing Polygon) */}
              <polygon
                points="222,58 258,58 250,122 230,122"
                fill={selectedMuscle.id === 'lats' ? '#f43f5e' : '#10b981'}
                className="muscle-node"
                onClick={() => setSelectedMuscle(vTaperMuscleMap[2])}
              />
              {/* Glutes & Hamstrings (Kettlebell Hinge Target) */}
              <rect
                x="224"
                y="125"
                width="32"
                height="26"
                rx="8"
                fill={selectedMuscle.id === 'glutes' ? '#f43f5e' : '#38bdf8'}
                className="muscle-node"
                onClick={() => setSelectedMuscle(vTaperMuscleMap[5])}
              />
              <rect
                x="224"
                y="154"
                width="14"
                height="40"
                rx="5"
                fill={selectedMuscle.id === 'glutes' ? '#f43f5e' : '#38bdf8'}
                className="muscle-node"
                onClick={() => setSelectedMuscle(vTaperMuscleMap[5])}
              />
              <rect
                x="242"
                y="154"
                width="14"
                height="40"
                rx="5"
                fill={selectedMuscle.id === 'glutes' ? '#f43f5e' : '#38bdf8'}
                className="muscle-node"
                onClick={() => setSelectedMuscle(vTaperMuscleMap[5])}
              />
            </svg>
            <p className="fine">Tap any highlighted muscle zone or button to inspect biomechanics & science citations.</p>
          </div>

          {/* Muscle Selector & Science Citation Details */}
          <div className="stack-sm">
            <div className="button-row">
              {vTaperMuscleMap.map(m => (
                <button
                  key={m.id}
                  type="button"
                  className="secondary"
                  aria-pressed={selectedMuscle.id === m.id}
                  onClick={() => setSelectedMuscle(m)}
                >
                  {m.label} ({m.intensity === 'primary' ? 'Primary V-Taper' : 'Secondary'})
                </button>
              ))}
            </div>

            <article className="card soft stack-sm">
              <span className="eyebrow">ACTIVE MUSCLE FOCUS · {selectedMuscle.intensity.toUpperCase()}</span>
              <h3>{selectedMuscle.label}</h3>
              <p>
                <strong>How this builds your goal physique:</strong> {selectedMuscle.recompRole}
              </p>
              <p className="citation-box">
                <strong>📚 Peer-Reviewed Exercise Science Citation:</strong> {selectedMuscle.scienceCitation}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 3. DAY-0 vs. PERIODIC BODY PART MEASUREMENTS & PHOTO RECOMP TRACKER */}
      <section className="card glass-panel stack-md" aria-label="Day 0 body measurements and shape morph recomposition">
        <div className="section-heading">
          <p className="eyebrow">DAY-0 vs. DAY-28 BODY PART TAPE MEASUREMENTS & SHAPE MORPH AI</p>
          <span className="tag">
            {checkInGraceStatus === 'completed'
              ? '★ Recomp Check-In Complete (Morph Insight Card Unlocked)'
              : checkInGraceStatus === '48h-grace'
                ? '⏳ 48-Hour Grace Window Active (Star Protected — Log Tape or Photo)'
                : '⚠️ Periodic Check-In Missed (-1 Star until tape or photo logged)'}
          </span>
        </div>

        <h2>Why the Scale Lied: Your Waist Shrank {Math.abs(waistDelta)}" While Building Muscle</h2>
        <p className="help">
          Scale weight barely moved ({dayZeroMeas.scaleWeightLbs} lbs → {currentMeas.scaleWeightLbs} lbs, {weightDelta}{' '}
          lbs), yet your <strong>waist dropped {Math.abs(waistDelta)} inches</strong> and your{' '}
          <strong>shoulders widened +{shoulderDelta} inches</strong>. Shoulder-to-Waist V-Taper index jumped from{' '}
          <strong>{vTaperRatioDay0}</strong> to <strong>{vTaperRatioNow}</strong> (Target John Abraham golden ratio:
          1.48–1.55).
        </p>

        {/* Check-In Grace Window & Star Rule Controls */}
        <div className="button-row">
          <button
            type="button"
            className="secondary"
            aria-pressed={checkInGraceStatus === 'completed'}
            onClick={() => setCheckInGraceStatus('completed')}
          >
            ✓ Periodic Photo / Tape Logged (Unlock Morph Card + Full Stars)
          </button>
          <button
            type="button"
            className="secondary"
            aria-pressed={checkInGraceStatus === '48h-grace'}
            onClick={() => setCheckInGraceStatus('48h-grace')}
          >
            ⏳ Simulate 48-Hour Grace Window (Traveling/Bloated — Keep Star via Waist Tape)
          </button>
          <button
            type="button"
            className="secondary"
            aria-pressed={checkInGraceStatus === 'missed-star-penalty'}
            onClick={() => setCheckInGraceStatus('missed-star-penalty')}
          >
            ⚠️ Simulate Missed Check-In Past 48h (-1 Recomp Star)
          </button>
        </div>

        {/* Interactive Body Part Measurement Sliders */}
        <div className="field-row">
          <div className="card soft stack-sm">
            <h3>Adjust Today’s Body Part Measurements (Inches & Scale Lbs)</h3>
            <label htmlFor="meas-waist">
              Waist at navel: <strong>{currentMeas.waistInches}"</strong> (Day 0: {dayZeroMeas.waistInches}")
            </label>
            <input
              id="meas-waist"
              type="range"
              min={28}
              max={44}
              step={0.1}
              value={currentMeas.waistInches}
              onChange={e => setCurrentMeas({ ...currentMeas, waistInches: Number(e.target.value) })}
            />

            <label htmlFor="meas-shoulders">
              Shoulders (Biacromial): <strong>{currentMeas.shouldersInches}"</strong> (Day 0:{' '}
              {dayZeroMeas.shouldersInches}")
            </label>
            <input
              id="meas-shoulders"
              type="range"
              min={40}
              max={54}
              step={0.1}
              value={currentMeas.shouldersInches}
              onChange={e => setCurrentMeas({ ...currentMeas, shouldersInches: Number(e.target.value) })}
            />

            <label htmlFor="meas-chest">
              Upper Chest: <strong>{currentMeas.chestInches}"</strong> (Day 0: {dayZeroMeas.chestInches}")
            </label>
            <input
              id="meas-chest"
              type="range"
              min={36}
              max={50}
              step={0.1}
              value={currentMeas.chestInches}
              onChange={e => setCurrentMeas({ ...currentMeas, chestInches: Number(e.target.value) })}
            />

            <label htmlFor="meas-weight">
              Scale Weight: <strong>{currentMeas.scaleWeightLbs} lbs</strong> (Day 0: {dayZeroMeas.scaleWeightLbs} lbs)
            </label>
            <input
              id="meas-weight"
              type="range"
              min={130}
              max={240}
              step={0.5}
              value={currentMeas.scaleWeightLbs}
              onChange={e => setCurrentMeas({ ...currentMeas, scaleWeightLbs: Number(e.target.value) })}
            />
          </div>

          {/* Visual Shape Morph & Recomp Insight Card */}
          <div className="card featured stack-sm">
            <p className="eyebrow">AI SHAPE MORPH & RECOMPOSITION INSIGHT CARD</p>
            <h3>
              V-Taper Index: {vTaperRatioDay0} → {vTaperRatioNow}{' '}
              {waistDelta < -0.5 && Math.abs(weightDelta) <= 3
                ? '🔥 True Body Recomposition Verified!'
                : '📊 Tracking Frame Proportions'}
            </h3>
            <ul>
              <li>
                <strong>Waist Morph:</strong> {dayZeroMeas.waistInches}" → {currentMeas.waistInches}" ({waistDelta > 0 ? `+${waistDelta}` : waistDelta}") — visceral fat reduction.
              </li>
              <li>
                <strong>Shoulder & Upper Chest Cap:</strong> Shoulders +{shoulderDelta}" · Chest +{chestDelta}" · Arms
                +{(currentMeas.armsInches - dayZeroMeas.armsInches).toFixed(1)}".
              </li>
              <li>
                <strong>Scale vs. Mirror Reality:</strong> Scale moved only {weightDelta} lbs ({contractRecomp.weightChangeKg} kg) because dense lean muscle
                replaced adipose tissue volume.
              </li>
              <li>
                <strong>Contract Engine Status ({contractRecomp.provenance.engine}):</strong>{' '}
                <code>{contractRecomp.assessment}</code> · Waist Δ <code>{contractRecomp.waistChangeCm} cm</code> · Star Impact:{' '}
                <code>{contractRecomp.checkInStarImpact === 0 ? '0 (Star Preserved)' : '-1 (Missed Check-In)'}</code>
              </li>
            </ul>
            <p className="fine">
              Privacy guarantee: Progress photos and body measurements are analyzed strictly for your private
              recomposition card and never shared with social pairs.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export function GuidePersonaClosetStudio({
  guide,
  onSelectGuide,
  selectedHeritage,
  onSelectHeritage,
}: {
  guide: 'Jane' | 'Kay'
  onSelectGuide: (g: 'Jane' | 'Kay') => void
  selectedHeritage: GlobalHeritageKey
  onSelectHeritage: (h: GlobalHeritageKey) => void
}) {
  const [shotView, setShotView] = useState<'head' | 'full'>('full')
  const [topCategory, setTopCategory] = useState<keyof typeof WARDROBE_DRESSUP_CATALOG.tops>('blazer')
  const [topItem, setTopItem] = useState<string>(WARDROBE_DRESSUP_CATALOG.tops.blazer[0])
  const [bottomCategory, setBottomCategory] = useState<keyof typeof WARDROBE_DRESSUP_CATALOG.bottoms>('tailored_trousers')
  const [bottomItem, setBottomItem] = useState<string>(WARDROBE_DRESSUP_CATALOG.bottoms.tailored_trousers[0])
  const [eyewear, setEyewear] = useState<string>(WARDROBE_DRESSUP_CATALOG.eyewear[0])
  const [socks, setSocks] = useState<string>(WARDROBE_DRESSUP_CATALOG.socks[0])
  const [shoes, setShoes] = useState<string>(WARDROBE_DRESSUP_CATALOG.shoes[0])

  // Monetization & Token Economy State:
  // 1st Persona Set = Free. Subsequent tweaks/animations use Character Change Tokens.
  // Users can watch up to 10 Brand Spotlight videos/day; 60 cumulative weekly views = 1 Character Change Token.
  const [firstSetFreeClaimed, setFirstSetFreeClaimed] = useState(false)
  const [studioTokens, setStudioTokens] = useState(1) // Starts with 1 Welcome Token
  const [dailyAdsWatched, setDailyAdsWatched] = useState(0)
  const [weeklyAdsCumulative, setWeeklyAdsCumulative] = useState(50) // Pre-seeded at 50/60 so user can test hitting 60 in 1 click!
  const [isLivingAnimated, setIsLivingAnimated] = useState(false)
  const [statusBanner, setStatusBanner] = useState<string>(
    '🎁 Your 1st Persona Set (Heritage + Starter Wardrobe) is 100% FREE. Future wardrobe restyles & living animations use 1 Studio Token.',
  )

  const currentHeritageMeta =
    GLOBAL_HERITAGE_ROSTER.find(item => item.key === selectedHeritage) ?? GLOBAL_HERITAGE_ROSTER[0]
  const portraitUrl = getPersonaPortraitUrl(guide, selectedHeritage, shotView)

  function handleWatchDailyBrandBatch() {
    if (dailyAdsWatched >= 10) {
      setStatusBanner(
        '⏳ Daily Cap Reached (10/10 Brand Spotlights watched today). Advance to tomorrow or grab a 3-Key Studio Pack ($2.99)!',
      )
      return
    }
    const nextDaily = Math.min(10, dailyAdsWatched + 10)
    const added = nextDaily - dailyAdsWatched
    const nextWeekly = weeklyAdsCumulative + added
    setDailyAdsWatched(nextDaily)

    if (nextWeekly >= 60) {
      setWeeklyAdsCumulative(nextWeekly - 60)
      setStudioTokens(t => t + 1)
      setStatusBanner(
        '🎉 60/60 Weekly Brand Spotlights Completed! Minted +1 Character Change & Animation Token (6-Day Habit Loop Reward).',
      )
    } else {
      setWeeklyAdsCumulative(nextWeekly)
      setStatusBanner(
        `✓ Watched +${added} Brand Spotlights today (${nextDaily}/10 daily cap). Weekly cumulative progress: ${nextWeekly}/60 toward your next free Token!`,
      )
    }
  }

  function handleSimulateNextDay() {
    setDailyAdsWatched(0)
    setStatusBanner('☀️ Next day simulated: Daily Brand Spotlight counter reset (0/10 watched today).')
  }

  function handleApplyPersonaOrAnimate(mode: 'restyle' | 'animate') {
    if (!firstSetFreeClaimed && mode === 'restyle') {
      setFirstSetFreeClaimed(true)
      setStatusBanner(
        `✓ Day-0 Free Persona Set Locked for ${guide} (${currentHeritageMeta.label})! Subsequent changes or animations use 1 Studio Token.`,
      )
      return
    }
    if (studioTokens <= 0) {
      setStatusBanner(
        '🔒 0 Studio Tokens remaining. Complete your 60 Weekly Brand Spotlights (10/day max) or unlock the 3-Key Studio Pack ($2.99)!',
      )
      return
    }
    setStudioTokens(t => t - 1)
    if (mode === 'animate') {
      setIsLivingAnimated(true)
      setStatusBanner(
        `✨ Spent 1 Studio Token: ${guide} (${currentHeritageMeta.label}) Living Portrait Animation active (natural breathing, warm eye contact & mentor nod).`,
      )
    } else {
      setStatusBanner(
        `✨ Spent 1 Studio Token: Applied custom wardrobe (${topItem} + ${bottomItem} + ${shoes}) to ${guide}.`,
      )
    }
  }

  return (
    <div className="stack-md">
      {/* Studio Token & Weekly 60-Ad Reward Economy Bar */}
      <div className="card featured stack-sm">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PERSONA STUDIO WALLET · 1ST SET FREE + REWARDED WEEKLY TOKEN LOOP</p>
            <h3>
              Studio Tokens: <strong>{studioTokens}</strong> · Day-0 Free Set:{' '}
              <strong>{firstSetFreeClaimed ? 'Claimed' : 'Available (FREE)'}</strong>
            </h3>
          </div>
          <div className="badge-row">
            <span className="pill">Today’s Spotlights: {dailyAdsWatched}/10 Max</span>
            <span className="pill">Weekly Progress: {weeklyAdsCumulative}/60 Videos</span>
          </div>
        </div>

        <p className="fine">{statusBanner}</p>

        <div className="button-row">
          <button type="button" className="secondary" onClick={handleWatchDailyBrandBatch}>
            ▶ Watch Today’s 10 Brand Spotlights ({dailyAdsWatched}/10 Today · {weeklyAdsCumulative}/60 Weekly)
          </button>
          <button type="button" className="secondary" onClick={handleSimulateNextDay}>
            ☀️ Simulate Next Day (Reset 10/Day Cap)
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setStudioTokens(t => t + 3)
              setStatusBanner('💎 Simulated 3-Key Studio Pack ($2.99) unlocked: +3 Character Change & Animation Tokens added!')
            }}
          >
            💎 +3 Studio Keys Pack ($2.99 Preview)
          </button>
        </div>
      </div>

      {/* Main Split: Left = High-Res Headshot / Full-Length Portrait Preview; Right = 10 Heritages + Wardrobe Dress-Up */}
      <div className="field-row">
        <div className="card soft stack-sm" style={{ alignItems: 'center', textAlign: 'center' }}>
          <div className="button-row" style={{ justifyContent: 'center' }}>
            <button
              type="button"
              className="secondary"
              aria-pressed={guide === 'Jane'}
              onClick={() => onSelectGuide('Jane')}
            >
              Jane (Female Mentor)
            </button>
            <button
              type="button"
              className="secondary"
              aria-pressed={guide === 'Kay'}
              onClick={() => onSelectGuide('Kay')}
            >
              Kay (Male Mentor)
            </button>
          </div>

          <div className="button-row" style={{ justifyContent: 'center' }}>
            <button
              type="button"
              className="secondary"
              aria-pressed={shotView === 'head'}
              onClick={() => setShotView('head')}
            >
              👤 Close-Up Headshot (85mm)
            </button>
            <button
              type="button"
              className="secondary"
              aria-pressed={shotView === 'full'}
              onClick={() => setShotView('full')}
            >
              🧍 Full-Length Standing Studio Shot
            </button>
          </div>

          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: shotView === 'full' ? 320 : 240,
              borderRadius: 20,
              overflow: 'hidden',
              border: isLivingAnimated ? '3px solid #10b981' : '2px solid rgba(139, 92, 246, 0.5)',
              boxShadow: isLivingAnimated
                ? '0 0 28px rgba(16, 185, 129, 0.45)'
                : '0 16px 36px rgba(0, 0, 0, 0.45)',
              transition: 'all 0.3s ease',
            }}
          >
            <img
              src={portraitUrl}
              alt={`${guide} — ${currentHeritageMeta.label} (${shotView === 'full' ? 'Full-Length Standing' : 'Close-Up Headshot'})`}
              style={{
                width: '100%',
                height: shotView === 'full' ? 400 : 240,
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
                transform: isLivingAnimated ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 1.8s ease-in-out',
              }}
            />
            {isLivingAnimated && (
              <span
                className="pill"
                style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  background: 'rgba(16, 185, 129, 0.92)',
                  color: '#04130d',
                  fontWeight: 700,
                }}
              >
                ● Living Portrait Active (Breathing & Eye Contact)
              </span>
            )}
          </div>

          <p className="fine">
            <strong>{guide}</strong> · {currentHeritageMeta.label}
            <br />
            {currentHeritageMeta.regionContext}
          </p>

          <div className="button-row" style={{ justifyContent: 'center' }}>
            <button type="button" className="primary" onClick={() => handleApplyPersonaOrAnimate('restyle')}>
              {firstSetFreeClaimed ? 'Apply Dress-Up Restyle (1 Token)' : '🎁 Claim 1st Persona Set (FREE)'}
            </button>
            <button type="button" className="secondary" onClick={() => handleApplyPersonaOrAnimate('animate')}>
              🎬 Animate Living Portrait (1 Token)
            </button>
          </div>
        </div>

        {/* Right Column: 10 Global Heritages + Granular Wardrobe Dress-Up */}
        <div className="card soft stack-sm">
          <h3>1. Choose Global Heritage Representation (10 Communities)</h3>
          <div className="chip-row" role="group" aria-label="10 Global Heritages">
            {GLOBAL_HERITAGE_ROSTER.map(item => (
              <button
                key={item.key}
                type="button"
                className="secondary"
                aria-pressed={selectedHeritage === item.key}
                onClick={() => {
                  onSelectHeritage(item.key)
                  setIsLivingAnimated(false)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <h3>2. Play Dress-Up: Granular Mentor Wardrobe</h3>
          <label htmlFor="closet-top-cat">Top Category</label>
          <select
            id="closet-top-cat"
            value={topCategory}
            onChange={e => {
              const nextCat = e.target.value as keyof typeof WARDROBE_DRESSUP_CATALOG.tops
              setTopCategory(nextCat)
              setTopItem(WARDROBE_DRESSUP_CATALOG.tops[nextCat][0])
            }}
          >
            <option value="blazer">Tailored Blazers</option>
            <option value="jacket">Athleisure & Studio Jackets</option>
            <option value="hoodie">Heavyweight Luxury Hoodies</option>
            <option value="tshirt_tight">Tight Athletic Compression Tees</option>
            <option value="tshirt_baggy">Relaxed Boxy Drop-Shoulder Tees</option>
          </select>

          <label htmlFor="closet-top-item">Specific Top Piece</label>
          <select id="closet-top-item" value={topItem} onChange={e => setTopItem(e.target.value)}>
            {WARDROBE_DRESSUP_CATALOG.tops[topCategory].map(piece => (
              <option key={piece} value={piece}>
                {piece}
              </option>
            ))}
          </select>

          <label htmlFor="closet-bottom-cat">Bottoms Category</label>
          <select
            id="closet-bottom-cat"
            value={bottomCategory}
            onChange={e => {
              const nextCat = e.target.value as keyof typeof WARDROBE_DRESSUP_CATALOG.bottoms
              setBottomCategory(nextCat)
              setBottomItem(WARDROBE_DRESSUP_CATALOG.bottoms[nextCat][0])
            }}
          >
            <option value="tailored_trousers">Tailored Performance Trousers & Chinos</option>
            <option value="jeans">Selvedge & Stretch Denim Jeans</option>
            <option value="sweat_pants">Technical Fleece & French Terry Sweatpants</option>
          </select>

          <label htmlFor="closet-bottom-item">Specific Bottom Piece</label>
          <select id="closet-bottom-item" value={bottomItem} onChange={e => setBottomItem(e.target.value)}>
            {WARDROBE_DRESSUP_CATALOG.bottoms[bottomCategory].map(piece => (
              <option key={piece} value={piece}>
                {piece}
              </option>
            ))}
          </select>

          <div className="field-row">
            <div>
              <label htmlFor="closet-eyewear">Eyewear</label>
              <select id="closet-eyewear" value={eyewear} onChange={e => setEyewear(e.target.value)}>
                {WARDROBE_DRESSUP_CATALOG.eyewear.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="closet-shoes">Footwear & Socks</label>
              <select id="closet-shoes" value={shoes} onChange={e => setShoes(e.target.value)}>
                {WARDROBE_DRESSUP_CATALOG.shoes.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label htmlFor="closet-socks">Socks</label>
          <select id="closet-socks" value={socks} onChange={e => setSocks(e.target.value)}>
            {WARDROBE_DRESSUP_CATALOG.socks.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
