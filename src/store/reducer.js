import { GET_TRANSATION_LIST,ADD_TRANSATION_LIST,UPDATE_TRANSATION_LIST } from "./actionType";

const INIT_STATE = {
    transationList: [],
};


const Transactions= (state=INIT_STATE, action) => {
    // switch (action.type) {
    //     case ADD_TRANSATION_LIST:
    //         localStorage.setItem('transactionList', JSON.stringify(action.payload));
    //         return { ...state, transationList: action.payload };

    //     case UPDATE_TRANSATION_LIST:
    //         return { ...state, transationList: action.payload };
  
    //   case GET_TRANSATION_LIST:
    //     const donneesRecuperees = JSON.parse(localStorage.getItem('transactionList'));
    //     return { ...state, transationList: donneesRecuperees};
  
    //   default:
    //     return state;
    // }
    switch (action.type) {
        case ADD_TRANSATION_LIST:
          return {
            ...state,
            transationList: [...state.transationList, action.payload],
          };
        default:
          return state;
      }
  };

  export default Transactions;