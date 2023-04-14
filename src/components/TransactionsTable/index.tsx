import { useTransactions } from "../../hooks/UseTransactions";
import { Container } from "./style";



export function TransactionsTable(){
    const {transactions} = useTransactions();
    console.log(transactions)

  

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                   
                   {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                { new Intl.NumberFormat('pt-AO', {
                                    style:'currency',
                                    currency:'AOA'
                                }).format(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                { new Intl.DateTimeFormat('pt-AO').format(new Date(transaction.createdAt))}
                            </td>
                        </tr>
                   ))}
                 
                </tbody>
            </table>
        </Container>
    )  
}  