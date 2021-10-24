import * as React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { fakeAuthProvider } from '../../libs/auth/fakeAuthProvider';

import { ActionType } from '../../libs/interfaces';
import { store } from '../../libs/store';

import cssExports from './Admin.scss';

export interface IAdminProps {

}

const Admin = (props?: IAdminProps) => {
  React.useEffect(() => {
    store.dispatch({ type: ActionType.CLEAN_LEVEL3 });
    store.dispatch({ type: ActionType.CLEAN_MM });
    store.dispatch({ type: ActionType.CLEAN_SEASON });
    store.dispatch({ type: ActionType.CLEAN_TOWN });
  }, []);


  return (
    <div className={cssExports.admin}>
      Admin, sweet Admin!
    </div>
  );
}

export default Admin;
