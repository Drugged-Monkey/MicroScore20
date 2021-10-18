import { Action } from "redux";

export interface ITownBase {
    id: string;
    name: string;
}

export interface ITeam {
    id: string;
    name: string;
    town?: ITownBase;
}

export interface ITeamResultDetailed {
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
    id?: string;
    a?: number;
    b?: number;
    c?: number;
    final?: number;
    hosts?: number[];
    results?: ITeamResult[];
}

export interface ITeamResult {
    id: string;
    name: string;
    result: number;
    ratingId?: number;
}

export interface ISeason {
    id: string;
    name: string;
    tours: ITour[];
}

export interface ITeamResultLight {
    id: string;
    ratingId?: number;
    score: number;
}

export interface ITourLight {
    id: string;
    results: ITeamResultLight[]
}

export interface IMMTableTeam {
    id: string;
    n: string;
    s: number;
    w: number;
    d: number;
    l: number;
    p: number;
}

export interface IMMCrossTableMatch {
    hId: string;
    gId: string;
    hs: number;
    gs: number;
}

export interface IMM {
    townId: string;
    seasonId: string;
    table: IMMTableTeam[];
    crossTable: IMMCrossTableMatch[];
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
    ADDMANY_LEVEL1 = "ADDMANY_LEVEL1",
    CLEAN_LEVEL1 = "CLEAN_LEVEL1",
    ADDMANY_LEVEL2 = "ADDMANY_LEVEL2",
    CLEAN_LEVEL2 = "CLEAN_LEVEL2",
    ADDMANY_LEVEL3 = "ADDMANY_LEVEL3",
    CLEAN_LEVEL3 = "CLEAN_LEVEL3",
    LOAD_TOWNS = "LOAD_TOWNS",
    CHANGE_TOWN = "CHANGE_TOWN",
    CLEAN_TOWN = "CLEAN_TOWN",
    CHANGE_SEASON = "CHANGE_SEASON",
    CLEAN_SEASON = "CLEAN_SEASON",
    LOADING = "LOADING",
    LOADED = "LOADED",
    CLEAN_MM = "CLEAN_MM",
    ADD_MM = "ADD_MM"
}

export interface IAction extends Action {
    type: ActionType,
    payload?: any
}

export interface IHeaderState {
    townId?: string,
    seasonId?: string,
    level1: IHeaderLevelItem[],
    level2: IHeaderLevelItem[],
    level3: IHeaderLevelItem[]
}

export const defaultHeaderState: IHeaderState = {
    townId: null,
    seasonId: null,
    level1: [],
    level2: [],
    level3: []
};

export interface ICommonState {
    loading: boolean,
    error: string,
}

export const defaultCommonState: ICommonState = {
    loading: false,
    error: null
}

export interface IMMState {
    townId: string;
    seasonId: string;
    seasonName: string;
    table: IMMTableTeam[];
    crossTable: IMMCrossTableMatch[];
}

export const defaultMMState: IMMState = {
    townId: null,
    seasonId: null,
    seasonName: null,
    table: [],
    crossTable: []
}

export interface IApplicationState {
    header: IHeaderState,
    common: ICommonState,
    mm: IMMState
}

export const defaultApplicationState: IApplicationState = {
    header: defaultHeaderState,
    common: defaultCommonState,
    mm: defaultMMState
}