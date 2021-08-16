import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'
import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
// import { onError } from '@apollo/client/link/error'

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({message}) => {
//       alert(`Graphql error ${message}`)
//     });
//   }
// });

const link = from ([
  // errorLink,
  new HttpLink({ uri: "http://localhost:9000/graphql" }),
]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
