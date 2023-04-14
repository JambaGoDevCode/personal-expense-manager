import { Container } from "./style";
import entradasImg from '../../assets/arrowup.svg';
import saidasImg from '../../assets/arrowdown.svg';
import totalImg from '../../assets/check.svg';
import { useTransactions } from "../../hooks/UseTransactions";


export function Summary(){
    const { transactions } = useTransactions();
    const arr = null

    const  summary = transactions.reduce((acc, transaction) =>{
        if(transaction.type === 'deposit'){
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        }else{ 
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
        
    }, {
        deposits: 0,
        withdraws:0,
        total: 0,
    })
    console.log("the summary console", summary)
    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={entradasImg} alt="entradas de saldo" />
                </header>
                <strong>
                    { new Intl.NumberFormat('pt-AO', {
                                    style:'currency',
                                    currency:'AOA'
                    }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={saidasImg} alt="saídas de saldo" />
                </header>
                <strong>
                    - { new Intl.NumberFormat('pt-AO', {
                                    style:'currency',
                                    currency:'AOA'
                    }).format(summary.withdraws)}
                </strong>
            </div>
            <div className="total">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="entradas de saldo" />
                </header>
                <strong>
                { new Intl.NumberFormat('pt-AO', {
                                    style:'currency',
                                    currency:'AOA'
                    }).format(summary.total)}
                </strong> 
            </div>
        </Container>
    );
}