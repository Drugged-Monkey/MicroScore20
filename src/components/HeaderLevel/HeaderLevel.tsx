import * as React from 'react';
import cssExports from './HeaderLevel.scss';

import { IHeaderLevelItem } from '../../libs/interfaces';
import { NavLink } from "react-router-dom";

export interface IHeaderLevelProps {
    id: number;
    items: IHeaderLevelItem[];
}

export interface IHeaderLevelState {
    id: number;
    items: IHeaderLevelItem[]
}

class HeaderLevel extends React.Component<IHeaderLevelProps, IHeaderLevelState> {
  constructor(props: IHeaderLevelProps){
    super(props);

    this.state = {
        id: this.props.id,
        items: this.props.items
    }
  }

  render() {
    const { id, items } = this.state;
    
    //const classNameKey = `header-level-${id}`;

    return (
        <ul className={cssExports["header-level-1"]}>
             {
               items.map((item, i) => (
                   <li key={i}><NavLink to={item.link}>[{item.name}]</NavLink></li>
                ))
              }
        </ul>
    );
  }
}

export default HeaderLevel;
