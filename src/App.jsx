import React from 'react';
import { Container } from 'react-bootstrap';
import CartPage from './components/CartPage';
import { products } from './components/productsData';

const CartContext = React.createContext();

function App() {
  return (
    <Container>
      <CartContext.Provider value={products}>
        <CartPage />
      </CartContext.Provider>
    </Container>
  );
}

export default App;