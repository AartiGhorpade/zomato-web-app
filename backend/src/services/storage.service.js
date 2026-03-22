const ImageKit = require("imagekit");
require("dotenv").config();

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function fileUpload(buffer, fileName) {
  const response = await client.upload({
    file: buffer,
    fileName: fileName,
  });

  return response;
}

module.exports = { fileUpload };
