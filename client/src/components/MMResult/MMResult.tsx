import * as React from "react";
import { useSelector } from "react-redux";

import { IApplicationState, IMMState, ITown } from "../../libs/interfaces";
import cssExports from "./MMResult.scss";
import MMCrossTable from "../MMCrossTable/MMCrossTable";
import MMTable from "../MMTable/MMTable";

export const MMResult = () => {
    const mm = useSelector<IApplicationState, IMMState>(state => state.mm);
    const seasonId = mm.seasonId;
    const seasonName = mm.seasonName;
    const townId = mm.townId;
    const mmTable = mm.table;
    const mmCrossTable = mm.crossTable;
    const townName = useSelector<IApplicationState, string>(state => state.header.level2.find((t) => t.id === townId)?.name);

    const visible =  !!seasonId && !!townId && !!mmTable && !!mmCrossTable;
    
    if(visible) {
        return (
            <div className={cssExports.mmresult}>
                <div>
                    <h3>{townName}</h3>
                    <h4>{seasonName}</h4>
                </div>
                <div className={cssExports["mm-tables-container"]}>
                    <div>
                        <MMTable mmTable={mmTable}/>
                    </div>
                    <div>
                        <MMCrossTable mmTable={mmTable} mmCrossTable={mmCrossTable}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default MMResult;
