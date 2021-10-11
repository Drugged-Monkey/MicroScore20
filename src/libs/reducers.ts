import { ActionType, IAction, IApplicationState, IHeaderLevelItem, IHeaderState, defaultHeaderState, ICommonState, defaultCommonState, IMMState, defaultMMState } from "./interfaces";

export const headerReducer = (state: IHeaderState = defaultHeaderState, action: IAction): IHeaderState => {
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
                    townId: action.payload
                }
            }
        }
        case ActionType.CLEAN_TOWN: {
            return {
                ...state, ...{
                    townId: null
                }
            }
        }
        case ActionType.CHANGE_SEASON: {
            return {
                ...state, ...{
                    seasonId: action.payload
                }
            }
        }
        case ActionType.CLEAN_SEASON: {
            return {
                ...state, ...{
                    seasonId: null
                }
            }
        }
        // CHANGE TOWN
        default:
            return state;
    }
}

export const commonReducer = (state: ICommonState = defaultCommonState, action: IAction): ICommonState => {
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

export const mmReducer = (state: IMMState = defaultMMState, action: IAction): IMMState => {
    switch (action.type) {
        case ActionType.ADD_MM:{
            console.log(action.payload);
            return {
                ...state, ...{
                    townId: action.payload.townId,
                    seasonId: action.payload.seasonId,
                    table: action.payload.table,
                    crossTable: action.payload.crossTable
                }
            } as IMMState;
        }
        case ActionType.CLEAN_MM: {
            return {
                ...state, ...{
                    townId: null,
                    seasonId: null,
                    table: null,
                    crossTable: null
                }
            } as IMMState;
        }
        default:
            return state;
    }
}
