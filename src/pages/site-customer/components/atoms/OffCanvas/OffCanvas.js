import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Button, CloseButton, Offcanvas } from 'react-bootstrap';
import QuantityPicker from '../../../../../components/quantity/quantity';
import './style.css'
import { Link } from 'react-router-dom';
import { SCREEN_URL } from '../../../../../constants/screen/PathScreen';
import { getUser } from '../../../../../service/LocalStorageService';
import { fetchCartUserApiByUserName } from '../../../../../api/cartAPI';
import { useEffect } from 'react';

const OffCanvas = () => {
    const [show, setShow] = useState(false);
    const [cart, setCart] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const isLogin = getUser()
    const fetchData = async () => {
        try {
            const fetchedUserCart = await fetchCartUserApiByUserName(isLogin);
            const userCart = fetchedUserCart[0].products
            setCart(userCart);
        } catch (error) {
            console.error("Error fetching Cart:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [cart]);
    return (
        <div>
            <Button variant="primary" onClick={handleShow} className="me-2" >
                <FontAwesomeIcon className='fs-3 icon' icon={faCartShopping} style={{ color: "#ffffff", }} />

            </Button>
            <Offcanvas show={show} onHide={handleClose} placement='end' >
                <Offcanvas.Header closeButton className='border-bottom border-2 p-3'>
                    <Offcanvas.Title >Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='p-3'>
                    <div className='product-cart'>
                        {cart.map(product =>
                            <div className='cart-item mb-4 border-bottom border-2 p-2'>
                                <div className='img-buy-item'>
                                    <img src={product.img} />
                                </div>
                                <div className='name-item d-flex' >
                                    <p>{product.name}</p>
                                    <p>Giá: {product.price}</p>
                                    <p>Số lượng: {product.quantity}</p>
                                    {/* <p>Tạm tính {
                                        parseInt(product.quantity * product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                    }</p> */}
                                </div>
                                {/* <CloseButton className='position-absolute top-0 end-0 border border-3 border-black rounded-circle' /> */}
                            </div>)}
                    </div>
                    <div className='subtotal'>
                        <p>Subtotal:</p>
                        <p className='total'>   {parseInt(cart.reduce((price, product) => {
                            return price + product.price * product.quantity
                        }, 0)
                        ).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                        }</p>
                    </div>
                    <div className='remote-button'>
                        <Link to={SCREEN_URL.CART}>
                            <button>
                                VIEW CART
                            </button>
                        </Link>
                        <Link to={SCREEN_URL.CHECKOUT}>
                            <button>
                                CHECKOUT
                            </button>
                        </Link>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div >
    );
}

export default OffCanvas
