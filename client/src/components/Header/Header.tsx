import * as React from "react";

import cssExports from './Header.scss';
import HeaderLevel from '../HeaderLevel/HeaderLevel';
import { ActionType, IApplicationState, IHeaderLevelItem } from "../../libs/interfaces";
import { useSelector } from "react-redux";
import { store } from "../../libs/store";


const Header = () => {

  const level1 = useSelector<IApplicationState, IHeaderLevelItem[]>(state => state.header.level1);
  const level2 = useSelector<IApplicationState, IHeaderLevelItem[]>(state => state.header.level2);
  const level2SelectedId = useSelector<IApplicationState, string>(state => state.header.townId);
  const level3 = useSelector<IApplicationState, IHeaderLevelItem[]>(state => state.header.level3);
  const level3SelectedId = useSelector<IApplicationState, string>(state => state.header.seasonId);

  const onClickHandler = (type: ActionType) => {
    return (id: string) => { 
      return (event: React.MouseEvent) => {
        store.dispatch({ type: type, payload: id })
        event.preventDefault();
      }
    }
  }

  return (
    <div className={cssExports.header}>
        <HeaderLevel key={`${new Date().getMilliseconds()}1`} level={1} items={level1} />
        <HeaderLevel key={`${new Date().getMilliseconds()}2`} level={2} items={level2} onClickHandler={onClickHandler(ActionType.CHANGE_TOWN)} selectedId={level2SelectedId}/>
        <HeaderLevel key={`${new Date().getMilliseconds()}3`} level={3} items={level3} onClickHandler={onClickHandler(ActionType.CHANGE_SEASON)} selectedId={level3SelectedId}/>
    </div>
  );
}

export default Header;
