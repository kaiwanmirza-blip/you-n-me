import {
  wardrobeDescriptions,
  type GuideAgeLook,
  type GuideAppearance,
  type GuideSkinTone,
  type GuideWardrobeRole,
} from './experienceData'

const skinTonePalettes: Record<GuideSkinTone, { skin: string; shadow: string; blush: string }> = {
  'warm-amber': { skin: '#d59b72', shadow: '#b67c54', blush: '#c97865' },
  'deep-espresso': { skin: '#7d4e38', shadow: '#5e3725', blush: '#8f4b3e' },
  'olive-sand': { skin: '#dfc19f', shadow: '#c2a07a', blush: '#d48d7b' },
  'fair-rose': { skin: '#f1d6c6', shadow: '#d6b4a1', blush: '#e09b91' },
}

const wardrobePalettes: Record<
  GuideWardrobeRole,
  { primary: string; secondary: string; accent: string; propLabel: string }
> = {
  'everyday-mentor': {
    primary: '#284d3f',
    secondary: '#e5ebdf',
    accent: '#a34e2e',
    propLabel: 'Everyday Planner Folio',
  },
  'gym-partner': {
    primary: '#1f5c4b',
    secondary: '#d1e7dd',
    accent: '#e07a5f',
    propLabel: 'Interval Timer & Athletic Zip',
  },
  'nutrition-guide': {
    primary: '#5c4d26',
    secondary: '#f0ead2',
    accent: '#6b8e23',
    propLabel: 'Pantry & Market Apron',
  },
  chef: {
    primary: '#7c3f23',
    secondary: '#f7ede2',
    accent: '#d97706',
    propLabel: 'Cross-Back Chef Apron',
  },
  stylist: {
    primary: '#3d3452',
    secondary: '#eae4f2',
    accent: '#b5838d',
    propLabel: 'Tailored Blazer & Drape',
  },
  'event-planner': {
    primary: '#6e3228',
    secondary: '#f5e1da',
    accent: '#c87d55',
    propLabel: 'Evening Venue Jacket',
  },
}

export const ageLookLabels: Record<GuideAgeLook, string> = {
  '20s-peer': '20s Peer',
  '30s-peer': '30s Peer',
  '45-mentor': '45-ish Mentor',
  '60s-mentor': '60s Seasoned Mentor',
}

export function GuidePortraitSvg({
  guide,
  appearance,
  wardrobe,
  size = 64,
}: {
  guide: 'Jane' | 'Kay'
  appearance: GuideAppearance
  wardrobe: GuideWardrobeRole
  size?: number
}) {
  const skin = skinTonePalettes[appearance.skinTone] ?? skinTonePalettes['warm-amber']
  const outfit = wardrobePalettes[wardrobe] ?? wardrobePalettes['everyday-mentor']
  const isMentor = appearance.ageLook === '45-mentor' || appearance.ageLook === '60s-mentor'
  const isSeniorMentor = appearance.ageLook === '60s-mentor'
  const hairBase = guide === 'Jane' ? (isSeniorMentor ? '#5e5b58' : '#2e2522') : isSeniorMentor ? '#6a6866' : '#3a2e28'
  const hairStreak = isMentor ? '#b8b5b0' : hairBase

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label={`${guide} AI guide portrait in ${wardrobeDescriptions[wardrobe].title} attire`}
      className="guide-svg-portrait"
    >
      <circle cx="48" cy="48" r="46" fill={outfit.secondary} stroke={outfit.primary} strokeWidth="2" />
      {/* Background Hair Silhouette */}
      {guide === 'Jane' ? (
        <path
          d="M24 44 C22 24, 34 15, 48 15 C62 15, 74 24, 72 44 C73 58, 69 68, 64 72 L32 72 C27 68, 23 58, 24 44 Z"
          fill={hairBase}
        />
      ) : (
        <path
          d="M27 38 C26 21, 35 15, 48 15 C61 15, 70 21, 69 38 C69 45, 66 50, 63 52 L33 52 C30 50, 27 45, 27 38 Z"
          fill={hairBase}
        />
      )}
      {/* Shoulders & Task Wardrobe */}
      <path d="M16 88 C18 68, 31 62, 48 62 C65 62, 78 68, 80 88 Z" fill={outfit.primary} />
      {/* Collar / Wardrobe Detail */}
      {wardrobe === 'chef' || wardrobe === 'nutrition-guide' ? (
        <>
          <path d="M35 63 L48 78 L61 63" fill={outfit.secondary} />
          <rect x="34" y="69" width="28" height="19" rx="3" fill={outfit.accent} opacity="0.9" />
          <line x1="37" y1="63" x2="37" y2="71" stroke={outfit.secondary} strokeWidth="2.5" />
          <line x1="59" y1="63" x2="59" y2="71" stroke={outfit.secondary} strokeWidth="2.5" />
        </>
      ) : wardrobe === 'gym-partner' ? (
        <>
          <path d="M38 62 L48 75 L58 62" fill={outfit.accent} />
          <line x1="48" y1="75" x2="48" y2="88" stroke={outfit.secondary} strokeWidth="2.5" />
        </>
      ) : wardrobe === 'stylist' || wardrobe === 'event-planner' ? (
        <>
          <polygon points="36,62 48,82 42,88 30,68" fill={outfit.secondary} opacity="0.85" />
          <polygon points="60,62 48,82 54,88 66,68" fill={outfit.secondary} opacity="0.85" />
          <circle cx="57" cy="76" r="3" fill={outfit.accent} />
        </>
      ) : (
        <path d="M37 62 L48 76 L59 62" fill={outfit.secondary} />
      )}
      {/* Neck */}
      <rect x="42" y="53" width="12" height="13" rx="5" fill={skin.shadow} />
      {/* Head */}
      <ellipse
        cx="48"
        cy="41"
        rx={appearance.featureStyle === 'soft-rounded' ? '16.5' : '15.5'}
        ry="19"
        fill={skin.skin}
      />
      {/* Warm Cheek Accent */}
      <circle cx="38" cy="45" r="3.2" fill={skin.blush} opacity="0.45" />
      <circle cx="58" cy="45" r="3.2" fill={skin.blush} opacity="0.45" />
      {/* Eyes & Brows */}
      <path d="M37 36 Q40 34 43 36" stroke="#222" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M53 36 Q56 34 59 36" stroke="#222" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="39.5" r="1.9" fill="#1e1e1e" />
      <circle cx="56" cy="39.5" r="1.9" fill="#1e1e1e" />
      {/* Optional Mentor Glasses for 45-ish or 60s Mentor */}
      {isMentor && (
        <g stroke={outfit.accent} strokeWidth="1.5" fill="none">
          <rect x="34.5" y="36" width="11" height="7.5" rx="2" />
          <rect x="50.5" y="36" width="11" height="7.5" rx="2" />
          <line x1="45.5" y1="39.5" x2="50.5" y2="39.5" />
        </g>
      )}
      {/* Subtle age/wisdom lines when mentor */}
      {isMentor && (
        <g stroke={skin.shadow} strokeWidth="1" fill="none" opacity="0.7">
          <path d="M35 48 Q37 51 39 52" />
          <path d="M61 48 Q59 51 57 52" />
        </g>
      )}
      {/* Nose & Warm Smile */}
      <path d="M48 39 L47 45 L49.5 45.5" stroke={skin.shadow} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M42.5 50 Q48 54.5 53.5 50" stroke="#5a2d24" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Forehead Hair Bangs & Mentor Silver Streak */}
      {guide === 'Jane' ? (
        <>
          <path d="M31 35 C34 23, 46 21, 64 33 C62 22, 52 17, 44 18 C35 19, 31 26, 31 35 Z" fill={hairBase} />
          {isMentor && <path d="M35 26 Q43 22 52 27" stroke={hairStreak} strokeWidth="2.5" fill="none" />}
        </>
      ) : (
        <>
          <path d="M32 32 C36 22, 52 21, 63 31 C61 21, 52 17, 45 17 C36 17, 32 24, 32 32 Z" fill={hairBase} />
          {isMentor && <path d="M38 24 Q47 21 56 25" stroke={hairStreak} strokeWidth="2.5" fill="none" />}
        </>
      )}
    </svg>
  )
}
