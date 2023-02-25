import { ArticleApi } from '../openapi/apis/ArticleApi';
import { AuthApi } from '../openapi/apis/AuthApi';
import { Configuration } from '../openapi';

export const articleApiClient = new ArticleApi(
    new Configuration({
        basePath: (import.meta.env.VITE_SERVICE_ENDPOINT as string) + '/api',
        headers: {
            'Content-Type': 'application/json',
        },
    })
);

export const authApiClient = new AuthApi(
    new Configuration({
        basePath: (import.meta.env.VITE_SERVICE_ENDPOINT as string) + '/api',
        headers: {
            'Content-Type': 'application/json',
        },
    })
);
