import * as React from "react";

import cssExports from './Header.scss';
import HeaderLevel from '../HeaderLevel/HeaderLevel';
import { IApplicationState, IHeaderLevelItem } from "src/libs/interfaces";
import { connect, useSelector } from "react-redux";


const Header = ()=> {

  const level1 = useSelector<IApplicationState, IHeaderLevelItem[]>(state => state.header.level1);
  const level2 = useSelector<IApplicationState, IHeaderLevelItem[]>(state => state.header.level2);
  const level3 = useSelector<IApplicationState, IHeaderLevelItem[]>(state => state.header.level3);


  return (
    <div className={cssExports.header}>
        <HeaderLevel key={`${new Date().getMilliseconds()}1`} id={1} items={level1} />
        <HeaderLevel key={`${new Date().getMilliseconds()}2`} id={2} items={level2} />
        <HeaderLevel key={`${new Date().getMilliseconds()}3`} id={3} items={level3} />
    </div>
  );
}

export default Header;
