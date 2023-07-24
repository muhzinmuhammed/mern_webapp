import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';



const AdminPrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to='/adminlogin' replace />;
}

export default AdminPrivateRoute