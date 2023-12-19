export const SCREEN_URL = {

  // Path Customer
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DETAILS: '/details/:urlPath/:productId',
  CATEGORY: '/product-category/:productCategory',
  CART: '/cart',
  CHECKOUT: '/checkout',
  SEARCH: '/search/:productSearch',

  // Path Admin

  ADMIN_HOME: '/admin',
  ADMIN_LOGIN: '/admin/login',

  ADMIN_USERS: '/admin/users',
  ADMIN_CREATE_USER: '/admin/create-user',
  ADMIN_EDIT_USER: '/admin/users/:userId',

  ADMIN_PRODUCT: '/admin/product',
  ADMIN_CREATE_PRODUCT: '/admin/create-product',
  ADMIN_EDIT_PRODUCT: '/admin/product/:productId'
};
