import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';


// Criando contexto que poderá acessar e
//facilitar a comunicação entre os componentes

 const TransactionContext = createContext<TransationDataContext>(
    {} as TransationDataContext
    );


interface TransactionType {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<TransactionType, 'id' | 'createdAt'>;

interface TransationDataContext{
    transactions: TransactionType[];
    createTransaction: (transactions: TransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}


export function TransactionsProvider( {children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<TransactionType[]>([]);

    useEffect(() =>{
        api.get('/transactions')
        .then(response=> setTransactions(response.data.transactions))
    }, []);


    async function createTransaction(transactionInput: TransactionInput){
       const response = await api.post('/transactions', {
           ...transactionInput,
           createdAt: new Date(),
       })
       const { transactions } = response.data
       setTransactions({
           ...transactions,
           transactions,
       }) 
    }
    return(
        <TransactionContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}




export function useTransactions(){
    const context = useContext(TransactionContext);

    return context
}