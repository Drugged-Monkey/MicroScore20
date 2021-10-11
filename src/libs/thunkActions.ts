import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, IAction, IApplicationState, IHeaderLevelItem } from "./interfaces";
import { loadSeasons, loadTowns } from "./repositories";

export const loadTownsThunkActionCreator: ActionCreator<ThunkAction<Promise<void>, IApplicationState, {}, IAction>> = () => {
    return async (dispatch: Dispatch<IAction>): Promise<void> => {
        try {
            dispatch({type: ActionType.LOADING });

            await loadTowns().then(towns => {
                const items = towns.map(t => { return { name: t.name, id: t.id.toString() } as IHeaderLevelItem });
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

export const loadSeasonsThunkActionCreator: ActionCreator<ThunkAction<Promise<void>, IApplicationState, {}, IAction>> = (id: string) => {
    return async (dispatch: Dispatch<IAction>): Promise<void> => {
        try {
            dispatch({type: ActionType.LOADING });

            await loadSeasons(id).then(towns => {
                const items = towns.map(t => { return { name: t.name, id: t.id } as IHeaderLevelItem });

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
