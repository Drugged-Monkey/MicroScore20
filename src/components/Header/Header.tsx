import * as React from 'react';
import cssExports from './Header.scss';

import { ITown, ISeason, IHeaderLevelItem } from '../../libs/interfaces';
import { NavLink } from "react-router-dom";
import { loadTowns, loadSeasons } from '../../libs/repositories';
import HeaderLevel from '../HeaderLevel/HeaderLevel';


export interface IHeaderProps {

}

export interface IHeaderState {
  isLoaded: boolean;
  currentTown?: number;
  towns: ITown[];
  currentSeason: string;
  seasons: ISeason[];
  error: string;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps){
    super(props);

    this.state = {
      isLoaded: false,
      currentTown: null,
      towns: [],
      currentSeason: null,
      seasons: [],
      error: null
    }
  }

  componentDidMount() {
    loadTowns()
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          towns: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    )
  }

  render() {
    const { towns, seasons, currentTown, currentSeason } = this.state;

    const level1 = [{ name: "Home", link: "/" },{ name: "About", link: "/about" }] as IHeaderLevelItem[];
    const level2 = towns.map(t=> { return { name: t.name, link: `/city/${t.id}`}});
    const level3 = seasons.map(t => { return { name: t.name, link: `/city/${currentTown}/season/${currentSeason}`}}) as IHeaderLevelItem[];

    return (
      <div className={cssExports.header}>
        <HeaderLevel key={"3213251"} id={1} items={level1} />
        <HeaderLevel key={"2354552"} id={2} items={level2} />
        <HeaderLevel key={"4324332"} id={3} items={level3} />
      </div>
    );
  }
}

export default Header;
