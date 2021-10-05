import React from 'react';
import styles from './Body.scss';

class Body extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div className={styles.body}>
        [BODY]
      </div>
    );
  }
}

export default Body;
