import * as React from 'react';

import { ITeamResult } from '../../libs/interfaces';
import { loadTournamentFromRating } from '../../libs/repositories';
import TeamResult from '../TeamResult/TeamResult';
import cssExports from './TournamentResult.scss';

export interface ITournamentResultProps {
    id: number
}

export interface ITournamentResultState {
  error: string,
  isLoaded: boolean,
  items: ITeamResult[]
}

class TournamentResult extends React.Component<ITournamentResultProps, ITournamentResultState> {
  constructor(props: ITournamentResultProps){
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
      loadTournamentFromRating(this.props.id)
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
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
    const { error, isLoaded, items } = this.state;
    return (
      <div>
        {items.map(result => (
          <TeamResult result={result} />
        ))}
      </div>
    );
  }
}

export default TournamentResult;
