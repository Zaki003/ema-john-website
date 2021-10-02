import React from 'react';
import './Cart.css';

const Cart = props => {
    const { cart } = props;
    // console.log(cart);
    const total = cart.reduce((previous, product) => previous + product.price * (product.quantity ? product.quantity : 1), 0);
    // const totalQuantity = cart.reduce((previous, product) => previous + product.quantity, 0);
    let totalQuantity = 0;
    for (const product of cart) {
        totalQuantity += product.quantity ? product.quantity : 1;
    }
    const shipping = total > 0 ? 3.99 : 0;
    const totalBeforeTax = total + shipping;
    const tax = totalBeforeTax * 0.1;
    const grandTotal = totalBeforeTax + tax;

    return (
        <div>
            <div className="summary">
                <h3>Order Summary</h3>
                <p>Items Ordered: {totalQuantity}</p>
            </div>
            <div className='prices'>
                <p><small>Items: ${total.toFixed(2)}</small></p>
                <p><small>Shipping & Handling: ${shipping}</small></p>
                <p><small>Total before tax: ${totalBeforeTax.toFixed(2)}</small></p>
                <p><small>Estimated tax: ${tax.toFixed(2)}</small></p>
                <h3 id='grand-total'>Order Total = ${grandTotal.toFixed(2)}</h3>
            </div>

        </div>
    );
};

export default Cart;