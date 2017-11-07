import Transfer from "../models/transfer";

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
    Transfer.create(req.params.IBAN, req.body.receiver, req.body.amount, req.body.reason, req.body.transfer_type, req.body.frequency)
        .then(transfer => res.json(transfer))
        .then( () => {
            //Mettre a jour les soldes
        })
        .catch(e => next(e));
}

export default { get, create };
