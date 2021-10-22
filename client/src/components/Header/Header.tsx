import * as React from "react";

import cssExports from './Header.scss';
import HeaderLevel from '../HeaderLevel/HeaderLevel';
import { ActionType, IApplicationState, IHeaderLevelItem, IHeaderState, ITownBase } from "../../libs/interfaces";
import { useSelector } from "react-redux";
import { store } from "../../libs/store";
import { useHistory, useLocation, useParams } from "react-router";


const Header = () => {
  const { level1, level2, level3, town, season }  = useSelector<IApplicationState, IHeaderState>(state => state.header);
  const townId  = town?.id;
  const seasonId = season?.id;

  const history = useHistory();

  const onClickHandler = (type: ActionType) => {
    return (id: string, name: string) => { 
      return (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        store.dispatch({ type: type, payload: {id, name}  });
        const path = event.currentTarget.dataset["href"];
        history.push(path);
      }
    }
  }
  
  return (
    <div className={cssExports.header}>
        <HeaderLevel key={`${new Date().getMilliseconds()}1`} level={1} items={level1} />
        <HeaderLevel key={`${new Date().getMilliseconds()}2`} level={2} items={level2} onClickHandler={onClickHandler(ActionType.CHANGE_TOWN)} selectedId={townId}/>
        <HeaderLevel key={`${new Date().getMilliseconds()}3`} level={3} items={level3} onClickHandler={onClickHandler(ActionType.CHANGE_SEASON)} selectedId={seasonId}/>
    </div>
  );
}

export default Header;
