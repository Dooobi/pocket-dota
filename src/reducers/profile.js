import { model_profile } from "../constants/Models";

const ActionTypes = {
  SEARCH: 'SEARCH',
  SET_TIPS: 'SET_TIPS',
  SETTINGS: 'SETTINGS',
  SET_USER: 'SET_USER',
  SET_PROFILE: 'SET_PROFILE',

  SEARCH_PROFILE: 'SEARCH_PROFILE',
  SEARCH_PROFILE_RESULTS: 'SEARCH_PROFILE_RESULTS',
}
export const Actions = {
  setUser: user => ({ type: ActionTypes.SET_USER, user}),
  setTip: tip => ({ type: ActionTypes.SET_TIPS, tip }),
  settings: settings => ({ type: ActionTypes.SETTINGS, settings }),
  setProfile: profile => ({ type: ActionTypes.SET_PROFILE, profile }),

  searchFor: lastSearch => ({ type: ActionTypes.SEARCH_PROFILE, lastSearch }),
  searchForResults: lastSearchResults => ({ type: ActionTypes.SEARCH_PROFILE_RESULTS, lastSearchResults }),
}

export const initialState = model_profile({});

export default function reducer(state=initialState, action) {
  const { user, settings, lastSearch, lastSearchResults, profile, tip } = action;

  switch(action.type) {
    case ActionTypes.SEARCH_PROFILE:
      return { ...state, lastSearch };
    case ActionTypes.SEARCH_PROFILE_RESULTS:
      return { ...state, lastSearchResults };
    case ActionTypes.SETTINGS:
      return { ...state, settings: {...state.settings, ...settings} };
    case ActionTypes.SET_USER:
      return { ...state, user };
    case ActionTypes.SET_PROFILE: 
      return { ...profile };
    case ActionTypes.SET_TIPS:
      return { ...state, settings: {
          ...state.settings, 
          tipsState: { 
            ...state.settings.tipsState,
            ...tip
          },
        },
      };
    default:
      return state;
  }
}