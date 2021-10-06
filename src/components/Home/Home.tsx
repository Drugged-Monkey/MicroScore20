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
        Home, sweet home!
      </div>
    );
  }
}

export default Home;
