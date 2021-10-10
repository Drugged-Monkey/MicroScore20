import { IAppSettings } from "./interfaces";

//export default appSettings;
export const appSettings: IAppSettings = {
    cities: [{
        name: "Минск (студенты)",
        id: "6756",
        titles: {
            a: "Тур"
        },
        seasons: [
            {
                id: "2020-2021",
                name: "2020-2021",
                tours: []
            }
        ]
    }, {
        name: "Минск",
        id: "1234",
        titles: {
            a: "Лига А",
            b: "Лига Б",
            final: "Финал"
        },
        seasons: [
            {
                id: "2019-2020",
                name: "2019-2020",
                tours: []
            }, {
                id: "2020-2021",
                name: "2020-2021",
                tours: [{
                    a: 6776,
                    b: 6842,
                    hosts: []
                }, {
                    a: 6842,
                    b: 6858,
                    hosts: []
                }, {
                    a: 6886,
                    b: 6893,
                    hosts: []
                }, {
                    a: 7007,
                    b: 7013,
                    hosts: []
                }, {
                    a: 7039,
                    b: 7069,
                    hosts: []
                }, {
                    a: 7111,
                    b: 7116,
                    hosts: []
                }, {
                    final: 7161,
                    hosts: []
                }
                ]
            }, {
                id: "2021-2022",
                name: "2021-2022",
                tours: []
            }
        ]
    }, {
        name: "Витебск",
        id: "3456",
        titles: {
            a: "Высшая лига",
            b: "Первая лига"
        },
        seasons: [{
            id: "2020-2021",
            name: "2020-2021",
            tours: []
        }, {
            id: "2021-2022",
            name: "2021-2022",
            tours: []
        }]
    }]
}