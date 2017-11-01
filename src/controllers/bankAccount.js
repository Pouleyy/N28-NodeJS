import httpStatus from "http-status";

import User from "../models/user";

import APIError from "../helpers/api-error";

/**
 * Get Bank Account
 * @property {string} req.params.IBAN - The IBAN of the bank account.
 * @return {BankAccount}
 */
function getOne(req, res, next) {
    const user = req.object.last().el();
    let index = user.bankAccount.findIndex(function(item, i){
        return item.IBAN === req.params.IBAN;
      });
    if (index < 0) {
        const err = new APIError(["This IBAN is incorrect"], httpStatus.NOT_FOUND);
        next(err);
    }
    else {
        res.json(user.bankAccount[index]);
    }
}

/**
 * Create new Bank Account
 */
function create(req, res, next) {
    const search = req.object.last().el();    
    User.createBankAccount(search.username)
        .then(user => {
            res.json(user.bankAccount[user.bankAccount.length - 1])
        })
        .catch(e => next(e));
}

/**
 * Delete bank account.
 * @property {string} req.params.IBAN - The IBAN of the bank account.
 * @returns {User}
 */
function remove(req, res, next) {
    const user = req.object.last().el();
    let index = user.bankAccount.findIndex(function(item, i){
        return item.IBAN === req.params.IBAN;
      });
    if (index < 0) {
        const err = new APIError(["This IBAN is incorrect"], httpStatus.NOT_FOUND);
        next(err);
    }
    else { 
        user.bankAccount.splice(index, 1);
        user.save();
        res.json({user});
    }
}

export default { getOne, create, remove };
