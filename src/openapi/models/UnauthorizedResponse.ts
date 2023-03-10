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
 * @interface UnauthorizedResponse
 */
export interface UnauthorizedResponse {
    /**
     * コード
     * @type {string}
     * @memberof UnauthorizedResponse
     */
    code: string;
}

/**
 * Check if a given object implements the UnauthorizedResponse interface.
 */
export function instanceOfUnauthorizedResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "code" in value;

    return isInstance;
}

export function UnauthorizedResponseFromJSON(json: any): UnauthorizedResponse {
    return UnauthorizedResponseFromJSONTyped(json, false);
}

export function UnauthorizedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UnauthorizedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': json['code'],
    };
}

export function UnauthorizedResponseToJSON(value?: UnauthorizedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
    };
}

