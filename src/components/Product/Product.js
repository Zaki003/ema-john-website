import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Rating from 'react-rating';

const Product = props => {
    const { img, name, seller, price, stock, star } = props.product;
    return (
        <div className='product'>
            <div>
                <img className='image' src={img} alt="" />
            </div>
            <div className='description'>
                <h4 className='title'>{name}</h4>
                <p><small>By:</small> {seller}</p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                <Rating
                    initialRating={star}
                    emptySymbol="far fa-star icon-color"
                    fullSymbol="fas fa-star icon-color"
                    readonly />
                <br />
                <button onClick={() => props.handleAddToCart(props.product)} className='general-btn'><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;