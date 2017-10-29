import express from "express";
import validate from "express-validation";
import Joi from "joi";

import auth from "../server/auth";
import defaultValidations from "../helpers/default-validations";
import userCtrl from "../controllers/users";

const router = express.Router();

const validations = {
    create: {
        body: {
            username: Joi.string().regex(/^[a-z0-9_]{1,15}$/).required(),
            password: Joi.string().required(),
            email: Joi.string().email().required(),
            role: Joi.string().required().valid("user", "admin")
        }
    },
    update: {
        body: {
            password: Joi.string(),
            email: Joi.string().email()
        }
    },
    list: {
        query: {
            limit: Joi.number().positive(),
            skip: Joi.number()
        }
    }
};

router.param("userId", validate(defaultValidations.userId));
router.param("userId", userCtrl.load);

router.route("/")
    /** GET /users - Get list of users */
    .get(validate(validations.list), auth.admin(), userCtrl.list)

    /** POST /users - Create new user */
    .post(validate(validations.create), auth.admin(), userCtrl.create);

router.route("/:userId")
    /** GET /users/:userId - Get user */
    .get(auth.owner(), userCtrl.get)

    /** PUT /users/:userId - Update user */
    .put(validate(validations.update), auth.owner(), userCtrl.update)

    /** DELETE /users/:userId - Delete user */
    .delete(auth.owner(), userCtrl.remove);

//router.route("/:userId/bankAccount")
    /** NO GET on /users/:userId/bankAccount 
     * because you get the Bank Account
     * /w the /:userId
     */
    
    /** POST /users/:userId/bankAccount - Create a bank account */
    //.post(auth.owner(), userCtrl.createBankAccount);

//router.route("/:userId/bankAccount/:IBAN")
    /** GET /users/:userId/bankAccount/:IBAN - Get a bank account /w his IBAN */
    //.get(auth.owner(), userCtrl.bankAccount)
    
    /** DELETE /users/:userId/bankAccount/:IBAN - Delete a bank account */
    //.delete(auth.owner(), userCtrl.removeBankAccount);

export default router;