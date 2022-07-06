const Jimp = require("jimp");

const processType = {
    flip: "flip"
};

async function process(type, url) {
    const originalImage = await Jimp.read(url);
    let processedImage;

    switch (type) {
        case processType.flip:
            processedImage = await originalImage.flip(true, true).getBufferAsync(Jimp.MIME_JPEG);
            break;
        default:
            processedImage = await originalImage.getBufferAsync(Jimp.MIME_JPEG);
            break;
    }

    return processedImage;
}

module.exports = {
    type: processType,
    process: process
};