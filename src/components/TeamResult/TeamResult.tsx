import * as React from 'react';
import { ITeamResult } from '../../libs/interfaces';
import cssExports from './TeamResult.scss';

export interface ITeamResultProps {
    result: ITeamResult
}

class TeamResult extends React.Component<ITeamResultProps, {}> {
  constructor(props: ITeamResultProps){
    super(props);
  }

  render() {
    return (
      <div className={cssExports["team-result"]} >
        <b>{this.props.result.team.name}:</b><span>{this.props.result.questionsTotal}</span>
      </div>
    );
  }
}

export default TeamResult;
