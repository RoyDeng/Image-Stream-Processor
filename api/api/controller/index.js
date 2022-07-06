const logger = require("../util/logger");
const image = require("../util/image");

module.exports = {
    processImage: async (ctx, next) => {
        try {
            const { type, url } = ctx.request.body;
            const body = await image.process(type, url);

            ctx.type = "jpg";
            ctx.length = Buffer.byteLength(body);
            ctx.status = 200;
            ctx.body = body;
        } catch (error) {
            logger.error(`An error occurred when processing image: ${error}`);
            ctx.status = 500;
            ctx.body = `An error occurred when processing image: ${error}`;
        }
    }
};