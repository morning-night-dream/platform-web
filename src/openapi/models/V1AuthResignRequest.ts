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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface V1AuthResignRequest
 */
export interface V1AuthResignRequest {
    /**
     * パスワード
     * @type {string}
     * @memberof V1AuthResignRequest
     */
    password: string;
}

/**
 * Check if a given object implements the V1AuthResignRequest interface.
 */
export function instanceOfV1AuthResignRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function V1AuthResignRequestFromJSON(json: any): V1AuthResignRequest {
    return V1AuthResignRequestFromJSONTyped(json, false);
}

export function V1AuthResignRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1AuthResignRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'password': json['password'],
    };
}

export function V1AuthResignRequestToJSON(value?: V1AuthResignRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'password': value.password,
    };
}
