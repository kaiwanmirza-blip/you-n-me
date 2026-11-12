import { afterEach, expect, it, vi } from 'vitest'
import { checkApiHealth, evaluateRecompProgress, submitIntakeTurn } from './api'

afterEach(() => vi.unstubAllGlobals())
it('uses the same-origin development API and validates its response', async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: 'ok', service: 'you-n-me-api' })))
  vi.stubGlobal('fetch', fetchMock)
  expect((await checkApiHealth()).status).toBe('ok')
  expect(fetchMock).toHaveBeenCalledWith('/api/health', { signal: undefined, cache: 'no-store' })
})
it('rejects unavailable and malformed health responses instead of showing success', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('offline', { status: 503 })))
  await expect(checkApiHealth()).rejects.toThrow('API unavailable')
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: 'ok', secret: 'unexpected' }))))
  await expect(checkApiHealth()).rejects.toThrow()
})
it('bridges conversational intake and body recomposition assessment to shared contracts with offline fallback', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
  const turn = await submitIntakeTurn({
    guideSelection: 'Both',
    userMessage: 'motivation: V-taper recomposition; equipment: dumbbells, bench; exclusions: squat; 30 minutes',
    journey: 'fitness',
    mode: 'demo',
    memoryChips: {},
  })
  expect(turn.guideResponses).toHaveLength(2)
  expect(turn.readiness.readyToBuildProgram).toBe(true)

  const recomp = await evaluateRecompProgress({
    baseline: {
      dayIndex: 0,
      recordedAt: '2026-10-01T08:00:00Z',
      measurements: {
        waistCm: 90.2,
        chestCm: 104.0,
        shouldersCm: 116.8,
        hipsCm: 99.0,
        armCm: 36.8,
        thighCm: 58.4,
        calfCm: 38.1,
        scaleWeightKg: 81.0,
      },
      photoCheckInCompleted: true,
    },
    latest: {
      dayIndex: 28,
      recordedAt: '2026-10-29T08:00:00Z',
      measurements: {
        waistCm: 84.8,
        chestCm: 106.2,
        shouldersCm: 119.6,
        hipsCm: 97.5,
        armCm: 38.1,
        thighCm: 59.4,
        calfCm: 38.6,
        scaleWeightKg: 80.7,
      },
      photoCheckInCompleted: true,
    },
    checkInDay: 28,
    checkInDue: true,
    mode: 'demo',
  })
  expect(recomp.assessment).toBe('possible-recomposition')
  expect(recomp.checkInStarImpact).toBe(0)
})
