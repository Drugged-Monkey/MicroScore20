import { ITeamResult } from "./interfaces";


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