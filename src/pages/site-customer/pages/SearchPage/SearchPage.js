import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductAPIByID, fetchProductsApi } from '../../../../api/fetchProductsAPI'
import DetailProduct from '../../components/molecules/DetailProduct/DetailProduct'
import { Accordion } from 'react-bootstrap'
import './style.css'
import Card from '../../components/molecules/Card/Card'
import { fetchCategoriesApi } from '../../../../api/fetchCategoryAPI'
import { SCREEN_URL } from '../../../../constants/screen/PathScreen'

const SearchPage = () => {
    const params = useParams('')
    // State
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);


    const fetchData = async () => {
        try {
            const fetchedCategories = await fetchCategoriesApi();
            setCategories(fetchedCategories)


            const fetchedProducts = await fetchProductsApi();
            const searchProducts = fetchedProducts.filter(product => {
                return product.name.toUpperCase().includes(params.productSearch.toUpperCase())
            })
            setProducts(searchProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [params.productSearch]);
    return (
        <main className='container'>
            <div className=' row mt-2'>
                <div className='col-3 navigate '>
                    <div className='nav-item'>
                        <h3 className='my-4'>Categories</h3>
                        <div className='list-categories p-4'>
                            {categories.map(category => <div className='item'>
                                <Link class="nav-link" style={{ whiteSpace: "nowrap" }} to={SCREEN_URL.CATEGORY.replace(':productCategory', category.category)}>
                                    {category.category}
                                </Link>
                            </div>)}
                        </div>
                    </div>
                </div>
                <div className='col-9 category'>
                    <h1 className='name-category'>{params.productSearch}</h1>
                    <div className='category-products'>
                        <div className='sort-product'>
                            <p>Showing all {products.length} results</p>
                            <select id="productsSelect" name="products">
                                <option value="Default Sorting">Default Sorting</option>
                                <option value="Sort by Price: low to high ">Sort by Price: low to high </option>
                                <option value="Sort by Price: high to low ">Sort by Price: high to low </option>
                            </select>
                        </div>
                        <div className='card-list'>
                            {products.map(product => (
                                <Card key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default SearchPage
