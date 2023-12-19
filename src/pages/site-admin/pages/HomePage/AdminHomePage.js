import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SCREEN_URL } from '../../../../constants/screen/PathScreen';

const AdminHomePage = () => {
    const navigate = useNavigate()
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    useEffect(() => {
        if (!current_user && current_user.role != "admin") navigate(SCREEN_URL.ADMIN_LOGIN);
    }, []);

    return (
        <div>
            <p>Day la AdminHomePage</p>
        </div>
    )
}

export default AdminHomePage
