import { describe, expect, it, vi, afterEach } from 'vitest'
import { resolveApiOrigin } from './runtimeConfig'
import { navigate, navigateBack, type Navigation } from './navigation'
import { Capacitor } from '@capacitor/core'
import { checkApiHealth } from './api'
afterEach(()=>{vi.restoreAllMocks();vi.unstubAllGlobals();vi.unstubAllEnvs()})
describe('Mobile runtime boundaries',()=>{
 it('keeps web same-origin and native offline without explicit configuration',()=>{
   expect(resolveApiOrigin(false)).toBe('');expect(resolveApiOrigin(true)).toBeNull()
   expect(resolveApiOrigin(true,'https://api.example.com/')).toBe('https://api.example.com')
 })
 it('rejects loopback, insecure, credential-bearing and path configuration',()=>{
   for(const value of ['http://example.com','https://localhost','https://127.0.0.1','https://[::1]','https://user:password@example.com','https://api.example.com/api','https://api.example.com/?key=x','not-a-url']) expect(()=>resolveApiOrigin(true,value)).toThrow()
 })
 it('does not even fetch health in an unconfigured native app',async()=>{
   vi.stubEnv('VITE_API_BASE_URL','');vi.spyOn(Capacitor,'isNativePlatform').mockReturnValue(true)
   const fetch=vi.fn();vi.stubGlobal('fetch',fetch)
   await expect(checkApiHealth()).rejects.toThrow('Bundled sample mode works offline')
   expect(fetch).not.toHaveBeenCalled()
 })
 it('goes back through actual navigation without resetting unrelated session state',()=>{
   let state:Navigation={screen:'Welcome',history:[]}
   for(const screen of ['Your goal','Home','Fitness','Settings'] as const)state=navigate(state,screen)
   expect(navigate(state,'Settings')).toBe(state)
   state=navigateBack(state);expect(state.screen).toBe('Fitness')
   state=navigateBack(state);expect(state.screen).toBe('Home')
   state=navigateBack(navigateBack(state));expect(state).toEqual({screen:'Welcome',history:[]})
   expect(navigateBack(state)).toBe(state)
 })
})
