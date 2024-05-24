import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const verifytoken = ({setIsAuthenticated,  navigate},redirectUrl) => {
    const token = localStorage.getItem('token');
    if (token) {
        axiosInstance.get('/token/verify')
            .then(response => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    navigate(redirectUrl, { replace: true });
                }else {
                    console.log('errorrrrr',response)
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                    // Supprimer le token invalide du localStorage
                }
            })
            .catch(error => {
                console.error(error);
                localStorage.removeItem('token');
            });
    } else {
        setIsAuthenticated(false);
    }
}

export default axiosInstance;
