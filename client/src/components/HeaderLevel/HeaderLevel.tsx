import * as React from 'react';
import cssExports from './HeaderLevel.scss';

import { IHeaderLevelItem } from '../../libs/interfaces';
import { NavLink, useRouteMatch } from "react-router-dom";
import AuthButton from '../AuthButton/AuthButton';

export interface IHeaderLevelProps {
  renderAuthButton?: boolean;
  level: number;
  items: IHeaderLevelItem[];
  selectedId?: string;
  onClickHandler?: (id: string, name: string) => (event: React.MouseEvent) => void
}

export interface IHeaderLevelState {
  renderAuthButton: boolean;
  level: number;
  items: IHeaderLevelItem[];
  selectedId?: string;
  onClickHandler?: (id: string, name: string) => (event: React.MouseEvent) => void
}

class HeaderLevel extends React.Component<IHeaderLevelProps, IHeaderLevelState> {

  constructor(props: IHeaderLevelProps) {
    super(props);

    this.state = {
      renderAuthButton: this.props.renderAuthButton || false,
      level: this.props.level,
      items: this.props.items,
      selectedId: this.props.selectedId,
      onClickHandler: this.props.onClickHandler
    }
  }

  render() {
    const { level, items, selectedId, onClickHandler, renderAuthButton } = this.state;
    const classKey = `header-level-${level}`;
    const className = `${cssExports["header-level"]} ${cssExports[classKey]}`;
    const selectedClassName = cssExports.selected;
    const isVisible = (!!items && items.length > 0) || renderAuthButton;

    return (
      <div>
      {
        isVisible ? (
        <ul className = { className } >
          {
            items.map((item, i) => {
              if ((!!item.id && item.id === selectedId)) {
                return <li key={i}><a href="#" className={selectedClassName}> {item.name} </a></li>
              } else {
                if (!!item.link) {
                  if (!!!onClickHandler) {
                    return <li key={i}><NavLink to={item.link}>[{item.name}]</NavLink></li>
                  } else {
                    return <li key={i}><a href="#" data-href={item.link} onClick={onClickHandler(item.id, item.name)}>[{item.name}]</a></li>
                  }
                } else {
                  return <li key={i}><a href="#" onClick={onClickHandler(item.id, item.name)}>[{item.name}]</a></li>
                }
              }
            }
            )
          }
          <li> { renderAuthButton ? <AuthButton /> : null }</li>
        </ul>
      ) : null
    }
    </div>
    )
  }
}


export default HeaderLevel;

/*

const HeaderLevel = (props?: IHeaderLevelProps) => {
    props = props || {} as IHeaderLevelProps;

    const [ level, setLevel ] = React.useState<number>(-1);
    const [ items, setItems ] = React.useState<IHeaderLevelItem[]>([]);
    const [ selectedId, setSelectedId ] = React.useState<string>(null);

    const [ classKey, setClassKey ] = React.useState<string>(null);
    const [ className, setClassName] = React.useState<string>(null);
    const [ isVisible, setIsVisible ] = React.useState<boolean>(false);

    React.useEffect(() => {
      setLevel(props.level);
      setItems(props.items);
      setSelectedId(props.selectedId);
    }, []);

    React.useEffect(() => {
      setClassKey(`header-level-${level}`);
      setClassName(`${cssExports["header-level"]} ${cssExports[classKey]}`);
      setIsVisible(!!items && items.length > 0);
    }, [level, items, selectedId]);


    return isVisible ? (
      <ul className={className}>
        {
          items.map((item, i) => {
              if ((!!item.id && item.id === selectedId) || useRouteMatch({ path: item.link, exact: true})) {
                return <li key={i}><a href="#" className={cssExports.selected}> {item.name} </a></li>
              } else {
                if (!!item.link) {
                  return <li key={i}><NavLink to={item.link}>[{item.name}]</NavLink></li>
                } else {
                  return null;
                }
                else {
                  return <li key={i}><a href="#" onClick={props.onClickHandler(item.id)}>[{item.name}]</a></li>
                }
              }
            }
          )
        }
      </ul>
    ) : null;
}
*/