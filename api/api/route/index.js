const router = require("koa-router")({
    prefix: "/image"
});

const controller = require("../controller");

module.exports = app => {
    router.post("/process", controller.processImage);

    app.use(router.routes(), router.allowedMethods());
};
