import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppNavigator from '@components/AppNavigator';
import { actionCreators as AuthActions } from '@redux/auth/actions';
import './i18n';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.init());
  }, [dispatch]);

  return <AppNavigator />;
};


export default App;
