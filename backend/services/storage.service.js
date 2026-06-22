const imagekit=require("imagekit");
const dotenv=require('dotenv')
dotenv.config()
const imagekitInstance = new imagekit({
    publicKey: process.env.Imagekit_PUBLIC_KEY,
    privateKey: process.env.Imagekit_PRIVATE_KEY,
    urlEndpoint: process.env.Imagekit_URL_ENDPOINT
});

async function uploadfile(file, fileName) {
    try {
        const response = await imagekitInstance.upload({
            file: file,
            fileName: fileName
        });  
        return response;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }} 
module.exports={uploadfile}