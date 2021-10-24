import { ActionType, IAction, IApplicationState, IHeaderLevelItem, IHeaderState, defaultHeaderState, ICommonState, defaultCommonState, IMMState, defaultMMState, ITownBase, ISeasonBase, IAuthState, defaultAuthState, IUserBase } from "./interfaces";

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
        // CHANGE TOWN AND SEASON
        case ActionType.CHANGE_TOWN: {
            return {
                ...state, ...{
                    town: action.payload as ITownBase
                } 
            }
        }
        case ActionType.CLEAN_TOWN: {
            return {
                ...state, ...{
                    town: null
                }
            }
        }        
        case ActionType.LOAD_TOWN: {
            return {
                ...state, ...{
                    town: action.payload as ITownBase
                }
            }
        }
        case ActionType.CHANGE_SEASON: {
            return {
                ...state, ...{
                    season: action.payload as ISeasonBase
                }
            }
        }
        case ActionType.CLEAN_SEASON: {
            return {
                ...state, ...{
                    season: null
                }
            }
        }
        case ActionType.LOAD_SEASON: {
            return {
                ...state, ...{
                    season: action.payload as ISeasonBase
                }
            }
        }
        case ActionType.CHANGE_TOWN_AND_SEASON: {
            const { townId, seasonId } = action.payload;
            return {
                ...state, ... {
                    town: {
                        id: townId
                    } as ITownBase,
                    season: {
                        id: seasonId,
                    } as ISeasonBase
                }
            }
        }
        // CHANGE TOWN AND SEASON
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
            return {
                ...state, ...{
                    townId: action.payload.townId,
                    seasonId: action.payload.seasonId,
                    seasonName: action.payload.seasonName,
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
                    table: [],
                    crossTable: []
                }
            } as IMMState;
        }
        default:
            return state;
    }
}

export const authReducer = (state: IAuthState = defaultAuthState, action: IAction): IAuthState => {
    switch (action.type) {
        case ActionType.AUTH_SIGNIN: {
            return {
                ...state, ...{
                    isAuthenticated: true,
                    user: action.payload as IUserBase
                }
            } as IAuthState;
        }
        case ActionType.AUTH_SIGNOUT: {
            return {
                ...state, ...{
                    isAuthenticated: false,
                    user: null
                }
            } as IAuthState;
        }
        default:
            return state;
    }
}