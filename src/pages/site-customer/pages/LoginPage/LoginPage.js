import React from 'react'
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { SCREEN_URL } from '../../../../constants/screen/PathScreen';
import { useEffect } from 'react';
import { useRef } from 'react';
import { fetchUsersApi } from '../../../../api/usersAPI';
import { CreateCartUserAPI, fetchCartsUserApi } from '../../../../api/cartAPI';
import { createUserCart, pushUserCartLocal, pushUserLocal } from '../../../../service/LocalStorageService';


const LoginPage = () => {
    const navigate = useNavigate()

    // UseEffect
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    useEffect(() => {
        if (current_user) navigate(SCREEN_URL.HOME);
    }, []);
    // ===========ref===========
    // khai bao ref
    const userRef = useRef("");
    const passwordRef = useRef("");


    // Handle Event
    const authenticateUser = (userName, passWord, listUsers) => {
        const currentLogin = listUsers.find(user => user.username === userName);
        return currentLogin && currentLogin.password === passWord && currentLogin.role === "user";
    };

    const handleLoginSuccess = (userName, listCarts) => {
        // Xử lý khi đăng nhập thành công
        const currentUser = (userName);
        pushUserLocal(currentUser);

        const userCart = listCarts.find(cart => cart.user === userName);

        if (userCart) {
            pushUserCartLocal(userCart);
        } else {
            const newCart = createUserCart(userName, []);
            pushUserCartLocal(newCart);
            CreateCartUserAPI(newCart);
        }

        navigate(SCREEN_URL.HOME);
    };

    const onSubmit = async () => {
        try {
            const [listUsers, listCarts] = await Promise.all([fetchUsersApi(), fetchCartsUserApi()]);
            const userName = userRef.current.value;
            const passWord = passwordRef.current.value;

            if (authenticateUser(userName, passWord, listUsers)) {
                handleLoginSuccess(userName, listCarts);
            } else {
                alert('Sai tên đăng nhập hoặc mật khẩu');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Đã có lỗi xảy ra trong quá trình đăng nhập');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Container bsPrefix="col-5" className="">
                <div className="mb-3">
                    <Form.Label htmlFor="exampleInputEmail1" className="form-label">
                        <label>Tên đăng nhập</label>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        ref={userRef}

                    />
                </div>
                <div className="mb-3">
                    <Form.Label htmlFor="exampleInputPassword1" className="form-label">
                        <label>Mật khẩu</label>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        ref={passwordRef}

                    />
                </div>
                <div className="d-flex justify-content-between">
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Check me out
                        </label>
                    </div>
                    <Link to={SCREEN_URL.REGISTER}>Regis now</Link>
                </div>
                <Button variant="primary" onClick={onSubmit} >
                    Submit
                </Button>
            </Container>
        </div>
    );
}

export default LoginPage
