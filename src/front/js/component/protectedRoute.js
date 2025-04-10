import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/");
        } else {
            setIsAuthorized(true);
        }
    }, [navigate]);
    if (!isAuthorized) return null;
    return children;
}
export default ProtectedRoute;
