import * as React from 'react';
import cssExports from './HeaderLevel.scss';

import { IHeaderLevelItem } from '../../libs/interfaces';
import { NavLink } from "react-router-dom";

export interface IHeaderLevelProps {
  level: number;
  items: IHeaderLevelItem[];
  selectedId?: string;
  onClickHandler?: (id: string) => (event: React.MouseEvent) => void
}

export interface IHeaderLevelState {
  level: number;
  items: IHeaderLevelItem[];
  selectedId?: string;
  onClickHandler?: (id: string) => (event: React.MouseEvent) => void
}

class HeaderLevel extends React.Component<IHeaderLevelProps, IHeaderLevelState> {
  constructor(props: IHeaderLevelProps) {
    super(props);

    this.state = {
      level: this.props.level,
      items: this.props.items,
      selectedId: this.props.selectedId,
      onClickHandler: this.props.onClickHandler
    }
  }

  render() {
    const { level, items, selectedId, onClickHandler } = this.state;
    const classKey = `header-level-${level}`;
    const className = `${cssExports["header-level"]} ${cssExports[classKey]}`;
    const selectedClassName = cssExports.selected;
    const isVisible = !!items && items.length > 0;

    return isVisible ? (
      <ul className={className}>
        {
          items.map((item, i) => {
              if (!!item.id && item.id === selectedId) {
                return <li key={i}><a href="#" className={selectedClassName}> {item.name} </a></li>
              } else {
                if (!!item.link) {
                  return <li key={i}><NavLink to={item.link}>[{item.name}]</NavLink></li>
                } else {
                  return <li key={i}><a href="#" onClick={onClickHandler(item.id)}>[{item.name}]</a></li>
                }
              }
            }
          )
        }
      </ul>
    ) : "";
  }
}

export default HeaderLevel;
