type Key = {
    publicKeyStr: string;
    publicKey: CryptoKey;
    privateKeyStr: string;
    privateKey: CryptoKey;
};

function arrayBufferToBinaryString(arrayBuffer: ArrayBuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer) as unknown as number[]);
}

function stringToArrayBuffer(src : string) : ArrayBuffer {
    const buf = new ArrayBuffer(src.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = src.length; i < strLen; i++) {
      bufView[i] = src.charCodeAt(i);
    }
    return buf;
}

const EC = {
    name: 'RSA-PSS',
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: 'SHA-256',
};

export async function generateKey(): Promise<Key> {
    const keys = await crypto.subtle.generateKey(EC, true, ['sign', 'verify']);

    const publicKeyString = await crypto.subtle.exportKey('spki', keys.publicKey).then((result) => {
        return arrayBufferToBinaryString(result);
    });
    const privateKeyString = await crypto.subtle.exportKey('pkcs8', keys.privateKey).then((result) => {
        return arrayBufferToBinaryString(result);
    });

    return {
        publicKey: keys.publicKey,
        publicKeyStr: publicKeyString,
        privateKey: keys.privateKey,
        privateKeyStr: privateKeyString,
    };
}

export async function sign(privateKey : CryptoKey, code : string) : Promise<ArrayBuffer> {
    return crypto.subtle.sign(
        {
            name: 'RSA-PSS',
            saltLength: 32,
        },
        privateKey,
        new TextEncoder().encode(code),
    );
}

export async function importPrivateKey(privateKey : string) : Promise<CryptoKey> {
    return crypto.subtle.importKey(
        'pkcs8',
        stringToArrayBuffer(privateKey),
        EC,
        true,
        ['sign']
    );
}