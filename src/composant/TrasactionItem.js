import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const TransactionItem = () => {
    const {id}=useParams()
    const [transactionsItem, setTransactionsItem] = useState({});
    console.log("bb",transactionsItem)

    const getTransactionById = (id) => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const UneDepense =storedTransactions.find(transaction => transaction.id === id);
        return UneDepense;
    };
    useEffect(() => {
        setTransactionsItem(getTransactionById(parseInt(id)));
    }, [id]);

    return(
        <div className="m-12">
            <div className="bg-gray-100 p-4 rounded-lg flex">
                <div className="flex-1">
                    <p className="">Détail de transaction</p>
                </div>
                <div className="bg-blue-500 p-2 text-white rounded-lg ">
                <Link to="/">
                    <Button>
                        Retour
                    </Button>
                </Link>
                </div>
            </div>
            <div className="flex justify-center items-center w-96 min-w-full">
                <div className="min-w-full bg-white rounded shadow-lg m-4 border flex">
                        <div className="flex-1">
                            <div className="px-6 py-4 flex-1">
                            <div className="font-bold text-xl mb-2 overflow-hidden overflow-ellipsis flex-wrap">{transactionsItem && transactionsItem.title}</div>
                                <p className="text-gray-700 text-base overflow-hidden overflow-ellipsis flex-wrap">{transactionsItem && transactionsItem.description}</p>
                            </div>
                            <div className="px-6 py-4">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    {transactionsItem && transactionsItem.categorie}
                                </span>
                                <p className="text-gray-700 text-base ">Date: {transactionsItem && transactionsItem.date}</p>
                                <p className="text-gray-700 text-base">Montant: {transactionsItem && transactionsItem.montant}</p>
                            </div>
                        </div>
                    
                        <div>
                            <Link className="bg-blue-100 px-2 m-2 text-white text-sm rounded-lg text-center mb-0" to={`/update-transaction/${transactionsItem.id}`}>
                                <Button>
                                    Modifier
                                </Button>
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    )
 }
export default TransactionItem;
