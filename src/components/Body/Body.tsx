import * as React from 'react';

import TournamentResult from '../TournamentResult/TournamentResult';
import cssExports from './Body.scss';

export interface IBodyProps {

}

class Body extends React.Component<IBodyProps, {}> {
  constructor(props: IBodyProps){
    super(props);

  }

  render() {
    return (
      <div className={cssExports.body}>
          <TournamentResult id={6776} />
      </div>
    );
  }
}

export default Body;
