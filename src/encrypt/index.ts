type Key = {
    publicKey: string;
    privateKey: string;
};

function arrayBufferToBinaryString(arrayBuffer: ArrayBuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer) as unknown as number[]);
}

export function binaryStringToArrayBuffer(string: string) {
    const buf = new ArrayBuffer(string.length * 2); // 2 bytes for each char
    const bufView = new Uint8Array(buf);
    for (let i = 0, stringLength = string.length; i < stringLength; i++) {
        bufView[i] = string.charCodeAt(i);
    }

    return buf;
}

export async function generateKey(): Promise<Key> {
    const ec = {
        name: 'RSA-PSS',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: 'SHA-256',
    };

    const keys = await crypto.subtle.generateKey(ec, true, ['sign', 'verify']);

    const publicKey = await crypto.subtle.exportKey('spki', keys.publicKey).then((result) => {
        return arrayBufferToBinaryString(result);
    });
    const privateKey = await crypto.subtle.exportKey('pkcs8', keys.privateKey).then((result) => {
        return arrayBufferToBinaryString(result);
    });

    return {
        publicKey,
        privateKey,
    };
}
