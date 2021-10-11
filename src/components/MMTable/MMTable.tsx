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
                            <td>Score</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.mmTable.map((m) => {
                                return  <tr>
                                    <td>{m.place}</td>
                                    <td>{m.name}</td>
                                    <td>{m.score}</td>
                                </tr>
                           })
                        }
                    </tbody>
            </table>
        </div>
    );
}

export default MMTable;