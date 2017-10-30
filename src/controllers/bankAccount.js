import User from "../models/user";


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
        next();
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
 * @property {string} req.body.iban - The IBAN of the bank account.
 * @returns {User}
 */
function remove(req, res, next) {
    const user = req.object.last().el();
    user.removeBankAccount(req.body.iban)
        .then(() => { res.json(user); })
        .catch(e => next(e));
}

export default { getOne, create, remove };
