/* tslint:disable */
/* eslint-disable */
/**
 * Morning Night Dream - AppGateway
 * This is the AppGateway API documentation.
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: morning.night.dream@example.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  UnauthorizedResponse,
  V1AuthSignInRequest,
  V1AuthSignUpRequest,
} from '../models';
import {
    UnauthorizedResponseFromJSON,
    UnauthorizedResponseToJSON,
    V1AuthSignInRequestFromJSON,
    V1AuthSignInRequestToJSON,
    V1AuthSignUpRequestFromJSON,
    V1AuthSignUpRequestToJSON,
} from '../models';

export interface V1AuthRefreshRequest {
    code: string;
}

export interface V1AuthSignInOperationRequest {
    v1AuthSignInRequest: V1AuthSignInRequest;
}

export interface V1AuthSignUpOperationRequest {
    v1AuthSignUpRequest: V1AuthSignUpRequest;
}

export interface V1SignRequest {
    code: string;
}

/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     * リフレッシュ
     * リフレッシュ
     */
    async v1AuthRefreshRaw(requestParameters: V1AuthRefreshRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.code === null || requestParameters.code === undefined) {
            throw new runtime.RequiredError('code','Required parameter requestParameters.code was null or undefined when calling v1AuthRefresh.');
        }

        const queryParameters: any = {};

        if (requestParameters.code !== undefined) {
            queryParameters['code'] = requestParameters.code;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/auth/refresh`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * リフレッシュ
     * リフレッシュ
     */
    async v1AuthRefresh(requestParameters: V1AuthRefreshRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.v1AuthRefreshRaw(requestParameters, initOverrides);
    }

    /**
     * サインイン
     * サインイン
     */
    async v1AuthSignInRaw(requestParameters: V1AuthSignInOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.v1AuthSignInRequest === null || requestParameters.v1AuthSignInRequest === undefined) {
            throw new runtime.RequiredError('v1AuthSignInRequest','Required parameter requestParameters.v1AuthSignInRequest was null or undefined when calling v1AuthSignIn.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/auth/signin`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: V1AuthSignInRequestToJSON(requestParameters.v1AuthSignInRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * サインイン
     * サインイン
     */
    async v1AuthSignIn(requestParameters: V1AuthSignInOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.v1AuthSignInRaw(requestParameters, initOverrides);
    }

    /**
     * サインアウト
     * サインアウト
     */
    async v1AuthSignOutRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/auth/signout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * サインアウト
     * サインアウト
     */
    async v1AuthSignOut(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.v1AuthSignOutRaw(initOverrides);
    }

    /**
     * サインアップ
     * サインアップ
     */
    async v1AuthSignUpRaw(requestParameters: V1AuthSignUpOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.v1AuthSignUpRequest === null || requestParameters.v1AuthSignUpRequest === undefined) {
            throw new runtime.RequiredError('v1AuthSignUpRequest','Required parameter requestParameters.v1AuthSignUpRequest was null or undefined when calling v1AuthSignUp.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/auth/signup`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: V1AuthSignUpRequestToJSON(requestParameters.v1AuthSignUpRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * サインアップ
     * サインアップ
     */
    async v1AuthSignUp(requestParameters: V1AuthSignUpOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.v1AuthSignUpRaw(requestParameters, initOverrides);
    }

    /**
     * 検証
     * 検証
     */
    async v1AuthVerifyRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/auth/verify`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 検証
     * 検証
     */
    async v1AuthVerify(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.v1AuthVerifyRaw(initOverrides);
    }

    /**
     * 署名検証
     * 署名検証
     */
    async v1SignRaw(requestParameters: V1SignRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.code === null || requestParameters.code === undefined) {
            throw new runtime.RequiredError('code','Required parameter requestParameters.code was null or undefined when calling v1Sign.');
        }

        const queryParameters: any = {};

        if (requestParameters.code !== undefined) {
            queryParameters['code'] = requestParameters.code;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/sign`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 署名検証
     * 署名検証
     */
    async v1Sign(requestParameters: V1SignRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.v1SignRaw(requestParameters, initOverrides);
    }

}
