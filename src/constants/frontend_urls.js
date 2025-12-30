export const FRONTEND_ROUTES =  {
    // common
    login: '/auth',
    
    // user
    profile: '/profile',
    user_order_history: 'user/order/history', //:orderId
    products: '/products',
    productDetail: '/products/:productId',
    user_cart: 'user/cart',

    // admin
    admin_dashboard: 'admin/dashboard',
    admin_exeuctableOrders: 'admin/executableOrders',
}