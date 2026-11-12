export type Screen =
  | 'Welcome'
  | 'Your goal'
  | 'Home'
  | 'Fitness'
  | 'Nutrition'
  | 'Progress'
  | 'Explore'
  | 'Friends'
  | 'FAQs'
  | 'Settings'

export interface Navigation {
  screen: Screen
  history: Screen[]
}

export function navigate(state: Navigation, next: Screen): Navigation {
  return state.screen === next
    ? state
    : {
        screen: next,
        history: [...state.history, state.screen],
      }
}

export function navigateBack(state: Navigation): Navigation {
  return state.history.length
    ? {
        screen: state.history[state.history.length - 1],
        history: state.history.slice(0, -1),
      }
    : state
}
