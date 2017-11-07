import express from "express";
import validate from "express-validation";
import Joi from "joi";

import auth from "../server/auth";
import defaultValidations from "../helpers/default-validations";
import transferCtrl from "../controllers/transfer";
import userCtrl from "../controllers/users";

const router = express.Router();

const validations = {
    create: {
        body: {
            receiver: Joi.string().required(),
            amount: Joi.number().positive().required(),
            reason: Joi.string().required(),
            transfer_type: Joi.string().valid("regular", "ponctual"),
            frequency: Joi.number().positive()
        }
    }
};

router.param("userId", validate(defaultValidations.userId));
router.param("userId", userCtrl.load);

router.route("/:IBAN")
    /** GET /transfer/:IBAN - Get all the transfer of a bank account /w his IBAN */
    .get(auth.owner(), transferCtrl.get)
    
    /** POST /transfer/:IBAN - Create a transfer */
    .post(validate(validations.create), auth.owner(), transferCtrl.create);

export default router;