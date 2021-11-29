require("dotenv").config();
const fs = require("fs");
const Minio = require("minio");

const minioClient = new Minio.Client({
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY,
    endPoint: process.env.HOST,
    pathStyle: true,
});

const bucketName = "second-bucket";
(async () => {
    // read object in chunks and store it as a file
    const fileStream = fs.createWriteStream("./read-in-chunks.txt");
    const fileObjectKey = "file-object.txt";

    const object = await minioClient.getObject(bucketName, fileObjectKey);
    object.on("data", (chunk) => fileStream.write(chunk));

    object.on("end", () => console.log(`Reading ${fileObjectKey} finished`));
})();
