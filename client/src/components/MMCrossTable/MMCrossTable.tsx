import * as React from "react";

import cssExports from "./MMCrossTable.scss";
import { IMMCrossTableMatch, IMMTableTeam } from "../../libs/interfaces";

export interface IMMCrossTableProps {
    mmCrossTable: IMMCrossTableMatch[];
    mmTable: IMMTableTeam[];
}

export const MMCrossTable = (props: IMMCrossTableProps) => {
    const h = props.mmTable;
    const v = props.mmTable

    return (
        <div>
            <h4>Cross Table</h4>
            <table>
                    <thead>
                        <tr>
                            <td>Place</td>
                            <td>Name</td>
                            {
                                h.map((m, i) => {
                                    return <td key={`ccheaders-${m.id}`}>{i+1}</td>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            v.map((host, i) => {
                                return (
                                    <tr key={`host-${host.id}`}>
                                        <td>{i + 1}</td>
                                        <td>{host.n}</td>
                                        {
                                            h.map((guest) => {
                                                if(host.id !== guest.id) {
                                                    let result = props.mmCrossTable.find(mmct => mmct.hId === host.id && mmct.gId === guest.id);
                                                    if(!!!result) {
                                                        result = props.mmCrossTable.find(mmct => mmct.hId === guest.id && mmct.gId === host.id);
                                                    }
                                                    const hs = result?.hs || 0;
                                                    const gs = result?.gs || 0;

                                                    const className = hs > gs ? "green" : (hs == gs ? "yellow" : "red");

                                                    return (
                                                        <td key={`host-${host.id}-guest-${guest.id}`} className={cssExports[className]}>{`${hs}:${gs}`}</td>
                                                    );
                                                } else {
                                                    return (
                                                        <td key={`host-${host.id}-guest-${guest.id}`} className={cssExports["gray"]}></td>
                                                    )
                                                }
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
            </table>
        </div>
    );
}

export default MMCrossTable;