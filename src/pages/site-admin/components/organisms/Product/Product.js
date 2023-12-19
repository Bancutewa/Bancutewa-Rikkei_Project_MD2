import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SCREEN_URL } from '../../../../../constants/screen/PathScreen'

const Product = (props) => {
    const { i, data, deleteProduct } = props
    const { id, name, img, category, price, quantity, sale } = data
    return (

        <tr>
            <th>{i + 1}</th>
            <th>{id}</th>
            <th>
                <Link to={`${SCREEN_URL.ADMIN_PRODUCT}/${id}`}>{name}</Link>
            </th>
            <th>
                <img src={img} style={{ width: "100px", objectFit: "contain" }} />
            </th>
            <th>{category}</th>
            <th>{price}</th>
            <th>{quantity}</th>
            <th >
                <Button variant="primary" onClick={() => deleteProduct(id)}>Xoá sản phẩm này</Button>{' '}
            </th>
        </tr>

    )
}

export default Product
