export const PHARMACY_BACKEND = import.meta.env.VITE_PHARMACY_BACKEND || 'http://localhost:3000'
export const RAZROPAY_BACKEND = import.meta.env.VITE_RAZORPAY_BACKEND || 'http://localhost:5222'

export const ENDPOINTS = {
    auth: {
        admin: {
            signup: PHARMACY_BACKEND + '/api/v1' + '/auth/signup',
            login: PHARMACY_BACKEND + '/api/v1' + '/auth/login',
            forgotPassoword: PHARMACY_BACKEND + '/api/v1' + '/auth/forgot-password',
            resetPassoword: PHARMACY_BACKEND + '/api/v1' + '/auth/reset-password/', // :token needed
        },
        user: {
            signup: PHARMACY_BACKEND + '/api/v1' + '/auth/signup',
            login: PHARMACY_BACKEND + '/api/v1' + '/auth/login',
            forgotPassoword: PHARMACY_BACKEND + '/api/v1' + '/auth/forgot-password',
            resetPassoword: PHARMACY_BACKEND + '/api/v1' + '/auth/reset-password/', // :token needed
        }
    },

    product: {
        user: {
            getAllProducts: PHARMACY_BACKEND + '/api/v1' + '/users',
            getSingleProdcut: PHARMACY_BACKEND + '/api/v1' + '/users/single',
            getProductById: PHARMACY_BACKEND + '/api/v1' + '/products', // :productId
            subscribeProduct: PHARMACY_BACKEND + '/api/v1' + '/users/product/subscribe',
            unSubscribeProduct: PHARMACY_BACKEND + '/api/v1' + '/users/product/unsubscribe'
        },
        admin: {
            getAllProducts: PHARMACY_BACKEND + '/api/v1' + '/admin',
            createSingleProduct: PHARMACY_BACKEND + '/api/v1' + '/admin',
            createManyProducts: PHARMACY_BACKEND + '/api/v1' + '/admin/many',
            updateProduct: PHARMACY_BACKEND + '/api/v1' + '/admin', // :productId needed
            deleteProduct: PHARMACY_BACKEND + '/api/v1' + '/admin', // :productId needed
        }
    },

    order: {
        admin: {
            updateOrderStatus: PHARMACY_BACKEND + '/api/v1' + '/admin/order/status', // :orderId needed
            fetchExecutableOrders: PHARMACY_BACKEND + '/api/v1' + '/admin/orders'
        },
        user: {
            createOrder: PHARMACY_BACKEND + '/api/v1' + '/users/order',
            getOrderHistory: PHARMACY_BACKEND + '/api/v1' + '/users/order/history',
            sendOrderAmount: RAZROPAY_BACKEND + '/rezorpay/sent'
        }

    },


}