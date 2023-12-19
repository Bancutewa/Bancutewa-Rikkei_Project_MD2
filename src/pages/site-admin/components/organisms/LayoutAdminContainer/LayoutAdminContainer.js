import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';
import { SCREEN_URL } from '../../../../../constants/screen/PathScreen';

const LayoutAdminContainer = ({ component: Component, isHeader, isSidebar, title }) => {

    const navigate = useNavigate()
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    document.title = title;


    useEffect(() => {
        if (!current_user) navigate(SCREEN_URL.ADMIN_LOGIN);
    }, []);

    return (
        <>
            {isHeader && <HeaderAdmin />}
            {isSidebar && (
                <div className='row'>
                    <div className='col-2 bg-dark min-height-100vh'>
                        < SidebarAdmin />
                    </div>
                    <div className='col-10 d-flex justify-content-center mt-3'>
                        <Component />
                    </div>
                </div>
            )}
            {!isSidebar && !isHeader && <Component />}
        </>
    );

};

export default LayoutAdminContainer;
