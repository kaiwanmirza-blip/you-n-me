export type Screen = 'Welcome' | 'Your goal' | 'Home' | 'Fitness' | 'Nutrition' | 'Progress' | 'Explore' | 'Settings'
export type Navigation = { screen: Screen; history: Screen[] }
export function navigate(state: Navigation, next: Screen): Navigation {
  return state.screen === next ? state : { screen: next, history: [...state.history, state.screen].slice(-40) }
}
export function navigateBack(state: Navigation): Navigation {
  return state.history.length ? { screen: state.history.at(-1)!, history: state.history.slice(0, -1) } : state
}
