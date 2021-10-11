import { ActionType, IAction, IApplicationState, IHeaderLevelItem, IHeaderState, defaultHeaderState, ICommonState, defaultCommonState } from "./interfaces";

export function headerReducer(state: IHeaderState = defaultHeaderState, action: IAction): IHeaderState {
    switch (action.type) {
        // LEVEL 1
        case ActionType.ADDMANY_LEVEL1:
            return {
                ...state, ...{
                    level1: action.payload as IHeaderLevelItem[]
                } as IHeaderState
            };
        case ActionType.CLEAN_LEVEL1: {
            return {
                ...state, ...{
                    level1: [] as IHeaderLevelItem[]
                }
            } as IHeaderState;
        }
        // LEVEL 1
        // LEVEL 2
        case ActionType.ADDMANY_LEVEL2:
            return {
                ...state, ...{
                    level2: action.payload as IHeaderLevelItem[]
                } as IHeaderState
            };
        case ActionType.CLEAN_LEVEL2: {
            return {
                ...state, ...{
                    level2: [] as IHeaderLevelItem[]
                }
            } as IHeaderState;
        }
        // LEVEL 2
        // LEVEL 3
        case ActionType.ADDMANY_LEVEL3:
            return {
                ...state, ...{
                    level3: action.payload as IHeaderLevelItem[]
                } as IHeaderState
            };
        case ActionType.CLEAN_LEVEL3: {
            return {
                ...state, ...{
                    level3: [] as IHeaderLevelItem[]
                }
            } as IHeaderState;
        }
        // LEVEL 3
        // CHANGE TOWN
        case ActionType.CHANGE_TOWN: {
            return {
                ...state, ...{
                    currentTown: action.payload
                }
            }
        }
        case ActionType.CHANGE_SEASON: {
            return {
                ...state, ...{
                    currentSeason: action.payload
                }
            }
        }
        // CHANGE TOWN
        default:
            return state;
    }
}

export function commonReducer(state: ICommonState = defaultCommonState, action: IAction): ICommonState {
    switch (action.type) {
        case ActionType.LOADING:{
            return {
                ...state, ...{
                    loading: true
                }
            } as ICommonState;
        }
        case ActionType.LOADED: {
            return {
                ...state, ...{
                    loading: false
                }
            } as ICommonState;
        }
        default:
            return state;
    }
}