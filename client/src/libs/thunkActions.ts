import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, IAction, IApplicationState, IHeaderLevelItem } from "./interfaces";
import { loadMM, loadSeasons, loadTowns } from "./repositories";

export const loadTownsThunkActionCreator: ActionCreator<ThunkAction<Promise<void>, IApplicationState, {}, IAction>> = () => {
    return async (dispatch: Dispatch<IAction>): Promise<void> => {
        try {
            dispatch({type: ActionType.LOADING });

            await loadTowns().then(towns => {
                const items = towns.map(t => { return { 
                    name: t.name, 
                    id: t.id,
                    link: `/town/${t.id}`
                } as IHeaderLevelItem });
                dispatch({
                    type: ActionType.ADDMANY_LEVEL2,
                    payload: items
                } as IAction);
            });
        } catch (e) {
            
        } finally {
            dispatch({type: ActionType.LOADED });
        }
    };
};

export const loadSeasonsThunkActionCreator: ActionCreator<ThunkAction<Promise<void>, IApplicationState, {}, IAction>> = (townId: string) => {
    return async (dispatch: Dispatch<IAction>): Promise<void> => {
        try {
            dispatch({type: ActionType.LOADING });

            await loadSeasons(townId).then(seasons => {
                const items = seasons.map(s => { return { 
                    name: s.name, 
                    id: s.id,
                    link: `/town/${townId}/season/${s.id}`
                } as IHeaderLevelItem });

                dispatch({
                    type: ActionType.ADDMANY_LEVEL3,
                    payload: items
                } as IAction);
            });
        } catch (e) {

        } finally {
            dispatch({type: ActionType.LOADED });
        }
    };
};

export const loadSeasonThunkActionCreator: ActionCreator<ThunkAction<Promise<void>, IApplicationState, {}, IAction>> = (townId: string, seasonId: string) => {
    return async (dispatch: Dispatch<IAction>): Promise<void> => {
        try {
            dispatch({type: ActionType.LOADING });

            await loadMM(townId, seasonId).then(mm => {
                dispatch({
                    type: ActionType.ADD_MM,
                    payload: mm
                } as IAction);
            });
        } catch (e) {

        } finally {
            dispatch({type: ActionType.LOADED });
        }
    };
};