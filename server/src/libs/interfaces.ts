export interface ISortable {
    order?: number;
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}

export interface ITownBase extends ISortable{
    id?: string;
    name?: string;
}

export interface ISeasonBase extends ISortable{
    id?: string;
    name?: string;
}

export interface ITour extends ISortable {
    id: string;
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
    score: number;
    ratingId?: number;
}

export interface ITeam {
    id: string;
    name: string;
    town?: ITownBase;
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
