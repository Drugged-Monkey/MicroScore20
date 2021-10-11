import { Action } from "redux";

export interface ITownBase {
    id: string;
    name: string;
}

export interface ITeam {
    id: number;
    name: string;
    town: ITownBase;
}

export interface ITeamResult {
    team: ITeam;
    current: ITeam;
    questionsTotal: number;
    synchRequest: boolean;
    position: number;
}

export interface ITitles {
    a?: string;
    b?: string;
    c?: string;
    final?: string;
}

export interface ITour {
    a?: number;
    b?: number;
    c?: number;
    final?: number;
    hosts?: number[];
}

export interface ISeason {
    id: string;
    name: string;
    tours: ITour[];
}

export interface ITown extends ITownBase {
    titles: ITitles;
    seasons: ISeason[];
}

export interface IAppSettings {
    cities: ITown[];
}

export interface IHeaderLevelItem {
    id: string;
    name: string;
    link?: string;
}

export enum ActionType {
    ADD_LEVEL1 = "ADD_LEVEL1",
    ADDMANY_LEVEL1 = "ADDMANY_LEVEL1",
    CLEAN_LEVEL1 = "CLEAN_LEVEL1",
    ADD_LEVEL2 = "ADD_LEVEL2",
    ADDMANY_LEVEL2 = "ADDMANY_LEVEL2",
    CLEAN_LEVEL2 = "CLEAN_LEVEL2",
    ADD_LEVEL3 = "ADD_LEVEL3",
    ADDMANY_LEVEL3 = "ADDMANY_LEVEL3",
    CLEAN_LEVEL3 = "CLEAN_LEVEL3",
    LOAD_TOWNS = "LOAD_TOWNS",
    CHANGE_TOWN = "CHANGE_TOWN",
    CHANGE_SEASON = "CHANGE_SEASON",
    LOADING = "LOADING",
    LOADED = "LOADED"
}

export interface IAction extends Action {
    type: ActionType,
    payload?: any
}

export interface IHeaderState {
    currentTown?: string,
    currentSeason?: string,
    level1: IHeaderLevelItem[],
    level2: IHeaderLevelItem[],
    level3: IHeaderLevelItem[]
}

export const defaultHeaderState: IHeaderState = {
    currentTown: null,
    currentSeason: null,
    level1: [],
    level2: [],
    level3: []
};

export interface ICommonState {
    loading: boolean,
    towns: ITown[],
    error: string,
}

export const defaultCommonState: ICommonState = {
    loading: false,
    towns: [],
    error: null
}

export interface IApplicationState {
    header: IHeaderState,
    common: ICommonState
}

export const defaultApplicationState: IApplicationState = {
    header: defaultHeaderState,
    common: defaultCommonState
}