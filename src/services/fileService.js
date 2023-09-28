
const path = require('path');
const uploadSingleFile = async (fileObject) => {
    // create link to save a image at /public/image/upload/
    // save => public/images/upload
    //remember to create the upload folder first
    let uploadPath = path.resolve(__dirname, "../public/images/upload");
    // console.log(">>> check fileObject: ", path.resolve(__dirname, "../public/images/upload"))

    // abc.png => abc-timestamp.png

    //get image extension
    let extName = path.extname(fileObject.name);

    //get image's name (without extension)
    let baseName = path.basename(fileObject.name, extName);

    //create final path: eg: /upload/your-image.png
    let finalName = `${baseName}-${Date.now()}${extName}`
    let finalPath = `${uploadPath}/${finalName}`;

    // console.log("final path: ", finalPath)

    try {
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: finalName,
            error: null
        }
    } catch (err) {
        console.log(">>> check error: ", err)
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        }
    }

}


const uploadMultipleFiles = async (filesArr) => {
    // create link to save a image at /public/image/upload/
    // save => public/images/upload
    //remember to create the upload folder first
    try {
        let uploadPath = path.resolve(__dirname, "../public/images/upload");
        // console.log(">>> check fileObject: ", path.resolve(__dirname, "../public/images/upload"))

        // abc.png => abc-timestamp.png
        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < filesArr.length; i++) {
            //get image extension
            let extName = path.extname(filesArr[i].name);

            //get image's name (without extension)
            let baseName = path.basename(filesArr[i].name, extName);

            //create final path: eg: /upload/your-image.png
            let finalName = `${baseName}-${Date.now()}${extName}`
            let finalPath = `${uploadPath}/${finalName}`;

            // console.log("final path: ", finalPath)

            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    name: filesArr[i].name,
                    err: null,
                    path: finalName
                })
                countSuccess++;
            } catch (err) {
                console.log(">>> check error: ", err)
                resultArr.push({
                    status: 'failed',
                    path: null,
                    name: filesArr[i].name,
                    error: JSON.stringify(err)
                })
            }

        }
        return {
            countSuccess,
            resultArr
        }
    } catch (error) {
        console.log('====>ERROR: ', error);
    }
}
module.exports = {
    uploadSingleFile, uploadMultipleFiles
}