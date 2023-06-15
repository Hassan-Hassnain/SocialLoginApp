import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';

import {useCallback} from 'react';

export const NetworkContext = React.createContext({isConnected: true});

export const NetworkProvider = (props: WithChildren): React.ReactElement => {
  const [state, setState] = useState({isConnected: true});
  const handleConnectionChange = useCallback(
    (netState: NetInfoState) => setState({isConnected: !!netState.isConnected}),
    [],
  );
  useEffect(() => {
    NetInfo.fetch().then(handleConnectionChange);
    return NetInfo.addEventListener(handleConnectionChange);
  }, [handleConnectionChange]);
  return (
    <NetworkContext.Provider value={state}>
      {props.children}
    </NetworkContext.Provider>
  );
};
