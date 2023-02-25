type Key = {
    publicKey: string;
    privateKey: string;
};

function arrayBufferToBinaryString(arrayBuffer: ArrayBuffer) {
    let binaryString = '';
    const bytes = new Uint8Array(arrayBuffer);
    const length = bytes.byteLength;
    for (let i = 0; i < length; i++) {
        binaryString += String.fromCodePoint(bytes[i]);
    }

    return binaryString;
}

export async function generateKey(): Promise<Key> {
    const ec = {
        name: 'RSA-PSS',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: 'SHA-256',
    };

    const keys = await crypto.subtle.generateKey(ec, true, ['sign', 'verify']);

    const format = 'pkcs8';
    const publicKey = await crypto.subtle.exportKey(format, keys.privateKey).then((result) => {
        return arrayBufferToBinaryString(result);
    });
    const privateKey = await crypto.subtle.exportKey(format, keys.privateKey).then((result) => {
        return arrayBufferToBinaryString(result);
    });

    return {
        publicKey,
        privateKey,
    };
}
