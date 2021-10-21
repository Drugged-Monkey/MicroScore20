import { Middleware } from 'redux'
import { ThunkDispatch } from 'redux-thunk';

import { ActionType, IAction, IApplicationState, ISeasonBase, ITownBase } from './interfaces'
import { store } from './store';
import { loadSeasonsAsMenuItemsThunkActionCreator, loadMMTablesThunkActionCreator, loadTownThunkActionCreator, loadSeasonThunkActionCreator } from './thunkActions';

export const loggerMiddleware: Middleware<{}, IApplicationState> = storeApi => next => action => {
    //const state = storeApi.getState();
    console.log(action);
    next(action);
}

export const changeTownMiddleware: Middleware<{}, IApplicationState> = storeApi => next => action => {
    if (action.type === ActionType.CHANGE_TOWN) {
        const { id } = action.payload as ITownBase;
        store.dispatch({type: ActionType.CLEAN_SEASON });
        store.dispatch({type: ActionType.CLEAN_LEVEL3 });
        store.dispatch({type: ActionType.CLEAN_MM });
        (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadTownThunkActionCreator(id));
        (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadSeasonsAsMenuItemsThunkActionCreator(id));
    }
    next(action);
}

export const changeSeasonMiddleware: Middleware<{}, IApplicationState> = storeApi => next => action => {

    if (action.type === ActionType.CHANGE_SEASON) {
        const state = storeApi.getState();
        const { id } = action.payload as ISeasonBase;        
        store.dispatch({type: ActionType.CLEAN_MM });
        (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadSeasonThunkActionCreator(state.header.town?.id, id));
        (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadMMTablesThunkActionCreator(state.header.town?.id, id));
    }

    next(action);
}

export const changeTownAndSeasonMiddleware: Middleware<{}, IApplicationState> = storeApi => next => action => {

    if (action.type === ActionType.CHANGE_TOWN_AND_SEASON) {
        const state = storeApi.getState();
        const { townId, seasonId } = action.payload;        
        store.dispatch({type: ActionType.CLEAN_LEVEL2 });
        store.dispatch({type: ActionType.CLEAN_LEVEL3 });
        store.dispatch({type: ActionType.CLEAN_MM });
        (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadTownThunkActionCreator(townId));
        (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadSeasonThunkActionCreator(townId, seasonId));
        (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadSeasonsAsMenuItemsThunkActionCreator(townId));
        (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadMMTablesThunkActionCreator(townId, seasonId));
    }

    next(action);
}