import { ArticleApi } from '../openapi';
import { AuthApi } from '../openapi';
import { Configuration } from '../openapi';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const articleApiClient = new ArticleApi(
    new Configuration({
        basePath: (import.meta.env.VITE_SERVICE_ENDPOINT as string) + '/api',
    })
);

export const authApiClient = new AuthApi(
    new Configuration({
        basePath: (import.meta.env.VITE_SERVICE_ENDPOINT as string) + '/api',
    })
);
