type Key = {
    publicKeyStr: string;
    publicKey: CryptoKey;
    privateKeyStr: string;
    privateKey: CryptoKey;
};

function arrayBufferToBinaryString(arrayBuffer: ArrayBuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer) as unknown as number[]);
}

function stringToArrayBuffer(src: string): ArrayBuffer {
    const buf = new ArrayBuffer(src.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, stringLength = src.length; i < stringLength; i++) {
        const point = src.codePointAt(i);
        if (!point) {
            continue;
        }

        bufView[i] = point;
    }

    return buf;
}

const ec = {
    name: 'RSA-PSS',
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: 'SHA-256',
};

export async function generateKey(): Promise<Key> {
    const keys = await crypto.subtle.generateKey(ec, true, ['sign', 'verify']);

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

export async function sign(code: string, privateKeyString: string) {
    const privateKey = await importPrivateKey(privateKeyString);
    const signedCode = await signWithCryptoKey(privateKey, code);
    return btoa(String.fromCodePoint(...new Uint8Array(signedCode)));
}

async function signWithCryptoKey(privateKey: CryptoKey, code: string): Promise<ArrayBuffer> {
    return crypto.subtle.sign(
        {
            name: 'RSA-PSS',
            saltLength: 32,
        },
        privateKey,
        new TextEncoder().encode(code)
    );
}

async function importPrivateKey(privateKey: string): Promise<CryptoKey> {
    return crypto.subtle.importKey('pkcs8', stringToArrayBuffer(privateKey), ec, true, ['sign']);
}
