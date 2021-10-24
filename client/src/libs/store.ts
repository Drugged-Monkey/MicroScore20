import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import { ActionType, IAction, IApplicationState, IHeaderLevelItem } from "./interfaces";
import { commonReducer, headerReducer, mmReducer, authReducer } from './reducers';
import { loggerMiddleware, changeSeasonMiddleware, changeTownMiddleware, changeTownAndSeasonMiddleware } from './middlewares';
import { loadTownsAsMenuItemsThunkActionCreator } from './thunkActions';
import { getAuth } from "@firebase/auth";
import { firebaseApp } from "./firebase";
import { exchangeGoogleTokens, getUser } from "./repositories";

const rootReducer = combineReducers<IApplicationState, IAction>({
    common: commonReducer,
    header: headerReducer,
    mm: mmReducer,
    auth: authReducer
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
        payload: [{ name: "Home", link: "/" }, { name: "About", link: "/about" }, { name: "Admin", link: "/admin" }] as IHeaderLevelItem[]
    });

    (store.dispatch as ThunkDispatch<IApplicationState, {}, IAction>)(loadTownsAsMenuItemsThunkActionCreator());

    const auth = getAuth(firebaseApp);

    console.log(auth);

    auth.onAuthStateChanged((user: any) => {
        if (!!user && user.uid) {
            getUser(user.uid)
                .then((user) => {
                    if (!!user) {
                        store.dispatch({ type: ActionType.AUTH_SIGNIN, payload: user });
                        return Promise.resolve();
                    } else {
                        return Promise.reject("Something went wrong during authentication user.");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
};
