import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
    const location = useLocation();

    if (!isAuthenticated) {
        // Passer l'URL actuelle comme paramètre de recherche à la route de connexion
        return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
    }


    return children;
};
export default ProtectedRoute;