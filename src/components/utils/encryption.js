import CryptoJS from 'crypto-js';

const secretKey = 'yourSecretKey';

export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
};

export const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
