import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginScreens from './screens/LoginScreens.jsx'
import Homescreens from './screens/Homescreens.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import PrivateRoute from './components/PrivateRoute.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import AdminPage from './screens/admin/AdminPage.jsx'
import AdminLogin from './screens/admin/AdminLogin.jsx'

import Adminadduser from './screens/admin/Adminadduser.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route index={true} path='/' element={<Homescreens/>}/>
    <Route  path='/login' element={<LoginScreens/>}/>
    <Route  path='/register' element={<RegisterScreen/>}/>
  
    <Route  path='' element={<PrivateRoute/>}>
    
    <Route  path='/profile' element={<ProfileScreen/>}/>
    </Route>

    
    <Route  path='/admin'element={<AdminPage/>}/>
    <Route  path='/admin_adduser'element={<Adminadduser/>}/>
    <Route  path='/adminlogin'element={<AdminLogin/>}/>
    </Route>
    
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
  </Provider>
  
)
