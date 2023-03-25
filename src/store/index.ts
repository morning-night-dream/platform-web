const keyPrivateKey = 'privateKey';

export function getPrivateKey(): string {
    return localStorage.getItem(keyPrivateKey) ?? '';
}

export function savePrivateKey(privateKey: string) {
    localStorage.setItem(keyPrivateKey, privateKey);
}

export function clear() {
    localStorage.clear();
}
