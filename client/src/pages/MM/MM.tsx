import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ActionType, IApplicationState, IMMCrossTableItem, IMMState, IMMTableItem } from "../../libs/interfaces";
import MMCrossTable from "../../components/MMCrossTable/MMCrossTable";
import MMTable from "../../components/MMTable/MMTable";

import cssExports from "./MM.scss";
import { loadSeason, loadTown } from "../../libs/repositories";
import { useParams } from "react-router";

export interface IMMProps {
  townId?: string;
  seasonId?: string;
}

const MM = () => {
  const { seasonId, townId } = useParams<IMMProps>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("effect:", townId, seasonId);
    if(!!townId) {
        if(!!seasonId) {
          dispatch({ type: ActionType.CHANGE_TOWN_AND_SEASON, payload: { seasonId, townId }});
        } else {
          dispatch({ type: ActionType.CHANGE_TOWN, payload: { id: townId }});
        }
    }
  }, []);

  const townName = useSelector<IApplicationState, string>(state => state.header.town?.name);
  const seasonName = useSelector<IApplicationState, string>(state => state.header.season?.name);

  const mmTable = useSelector<IApplicationState, IMMTableItem[]>(state => state.mm.table);
  const mmCrossTable = useSelector<IApplicationState, IMMCrossTableItem[]>(state => state.mm.crossTable);

  const [ isTablesVisible, setIsTablesVisible ] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsTablesVisible(!!seasonName && !!townName);
  }, [seasonName, townName])

  return (
    <div className={cssExports["mm-page"]}>
      {isTablesVisible ? (
        <div className={cssExports["mm-result"]}>
          <div>
            <h3>{townName}</h3>
            <h4>{seasonName}</h4>
          </div>
          <div className={cssExports["mm-tables-container"]}>
            <div>
              <MMTable mmTable={mmTable} />
            </div>
            <div>
              <MMCrossTable mmTable={mmTable} mmCrossTable={mmCrossTable} />
            </div>
          </div>
        </div>
      ) : (
        <div>There is nothing to show.</div>
      )}
    </div>
  );
};

export default MM;
