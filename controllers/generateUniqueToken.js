const crypto = require("crypto");

const generateUniqueToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const token = buffer.toString("hex");
        resolve(token);
      }
    });
  });
};

module.exports = generateUniqueToken;
