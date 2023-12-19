import React, { useRef } from 'react';
import { useState } from 'react';
import { getUser } from '../../../../../service/LocalStorageService';
import { UpdateCartUserAPI, fetchCartUserApiByUserName } from '../../../../../api/cartAPI';
import { useEffect } from 'react';

const QuantityCart = (props) => {
    const { productId, value, handleQuanityChange } = props;

    const [userCart, setUserCart] = useState([])
    const [cart, setCart] = useState([])
    const [quantity, setQuantity] = useState([value])

    const isLogin = getUser()
    const fetchData = async () => {
        try {
            const fetchedUserCart = await fetchCartUserApiByUserName(isLogin);
            setUserCart(fetchedUserCart[0])
            const userCart = fetchedUserCart[0].products
            setCart(userCart);
        } catch (error) {
            console.error("Error fetching Cart:", error);
        }
    };
    const decreaseQuantity = async () => {
        if (quantity > 0) {
            const updatedCart = cart.map(product => {
                if (product.id === productId) {
                    const newQuantity = parseInt(product.quantity) - 1;
                    setQuantity(newQuantity)
                    return { ...product, quantity: newQuantity };
                }
                return product;
            });


            try {
                // Call the API to update the user's cart
                await UpdateCartUserAPI({ id: userCart.id, user: userCart.user, products: updatedCart });
                console.log('Cart updated successfully');
            } catch (error) {
                console.error('Error updating cart:', error);
                // Handle error as needed
            }
        }
    };

    const increaseQuantity = async () => {
        const updatedCart = cart.map(product => {
            if (product.id === productId) {
                const newQuantity = parseInt(product.quantity) + 1;
                setQuantity(newQuantity)
                return { ...product, quantity: newQuantity };
            }
            return product;
        });

        try {
            // Call the API to update the user's cart
            await UpdateCartUserAPI({ id: userCart.id, user: userCart.user, products: updatedCart });
            console.log('Cart updated successfully');
        } catch (error) {
            console.error('Error updating cart:', error);
            // Handle error as needed
        }
    };

    useEffect(() => {
        fetchData();
    }, [quantity]);
    return (
        <span className="quantity-picker rounded">
            <button className="quantity-modifier modifier-left rounded" onClick={decreaseQuantity}>
                &ndash;
            </button>
            <input className="quantity-display" value={quantity} readOnly />
            <button className="quantity-modifier modifier-right rounded" onClick={increaseQuantity}>
                &#xff0b;
            </button>
        </span>
    );
};

export default QuantityCart;
