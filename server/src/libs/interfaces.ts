export interface ISortable {
    order?: number;
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}

export interface IEntity {
    id?: string;
}

export interface ITownBase extends ISortable, IEntity{
    name?: string;
}

export interface ISeasonBase extends ISortable, IEntity{
    name?: string;
    exclude?: ITeam[]
}

export interface ITeam extends IEntity {
    name: string;
    ratingId?: number;
}

export interface ITeamResult extends ITeam {
    score: number;
}

export interface ITourBase extends ISortable, IEntity {
    a?: number;
    b?: number;
    c?: number;
    final?: number;
    hosts?: number[];
    results?: ITeamResult[];
}

export interface IMMTableTeam extends IEntity {
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

export interface IUserBase {
    id: string;
    name: string;
    email: string;
    photoURL?: string;
    ratingId?: number;
    roles: string[];
    authProvider: string;
}