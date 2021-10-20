import * as React from "react";
import { useSelector } from "react-redux";

import { IApplicationState, IMMCrossTableItem, IMMState, IMMTableItem } from "../../libs/interfaces";
import MMCrossTable from "../../components/MMCrossTable/MMCrossTable";
import MMTable from "../../components/MMTable/MMTable";

import cssExports from "./MM.scss";
import { loadSeasons, loadTowns } from "../../libs/repositories";

export interface IMMProps {
  townId?: string;
  seasonId?: string;
}

const MM = (props?: IMMProps) => {
  const townId = useSelector<IApplicationState, string>(state => state.mm.townId);
  const seasonId = useSelector<IApplicationState, string>(state => state.mm.seasonId);
  const mmTable = useSelector<IApplicationState, IMMTableItem[]>(state => state.mm.table);
  const mmCrossTable = useSelector<IApplicationState, IMMCrossTableItem[]>(state => state.mm.crossTable);

  const [ seasonName, setSeasonName ] = React.useState<string>(null);
  const [ townName, setTownName ] = React.useState<string>(null);
  const [ isTablesVisible, setIsTablesVisible ] = React.useState<boolean>(false);

  const loadTown = React.useCallback(async () => {
    await loadTowns()
      .then(towns => { 
        const town = towns.find(town => town.id === townId); 
        setTownName(town?.name); 
      })
      .catch(err => console.error(err));
  }, [townId]);

  const loadSeason = React.useCallback(async () => {
    await loadSeasons(townId)
      .then(seasons => { 
        const season = seasons.find(season => season.id === seasonId); 
        setSeasonName(season?.name); 
      })
      .catch(err => console.error(err));
  }, [seasonId]);

  React.useEffect(() => {
    loadTown()
  }, [loadTown])

  React.useEffect(() => {
    loadSeason()
  }, [loadSeason])

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
