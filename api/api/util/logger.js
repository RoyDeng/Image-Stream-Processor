const logger = require("winston");
require("winston-logstash");
const moment = require("moment");
const config = logger.config;
logger.level = {
    debug: 0,
    info: 1,
    silly: 2,
    warn: 3,
    error: 4,
};

logger.addColors({
    debug: "green",
    info: "cyan",
    silly: "magenta",
    warn: "yellow",
    error: "red"
});

const tsFormat = () => moment().format("YYYY-MM-DD hh:mm:ss").trim();
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console({
    level: "error",
    timestamp: tsFormat,
    colorize: true,
    formatter: function(options) {
        return config.colorize(options.level, options.level.toUpperCase()) + " [" +
            config.colorize("warn", options.timestamp()) + "] " +
            config.colorize(options.level, (options.message ? options.message : "") +
            (options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : ""));
    }

}));

// logger.add(logger.transports.Logstash, {
//     port: 5400,
//     host: "image_processor_logstash"
// });

module.exports = logger;