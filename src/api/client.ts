import Axios, { type AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({ baseURL: (import.meta.env.VITE_SERVICE_ENDPOINT as string) + '/api' });

export const customInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
        withCredentials: true,
    }).then(({ data }) => data)
    .catch((error) => {
        if (error.response.data) {
            throw error.response.data;
        }

        throw error;
    });

    // @ts-expect-error
    promise.cancel = () => {
        source.cancel('Query was cancelled');
    };

    return promise;
};
