import * as React from 'react';
import cssExports from './Header.scss';

export interface IHeaderProps {

}

class Header extends React.Component<IHeaderProps, {}> {
  constructor(props: IHeaderProps){
    super(props);
  }

  render() {
    return (
      <div className={cssExports.header}>
        [HEADER]
      </div>
    );
  }
}

export default Header;
