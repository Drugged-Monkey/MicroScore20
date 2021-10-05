export interface ITown {
    id: number,
    name: string
}

export interface ITeam {
    id: number;
    name: string;
    town: ITown
}

export interface ITeamResult {
    team: ITeam;
    current: ITeam;
    questionsTotal: number;
    synchRequest: boolean;
    position: number;
}