import * as React from 'react';
import { ActionType } from '../../libs/interfaces';
import { store } from '../../libs/store';

import cssExports from './About.scss';

export interface IAboutProps {

}

class About extends React.Component<IAboutProps, {}> {
  constructor(props: IAboutProps){
    super(props);

    store.dispatch({type: ActionType.CLEAN_LEVEL3});
    store.dispatch({type: ActionType.CLEAN_MM});
    store.dispatch({type: ActionType.CLEAN_SEASON});
    store.dispatch({type: ActionType.CLEAN_TOWN});
  }

  render() {
    return (
      <div className={cssExports.about}>
        About, sweet About!
      </div>
    );
  }
}

export default About;
