import { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminApi } from "../../../../api/fetchAdminAPI";
import { SCREEN_URL } from "../../../../constants/screen/PathScreen";
import { createUser, getUser, pushUserLocal } from "../../../../service/LocalStorageService";

const AdminLoginPage = (props) => {
    const navigate = useNavigate()

    // UseEffect
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    useEffect(() => {
        if (current_user) navigate(SCREEN_URL.ADMIN_HOME);
    }, []);
    // ===========props===========
    // const { titleLogin, titlePassword, submit, regis } = props;


    // ===========ref===========
    // khai bao ref
    const userRef = useRef("");
    const passwordRef = useRef("");

    // 

    // xu ly event
    const onSubmit = async () => {
        const listAdmin = await fetchAdminApi()
        const userName = userRef.current.value
        const passWord = passwordRef.current.value

        const currentLogin = listAdmin.find(admin => userName === admin.username)

        if (currentLogin) {
            if (currentLogin.password === passWord && currentLogin.role === "admin") {
                const currentAdmin = createUser(userName, "admin")
                pushUserLocal(currentAdmin)
                navigate(SCREEN_URL.ADMIN_HOME)
            } else {
                alert('Nhap sai mat khau')
            }
        } else {
            alert("Sai ten dang nhap bro")
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Container bsPrefix="col-5" className="">
                <div className="mb-3">
                    <Form.Label htmlFor="exampleInputEmail1" className="form-label">
                        <label>Tên đăng nhập ADMIN</label>
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
                        <label>Mật khẩu ADMIN</label>
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
                    <Link to={"/regis"}>Regis now</Link>
                </div>
                <Button variant="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </Container>
        </div>
    );
};

export default AdminLoginPage;
