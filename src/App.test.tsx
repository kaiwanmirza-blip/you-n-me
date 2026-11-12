import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import App from './App'
import {
  GLOBAL_HERITAGE_ROSTER,
  WARDROBE_DRESSUP_CATALOG,
  defaultConversationalMemory,
  getPersonaPortraitUrl,
  heritageLookCatalog,
  vTaperMuscleMap,
} from './GuideAvatar'
describe('Preview welcome', () => {
  it('discloses scope and starts with Jane', () => {
    const html = renderToStaticMarkup(<App />)
    expect(html).toContain('Investor prototype')
    expect(html).toContain('Guided demonstration · sample response')
    expect(html).toContain('refresh resets this preview')
    expect(html).toContain('Jane, your guide')
    expect(html).toContain('New design proposal')
    expect(html.match(/<main\b/g)).toHaveLength(1)
    expect(html.match(/<h1\b/g)).toHaveLength(1)
  })
  it('does not load external artwork or scripts', () => {
    expect(renderToStaticMarkup(<App />)).not.toMatch(/(?:src|href)="https?:/)
  })
  it('renders photorealistic guide portraits, Co-Guide mode, 10 global heritages, and device frame controls', () => {
    const html = renderToStaticMarkup(<App />)
    expect(html).toContain('/guides/jane-realistic.jpg')
    expect(html).toContain('Jane + Kay Together')
    expect(html).toContain('iPhone Frame')
    expect(html).toContain('iPad Frame')
    expect(vTaperMuscleMap.length).toBeGreaterThanOrEqual(4)
    expect(defaultConversationalMemory.targetPhysiqueIspiration).toContain('John Abraham V-Taper')
    expect(defaultConversationalMemory.equipment.length).toBeGreaterThanOrEqual(3)
    expect(heritageLookCatalog.length).toBeGreaterThanOrEqual(4)
    expect(GLOBAL_HERITAGE_ROSTER).toHaveLength(10)
    expect(getPersonaPortraitUrl('Kay', 'latin_american', 'full')).toBe('/guides/personas/kay-latin_american-full.jpg')
    expect(WARDROBE_DRESSUP_CATALOG.tops.blazer.length).toBeGreaterThanOrEqual(3)
  })
})
