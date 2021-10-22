import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ActionType, IApplicationState, IHeaderState, IMMCrossTableItem, IMMState, IMMTableItem } from "../../libs/interfaces";
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

  const { town, season }  = useSelector<IApplicationState, IHeaderState>(state => state.header);
  const { table, crossTable } = useSelector<IApplicationState, IMMState>(state => state.mm);

  const townName = town?.name;
  const seasonName = season?.name;

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
              <MMTable mmTable={table} />
            </div>
            <div>
              <MMCrossTable mmTable={table} mmCrossTable={crossTable} />
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
