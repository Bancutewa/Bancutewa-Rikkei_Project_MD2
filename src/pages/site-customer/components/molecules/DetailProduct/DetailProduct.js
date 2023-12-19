import React, { useState } from 'react'
import QuantityPicker from '../../../../../components/quantity/quantity'
import './style.css'
import { checkUserLocal, getUser } from '../../../../../service/LocalStorageService';
import { useNavigate, useParams } from 'react-router-dom';
import { SCREEN_URL } from '../../../../../constants/screen/PathScreen';
import { UpdateCartUserAPI, fetchCartUserApiByUserName } from '../../../../../api/cartAPI';
import { fetchProductAPIByID } from '../../../../../api/fetchProductsAPI';



const DetailProduct = (props) => {
    const { id, name, img, category, price, quantity, sale } = props.product;

    // State
    const [quantityBuy, setQuantityBuy] = useState(0);
    const handleQuanityChange = (value) => {
        setQuantityBuy(value);
    };
    const { urlPath, productId } = useParams()
    console.log(urlPath);
    const navigate = useNavigate()


    const addToCart = async () => {
        const currentUser = getUser() // Get User From LocalStorage
        const currentProduct = await fetchProductAPIByID(productId)
        const cartUser = await fetchCartUserApiByUserName(currentUser)
        if (currentUser) {
            if (quantityBuy > 0) {
                const existingProduct = cartUser[0].products.findIndex(item => item.id == productId); // Tìm trong cart có Sản Phẩm này khôngD
                if (existingProduct != -1) {
                    cartUser[0].products[existingProduct].quantity += quantityBuy
                } else {
                    currentProduct.quantity = quantityBuy
                    cartUser[0].products.push(currentProduct)
                }
                UpdateCartUserAPI(cartUser[0])
                alert(`Đã thêm thành công ${quantityBuy} sản phẩm`)
                // UpdateCartUserAPI(cartUser[0])
                // console.log(cartUser[0]);
            } else {
                alert("Vui lòng chọn số lương muốn mua")
            }
        } else {
            navigate(SCREEN_URL.LOGIN)
        }
    }

    return (
        <div className="detail-product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-information">
                <div className="product-name">
                    <h2>{name}</h2>
                </div>
                <div className="more-infor">
                    <span>Category</span>
                    <span className="categoryy">{category}</span>
                </div>
                <div className="more-infor">
                    <span>Giá</span>
                    <span>{parseInt(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
                <div className="more-infor">
                    <span>Tình trạng:</span>
                    <span>{parseInt(quantity) ? `Còn hàng (${quantity} sản phẩm)` : "Hết hàng"}</span>
                </div>
                <div className="more-infor">
                    <span>Sale</span>
                    <span>{sale ? "Sale" : "Không sale"}</span>
                </div>
                {parseInt(quantity) ?
                    <div className="add-to-cart">
                        <QuantityPicker value={quantityBuy} onQuantityChange={handleQuanityChange} />
                        <button className="add" onClick={addToCart}>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                    :
                    <p>Hết hàng rồi, bữa khác mua nha quý khách</p>
                }

            </div>
        </div>
    )
}

export default DetailProduct
