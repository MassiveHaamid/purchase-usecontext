import React, { useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { products } from './productsData';

// const CartContext = React.createContext();

function CartPage() {
  const [cartItems, setCartItems] = useState(products);
  const [itemsInCart, setItemsInCart] = useState([]);

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const addToCart = (itemId) => {
    setCartItems([...cartItems, { id: itemId, quantity: 1 }]);
    setItemsInCart([...itemsInCart, itemId]);
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: 0 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    setItemsInCart(itemsInCart.filter(id => id !== itemId));
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
                min="0"  // Allow 0 as a valid quantity
                max="10"
                value={item.quantity !== undefined ? item.quantity : 0}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                />
                </td>
                <td>${item.price}</td>
                <td>
{cartItems.some(cartItem => cartItem.id === item.id && cartItem.quantity > 0) ? (
                  <Button variant="danger" onClick={() => removeItem(item.id)}>Remove</Button>
                      ) : (
                  <Button variant="primary" onClick={() => addToCart(item.id)}>Add</Button>
                  )}
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
