import axios from 'axios';
import config from '../config'
import { push } from 'connected-react-router'

axios.defaults.baseURL = `http://${config.api_host}:${config.api_port}`

const setupAxiosInterceptors = (onUnauthenticated, store) => {
    const onRequestSuccess = config => {
        var token = localStorage.getItem('auth-token');
        if (token) {
            config.headers['Authorization'] = 'bearer '.concat(token);
        }
        config.timeout = 10000;
        return config;
    };
    const onResponseSuccess = (response) => response;
    const onResponseError = error => {
        if (error.response.status === 403 || error.response.status === 401) {
            onUnauthenticated(error.response.data.error);
        } else if (error.response.status === 404) {
            store.dispatch(push('/404'));
        } else if (error.response.status === 500) {
            store.dispatch(push('/500'));
        }
        return Promise.reject(error);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export {
    setupAxiosInterceptors
};
