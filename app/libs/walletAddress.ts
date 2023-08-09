const { createHash } = require('crypto');

export const generateWalletAddress = (userId: string) => {
    const hash = createHash('sha256');
    hash.update(userId);
    const hashHex = hash.digest('hex');
    const walletAddress = `0x${hashHex.slice(0, 40)}`;
    console.log(walletAddress)
    return walletAddress;
};