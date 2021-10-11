import { Middleware } from 'redux'
import { ThunkDispatch } from 'redux-thunk';

import { ActionType, IAction, IApplicationState } from './interfaces'
import { store } from './store';
import { loadSeasonsThunkActionCreator } from './thunkActions';

export const loggerMiddleware: Middleware<{}, IApplicationState> = storeApi => next => action => {
    const state = storeApi.getState();
    console.log(state);
    next(action);
}

export const seasonsMiddleware: Middleware<{}, IApplicationState> = storeApi => next => action => {
    if (action.type === ActionType.CHANGE_TOWN) {
        store.dispatch({type: ActionType.CHANGE_SEASON });
        store.dispatch({type: ActionType.CLEAN_LEVEL3 });
        (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadSeasonsThunkActionCreator(action.payload));
    }
    next(action);
}