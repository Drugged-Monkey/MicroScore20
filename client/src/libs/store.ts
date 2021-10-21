import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import { ActionType, IAction, IApplicationState, IHeaderLevelItem } from "./interfaces";
import { commonReducer, headerReducer, mmReducer } from './reducers';
import { loggerMiddleware, changeSeasonMiddleware, changeTownMiddleware, changeTownAndSeasonMiddleware } from './middlewares';
import { loadTownsAsMenuItemsThunkActionCreator } from './thunkActions';

const rootReducer = combineReducers<IApplicationState, IAction>({
    common: commonReducer,
    header: headerReducer,
    mm: mmReducer
});

const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(loggerMiddleware),
    applyMiddleware(changeTownMiddleware),
    applyMiddleware(changeSeasonMiddleware),
    applyMiddleware(changeTownAndSeasonMiddleware)
);

export const store = createStore(rootReducer, composedEnhancer);

export const fetchInitialData = async (): Promise<void> => {
    store.dispatch({ 
        type: ActionType.ADDMANY_LEVEL1,
        payload: [{ name: "Home", link: "/" }, { name: "About", link: "/about" }] as IHeaderLevelItem[]
    });

    (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadTownsAsMenuItemsThunkActionCreator());
};
