import React from "react";
import { Input, Form,Button,FormFeedback} from "reactstrap";
import './../tailwind.css';
import { useEffect,useState} from "react";
import { Link,useParams} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const TransactionForm = () => { 

  const { id} = useParams();
  const history=useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [transactionsItem, setTransactionsItem] = useState({title:"",type:"",montant:null,categorie:"",date:null, reference:""});
  const [isEdit, setIsEdit] = useState(false);
  const [isnoSubmit, setIsnoSubmit] = useState(true);
  const [error, setError] = useState(" ");

  // Tableau de donnees Categorie
  const categorie=[
    {label:"Logement",value:"Logement"},
    {label:"Alimentation",value:"Alimentation"},
    {label:"Transport et Loisirs",value:"Transport-Loisirs"},
    {label:"Assurances",value:"Assurances"},
    {label:"Santé",value:"Santé"},
    {label:"Éducation",value:"Éducation"},
    {label:"Salaire",value:"Salaire"},
    {label:"Marchandise",value:"Marchandises"},
    {label:"Voyages",value:"Voyages"},
    {label:"Fetes",value:"Fetes"},
    {label:"Dons",value:"Dons"}
]

  const type=[
    {label:"Revenu",value:"Revenu"},
    {label:"Depense",value:"Depense"}
  ]
 
   // récuperation de la valeur de isEdit apres clic sur le bouton modifier
   useEffect(() => {
    setIsEdit(localStorage.getItem('isEdit'));
  }, []);
  console.log("bouton active",isEdit)

  
// recupération de toutes les transactions
  useEffect(() => {
    setTransactions(JSON.parse(localStorage.getItem('transactions')));
  }, []);
  
//   fonction pour l'ajout d'une transaction
  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => {
      const currentTransactions = Array.isArray(prevTransactions) ? prevTransactions : [];
      const updatedTransactions = [...currentTransactions, newTransaction];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });
  };


//   fonction pour la modification d'une transaction
  const modifyTransaction = (modifiedTransaction) => {
    setTransactions((prevTransactions) => {
        
    if (!prevTransactions || prevTransactions.length === 0) {
        console.error("Le tableau de transactions est null, undefined, ou vide.");
        return prevTransactions;
      }

    const index = prevTransactions.findIndex(
        (transaction) => transaction.id === modifiedTransaction.id
      );
      if (index !== -1) {
        const updatedTransactions = [
          ...prevTransactions.slice(0, index),
          modifiedTransaction,
          ...prevTransactions.slice(index + 1),
        ];
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
        return updatedTransactions;
      } else {
        console.error("La transaction à modifier n'a pas été trouvée.");
        return prevTransactions;
      }
    });
  };

//   recupertion d'une transaction en fonction de son id
  const getTransactionById = (id) => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const UneDepense =storedTransactions.find(transaction => transaction.id === id);
    return UneDepense;
  };

//   mise à jour d'une transaction en fonction de son id en utilisant le hook useParams
    useEffect(() => {
    setTransactionsItem(getTransactionById(parseInt(id)));
  }, [id]);


//   fonction pour la creation aléatoire d'un id comportant 10 caractères qui sera traduit en chiffres
  const generateUniqueId = () => {
    return parseInt(Math.random().toString().substr(2, 9), 10);
  };

//   fonction pour la mise a jour de l'input du formaulaire à la place de handleChange de useFormik
  const handleInputChange = (e) => {
    const { name, value } = e.target;
        setTransactionsItem({
            ...transactionsItem,
            [name]: value,
          });
  };

 
// fonction pour la mise à jour du formualire a pres soumission
  const resetForm = () => {
    setTransactionsItem({});
  };


//   fonction pour l'envoi des informations  de dépense du formualire
  const handleValidation = (e) => {
    e.preventDefault();
    
      if (isEdit === 'true') {
        const depenseModifie = {
          id: transactionsItem?.id,
          title: transactionsItem?.title,
          type:transactionsItem?.type,
          reference: transactionsItem?.reference,
          categorie: transactionsItem?.categorie,
          date: transactionsItem?.date,
          description: transactionsItem?.description,
          montant: transactionsItem?.montant,
        };

        if(isnoSubmit===true && ((depenseModifie.title===undefined || !depenseModifie.title) && (depenseModifie.montant===undefined || !depenseModifie.montant)  && (depenseModifie.date===undefined || !depenseModifie.date))){
          alert("Vueiller ajouter tous les champs requis")
          setIsnoSubmit(false)
        }else{
          console.log('modifier', depenseModifie);
          modifyTransaction(depenseModifie);
          resetForm();
          setTimeout(()=>history("/"),2000); 
          setIsnoSubmit(true)
        }
      } else {
        const depense = {
          id: generateUniqueId(),
          title: transactionsItem?.title,
          type:transactionsItem?.type,
          reference: transactionsItem?.reference,
          categorie: transactionsItem?.categorie,
          date: transactionsItem?.date,
          description: transactionsItem?.description,
          montant: transactionsItem?.montant,
        };
        if(isnoSubmit===true && ((depense.title===undefined ||depense.title==='' ) && (depense.montant===undefined || depense.montant==='')  && (depense.date===undefined || depense.date===''))){
          alert("Vueiller ajouter au moins deux des champs requis")
          setIsnoSubmit(false)
        }else{
          console.log('depense', depense);
          addTransaction(depense);
          resetForm();
          setTimeout(()=>history("/"),2000);
          setIsnoSubmit(true)
        }
      }
  };


    return(
        <div className="m-12"> 
            <div className="bg-gray-100 p-4 rounded-lg flex">
                <div className="flex-1">
                    {/* En fonction du bouton clique, texte correspondant */}
                    <p className="">{isEdit==='true' ? "Modification de transaction" : "Ajout de transaction"}</p>
                </div>
                <div className="bg-blue-500 p-2 text-white rounded-lg ">
                <Link to="/">
                    <Button >
                        Retour
                    </Button>
                </Link>
                </div>
            </div>
            <div className='flex items-center justify-center h-screen '>
                {/* Début Formulaie */}
                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mx-24"  onSubmit={handleValidation}> 
                    <label htmlFor="Reference" className="text-xs text-gray-300">Référence</label>
                    <Input 
                    className="  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"  
                    name="reference"
                    placeholder="Saisir une valeur"
                    value={transactionsItem && transactionsItem.reference}
                    onChange={handleInputChange}
                    />
                    {error  ? (
                    <FormFeedback type="invalid" className="text-red-300">{error}</FormFeedback>
                    ) : null}
                    <label htmlFor="Type" className="text-xs text-gray-300">Type</label>
                    <Input 
                    className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="select"  
                    name="type"
                    placeholder="Saisir une valeur"
                    value={transactionsItem && transactionsItem.type}
                    onChange={handleInputChange}
                    >
                     {type.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                    </Input> 
                    {error  ? (
                    <FormFeedback type="invalid" className="text-red-300">{error}</FormFeedback>
                    ) : null}
                    <label htmlFor="Titre" className="text-xs text-gray-300">Titre <span className="text-red-500">requis</span> </label>
                    <Input 
                    className="  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"  
                    name="title"
                    placeholder="Saisir une valeur"
                    value={transactionsItem && transactionsItem.title}
                    onChange={handleInputChange}
                     />
                    {error  ? (
                    <FormFeedback type="invalid" className="text-red-300">{error}</FormFeedback>
                    ) : null}
                    <label htmlFor="Categorie" className="text-xs text-gray-300">Catégorie</label>
                    <Input 
                    className="  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="select"  
                    name="categorie"
                    placeholder="Saisir une valeur"
                    value={transactionsItem && transactionsItem.categorie}
                    onChange={handleInputChange}
                    >
                     {categorie.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                    </Input> 
                    {error  ? (
                    <FormFeedback type="invalid" className="text-red-300">{error}</FormFeedback>
                    ) : null}
                    <label htmlFor="Description" className="text-xs text-gray-300">Description</label>
                    <textarea 
                    className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="description" 
                    rows="4" 
                    cols="50"
                    placeholder="Saisir une valeur"
                    value={transactionsItem && transactionsItem.description}
                    onChange={handleInputChange}
                    >
                    </textarea>
                    {error  ? (
                    <FormFeedback type="invalid" className="text-red-300">{error}</FormFeedback>
                    ) : null}
                    <label htmlFor="Date" className="text-xs text-gray-300">Date <span className="text-red-500">requis</span></label>
                    <Input
                    className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="date" 
                    name="date"
                    placeholder="Saisir une valeur" 
                    value={transactionsItem && transactionsItem.date}
                    onChange={handleInputChange}

                    />
                    {error  ? (
                    <FormFeedback type="invalid" className="text-red-300">{error}</FormFeedback>
                    ) : null}
                    <label htmlFor="Montant" className="text-xs text-gray-300">Montant <span className="text-red-500">requis</span> </label>
                    <Input
                    value={transactionsItem && transactionsItem.montant}
                    className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="number" 
                    name="montant" 
                    onChange={handleInputChange}
                    placeholder="Saisir une valeur"
                    />
                    {error  ? (
                    <FormFeedback type="invalid" className="text-red-300">{error}</FormFeedback>
                    ) : null}


                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{isEdit==='true' ? "Modifier la transaction" : "Ajouter la transaction"}</button>
                </Form>
                {/* Fin Formulaire */}
            </div>
        </div>
    )
}
export default TransactionForm;