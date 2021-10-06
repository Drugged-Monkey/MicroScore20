import { ICity, ISeason, ITeamResult, ITown } from "./interfaces";
import { appSettings } from './settings';

export async function loadTournament(id: number): Promise<ITeamResult[]> {
    const key = id.toString();

    return await fetch(
        `https://api.rating.chgk.net/tournaments/${key}/results?includeTeamMembers=0&includeMasksAndControversials=0&includeTeamFlags=0&includeRatingB=0`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.error(error);
            }
        );
}


export async function loadTowns(): Promise<ITown[]> {
    const cities = appSettings.cities;

    return new Promise<ITown[]>((resolve) => {
        const towns = cities.map(c => { return {name: c.name, id: c.id} as ITown });
        resolve(towns);
    });
}

export async function loadSeasons(id: number): Promise<ISeason[]> {
    const cities = appSettings.cities;

    return new Promise<ISeason[]>((resolve) => {
        const seasons = cities.find(c => c.id === id)?.seasons.map(c => { return {name: c.name} as ISeason });
        resolve(seasons);
    });
}