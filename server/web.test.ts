import { describe, expect, it } from 'vitest'
import { createWebApp } from './web'
describe('Same-origin production API routing',()=>{
 it('retains health and API errors instead of returning frontend HTML',async()=>{
   const app=createWebApp()
   expect(await (await app.request('/api/health')).json()).toEqual({status:'ok',service:'you-n-me-api'})
   const missing=await app.request('/api/missing');expect(missing.status).toBe(404)
   expect((await missing.json()).error.code).toBe('NOT_FOUND')
   expect((await app.request('/api/plans/example')).status).toBe(501)
 })
})
