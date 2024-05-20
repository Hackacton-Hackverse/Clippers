import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://pipo-app.kesug.com',
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

export const verifytoken = ({setIsAuthenticated, fetchConversations, navigate},redirectUrl) => {
    const token = localStorage.getItem('token');
    if (token) {
        console.log(token)
        axiosInstance.get('/token/verify')
            .then(response => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    fetchConversations();
                    navigate(redirectUrl, { replace: true });
                    console.log('validate token')
                }else {
                    console.log('errorrrrr',response)
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                    // Supprimer le token invalide du localStorage
                }
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        setIsAuthenticated(false);
    }
}

export default axiosInstance;