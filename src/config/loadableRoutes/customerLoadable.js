import loadable from '@loadable/component'

// Customer router
export const HomePage = loadable(() => import('../../pages/site-customer/pages/HomePage/HomePage'));
export const LoginPage = loadable(() => import('../../pages/site-customer/pages/LoginPage/LoginPage'));
export const RegisterPage = loadable(() => import('../../pages/site-customer/pages/RegisterPage/RegisterPage'));
export const DetailPage = loadable(() => import('../../pages/site-customer/pages/DetailPage/DetailPage'));
export const CategoriesPage = loadable(() => import('../../pages/site-customer/pages/CategoriesPage/CategoriesPage'));
export const CartPage = loadable(() => import('../../pages/site-customer/pages/CartPage/CartPage'));
export const CheckoutPage = loadable(() => import('../../pages/site-customer/pages/CheckoutPage/CheckoutPage'));
export const SearchPage = loadable(() => import('../../pages/site-customer/pages/SearchPage/SearchPage'));

export const ErrorPage = loadable(() => import('../../pages/site-customer/pages/ErrorPage/ErrorPage'));
