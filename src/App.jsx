
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import "./components/charts/chartRegister";
import './App.css'
import AuthTabs from './pages/AuthTabs'
import { FRONTEND_ROUTES } from './constants/frontend_urls'
import Products from './pages/Products'
import AdminDashboard from './pages/AdminDashboard'
import UserOrderHistory from './pages/UserOrderHistory'
import UserOrderHistoryDetails from './pages/UserOrderHistoryDetails'
import { AdminExecutableOrders } from "./pages/AdminExecutableOrders";
import Profile from './pages/Profile'
import ProductDetail from './pages/ProductDetail'
import Navbar from './components/others/NavBar'
import UserCart from './pages/UserCart'
import { Home } from './pages/Home'
import ProductManagement from './pages/AdminProductManagement/ProductManagement'
import NotificationsPage from './pages/NotificationsPage'

const routeComponent = [
  { route: '/', component: <Home/> },
  { route: FRONTEND_ROUTES.login, component: <AuthTabs/>},
  { route: FRONTEND_ROUTES.products, component: <Products/>},
  { route: FRONTEND_ROUTES.productDetail, component: <ProductDetail/>},
  { route: FRONTEND_ROUTES.profile, component: <Profile/>},

  { route: FRONTEND_ROUTES.notificationDetail, component: <NotificationsPage/> },
  { route: FRONTEND_ROUTES.user_order_history, component: <UserOrderHistory/>},
  { route: 'user/order/history' + '/:orderId', component: <UserOrderHistoryDetails/>},
  { route: FRONTEND_ROUTES.user_cart, component: <UserCart/>},

  { route: FRONTEND_ROUTES.admin_dashboard, component: <AdminDashboard/>},
  { route: FRONTEND_ROUTES.admin_exeuctableOrders, component: <AdminExecutableOrders/>},
  { route: FRONTEND_ROUTES.admin_products, component: <ProductManagement/>}

]


function App() {
  return (<div className='bg-black text-white h-screen'>
      <div className=' mx-4'>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            {routeComponent.map(rc => (<Route path={rc.route} element={rc.component}/>))}
          </Routes>
        </BrowserRouter>
        
      </div>
    </div>
  )
  
}

export default App
