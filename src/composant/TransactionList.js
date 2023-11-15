import React from "react";
import './../tailwind.css';
import { Button,Row,Col, Table,Container} from "reactstrap";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import TransactionGraphique from "./TransactionGraphique";

 const TransactionList = () =>  {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Toutes"); 
    const [selectedType, setSelectedType] = useState("Tous"); 
    const [selectedDate, setSelectedDate] = useState(null); 
    

    // tableau Categorie
    const categorie=[
        {label:"Toutes",value:"Toutes"},
        {label:"Logement",value:"Logement"},
        {label:"Alimentation",value:"Alimentation"},
        {label:"Transport et Loisirs",value:"Transport-Loisirs"},
        {label:"Assurances",value:"Assurances"},
        {label:"Santé",value:"Santé"},
        {label:"Éducation",value:"Éducation"},
        {label:"Salaire",value:"Salaire"},
        {label:"Marchandise",value:"Marchandises"},
        {label:"Voyages",value:"Voyges"},
        {label:"Fetes",value:"Fetes"},
        {label:"Dons",value:"Dons"}
    ]

// tableau type de revenu
    const type=[
        {label:"Tous",value:"Tous"},
        {label:"Revenu",value:"Revenu"},
        {label:"Depense",value:"Depense"}
      ]

   // fonction pour la récupération de la somme des dépenses effectuées 
    const calculateTotalExpenseByDepense = (transactions) => {
    const filteredTransactions = transactions.filter(transaction => 
        transaction.type === "Depense" && transaction.montant 
    );
    return filteredTransactions.reduce((total, transaction) => total + parseInt(transaction.montant, 10), 0);
    };

    // fonction pour la récupération de la somme des revenu
    const calculateTotalExpenseByRevenu = (transactions) => {
        const filteredTransactions = transactions.filter(transaction => 
            transaction.type === "Revenu" && transaction.montant 
        );
        return filteredTransactions.reduce((total, transaction) => total + parseInt(transaction.montant, 10), 0);
    };

    // filtre des données par categorie, date et type
    useEffect(() => {
        const updatedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(updatedTransactions);
        const filtered = updatedTransactions.filter(transaction => {
          const categorieFilter = selectedCategory === "Toutes" || transaction.categorie === selectedCategory;
          const typeRevenuFilter = selectedType === "Tous" || transaction.type === selectedType;
          const dateFilter = !selectedDate || transaction.date === selectedDate;
          return categorieFilter && typeRevenuFilter && dateFilter;
        });
        setFilteredTransactions(filtered);
      }, [selectedCategory, selectedType, selectedDate]);

    // recuperation des transactions apres la mise à jour.
    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(storedTransactions);
    }, []);
    
    // fonction pour definir et envoyer la valeur de isEdit en fonction du bouton modifier
     
    const handleClickModidify = () => {
        localStorage.setItem('isEdit', 'true');
      };

    // fonction pour definir et envoyer la valeur de isEdit en fonction du bouton envoyer 
      const handleClickAdd = () => {
        localStorage.setItem('isEdit', 'false');
      };

    //fonction pour la suppression d'une transaction   
    const removeTransaction = (transactionId) => {
        setFilteredTransactions((prevTransactions) => {
          const updatedTransactions = prevTransactions.filter(
            (transaction) => transaction.id !== transactionId
          );
          localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
          return updatedTransactions;
        });
      };

    return (
        <div className='m-12'>
            <div className="bg-gray-100 p-4 rounded-lg flex">
                <div className="flex-1">
                    <p className="">Liste des transactions</p>
                </div>
                <div className="bg-blue-500 p-2 text-white rounded-lg ">
                <Link to="/add-transaction">
                    <Button onClick={handleClickAdd}>
                        Ajouter une transaction
                    </Button>
                </Link>
                </div>
            </div>
            <div className="py-4 my-4 h-screen">
                <Row lg={12} className="flex flex-wrap">
                    <div className="flex-1">
                        <Col lg={6} className="">
                        <div class="max-w-sm rounded overflow-hidden shadow-lg">
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2 text-center">Total Depenses</div>
                                <div class=" text-xl mb-2 text-center text-blue-500">{calculateTotalExpenseByDepense(filteredTransactions)} {" "} {"FCFA"} </div>
                            </div>
                            </div>

                            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2 text-center">Total Revenus</div>
                                <div class=" text-xl mb-2 text-center text-blue-500">{calculateTotalExpenseByRevenu(filteredTransactions)} {" "} {"FCFA"} </div>
                            </div>
                            </div>
                        </Col>
                    </div>
                    <div className="p-4 ">
                        <Col lg={6}>
                            <Container>
                                <div className="flex flex-wrap">
                                    <h2 className="flex-1">Tableau de données</h2>  
                                    <span>
                                        <select
                                            id="category"
                                            name="categorie"
                                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            value={selectedCategory}
                                        >
                                            {categorie.map((category) => (
                                            <option key={category} value={category.value}>
                                                {category.label}
                                            </option>
                                            ))}
                                        </select>
                                    </span> 
                                    <span>
                                        <select
                                            id="type"
                                            name="type"
                                            className=" flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={(e) => setSelectedType(e.target.value)}
                                            value={selectedType}
                                        >
                                            {type.map((category) => (
                                            <option key={category} value={category.value}>
                                                {category.label}
                                            </option>
                                            ))}
                                        </select>
                                    </span>
                                    <input 
                                    type="date"
                                    className="shadow flex-1 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                     name="date" 
                                     value={selectedDate} 
                                     onChange={(e) => setSelectedDate(e.target.value)} />
                                </div>
                                
                                <br></br>
                                <div className="">
                                    <Table className="table-responsive rounded-lg container bg-white shadow-lg rounded-lg">
                                        <thead>
                                        <tr className="bg-gray-100">
                                            <th className="flex-1 p-4 border">Référence</th>
                                            <th className="flex-1 p-4 border">Type</th>
                                            <th className="flex-1 p-4 border">Titre</th>
                                            <th className="flex-1 p-4 border">Catégorie</th>
                                            <th className="flex-1 p-4 border">Description</th>
                                            <th className="flex-1 p-4 border">Date</th>
                                            <th className="flex-1 p-4 border">Montant</th>
                                            <th className="flex-1 p-4 border">Action</th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                        {!!filteredTransactions ? 
                                        filteredTransactions.map((item) => (
                                            <tr className="border text-center" key={item.id}>
                                            <td className="p-4 w-8 overflow-hidden overflow-ellipsis" >{item.reference}</td>
                                            <td className="p-4 w-8 overflow-hidden overflow-ellipsis">{
                                            item && item.type==='Depense'?<p className="inline-block bg-red-200 rounded-full px-2 text-sm font-semibold text-red-700 mr-2">{item.type}</p>:
                                            item && item.type==='Revenu'? <p className="inline-block bg-green-200 rounded-full px-2 text-sm font-semibold text-green-700 mr-2">{item.type}</p>:null        
                                            }</td>
                                            <td className="p-4 w-8 overflow-hidden overflow-ellipsis">{item.title}</td>
                                            <td className="p-4 w-8 overflow-hidden overflow-ellipsis">{item.categorie}</td>
                                            <td className="p-4 w-8 h-8 overflow-hidden overflow-ellipsis">{item.description}</td>
                                            <td className="p-4 w-8 overflow-hidden overflow-ellipsis">{item.date}</td>
                                            <td className="p-4 w-8 overflow-hidden overflow-ellipsis">{item.montant}</td>
                                            <td className="p-4">
                                            <div className="bg-blue-100 px-2 m-2 text-white text-sm rounded-lg ">
                                                <Link to={`/view-transaction/${item.id}`}>
                                                    <Button onClick={handleClickModidify}>
                                                        Voir
                                                    </Button>
                                                </Link>

                                            </div>
                                            <div className="bg-gray-300 px-2 m-2 text-white text-sm rounded-lg ">
                                                <Link to={`/update-transaction/${item.id}`}>
                                                    <Button onClick={handleClickModidify}>
                                                        Modifier
                                                    </Button>
                                                </Link>
                                            </div>

                                            <span className="bg-red-400 px-2 m-2 text-white text-sm rounded-lg ">
                                                <Button onClick={() => removeTransaction(item.id)}>
                                                    Supprimer
                                                </Button>
                                            </span>

                                            </td>
                                            </tr>
                                        )) : 
                                        <p>Aucune transactions éffectuées</p>}
                                        </tbody>
                                    </Table>
                                </div>
                                
                            </Container>
                        </Col>
                    </div>
                </Row>
                <Row lg={12}>
                <TransactionGraphique/>
                </Row>
            </div>
        </div>
        
    );
 };

 export default TransactionList;