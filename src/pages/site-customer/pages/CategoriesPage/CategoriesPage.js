import React from 'react'
import './style.css'
import { useState } from 'react';
import { fetchProductsAPIByCategory } from '../../../../api/fetchProductsAPI';
import { useEffect } from 'react';
import { fetchCategoriesApi } from '../../../../api/fetchCategoryAPI';
import Card from '../../components/molecules/Card/Card';
import { Link, useParams } from 'react-router-dom';
import { SCREEN_URL } from '../../../../constants/screen/PathScreen';

const CategoriesPage = () => {
    // Params
    const { productCategory } = useParams()



    // State
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        try {
            const fetchedCategories = await fetchCategoriesApi();
            setCategories(fetchedCategories)



            // Koi tao productByCategory
            const fetchedProducts = await fetchProductsAPIByCategory(productCategory);
            setProducts(fetchedProducts);
            console.log(products);



        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [productCategory]);


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
                    <h1 className='name-category'>{productCategory}</h1>
                    <p className='introduce-category'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris turpis velit, iaculis vel risus non, convallis rhoncus ligula.
                        Vestibulum ut lorem posuere, malesuada neque et, placerat quam. In hac habitasse platea dictumst. Sed bibendum porttitor sem,
                        at sollicitudin orci placerat nec.
                    </p>
                    <div className='category-products'>
                        <div className='sort-product'>
                            <p>Showing all 5 results</p>
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

export default CategoriesPage
