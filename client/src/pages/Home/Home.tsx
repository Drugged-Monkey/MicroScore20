import MMResult from '../../components/MMResult/MMResult';
import * as React from 'react';

import cssExports from './Home.scss';

export interface IHomeProps {

}

class Home extends React.Component<IHomeProps, {}> {
  constructor(props: IHomeProps){
    super(props);
  }

  render() {
    return (
      <div className={cssExports.home}>
        <MMResult />
      </div>
    );
  }
}

export default Home;
