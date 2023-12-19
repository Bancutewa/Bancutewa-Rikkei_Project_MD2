import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Import your custom CSS file
import { CloseButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SCREEN_URL } from '../../../../constants/screen/PathScreen';
import { getUser } from '../../../../service/LocalStorageService';
import { UpdateCartUserAPI, fetchCartUserApiByUserName } from '../../../../api/cartAPI';
import { useEffect } from 'react';
import QuantityCart from './quanityCart/quantityCart';



const CartPage = () => {
    const navigate = useNavigate()

    const [userCart, setUserCart] = useState([])
    const [cart, setCart] = useState([])

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

    useEffect(() => {
        if (isLogin) {
            fetchData();
        } else {
            navigate(SCREEN_URL.LOGIN)
        }
    }, []);
    useEffect(() => {
        fetchData();
    }, [cart]);

    const deleteItem = async (index) => {
        cart.splice(index, 1)
        try {
            // Call the API to update the user's cart
            await UpdateCartUserAPI({ id: userCart.id, user: userCart.user, products: cart });
            console.log('Cart updated successfully');
        } catch (error) {
            console.error('Error updating cart:', error);
            // Handle error as needed
        }
    }

    return (
        <main className="container mt-5">
            <h2 className="mb-4">Shopping Cart</h2>
            <div className="row mb-5" >
                <div className="col-8">
                    <table cellpadding="10" id="table-list-student">
                        <thead>
                            <tr>
                                <th style={{ opacity: "0" }}>Cover</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {cart.map((product, index) =>
                                <tr>
                                    <td>
                                        <img
                                            src={product.img}
                                            alt=""
                                        />
                                    </td>
                                    <td className='product-name'>{product.name}</td>
                                    <td className='product-price'>{parseInt(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td className='product-quantity'><QuantityCart productId={product.id} value={product.quantity} /></td>
                                    <td className='product-subtotal'>
                                        {parseInt(product.price * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td className='product-del'><CloseButton onClick={() => deleteItem(index)} /></td>
                                </tr>
                            )}

                        </tbody>
                    </table>

                    {/* Additional product cards can be added here */}
                </div>

                <div className="col-4">
                    <div className=" order-summary">
                        <h5 className="card-title p-2">Order Summary</h5>
                        <ul className="list-group p-2">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Total
                                <span>
                                    {parseInt(cart.reduce((price, product) => {
                                        return price + product.price * product.quantity
                                    }, 0)
                                    ).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                    }
                                </span>
                            </li>
                        </ul>
                        <Link to={SCREEN_URL.CHECKOUT}>
                            <button className="btn btn-success btn-block mt-3  ">Checkout</button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
