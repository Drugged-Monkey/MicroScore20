import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import { ActionType, IAction, IApplicationState, IHeaderLevelItem } from "./interfaces";
import { commonReducer, headerReducer, mmReducer } from './reducers';
import { loggerMiddleware, seasonMiddleware, seasonsMiddleware } from './middlewares';
import { loadTownsThunkActionCreator } from './thunkActions';

const rootReducer = combineReducers<IApplicationState, IAction>({
    common: commonReducer,
    header: headerReducer,
    mm: mmReducer
});

const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(loggerMiddleware),
    applyMiddleware(seasonsMiddleware),
    applyMiddleware(seasonMiddleware),
);

export const store = createStore(rootReducer, composedEnhancer);

export const fetchinItialData = async () => {
    fetchData();

    store.dispatch({type: ActionType.CLEAN_LEVEL1, payload: null});
    store.dispatch({type: ActionType.CLEAN_LEVEL2, payload: null});
    store.dispatch({type: ActionType.CLEAN_LEVEL3, payload: null});

    store.dispatch({ 
        type: ActionType.ADDMANY_LEVEL1,
        payload: [{ name: "Home", link: "/" }, { name: "About", link: "/about" }] as IHeaderLevelItem[]
    });

    (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadTownsThunkActionCreator());
};

const fetchData = async () => {
    callBackendAPI()
        .then(res => {
            console.log(res); 
        })
        .catch(err => { 
            console.error(err);
        });
}

const callBackendAPI = async () => {
  const response = await fetch('/api/towns');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
}