import { useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getCurrentUser();
        
    }, []);

    useEffect(() => {
        
        if (store.auth == false) {
            navigate('/');
        } 
    }, [store.auth]);

    return children;
}

export default ProtectedRoute;