import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // state for products 
    const [products, setProducts] = useState([]);
    // products to be rendered in the UI 
    const [displayProducts, setDisplayProducts] = useState([]);
    // state for the cart 
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setDisplayProducts(data)
            })
    }, []);

    useEffect(() => {
        // runs only after the products are loaded 
        if (products.length) {
            const storedCart = getStoredCart();
            const savedCart = [];
            for (const key in storedCart) {
                const savedProduct = products.find(product => product.key === key);
                if (savedProduct) {
                    const quantity = storedCart[key];
                    savedProduct.quantity = quantity;
                }
                savedCart.push(savedProduct);
                // console.log(savedProduct);
            }
            // sets cart to savedCart 
            setCart(savedCart);
        }
    }, [products]);

    const handleSearch = event => {
        const searchText = event.target.value;
        const searchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(searchedProducts);
    }

    const handleAddToCart = product => {
        // update the existing cart 
        const newCart = [...cart, product];
        setCart(newCart);
        // save to local storage for now 
        addToDb(product.key);
    }
    return (
        <>
            <div className='input-container'>
                <input onChange={handleSearch} type="text" placeholder='type here to search' />
            </div>
            <div className='shop-container'>
                <div className="product-container">
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }

                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;