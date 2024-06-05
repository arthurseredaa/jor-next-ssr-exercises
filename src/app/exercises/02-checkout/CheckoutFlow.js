'use client';
import React from 'react';

import CartTable from './CartTable';
import Spinner from "../../../components/Spinner";

// https://courses.joshwcomeau.com/joy-of-react/06-full-stack-react/03.06-ssr-exercises (Neighbourhood shop, solution code)

function CheckoutFlow({
  cardData,
  taxRate,
  handleDeleteItem,
}) {
  const { items, isLoading } = cardData;

  if (items.length === 0) {
    return (
      <div className="checkout-flow empty">
        {isLoading ? (
          <Spinner />
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    )
  }

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const subtotal = calculateSubtotal(items);
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <div className="checkout-flow">
      <CartTable
        items={items}
        handleDeleteItem={handleDeleteItem}
      />

      <table className="checkout-totals">
        <tbody>
          <tr>
            <th scope="col">Subtotal</th>
            <td>{priceFormatter.format(subtotal)}</td>
          </tr>
          <tr>
            <th scope="col">Taxes</th>
            <td>{priceFormatter.format(taxes)}</td>
          </tr>
          <tr>
            <th scope="col">Total</th>
            <td>{priceFormatter.format(total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function calculateSubtotal(items) {
  let subtotal = 0;

  items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  return subtotal;
}

export default CheckoutFlow;
