import React, { useEffect, useState } from 'react'
import { fetchUsersApi } from '../../../../../api/usersAPI';
import { Table } from 'react-bootstrap';

const UsersAdminPage = () => {
    const [users, setUsers] = useState([]);
    const fetchData = async () => {
        try {
            const fetchedProducts = await fetchUsersApi();
            setUsers(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Table striped bordered hover style={{ width: "1200px" }}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, i) => (
                    <tr>
                        <th>{i + 1}</th>
                        <th>{user.id}</th>
                        <th>
                            {/* <Link to={`${SCREEN_URL.ADMIN_PRODUCT}/${id}`}>{name}</Link> */}
                            {user.username}
                        </th>
                        <th>{user.email}</th>
                        <th>{user.password}</th>
                        <th>{user.role}</th>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default UsersAdminPage
