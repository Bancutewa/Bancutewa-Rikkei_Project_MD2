import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { SCREEN_URL } from '../../../../constants/screen/PathScreen'
import { useRef } from 'react'
import { CreateUserAPI, fetchUsersApi } from '../../../../api/usersAPI'

const RegisterPage = () => {

    const navigate = useNavigate()
    // ===========ref===========
    // khai bao ref
    const emailRef = useRef("");
    const userRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");
    const onSubmit = async () => {
        const listUsers = await fetchUsersApi()

        const email = emailRef.current.value
        const userName = userRef.current.value
        const passWord = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value

        // Kiem tra khong duoc de trong

        if (email == "" || userName == "" || passWord == "" || confirmPassword == "") {
            alert("Vui lòng nhập đủ, không được để trống")
            return
        }
        // Kiem tra mat khau duoc nhap dung khong
        if (passWord != confirmPassword) {
            alert("Bạn đã nhập sai password, vui lòng nhập đúng")
            return
        }

        const checkUserList = listUsers.find(user => user.username === userName && user.email === email)

        if (!checkUserList) {
            const userRegis = {
                username: userName,
                email: email,
                password: passWord,
                role: "user"
            }
            CreateUserAPI(userRegis)
            alert("Đã đăng ký người dùng")
            navigate(SCREEN_URL.LOGIN)
        } else {
            alert("Thông tin người dùng đã được đăng ký, vui lòng sử dụng Email và User Name khác")
        }





    }
    return (
        <main>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Container bsPrefix="col-5" className="">
                    <div className="mb-3">
                        <Form.Label htmlFor="email" className="form-label">
                            <label>Email</label>
                        </Form.Label>
                        <Form.Control
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            ref={emailRef}

                        />
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="userName" className="form-label">
                            <label>Tên đăng nhập</label>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="userName"
                            ref={userRef}

                        />
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="password1" className="form-label">
                            <label>Mật khẩu</label>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            className="form-control"
                            id="password1"
                            ref={passwordRef}

                        />
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="password2" className="form-label">
                            <label>Nhập lại mật khẩu</label>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            className="form-control"
                            id="password2"
                            ref={confirmPasswordRef}

                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="check"
                            />
                            <label className="form-check-label" htmlFor="check">
                                Check me out
                            </label>
                        </div>
                        <Link to={SCREEN_URL.LOGIN}>Đã có tài khoản, quay lại trong đăng nhập</Link>
                    </div>
                    <Button variant="primary" onClick={onSubmit} >
                        Submit
                    </Button>
                </Container>
            </div>
        </main>
    )
}

export default RegisterPage
