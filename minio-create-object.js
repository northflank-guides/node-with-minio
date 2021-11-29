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
    // create object with string data
    const objectName = "file.txt";
    const result = await minioClient
        .putObject(bucketName, objectName, "Hello There!")
        .catch((e) => {
            console.log("Error while creating object: ", e);
            throw e;
        });

    console.log("Object uploaded successfully: ", result);

    // create object from file data
    const objectFileName = "file-object.txt";
    const fileData = fs.readFileSync("./file.txt");
    const submitFileDataResult = await minioClient
        .putObject(bucketName, objectFileName, fileData)
        .catch((e) => {
            console.log("Error while creating object from file data: ", e);
            throw e;
        });

    console.log("File data submitted successfully: ", submitFileDataResult);
})();
