import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import App from './App'
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
})
