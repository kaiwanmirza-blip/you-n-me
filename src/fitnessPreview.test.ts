import { describe, expect, it } from 'vitest'
import { fitnessPlanSchema, type PlanRequest } from '../shared/contracts'
import { defaultInputs, makeSamplePlan, modeLabel, movementOptions, setCompletion } from './fitnessPreview'
const request = (inputs = defaultInputs, mode: PlanRequest['mode'] = 'guided'): PlanRequest => ({ mode, profile: { journey:'fitness',guide:'Jane',dataOrigin:'fictional',sampleId:'sample-a',adultEligibility:'adult',goal:'Build a routine',units:'us-customary',inputs:structuredClone(inputs) } })
describe('Bounded sample adapter', () => {
 it('fits every supported budget/equipment/exclusion combination or rejects explicitly', () => {
   for (const durationMinutes of [15,20,30,60]) for (const equipment of [[],['dumbbells']]) for(let mask=0;mask<16;mask++) {
     const excludedMovements=movementOptions.filter((_,i)=>Boolean(mask & (1<<i)))
     const r=request({...defaultInputs,durationMinutes,equipment,excludedMovements})
     const available=movementOptions.filter(m=>!excludedMovements.includes(m)&&(m!=='curl'||equipment.length))
     if(!available.length) {expect(()=>makeSamplePlan(r)).toThrow('No supported movements');continue}
     const {plan}=makeSamplePlan(r)
     expect(fitnessPlanSchema.safeParse(plan).success).toBe(true)
     expect(plan.estimatedTotalSeconds).toBe(durationMinutes*60)
     for(const action of plan.actions) expect(excludedMovements).not.toContain(action.movementId)
   }
 })
 it('changes duration and equipment meaningfully without modifying the previous plan',()=>{
   const first=makeSamplePlan(request())
   const next=makeSamplePlan(request({...defaultInputs,durationMinutes:15,equipment:['dumbbells']}))
   expect(first.plan.input.durationMinutes).toBe(20)
   expect(next.plan.actions[1].movementId).toBe('curl')
   expect(next.plan.actions[1].workSeconds).toBeLessThan(first.plan.actions[1].workSeconds)
 })
 it('rejects unsupported duration, equipment, exclusions and intensity',()=>{
   for(const durationMinutes of [0,14,15.5,61,NaN]) expect(()=>makeSamplePlan(request({...defaultInputs,durationMinutes}))).toThrow()
   expect(()=>makeSamplePlan(request({...defaultInputs,equipment:['barbell']}))).toThrow('supports no equipment or dumbbells')
   expect(()=>makeSamplePlan(request({...defaultInputs,excludedMovements:['anything']}))).toThrow('supported movement list')
   const r=request();if(r.profile.journey==='fitness')r.profile.inputs.intensity='high'
   expect(()=>makeSamplePlan(r)).toThrow('low intensity only')
 })
 it('never supplies sample output for live and preserves original provenance',()=>{
   const original=makeSamplePlan(request(), '2026-11-04T12:00:00.000Z')
   const demo=makeSamplePlan(request(defaultInputs,'demo'))
   expect(original.provenance.mode).toBe('guided');expect(demo.provenance.mode).toBe('demo')
   expect(original.provenance.source).toBe('sample');expect(modeLabel('demo')).toContain('not live AI')
   expect(()=>makeSamplePlan(request(defaultInputs,'live'))).toThrow('Live AI is unavailable')
 })
 it('completes idempotently, undoes, and rejects unknown actions',()=>{
   const {plan}=makeSamplePlan(request())
   const once=setCompletion([], 'warm-up', true,plan)
   expect(setCompletion(once,'warm-up',true,plan)).toEqual(once)
   expect(setCompletion(once,'warm-up',false,plan)).toEqual([])
   expect(setCompletion(once,'unknown',true,plan)).toEqual(once)
 })
})
