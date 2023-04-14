import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App} from './App';

createServer({
  models:{
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions:[
        {
          id:1,
          title: 'Gasolina para o carro',
          type:'withdraw',
          category: 'Car',
          amount: 4000,
          createdAt: new Date('2022-05-13 03:00:00'),
        },
        { 
          id:2,
          title: 'Venda de telefone',
          type:'deposit',
          category: 'Telefone',
          amount: 76000,
          createdAt: new Date('2022-05-13 03:00:00'),
        },
      ]
    })
  },
  routes(){
    this.namespace= 'api';
    this.get('/transactions', ()=>{
      return this.schema.all('transaction');


     /*   {
          id:1,
          title:'Transaction 1',
          amount: 400,
          type: 'deposit',
          category:'Food',
          createdAt: new Date()
        }
      ]*/ 
    })

    this.post('/transactions', (schema,request )=>{
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

