import * as React from "react";

import cssExports from "./MMCrossTable.scss";
import { IMMCrossTableMatch } from "../../libs/interfaces";

export interface IMMCrossTableProps {
    mmCrossTable: IMMCrossTableMatch[];
}

export const MMCrossTable = (props: IMMCrossTableProps) => {


    return (
        <div>
            <h4>Cross Table</h4>
            <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
            </table>
        </div>
    );
}

export default MMCrossTable;