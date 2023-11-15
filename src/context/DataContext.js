// src/context/DataContext.js
import React, { createContext, useReducer, useContext } from 'react';
import Transactions from '../store/reducer';

const DataStateContext = createContext();
const DataDispatchContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Transactions, { transactionList: [] });

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

const useDataState = () => {
  const context = useContext(DataStateContext);
  if (!context) {
    throw new Error('useDataState must be used within a DataProvider');
  }
  return context;
};

const useDataDispatch = () => {
  const context = useContext(DataDispatchContext);
  if (!context) {
    throw new Error('useDataDispatch must be used within a DataProvider');
  }
  return context;
};

export { DataProvider, useDataState, useDataDispatch };