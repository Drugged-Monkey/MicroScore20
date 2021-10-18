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
  return (
    <div className={cssExports.home}>
      <MMResult />
    </div>
  );
};

export default Home;
