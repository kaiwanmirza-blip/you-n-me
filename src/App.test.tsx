import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import App from './App'

describe('YM-02A scaffold boundary', () => {
  it('identifies the prototype and discloses unavailable journeys', () => {
    const html = renderToStaticMarkup(<App />)
    expect(html).toContain('Investor prototype')
    expect(html).toContain('Working journeys are not implemented yet.')
    expect(html).toContain('There is no live AI connection or payment flow here.')
    expect(html.match(/<main\b/g)).toHaveLength(1)
    expect(html.match(/<h1\b/g)).toHaveLength(1)
  })

  it('offers no data-entry, fake journey controls or external resources', () => {
    const html = renderToStaticMarkup(<App />)
    expect(html).not.toMatch(/<(form|input|button|iframe|script)\b/)
    expect(html).not.toMatch(/(?:src|href)="https?:/)
  })
})
