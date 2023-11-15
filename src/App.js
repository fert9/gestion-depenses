// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DataProvider } from './context/DataContext';
import TransactionForm from './composant/TransactionForm';
import TransactionList from './composant/TransactionList';
import TransactionItem from './composant/TrasactionItem';
import store from './store/store';


function App() {
  return (
    <Provider store={store}>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<TransactionList />} />
            <Route path="/add-transaction" element={<TransactionForm />} />
            <Route path="/update-transaction/:id" element={<TransactionForm />} />
            <Route path="/view-transaction/:id" element={<TransactionItem />} />
          </Routes>
        </Router>
      </DataProvider>
    </Provider>
    
  );
}

export default App;