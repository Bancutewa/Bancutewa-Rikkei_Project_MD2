import React, { useRef } from 'react'
import { Button, ButtonGroup, Container, Dropdown, DropdownButton, Form, FormControl, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import './style.css'
import { fetchCategoriesApi } from '../../../../../api/fetchCategoryAPI';
import { useState } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { SCREEN_URL } from '../../../../../constants/screen/PathScreen';
import OffCanvas from '../../atoms/OffCanvas/OffCanvas';
import { checkUserLocal, deleteUserCartLocal, deleteUserLocal } from '../../../../../service/LocalStorageService';
const Header = () => {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [isLogin, setIslogin] = useState(false)
    const fetchData = async () => {
        try {
            const fetchedCategories = await fetchCategoriesApi();
            setCategories(fetchedCategories);


        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const checkIsLogin = () => {
        const current_user = checkUserLocal()
        setIslogin(current_user)
    }

    const LogOut = () => {
        deleteUserLocal()
        deleteUserCartLocal()
        setIslogin(false)
    }


    useEffect(() => {
        fetchData();
        checkIsLogin()
    }, []);

    useEffect(() => {
    }, [isLogin]);



    // Chức năng tìm kiếm
    const searchRef = useRef()
    const searchProducts = (event) => {
        if (event.key === 'Enter') {
            if (searchRef.current.value) {
                navigate(SCREEN_URL.SEARCH.replace(':productSearch', searchRef.current.value))
            }

        }
    }
    return (
        <header className=' bg-primary p-3'>
            <Container >
                <div class="row justify-content-between align-items-center  mb-3">
                    <div class="col-2">
                        <Link to={SCREEN_URL.HOME}>
                            <img src="https://www.thebetterfish.com/wp-content/uploads/2022/07/logo.png" class="img-fluid mt-1" alt="logo" />
                        </Link>
                    </div>
                    <div class="col-5">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search for products" aria-label="Recipient's username" onKeyDown={searchProducts} ref={searchRef} />
                            <span class="input-group-text" id="basic-addon2">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                        </div>
                    </div>

                </div>
                <div class="row justify-content-between align-items-center">
                    <div className='col-2 me-5'>

                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" size='lg'>
                                Danh mục cá
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {categories.map(category =>
                                    <Dropdown.Item href={SCREEN_URL.CATEGORY.replace(':productCategory', category.category)} >{category.category}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='col-7  '>
                        <nav class="navbar navbar-expand-lg ">
                            <div class="container-fluid">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold" >
                                    {categories.slice(0, 7).map((category) =>
                                        <li class="nav-item dropdown">
                                            <Link class="nav-link" style={{ whiteSpace: "nowrap" }} to={SCREEN_URL.CATEGORY.replace(':productCategory', category.category)}>
                                                {category.category}
                                            </Link>
                                        </li>)}
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div class="col-2 d-flex justify-content-center align-items-center" >
                        {isLogin
                            ?
                            <Dropdown className='user-dropdown'>
                                <Dropdown.Toggle>
                                    <a style={{ textDecoration: "none" }} href="#" className='d-flex align-item-center'>
                                        <FontAwesomeIcon className='fs-3 icon me-3' icon={faUser} style={{ color: "#ffffff", }} />
                                    </a>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Thông tin của tôi</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Giỏ hàng của tôi</Dropdown.Item>
                                    <Dropdown.Item onClick={LogOut}>Đăng xuất</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            // <a style={{ textDecoration: "none" }} href="#" className='d-flex align-item-center'>
                            //     <FontAwesomeIcon className='fs-3 icon me-3' icon={faUser} style={{ color: "#ffffff", }} />
                            // </a>
                            :
                            <Link to={SCREEN_URL.LOGIN}>
                                <FontAwesomeIcon className='fs-3 icon me-3' icon={faRightToBracket} style={{ color: "#fafafa", }} />
                            </Link>
                        }
                        <OffCanvas OffCanvas class="position-relative ms-4 " />
                    </div>
                </div>
            </Container>

        </header >

    )
}

export default Header
