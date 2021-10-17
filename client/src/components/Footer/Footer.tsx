import * as React from 'react';
import cssExports from './Footer.scss';

export interface IFooterProps {

}

class Footer extends React.Component<IFooterProps, {}> {
  constructor(props: IFooterProps){
    super(props);
  }

  render() {
    return (
      <div className={cssExports.footer} >
        [FOOTER]
      </div>
    );
  }
}

export default Footer;
