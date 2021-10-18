import * as React from "react";

import cssExports from "./MMTable.scss";
import { IMMTableTeam } from "../../libs/interfaces";

export interface IMMTableProps {
    mmTable: IMMTableTeam[];
}

export const MMTable = (props: IMMTableProps) => {

    return (
        <div>
            <h4>Table</h4>
            <table>
                    <thead>
                        <tr>
                            <td>Place</td>
                            <td>Team</td>
                            <td>W</td>
                            <td>D</td>
                            <td>L</td>
                            <td>Score</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.mmTable.map((m, i) => {
                                return  <tr key={`host-${m.id}`}>
                                            <td>{i + 1}</td>
                                            <td>{m.n}</td>
                                            <td>{m.w}</td>
                                            <td>{m.d}</td>
                                            <td>{m.l}</td>
                                            <td>{m.s}</td>
                                        </tr>
                           })
                        }
                    </tbody>
            </table>
        </div>
    );
}

export default MMTable;