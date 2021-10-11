import * as React from "react";
import { useSelector } from "react-redux";

import { IApplicationState, IMMState } from "../../libs/interfaces";
import cssExports from "./MMResult.scss";
import MMCrossTable from "../MMCrossTable/MMCrossTable";
import MMTable from "../MMTable/MMTable";

export const MMResult = () => {
    const mm = useSelector<IApplicationState, IMMState>(state => state.mm);
    const seasonId = mm.seasonId;
    const townId = mm.townId;
    const mmTable = mm.table;
    const mmCrossTable = mm.crossTable;

    const visible = !!seasonId && !!townId && !!mmTable && !!mmCrossTable;
    
    console.log(mmTable);

    if(visible) {
        return (
            <div className={cssExports.mmresult}>
                <div>
                    <h3>{townId}</h3>
                    <h4>{seasonId}</h4>
                </div>
                <div className={cssExports["mm-tables-container"]}>
                    <div>
                        <MMTable mmTable={mmTable}/>
                    </div>
                    <div>
                        <MMCrossTable mmCrossTable={mmCrossTable}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default MMResult;
