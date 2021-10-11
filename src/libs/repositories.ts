import { ITown, ISeason, ITeamResult, ITownBase } from "./interfaces";
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


export function loadTowns(): Promise<ITownBase[]> {
    const cities = appSettings.cities;

    return new Promise<ITownBase[]>((resolve, reject) => {
        try {
            delay(1000).then(() => {
                const towns = cities.map(c => { return { name: c.name, id: c.id } as ITownBase });
                resolve(towns);
            });
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export function loadSeasons(id: string): Promise<ISeason[]> {
    const cities = appSettings.cities;

    return new Promise<ISeason[]>((resolve, reject) => {
        try {            
            delay(1000).then(() => {
                const seasons = cities.find(c => c.id === id)?.seasons.map(c => { return { name: c.name, id: c.id } as ISeason });
                resolve(seasons);
            });
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}