import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'
import { SCREEN_URL } from '../../../../../constants/screen/PathScreen'
const Card = (props) => {
    const { product } = props
    return (
        <div class="col" key={product.id}>
            <div class="p-3">
                <div class="card"  >
                    <NavLink to={SCREEN_URL.DETAILS.replace(':urlPath', product.name).replace(':productId', product.id)}>
                        <img src={product.img} class="img-product card-img-top" alt="..." />
                    </NavLink>
                    <div class="card-body">

                        <Link to={SCREEN_URL.DETAILS.replace(':urlPath', product.name).replace(':productId', product.id)}>
                            <p class="text-start  fw-semibold" >{product.name}</p>
                        </Link>
                        <div class="row">
                            <div class="col d-flex ">
                                <div class="icon d-flex justify-content-start mb-3">
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14", }} />
                                </div>
                            </div>
                        </div>
                        <p><b>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
