import { isAlive as isMongoAlive } from "./server/mongo";
import config from "./server/config";
import app from "./server/express";
import logger from "./server/logger";

import User from "./models/user";

function createRoot() {
    return User
        .createOrUpdate("root", config.ROOT_PASSWD, "root@superapi.gg", "admin")
        .catch(() => {
            return Promise.reject(new Error("Error when create root user"));
        });
}

function startExpress() {
    if (!module.parent) {
        app.listen(config.API_PORT, () => {
            logger.info("Express start on " + config.API_URL + ":" + config.API_PORT);
        });
    }
}

export const ready = Promise.all([
    isMongoAlive()
]).then(() => {
    logger.info("DB connections are alive");
    return createRoot();
}).then(created => {
    if (created) {
        logger.info("User root created");
    }
    startExpress();
}).catch(err => {
    logger.error(err);
    process.exit(1);
});

export default app;