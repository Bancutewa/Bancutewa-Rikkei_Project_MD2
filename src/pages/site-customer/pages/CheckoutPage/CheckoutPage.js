import React, { useEffect, useState } from 'react'
import QuantityPicker from '../../../../components/quantity/quantity'
import { SCREEN_URL } from '../../../../constants/screen/PathScreen'
import { Link, useNavigate } from 'react-router-dom'
import { CloseButton } from 'react-bootstrap'
import Form from '../../../../components/organisms/form/Form'
import './style.css'
import { getUser } from '../../../../service/LocalStorageService'
import { fetchCartUserApiByUserName } from '../../../../api/cartAPI'

const CheckoutPage = () => {
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
    return (
        <main>
            <main className="container mt-5">
                <h2 className="mb-4">Checkout</h2>
                <div className="row mb-5" >
                    <div className="col-7">
                        <Form />
                    </div>
                    <div className="col-5">
                        <div className=" order-summary p-3">
                            <h5 className="card-title p-2">Your order</h5>
                            <div className='card-checkout'>
                                {cart.map(product =>
                                    <div className='product-checkout'>
                                        <img className='img-product-checkout col-2' src={product.img} />
                                        <p className='name-product-checkout  col-7'>{product.name}</p>
                                        <p className='quantity-product-checkout  col-1'>x{product.quantity}</p>
                                        <p className='subtotal-product-checkout  col-2'>{(parseInt(product.price) * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                )}
                            </div>
                            <div className='checkout-total mt-4 '>
                                <p >Total</p>
                                <p >
                                    {parseInt(cart.reduce((price, product) => {
                                        return price + product.price * product.quantity
                                    }, 0)
                                    ).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </main>
    )
}

export default CheckoutPage
