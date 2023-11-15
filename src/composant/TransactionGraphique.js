import React from 'react';
import Chart from 'react-apexcharts';
import { useState,useEffect } from 'react';
import moment from 'moment';

const TransactionGraphique = () => {
const [transactions, setTransactions] = useState([]);

// recupération des transactions
useEffect(() => {
    setTransactions(JSON.parse(localStorage.getItem('transactions')) || []);
  }, []);

//   recupération des transactions dépenses
  const getDepensesByMonth = () => {
    const currentYear = new Date().getFullYear();
    const depensesByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(let i = 0; i < transactions.length; i++) {
        const saleDate = moment(transactions[i]?.date).format('YYYY');
        console.log("gg",transactions[i]?.type )
        if (
            parseInt(saleDate) === currentYear &&
            transactions[i]?.type === "Depense"
        ) {
            depensesByMonth[parseInt(moment(transactions[i]?.date).format('MM'))] += Math.abs(Math.floor(transactions[i]?.montant / 1));
        }else{
        }
    }
    return depensesByMonth;
};
// recuperation des transaction
const getRevenusByMonth = () => {
    const currentYear = new Date().getFullYear();
    const depensesByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(let i = 0; i < transactions.length; i++) {
        const saleDate = moment(transactions[i]?.date).format('YYYY');
        console.log("gg",parseInt(moment(transactions[i]?.date).format('MM')) )
        if (
            parseInt(saleDate) === currentYear &&
            transactions[i]?.type === "Revenu"
        ) {
            depensesByMonth[parseInt(moment(transactions[i]?.date).format('MM'))] += Math.abs(Math.floor(transactions[i]?.montant / 1));
        }else{
        }
    }
    return depensesByMonth;
};

  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  };

  const series = [
    {
      name: 'Dépenses',
      data: getDepensesByMonth(),
    },
    {
      name: 'Revenus',
      data: getRevenusByMonth(),
    },
  ];

  return (
    <Chart options={options} series={series} type="bar" height={350} />
  );
};

export default TransactionGraphique ;