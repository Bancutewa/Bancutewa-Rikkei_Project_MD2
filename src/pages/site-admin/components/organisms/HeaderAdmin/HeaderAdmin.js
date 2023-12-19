import React, { useEffect, useState } from 'react'
import { Button, Container, Dropdown, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Form } from 'react-router-dom'
import { checkUserLocal, deleteUserLocal, getUser } from '../../../../../service/LocalStorageService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const HeaderAdmin = () => {
    const [isLogin, setIslogin] = useState(false)

    const checkIsLogin = () => {
        const current_user = getUser()
        setIslogin(current_user)
    }
    const LogOut = () => {
        deleteUserLocal()
        setIslogin(false)
    }

    useEffect(() => {
        checkIsLogin()
    }, []);

    useEffect(() => {
    }, [isLogin]);


    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <img src='https://c8.alamy.com/comp/2BG76AY/three-persons-admin-icon-outline-style-2BG76AY.jpg' style={{ width: "50px" }} />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end" >
                    <Navbar.Text>
                        <Dropdown className='user-dropdown'>
                            <Dropdown.Toggle variant="Secondary"  >
                                <Navbar.Text>
                                    Signed in as: <a href="#login">{isLogin.username}</a>
                                </Navbar.Text>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={LogOut}>Đăng xuất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderAdmin
