import Transfer from "../models/transfer";
import User from "../models/user";

import APIError from "../helpers/api-error";

import httpStatus from "http-status";


/**
 * Get all the transfer of an user
 * @property {String} req.params.IBAN - The IBAN of the bank account's tranfers.
 * @returns {Transfer}
 */
function get(req, res) {
    const IBAN = req.params.IBAN
    Transfer.get(IBAN)
    .then(transfers => res.json({transfers: transfers}))
    .catch(e => next(e));
}

/**
 * Create new transfer
 * @property {String} req.params.IBAN - The IBAN of the sender.
 * @property {String} req.body.receiver - The IBAN of receiver.
 * @property {Number} req.body.amount - The email of user.
 * @property {String} req.body.reason - The reason of the transfer
 * @property {String} [req.body.transfer_type] - The transfer type, ponctual or regular.
 * @property {Number} [req.body.frequency] - The frequency of the transfer if regular.
 * @return {Transfer[]}
 */
function create(req, res, next) {
    const user = req.object.last().el();
    let index = user.bankAccount.findIndex(function(item, i){
        return item.IBAN === req.params.IBAN;
      });
    if (user.bankAccount[index].balance < req.body.amount) {
        const err = new APIError(["Your balance is too low to withdraw"], httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    }
    User.getByIBAN(req.body.receiver)
    .then(receiver => {
        Transfer.create(req.params.IBAN, req.body.receiver, req.body.amount, req.body.reason, req.body.transfer_type, req.body.frequency)
            .then(transfer =>  {
                const transferSave = transfer;
                user.bankAccount[index].balance -= req.body.amount;
                user.save()
                .then(userSave => {
                    let receiverTest = receiver;
                    let indexR = receiver.bankAccount.findIndex(function(item, i){
                        return item.IBAN === req.body.receiver;
                    });
                    receiver.bankAccount[indexR].balance += req.body.amount;
                    receiver.save()
                    .then(receiver => res.json({transfer: transferSave}))
                    .catch(e => next(e));                    
                })
                .catch(e => next(e));
            })
            .catch(e => next(e));
        })
    .catch(e => next(e));
}

export default { get, create };
