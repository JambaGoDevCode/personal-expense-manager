import { Container, TransactionTypeContainer, RadioButton } from "./style";
import Modal from 'react-modal';
import  {AiFillCloseCircle} from "react-icons/ai";
import { FormEvent, useState } from "react";


import inCome from "../../assets/arrowup.svg"
import outCome from "../../assets/arrowdown.svg"
import { useTransactions } from "../../hooks/UseTransactions";

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    const { createTransaction } = useTransactions();
    
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [ type, setType]= useState('deposit')

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }
    
    return(
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            
            <AiFillCloseCircle className="react-modal-close" onClick={onRequestClose}/>

            <Container onSubmit={handleCreateNewTransaction}>
                <h1>Cadastrar transação</h1>

                <input placeholder="Título"
                value={title}
                onChange={event => setTitle(event.target.value)}
                />

                <input type="number" placeholder="Valor"
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioButton 
                    type="button"
                    onClick={()=> {setType('deposit');}}
                    isActive={type === 'deposit'}
                    activeColor="green"
                    >
                        <img src={inCome} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioButton>

                    <RadioButton 
                    type="button"
                    onClick={()=> {setType('withdraw');}}
                    isActive={type === 'withdraw'}
                    activeColor="red"

                    >
                        <img src={outCome} alt="Saida" />
                        <span>Saida</span>
                    </RadioButton>
                </TransactionTypeContainer>

                <input placeholder="Categoria"
                value={category}
                onChange={event => setCategory(event.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </Container>
      </Modal>
    )
}