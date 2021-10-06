export interface ITown {
    id: number;
    name: string;
}

export interface ITeam {
    id: number;
    name: string;
    town: ITown;
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
    name: string;
    tours: ITour[];
}

export interface ICity extends ITown {
    titles: ITitles;
    seasons: ISeason[];
}

export interface IAppSettings {
    cities: ICity[];
}

export interface IHeaderLevelItem {
    name: string;
    link: string;
}