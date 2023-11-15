import { GET_TRANSATION_LIST,ADD_TRANSATION_LIST,UPDATE_TRANSATION_LIST } from "./actionType";

export const getTransaction = () => ({
    type: GET_TRANSATION_LIST,
  });

  export const addTransaction = (transaction) => ({
    type: ADD_TRANSATION_LIST,
    payload: transaction,
  });

  export const upateTransaction = () => ({
    type: UPDATE_TRANSATION_LIST,
  });