import axios from "axios";
import {getCookie, setCookie} from 'cookies-next';
import {useRouter} from "next/navigation";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.withCredentials = true;
export const api = axios.create({
    baseURL,
    timeout: 25000,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const accessToken = getCookie('access');
    const csrfToken = getCookie('csrftoken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const router = useRouter()
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true;

            try {
                const refreshedResponse = await axios.post(`${baseURL}/auth/jwt/verify/`, {refresh: getCookie('refresh')}, {
                    withCredentials: false,
                    headers: {
                        Authorization: `Bearer ${getCookie('refresh')}`,
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                });
                router.push('/home')

                setCookie('access', refreshedResponse.data?.access);
                setCookie('refresh', refreshedResponse.data?.refresh);

                return api.request(originalRequest);
            } catch (err) {
                console.log('Ошибка обновления токена доступа', err);
            }
        }

        return Promise.reject(error);
    }
);

