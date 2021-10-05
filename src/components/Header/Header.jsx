import React from 'react';
import styles from './Header.scss';

class Header extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className={styles.header}>
        [HEADER]
      </div>
    );
  }
}

export default Header;
