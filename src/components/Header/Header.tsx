import * as React from 'react';
import cssExports from './Header.scss';

import appSettings from '../../libs/settings';
import { ICity } from '../../libs/interfaces';

export interface IHeaderProps {

}

class Header extends React.Component<IHeaderProps, {}> {
  public cities: ICity[];

  constructor(props: IHeaderProps){
    super(props);

    //this.cities = appSettings.cities;
  }

  render() {
    return (
      <div className={cssExports.header}>
          [Header]
      </div>
    );
  }
}

export default Header;
