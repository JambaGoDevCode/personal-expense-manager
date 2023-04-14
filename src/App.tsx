import React, { useState } from 'react';
import { GlobalStyle } from './style/global';
import { Header} from "./components/Header";
import { Dashboard } from './components/Dashboard';
import Modal from 'react-modal'
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/UseTransactions';

// Acessibility to modal
Modal.setAppElement('#root');

export function App() {

  const [isNewTransationModalOpen, setIsNewTransationModalOpen] = useState(false)
    function handleOpenNewTransactionModal(){
      setIsNewTransationModalOpen(true)
    }
    function handleCloseNewTransactionModal(){
      setIsNewTransationModalOpen(false)
    }


  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard/>
      
      <NewTransactionModal
      isOpen={isNewTransationModalOpen}
      onRequestClose={handleCloseNewTransactionModal}/>
      <GlobalStyle/>
    </TransactionsProvider>
  );
}

