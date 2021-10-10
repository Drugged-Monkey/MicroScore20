import * as React from 'react';
import cssExports from './HeaderLevel.scss';

import { ActionType, IHeaderLevelItem } from '../../libs/interfaces';
import { NavLink } from "react-router-dom";
import { store } from "../../libs/store";

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

  onClickHandler = (id: string) => {
    return (event: React.MouseEvent) => {
      store.dispatch({ type: ActionType.CHANGE_TOWN, payload: id})
      event.preventDefault();
    }
  };



  render() {
    const { id, items } = this.state;
    const classKey = `header-level-${id}`;
    const className = `${cssExports["header-level"]} ${cssExports[classKey]}`;
    const isVisible = !!items && items.length > 0;

    return isVisible ? (
        <ul className={className}>
             {
               items.map((item, i) => {
                    if(!!item.link) {
                      return <li key={i}><NavLink to={item.link}>[{item.name}]</NavLink></li>
                    } else {
                      return <li key={i}><a href="#" onClick={this.onClickHandler(item.id)}>[{item.name}]</a></li>
                    }
                 }
                )
              }
        </ul>
    ) : "";
  }
}

export default HeaderLevel;
