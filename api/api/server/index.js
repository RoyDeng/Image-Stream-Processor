const logger = require("../util/logger");

const Koa = require("koa");
const router = require("../route");
const middleware = require("../middleware");
const config = require("../config");

const app = new Koa();

middleware(app);
router(app);

const server = app.listen(config.server.port, () => {
    logger.info(`Server is listening port on: ${config.server.port}`);
});

module.exports = {
    server
};