import express from "express";

import config from "../server/config";
import healthCtrl from "../controllers/health";

import authRoutes from "./auth";
import userRoutes from "./users";
import devRoutes from "./dev";
import adminRoutes from "./admin";
import transferRoutes from "./transfer";

const router = express.Router();

router.get("/", healthCtrl.healthCheck);

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/users", userRoutes);
router.use("/transfer", transferRoutes);

if (config.NODE_ENV === "development" || config.NODE_ENV === "test") {
    router.use("/dev", devRoutes);
}

export default router;
