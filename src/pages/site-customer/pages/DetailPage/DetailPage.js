import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductAPIByID, fetchProductsApi } from '../../../../api/fetchProductsAPI'
import DetailProduct from '../../components/molecules/DetailProduct/DetailProduct'
import { Accordion } from 'react-bootstrap'
import './style.css'
import Card from '../../components/molecules/Card/Card'

const DetailPage = () => {
    const { productId, urlPath } = useParams()

    // State
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])

    const fetchData = async () => {
        try {
            // current Product
            const fetchedProduct = await fetchProductAPIByID(productId);
            setProduct(fetchedProduct)

            // List Products
            const fetchedProducts = await fetchProductsApi();
            setProducts(fetchedProducts)

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [urlPath]);

    return (
        <main className='container content'>
            <div className='details-product row'>
                <DetailProduct product={product} />
            </div>
            <Accordion defaultActiveKey="0" className='description-product row my-4'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Description</Accordion.Header>
                    <Accordion.Body>
                        Indulge in the irresistible enchantment of our Halloween cookies. Each bite is a taste of spooky delight, meticulously crafted to capture the essence of the season. Whether it’s the whimsical charm of our pumpkin-shaped cookies, the haunting allure of our ghostly sugar cookies, or the playful design of our witch’s hat treats, our cookies are a delicious addition to any Halloween celebration. Made with love and a dash of magic, they’re perfect for parties, gifting, or simply savoring as you immerse yourself in the festive spirit of Halloween
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Reviews</Accordion.Header>
                    <Accordion.Body>
                        <h3 className='p-3'>There are no reviews yet.</h3>
                    </Accordion.Body>
                    <Accordion.Body>
                        <div className='form-review border p-4'>
                            <h4>Be the first to review “Ghostly Gingersnaps”</h4>
                            <p>Your email address will not be published. Required fields are marked *</p>
                            <div>
                                <h4>Your review *</h4>
                                <textarea placeholder='...'></textarea>
                            </div>
                            <div className='reviewer'>
                                <div className='review-name'>
                                    <h5>Name *</h5>
                                    <input type='input'></input>
                                </div>
                                <div className='review-email'>
                                    <h5>Email *</h5>
                                    <input type='input'></input>
                                </div>
                            </div>
                            <div className='my-2'>
                                <input type='checkbox' className='me-2 ' />
                                <label> Save my name, email, and website in this browser for the next time I comment.</label>
                            </div>
                            <input type='submit' value={'Submit'} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='related-products row'>
                <h2>Related products</h2>
                <div className='products' onClick={window.scrollTo(0, 0)}>
                    {products
                        .filter(realated => realated.category === product.category)
                        .slice(0, 4)
                        .map(product => (
                            <Card key={product.id} product={product} />
                        ))}
                </div>
            </div>
        </main >
    )
}

export default DetailPage
