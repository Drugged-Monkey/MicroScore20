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

export interface ITeamResultLight {
    id: string;
    score: number;
}

export interface ITourLight {
    id: string;
    results: ITeamResultLight[]
}

export interface IMMTableTeam {
    id: string;
    name: string;
    score: number;
    win: number;
    draw: number;
    lose: number;
    place: number;
}

export interface IMMCrossTableMatch {
    hostTeamId: string;
    guestTeamId: string;
    hostScore: number;
    guestScore: number;
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
    table: IMMTableTeam[];
    crossTable: IMMCrossTableMatch[];
}

export const defaultMMState: IMMState = {
    townId: null,
    seasonId: null,
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