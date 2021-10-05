import React from 'react';
import styles from './Footer.scss';

class Footer extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className={styles.footer}>
        [Footer]
      </div>
    );
  }
}

export default Footer;
