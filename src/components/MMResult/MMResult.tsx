import * as React from "react";

import { useSelector } from "react-redux";
import { IApplicationState, IMMState } from "../../libs/interfaces";
import cssExports from "./MMResult.scss";

export const MMResult = () => {
    const mm = useSelector<IApplicationState, IMMState>(state => state.mm);
    const seasonId = mm.seasonId;
    const townId = mm.townId;
    const mmTable = mm.table;
    const mmCrossTable = mm.crossTable;

    return (
        <div className={cssExports.mmresult}>
            <h3>{townId}</h3>
            <h4>{seasonId}</h4>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MMResult;
