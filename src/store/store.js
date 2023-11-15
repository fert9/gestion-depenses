import { legacy_createStore as createStore } from 'redux';
import Transactions from './reducer';

const store = createStore(Transactions);

export default store;