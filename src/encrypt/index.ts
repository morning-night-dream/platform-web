type Key = {
    publicKeyStr: string;
    publicKey: CryptoKey;
    privateKeyStr: string;
    privateKey: CryptoKey;
};

function arrayBufferToBinaryString(arrayBuffer: ArrayBuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer) as unknown as number[]);
}

export async function generateKey(): Promise<Key> {
    const ec = {
        name: 'RSA-PSS',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: 'SHA-256',
    };

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
