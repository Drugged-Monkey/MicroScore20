import { IAppSettings } from "./interfaces";

//export default appSettings;
export const appSettings: IAppSettings = {
    cities: [{
        name: "Минск",
        id: 1234,
        titles: {
            a: "Лига А",
            b: "Лига Б",
            final: "Финал"
        },
        seasons: [{
                name: "2020-2021",
                tours: [ {
                        a: 6776,
                        b: 6842,
                        hosts: []
                    }, {
                        a: 6842,
                        b: 6858,
                        hosts: []
                    } , {
                        a: 6886,
                        b: 6893,
                        hosts: []
                    } , {
                        a: 7007,
                        b: 7013,
                        hosts: []
                    } , {
                        a: 7039,
                        b: 7069,
                        hosts: []
                    } , {
                        a: 7111,
                        b: 7116,
                        hosts: []
                    } , {
                        final: 7161,
                        hosts: []
                    }
                ]
            },{
                name: "2021-2022",
                tours: []
            }
        ]
    },{
        name: "Витебск",
        id: 3456,
        titles: {
            a: "Высшая лига",
            b: "Первая лига"
        },
        seasons: [{
            name: "2020-2021",
            tours: []
        },{
            name: "2021-2022",
            tours: []
        }
    ]}]
}