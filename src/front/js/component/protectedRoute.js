import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/');
        } else {
            fetch('/api/verify-token', {
                headers: { Authorization: token },
            })
                .then(response => {
                    if (!response.ok) {
                        navigate('/');
                    }
                })
                .catch(() => navigate('/'));
        }
    }, [navigate]);

    return children;
}

export default ProtectedRoute;