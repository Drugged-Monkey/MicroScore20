import * as React from 'react';

import cssExports from './About.scss';

export interface IAboutProps {

}

class About extends React.Component<IAboutProps, {}> {
  constructor(props: IAboutProps){
    super(props);

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
