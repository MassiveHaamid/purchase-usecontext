// components/CartPage.jsx
import React, { useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { products } from './productsData';

const CartContext = React.createContext();

function CartPage() {
  const [cartItems, setCartItems] = useState(products);

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const removeItem = itemId => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <Table>
        <tbody>
          {cartItems.map(item => (
            <React.Fragment key={item.id}>
              <tr>
                <td>
                  <img src={item.images[0]} alt={item.title} />
                </td>
                <td>
                  <strong>{item.title}</strong>
                </td>
                <td colSpan="2"></td>
                <td>
                  <label htmlFor={`quantity-${item.id}`}></label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    name={`quantity-${item.id}`}
                    min="1"
                    max="10"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                  />
                </td>
                <td>${item.price}</td>
                <td>
                  <Button variant="danger" onClick={() => removeItem(item.id)}>Remove</Button>
                </td>
              </tr>
              <tr>
                <td colSpan="7">{item.description}</td>
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <td>
              <strong>Subtotal:</strong>
            </td>
            <td colSpan="5"></td>
            <td>${calculateTotal()}</td>
          </tr>
          <tr>
            <td>
              <strong>Shipping:</strong>
            </td>
            <td colSpan="5"></td>
            <td>FREE</td>
          </tr>
          <tr>
            <td>
              <strong>Total:</strong>
            </td>
            <td colSpan="5"></td>
            <td>${calculateTotal()}</td>
          </tr>
          <tr>
            <td colSpan="6"></td>
            <td>Get Daily Cash with One-Card</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default CartPage;
