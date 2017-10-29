import User from "../models/user";


/**
 * Get Bank Account
 * @return {BankAccount}
 */
function getOne(req, res) {
    return res.json(req.object.last().el());
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
