import type { V1AuthSignInRequest} from '../openapi/apis/AuthApi';
import { authApiClient } from './client';

export function useSignIn() {
    const key = `/api/v1/auth`;

    const request :V1AuthSignInRequest  = {
        v1AuthSignUpRequest : {
            email: "m9185627147@dea-21olympic.com",
            password: "password"
        }
    }

    const fetcher = async () => client.v1ListArticles(request);
    const { data } = useSWR(key, fetcher);

}