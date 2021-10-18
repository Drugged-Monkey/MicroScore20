import MMResult from "../../components/MMResult/MMResult";
import * as React from "react";

import cssExports from "./Home.scss";
import { store } from "../../libs/store";
import { ActionType } from "../../libs/interfaces";
import { useParams } from "react-router";

export interface IHomeProps {
  townId?: string;
  seasonId?: string;
}

const Home = () => {
  let { townId, seasonId } = useParams() as IHomeProps;

  const state = store.getState();

  if (!!townId && ((!!state.header.townId && state.header.townId != townId) || !!!state.header.townId)) {
    store.dispatch({ type: ActionType.CHANGE_TOWN, payload: townId });

    if (!!seasonId && ((!!state.header.seasonId && state.header.seasonId != seasonId) || !!!state.header.seasonId)) { 
      store.dispatch({ type: ActionType.CHANGE_TOWN, payload: seasonId });
    }
  }

  return (
    <div className={cssExports.home}>
      <MMResult />
    </div>
  );
};

export default Home;
