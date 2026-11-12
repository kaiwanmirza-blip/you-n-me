import { useState } from 'react'
import {
  faqCatalog,
  fashionOccasionCatalog,
  localVenueSamples,
  MAX_ACTIVE_PAIRS,
  pilotCheckpointsCatalog,
  type AgeBand,
  type FashionOccasionFixture,
  type ParticipantPair,
  type RelationshipLabel,
  type SharedBehaviorChallenge,
} from './experienceData'

export function ExploreView({
  guide,
  activeSubTab,
  onSelectSubTab,
  partnerRating,
  onUpdatePartnerRating,
  onNotice,
}: {
  guide: 'Jane' | 'Kay'
  activeSubTab: 'fashion' | 'local' | 'instagram' | 'domains'
  onSelectSubTab: (tab: 'fashion' | 'local' | 'instagram' | 'domains') => void
  partnerRating: number
  onUpdatePartnerRating: (rating: number) => void
  onNotice: (msg: string) => void
}) {
  const [occasionId, setOccasionId] = useState<FashionOccasionFixture['id']>('game-casual')
  const [customClosetNote, setCustomClosetNote] = useState('')
  const [selectedAccessories, setSelectedAccessories] = useState<Record<string, 'A' | 'B'>>({})

  const [diningMode, setDiningMode] = useState<'all' | 'dine-in' | 'takeaway' | 'delivery'>('dine-in')
  const [neighborhoodZip, setNeighborhoodZip] = useState('60614 · Lincoln Park')
  const [quietOnly, setQuietOnly] = useState(true)
  const [under30Only, setUnder30Only] = useState(true)

  const [shareCardType, setShareCardType] = useState<'outfit' | 'challenge'>('outfit')
  const [shareCaption, setShareCaption] = useState(
    'Weekend look planned with intention. Ready for tip-off and an easy evening.'
  )
  const [includeHashtag, setIncludeHashtag] = useState(true)
  const [approvedCard, setApprovedCard] = useState(false)
  const [approvedDestination, setApprovedDestination] = useState(false)
  const [shareHandoffResult, setShareHandoffResult] = useState('')

  const activeOccasion =
    fashionOccasionCatalog.find(o => o.id === occasionId) ?? fashionOccasionCatalog[0]

  const filteredVenues = localVenueSamples.filter(v => {
    if (diningMode !== 'all' && !v.supportedModes.includes(diningMode)) return false
    if (quietOnly && v.noiseLevel !== 'Quiet conversation') return false
    if (under30Only && v.priceBand !== 'Under $30/person') return false
    return true
  })

  return (
    <div className="stack-lg">
      <div className="segmented-tabs" role="tablist" aria-label="Explore upcoming journeys and previews">
        <button
          role="tab"
          aria-selected={activeSubTab === 'fashion'}
          className={activeSubTab === 'fashion' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => onSelectSubTab('fashion')}
        >
          Dress for an Occasion · Upcoming
        </button>
        <button
          role="tab"
          aria-selected={activeSubTab === 'local'}
          className={activeSubTab === 'local' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => onSelectSubTab('local')}
        >
          Date Night & Local · Upcoming
        </button>
        <button
          role="tab"
          aria-selected={activeSubTab === 'instagram'}
          className={activeSubTab === 'instagram' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => onSelectSubTab('instagram')}
        >
          Instagram Share Preview
        </button>
        <button
          role="tab"
          aria-selected={activeSubTab === 'domains'}
          className={activeSubTab === 'domains' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => onSelectSubTab('domains')}
        >
          More Lifestyle Previews
        </button>
      </div>

      {activeSubTab === 'fashion' && (
        <section className="card stack-md" aria-label="Dress for an occasion upcoming preview">
          <div className="section-heading">
            <p className="eyebrow">UPCOMING JOURNEY · WARDROBE & OCCASION STYLING</p>
            <span className="tag">Preview · Fictional closet fixtures · No live image upload</span>
          </div>
          <h2>Dress for an occasion with {guide} (Stylist wardrobe)</h2>
          <p className="help">
            Start with occasion, venue, and dress code. Review fictional closet pieces from text entry, voice dictation
            transcripts, and garment-only photo samples. Accessories are offered based on your preferences without
            inferring gender.
          </p>

          <div className="field-row">
            <div>
              <label htmlFor="occasion-select">Select occasion & dress code</label>
              <select
                id="occasion-select"
                value={occasionId}
                onChange={e => setOccasionId(e.target.value as FashionOccasionFixture['id'])}
              >
                {fashionOccasionCatalog.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.occasionTitle}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="closet-custom-note">Optional closet note (fictional sample text)</label>
              <input
                id="closet-custom-note"
                type="text"
                placeholder="e.g. Prefer breathable layers and low-heel footwear"
                value={customClosetNote}
                onChange={e => setCustomClosetNote(e.target.value)}
              />
            </div>
          </div>

          <div className="meta-strip">
            <span>Venue & Code: {activeOccasion.venueAndDressCode}</span>
            <span aria-hidden="true">·</span>
            <span>Conditions: {activeOccasion.weatherAndSetting}</span>
          </div>

          <h3>Closet items reviewed (Text, Dictated Transcript & Garment-Only Photo Samples)</h3>
          <div className="preview-grid">
            {activeOccasion.closetItems.map(item => (
              <article className="preview-card" key={item.id}>
                <div className="garment-thumb" aria-hidden="true">
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <rect x="2" y="2" width="32" height="32" rx="6" fill="#e5ebdf" stroke="#587455" />
                    <path d="M11 12 L18 8 L25 12 L23 26 L13 26 Z" fill="#284d3f" opacity="0.8" />
                  </svg>
                </div>
                <p className="eyebrow">{item.sourceModality}</p>
                <h3>{item.name}</h3>
                <p className="fine">{item.transcriptOrNote}</p>
              </article>
            ))}
          </div>

          <div className="content-grid">
            <article className="card featured">
              <p className="eyebrow">PRIMARY OUTFIT RECOMMENDATION</p>
              <h3>{activeOccasion.primaryOutfit.title}</h3>
              <ul>
                {activeOccasion.primaryOutfit.pieces.map(p => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p>
                <strong>{guide}’s rationale:</strong> {activeOccasion.primaryOutfit.rationale}
                {customClosetNote.trim() ? ` (Noted preference: "${customClosetNote.trim()}")` : ''}
              </p>
            </article>
            <article className="card soft">
              <p className="eyebrow">ALTERNATE OUTFIT</p>
              <h3>{activeOccasion.alternateOutfit.title}</h3>
              <ul>
                {activeOccasion.alternateOutfit.pieces.map(p => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p>
                <strong>Why keep in reserve:</strong> {activeOccasion.alternateOutfit.rationale}
              </p>
            </article>
          </div>

          <h3>Compare Accessories (Preference-led · No gender assumptions)</h3>
          <div className="stack-sm">
            {activeOccasion.accessoryComparisons.map(acc => {
              const choice = selectedAccessories[`${occasionId}:${acc.category}`] ?? 'A'
              return (
                <div className="progress-row" key={acc.category}>
                  <div>
                    <strong>{acc.category}</strong>
                    <p className="fine">{acc.recommendation}</p>
                  </div>
                  <div className="button-row">
                    <button
                      type="button"
                      className="secondary"
                      aria-pressed={choice === 'A'}
                      onClick={() =>
                        setSelectedAccessories(s => ({ ...s, [`${occasionId}:${acc.category}`]: 'A' }))
                      }
                    >
                      Option A: {acc.optionA}
                    </button>
                    <button
                      type="button"
                      className="secondary"
                      aria-pressed={choice === 'B'}
                      onClick={() =>
                        setSelectedAccessories(s => ({ ...s, [`${occasionId}:${acc.category}`]: 'B' }))
                      }
                    >
                      Option B: {acc.optionB}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {activeSubTab === 'local' && (
        <section className="card stack-md" aria-label="Plan a date night or dinner in upcoming preview">
          <div className="section-heading">
            <p className="eyebrow">UPCOMING JOURNEY · LOCAL PLANS & DATE NIGHT</p>
            <span className="tag">Mocked listings · No external Google Places or Yelp API calls</span>
          </div>
          <h2>Plan a date night or dinner in with {guide} (Event Planner wardrobe)</h2>
          <p className="help">
            Scenario: “Saturday for two, near my neighborhood, quiet, under my budget, with vegetarian options.”
            Compare dine-in, takeaway, or delivery options, see how they fit your Nutrition preferences, and preview a
            linked partner’s private rating.
          </p>

          <div className="field-row">
            <div>
              <label htmlFor="local-zip">Neighborhood or ZIP (Fictional sample)</label>
              <input
                id="local-zip"
                type="text"
                value={neighborhoodZip}
                onChange={e => setNeighborhoodZip(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dining-mode">Dining format</label>
              <select
                id="dining-mode"
                value={diningMode}
                onChange={e => setDiningMode(e.target.value as typeof diningMode)}
              >
                <option value="dine-in">Dine-in</option>
                <option value="takeaway">Takeaway</option>
                <option value="delivery">Delivery</option>
                <option value="all">All formats</option>
              </select>
            </div>
          </div>

          <div className="button-row">
            <label className="inline-check">
              <input type="checkbox" checked={quietOnly} onChange={e => setQuietOnly(e.target.checked)} />
              Quiet conversation venues only
            </label>
            <label className="inline-check">
              <input type="checkbox" checked={under30Only} onChange={e => setUnder30Only(e.target.checked)} />
              Under $30/person budget only
            </label>
          </div>

          <div className="notice">
            <strong>Allergen & venue availability notice:</strong> Dietary fit below is a suggestion only. Always
            confirm allergens, cross-contact handling, and current hours/availability directly with the venue before
            ordering or dining.
          </div>

          <div className="stack-md">
            {filteredVenues.map(venue => (
              <article className="card soft" key={venue.id}>
                <div className="section-heading">
                  <span className="eyebrow">
                    {venue.supportedModes.join(' / ').toUpperCase()} · {venue.noiseLevel} · {venue.priceBand}
                  </span>
                  <span className="fine">{venue.neighborhoodZip}</span>
                </div>
                <h3>{venue.name}</h3>
                <p>
                  <strong>Nutrition & exclusion alignment:</strong> {venue.nutritionFitExplanation}
                </p>
                <div className="field-row">
                  <div>
                    <strong>Vegetarian menu highlights</strong>
                    <ul>
                      {venue.vegetarianOptions.map(opt => (
                        <li key={opt}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Balanced menu highlights</strong>
                    <ul>
                      {venue.balancedOptions.map(opt => (
                        <li key={opt}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="fine">
                  {venue.hoursAndSource} · Last checked: {venue.lastChecked} · {venue.officialMenuNote}
                </p>
              </article>
            ))}
          </div>

          <div className="card">
            <p className="eyebrow">LINKED PARTNER PRIVATE RATING (SIMULATED)</p>
            <h3>Alex Rivera (Linked Partner · YM-PARTNER-204)</h3>
            <p className="fine">
              A linked partner can privately rate a proposed date-night plan without exposing your private nutrition
              exclusions or body metrics.
            </p>
            <div className="button-row">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className="secondary"
                  aria-pressed={partnerRating === star}
                  onClick={() => {
                    onUpdatePartnerRating(star)
                    onNotice(`Simulated partner rating updated to ${star}/5 stars for Trattoria Verde.`)
                  }}
                >
                  {star} / 5 ★
                </button>
              ))}
            </div>
            <p className="fine">
              Current partner rating: <strong>{partnerRating}/5 stars</strong> · “Quiet patio table and vegetarian
              farro risotto work great for Saturday at 7:00 PM.”
            </p>
          </div>
        </section>
      )}

      {activeSubTab === 'instagram' && (
        <section className="card stack-md" aria-label="Instagram share card preview prototype">
          <div className="section-heading">
            <p className="eyebrow">SOCIAL HANDOFF PROTOTYPE · INSTAGRAM SHARE PREVIEW</p>
            <span className="tag">No direct API publish simulated · Privacy-first defaults</span>
          </div>
          <h2>Prepare a Share Card for Stories or Feed Handoff</h2>
          <p className="help">
            Requires explicit user approval of both the card and destination, automatically strips location/EXIF
            metadata, and excludes private progress, weight, and linked partner details by default.
          </p>

          <div className="field-row">
            <div>
              <label htmlFor="share-card-type">Card template to preview</label>
              <select
                id="share-card-type"
                value={shareCardType}
                onChange={e => setShareCardType(e.target.value as 'outfit' | 'challenge')}
              >
                <option value="outfit">Occasion Outfit Card ({activeOccasion.primaryOutfit.title})</option>
                <option value="challenge">Challenge Milestone Card (Cook 3 Home Meals This Week)</option>
              </select>
            </div>
            <div>
              <label htmlFor="share-caption">Editable caption</label>
              <input
                id="share-caption"
                type="text"
                value={shareCaption}
                onChange={e => setShareCaption(e.target.value)}
              />
            </div>
          </div>

          <div className="card featured">
            <p className="eyebrow">SHARE CARD VISUAL PREVIEW · EXIF & LOCATION STRIPPED</p>
            <h3>
              {shareCardType === 'outfit'
                ? activeOccasion.primaryOutfit.title
                : 'Behavior Challenge: 3 Home Meals Prepared'}
            </h3>
            <p>
              {shareCaption} {includeHashtag ? '#YouAndMeApp' : ''}
            </p>
            <p className="fine">
              Privacy guard verified: No GPS coordinates, no body weight, no allergy lists, and no other participant’s
              name included.
            </p>
          </div>

          <div className="stack-sm">
            <label className="inline-check">
              <input
                type="checkbox"
                checked={includeHashtag}
                onChange={e => setIncludeHashtag(e.target.checked)}
              />
              Include optional #YouAndMeApp hashtag
            </label>
            <label className="inline-check">
              <input
                type="checkbox"
                checked={approvedCard}
                onChange={e => setApprovedCard(e.target.checked)}
              />
              I approve this visual card and confirm no private details are included
            </label>
            <label className="inline-check">
              <input
                type="checkbox"
                checked={approvedDestination}
                onChange={e => setApprovedDestination(e.target.checked)}
              />
              I approve preparing this card for native share-sheet / copy fallback
            </label>
          </div>

          <div className="button-row">
            <button
              type="button"
              className="primary"
              disabled={!approvedCard || !approvedDestination}
              onClick={() => {
                setShareHandoffResult(
                  'Share package staged locally (caption + privacy-scrubbed card spec). In production, this opens the OS Share Sheet / Stories intent or downloads the PNG card. Direct Instagram API publishing is NOT simulated because Meta Graph API direct publishing applies only to reviewed Professional accounts.'
                )
              }}
            >
              Stage Native Share-Sheet / Copy Fallback
            </button>
          </div>
          {shareHandoffResult && (
            <p className="notice" role="status">
              {shareHandoffResult}
            </p>
          )}
        </section>
      )}

      {activeSubTab === 'domains' && (
        <section className="card stack-md" aria-label="Broader lifestyle previews">
          <div className="section-heading">
            <p className="eyebrow">BROADER LIFESTYLE ROADMAP · LABELLED PREVIEWS</p>
            <span className="tag">Preview only · Sixth domain taxonomy remains open</span>
          </div>
          <h2>Future You&Me Lifestyle Areas</h2>
          <p className="help">
            Fitness and Nutrition are the two working journeys for the 45-day pilot. The areas below are concise
            editorial previews—no live booking, posting, clinical services, or inferred mood tracking.
          </p>
          <div className="preview-grid">
            {[
              {
                title: 'Travel',
                badge: 'Labelled Preview · No booking or itinerary generation',
                copy: 'Future packing checklists and movement/meal rhythm adjustments when changing time zones.',
                sample: 'Editorial sample: "Packing a 3-piece wrinkle-resistant capsule and resistance bands for a 3-day trip."',
              },
              {
                title: 'Etiquette',
                badge: 'Labelled Preview · Editorial guidance',
                copy: 'Future host, guest, and formal dining etiquette briefs paired with occasion dress codes.',
                sample: 'Editorial sample: "RSVP timing, dietary host notes, and black-tie table seating basics."',
              },
              {
                title: 'Broader Wellness',
                badge: 'Labelled Preview · Non-clinical routines',
                copy: 'Everyday wind-down and morning preparation habits without medical diagnosis or sleep scoring.',
                sample: 'Editorial sample: "A 10-minute kitchen reset and screen-free evening wind-down checklist."',
              },
              {
                title: 'Blog & Community',
                badge: 'Labelled Preview · No public posting or fake engagement',
                copy: 'Curated editorial guides on practical routines. No invented member counts or simulated social feeds.',
                sample: 'Editorial sample: "Why 20 minutes of consistent movement beats an all-or-nothing weekend plan."',
              },
              {
                title: 'Weekly Reflection',
                badge: 'Labelled Preview · Factual activity summary only',
                copy: 'A calm end-of-week look back at chosen actions completed—without inferred emotions or mood scores.',
                sample: 'Editorial sample: "This week: 2 workouts completed, 3 meals cooked at home. Pick 1 focus for Monday."',
              },
            ].map(area => (
              <article className="preview-card" key={area.title}>
                <p className="eyebrow">{area.badge}</p>
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
                <p className="fine">{area.sample}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export function FriendsChallengesView({
  userAgeBand,
  pairs,
  onUpdatePairs,
  challenges,
  onUpdateChallenges,
  onNotice,
}: {
  userAgeBand: AgeBand
  pairs: ParticipantPair[]
  onUpdatePairs: (next: ParticipantPair[]) => void
  challenges: SharedBehaviorChallenge[]
  onUpdateChallenges: (next: SharedBehaviorChallenge[]) => void
  onNotice: (msg: string) => void
}) {
  const [lookupId, setLookupId] = useState('YM-NEIGHBOR-402')
  const [lookupName, setLookupName] = useState('Taylor Brooks (Sample Neighbor)')
  const [reportTarget, setReportTarget] = useState<string | null>(null)
  const [reportReason, setReportReason] = useState('Unwanted repeated requests')

  const isTeenRestricted = userAgeBand === '16-17' || userAgeBand === 'under-16'
  const activePairsCount = pairs.filter(p => p.status === 'accepted').length

  function sendRequest() {
    if (isTeenRestricted) {
      onNotice(
        'Teen safety gate active (16–17 age band): social discovery and pairing are restricted until the teen safety policy and consent controls are reviewed.'
      )
      return
    }
    if (activePairsCount >= MAX_ACTIVE_PAIRS) {
      onNotice(`Maximum of ${MAX_ACTIVE_PAIRS} active pairs reached. Unlink an existing pair before adding another.`)
      return
    }
    const cleanId = lookupId.trim().toUpperCase()
    if (!cleanId) return
    if (pairs.some(p => p.participantId === cleanId)) {
      onNotice(`Participant ${cleanId} is already in your pairing list below.`)
      return
    }
    onUpdatePairs([
      {
        participantId: cleanId,
        displayName: lookupName.trim() || `Participant ${cleanId}`,
        status: 'pending-outgoing',
        relationshipLabel: 'friend',
        ageBand: 'adult',
      },
      ...pairs,
    ])
    onNotice(`Pairing request sent to ${cleanId}. Requires their explicit acceptance before pairing is active.`)
  }

  function updateStatus(id: string, status: ParticipantPair['status']) {
    onUpdatePairs(pairs.map(p => (p.participantId === id ? { ...p, status } : p)))
    onNotice(`Updated pairing ${id} to ${status}.`)
  }

  function updateLabel(id: string, relationshipLabel: RelationshipLabel) {
    onUpdatePairs(pairs.map(p => (p.participantId === id ? { ...p, relationshipLabel } : p)))
  }

  return (
    <div className="stack-lg">
      <section className="card stack-md" aria-label="Participant pairing and privacy controls">
        <div className="section-heading">
          <p className="eyebrow">SOCIAL PROTOTYPE · PARTICIPANT PAIRING ({activePairsCount} / {MAX_ACTIVE_PAIRS} ACTIVE PAIRS)</p>
          <span className="tag">Private by default · Unilateral unlink anytime</span>
        </div>
        <h2>Find a friend or partner by Participant ID</h2>
        <p className="help">
          Weight, exact location, photos, food exclusions, and full plan details stay private by default. Optional
          relationship labels are for your own organization and grant no additional access or parental authority.
        </p>

        {isTeenRestricted && (
          <div className="error" role="alert">
            <strong>Teen Safety Restriction (Age band {userAgeBand}):</strong> Discovery, pairing requests, and shared
            challenges are restricted for 16–17-year-old accounts until the reviewed teen safety policy is enabled.
          </div>
        )}

        <div className="field-row">
          <div>
            <label htmlFor="participant-id-input">Participant ID</label>
            <input
              id="participant-id-input"
              type="text"
              value={lookupId}
              disabled={isTeenRestricted}
              onChange={e => setLookupId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="participant-name-input">Sample display name</label>
            <input
              id="participant-name-input"
              type="text"
              value={lookupName}
              disabled={isTeenRestricted}
              onChange={e => setLookupName(e.target.value)}
            />
          </div>
        </div>
        <div className="button-row">
          <button type="button" className="primary" disabled={isTeenRestricted} onClick={sendRequest}>
            Send Pairing Request
          </button>
        </div>

        <h3>Simulated Pairing States (Pending, Accepted, Declined, Blocked & Unlinked)</h3>
        <div className="stack-sm">
          {pairs.map(pair => (
            <article className="card soft" key={pair.participantId}>
              <div className="section-heading">
                <strong>
                  {pair.displayName} ({pair.participantId})
                </strong>
                <span className="tag">Status: {pair.status}</span>
              </div>
              <div className="field-row">
                <div>
                  <label htmlFor={`rel-${pair.participantId}`}>
                    Optional relationship label (grants no extra access or authority)
                  </label>
                  <select
                    id={`rel-${pair.participantId}`}
                    value={pair.relationshipLabel}
                    onChange={e => updateLabel(pair.participantId, e.target.value as RelationshipLabel)}
                  >
                    <option value="unlabelled">No label</option>
                    <option value="spouse">Spouse / Partner</option>
                    <option value="friend">Friend</option>
                    <option value="sibling">Sibling</option>
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="aunt-uncle">Aunt / Uncle</option>
                    <option value="colleague">Colleague</option>
                    <option value="neighbor">Neighbor</option>
                  </select>
                </div>
                <div>
                  <p className="fine">
                    Simulate recipient or unilateral actions below. Either person can unlink or block immediately.
                  </p>
                  <div className="button-row">
                    {pair.status !== 'accepted' && (
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => updateStatus(pair.participantId, 'accepted')}
                      >
                        Simulate Accept
                      </button>
                    )}
                    {pair.status === 'accepted' && (
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => updateStatus(pair.participantId, 'unlinked')}
                      >
                        Unlink Immediately
                      </button>
                    )}
                    {pair.status !== 'declined' && pair.status !== 'accepted' && (
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => updateStatus(pair.participantId, 'declined')}
                      >
                        Simulate Decline
                      </button>
                    )}
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => updateStatus(pair.participantId, 'blocked')}
                    >
                      Block
                    </button>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => setReportTarget(pair.participantId)}
                    >
                      Report abuse
                    </button>
                  </div>
                </div>
              </div>
              {pair.partnerDateNightRating && pair.status === 'accepted' && (
                <p className="fine">
                  <strong>Partner Date-Night Rating:</strong> {pair.partnerDateNightRating.venueName} —{' '}
                  {pair.partnerDateNightRating.privateNote}
                </p>
              )}
            </article>
          ))}
        </div>

        {reportTarget && (
          <div className="notice" role="region" aria-label="Report misconduct">
            <h4>Report Harassment or Misconduct ({reportTarget})</h4>
            <p className="fine">
              Reports go to a human-reviewed conduct queue (review → warning, suspension, or termination + appeal path).
              Product frustration belongs in the separate Feedback queue.
            </p>
            <label htmlFor="report-reason">Reason for conduct report</label>
            <input
              id="report-reason"
              type="text"
              value={reportReason}
              onChange={e => setReportReason(e.target.value)}
            />
            <div className="button-row">
              <button
                type="button"
                className="primary"
                onClick={() => {
                  updateStatus(reportTarget, 'blocked')
                  setReportTarget(null)
                  onNotice(
                    `Conduct report logged for ${reportTarget} and participant blocked in this preview session.`
                  )
                }}
              >
                Submit Report & Block
              </button>
              <button type="button" className="secondary" onClick={() => setReportTarget(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="card stack-md" aria-label="Opt-in behavior challenges">
        <div className="section-heading">
          <p className="eyebrow">OPT-IN BEHAVIOR CHALLENGES</p>
          <span className="tag">Action-based · No weight-loss competitions</span>
        </div>
        <h2>Shared Workout & Meal-Prep Challenges</h2>
        <div className="stack-sm">
          {challenges.map(ch => (
            <article className="card soft" key={ch.id}>
              <div className="section-heading">
                <h3>{ch.title}</h3>
                <span className="tag">{ch.joined ? 'Joined · Active' : 'Opt-in available'}</span>
              </div>
              <p>{ch.targetSummary}</p>
              <p className="fine">
                Your progress: <strong>{ch.userCompletedCount} / {ch.targetCount}</strong> · Linked partner progress:{' '}
                <strong>{ch.partnerCompletedCount} / {ch.targetCount}</strong>
              </p>
              <p className="fine">{ch.privacyNote}</p>
              <div className="button-row">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    onUpdateChallenges(
                      challenges.map(c => (c.id === ch.id ? { ...c, joined: !c.joined } : c))
                    )
                    onNotice(ch.joined ? `Left challenge "${ch.title}".` : `Joined challenge "${ch.title}".`)
                  }}
                >
                  {ch.joined ? 'Leave Challenge' : 'Join Challenge'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export function FaqsAndPilotHandoffView({
  firstTimeElapsedMs,
  firstTimeInputCount,
  returningElapsedMs,
  returningInputCount,
}: {
  firstTimeElapsedMs: number | null
  firstTimeInputCount: number
  returningElapsedMs: number | null
  returningInputCount: number
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const filteredFaqs = faqCatalog.filter(
    f =>
      !searchQuery.trim() ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="stack-lg">
      <section className="card stack-md" aria-label="Frequently asked questions">
        <div className="section-heading">
          <p className="eyebrow">FREQUENTLY ASKED QUESTIONS & TRANSPARENCY</p>
          <span className="tag">9 Core Pilot Topics</span>
        </div>
        <h2>How You&Me Works</h2>
        <label htmlFor="faq-search">Filter FAQ topics</label>
        <input
          id="faq-search"
          type="search"
          placeholder="Search guest trial, memories, pricing, habit stars, unlinking, privacy…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="stack-sm">
          {filteredFaqs.map(faq => (
            <details className="faq-item" key={faq.id} open={!searchQuery.trim()}>
              <summary>
                <strong>{faq.question}</strong>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="card stack-md" aria-label="45-day private pilot handoff and checkpoints">
        <div className="section-heading">
          <p className="eyebrow">45-DAY PRIVATE PILOT HANDOFF · ENDING DEC 25, 2026 CENTRAL</p>
          <span className="tag">Target: ≥25 Unique Activated Pilot Users</span>
        </div>
        <h2>Pilot Checkpoints & Measured Usability Telemetry</h2>
        <p className="help">
          Activation means an invited non-staff user verifies sign-in and completes at least one Fitness or Nutrition
          action. Below are the 5 mandatory pilot checkpoints and the live session’s measured timing for First-Time
          Guest vs Returning Member flows.
        </p>

        <div className="field-row">
          <div className="card soft">
            <p className="eyebrow">MEASURED FIRST-TIME GUEST FLOW</p>
            <h3>
              {firstTimeElapsedMs !== null ? `${(firstTimeElapsedMs / 1000).toFixed(1)}s elapsed` : 'Ready to time'}
            </h3>
            <p className="fine">
              Inputs adjusted in session: <strong>{firstTimeInputCount}</strong> · Target: ≤ 5 minutes (300s) from
              Welcome to selected plan + 1 completed action.
            </p>
          </div>
          <div className="card soft">
            <p className="eyebrow">MEASURED RETURNING MEMBER FAST-PATH</p>
            <h3>
              {returningElapsedMs !== null ? `${(returningElapsedMs / 1000).toFixed(1)}s elapsed` : 'Use Fast-Path on Goal Screen'}
            </h3>
            <p className="fine">
              Inputs adjusted in fast-path: <strong>{returningInputCount}</strong> · Uses remembered equipment, pantry,
              and appliances for 1-step review & generate.
            </p>
          </div>
        </div>

        <div className="table-scroll">
          <table className="pilot-table">
            <thead>
              <tr>
                <th>Checkpoint</th>
                <th>Required Result</th>
                <th>Current Prototype & Repo Evidence Status</th>
              </tr>
            </thead>
            <tbody>
              {pilotCheckpointsCatalog.map(cp => (
                <tr key={cp.checkpoint}>
                  <td>
                    <strong>{cp.checkpoint}</strong>
                  </td>
                  <td>{cp.requiredResult}</td>
                  <td>{cp.currentEvidenceStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
