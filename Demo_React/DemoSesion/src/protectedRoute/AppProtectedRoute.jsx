import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login';
import { useAuth } from './useAuth';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';


export default function AppProtectedRoute(){
    const {user,loading, checkAuth} = useAuth();

    const logut =async() =>{
        await fetch ("http://localhost:3000/logout",{
            method:"POST",
            credentials:"include"
        });
        checkAuth();
    };
    return(
        <BrowserRouter>
            < Routes>
                {/**Publica */}
                <Route
                path="/login"
                element={<Login onLogin={checkAuth}/>}
                />
                 {/**Protegidos */} 
                 <Route
                 path="/dasboard"
                 element={
                    <ProtectedRoute user={user} loading={loading}>
                        <Dashboard uuser={user} onLogout={logut}/>
                    </ProtectedRoute>
                 }
                /> 
                {/**Default */}
                <Route
                path='*'
                element={<Login onLogin={checkAuth}/>}
                /> 
            </Routes>
        </BrowserRouter>
    )
}