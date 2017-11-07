import httpStatus from "http-status";
import APIError from "../helpers/api-error";

import mongoose from "../server/mongo";
import utils from "./utils";

export const TransferSchema = new mongoose.Schema({
    sender: {
        type: String, // IBAN of the sender
        required: true
    },
    receiver: {
        type: String, // IBAN of the receiver
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: "transfer"
    },
    transfer_type: {
        type: String,
        required: true,
        enum: ["ponctual", "regular", "regular child"],
        default: "ponctual",
    },
    frequency: {  //Frenquency in day that the transfer must happen if transfer is a ponctual one
        type: Number,
    },
    transferAt: {
        type: Date,
        default: Date.now(),
    },
}, utils.genSchemaConf((doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
}));

/**
 * Statics
 */
TransferSchema.statics = {
    /**
     * List transfers of an account in descending order of 'createdAt' timestamp
     * @param {String} IBAN - This is the IBAN of the account
     * @returns {Promise<Transfer[]>}
     */
    get(IBAN) {
        return this
            .find({sender: IBAN})
            .sort({ transferAt: - 1})
            .exec()
    },

    /**
     * Create a new transfer
     * @param {String} sender
     * @param {String} receiver
     * @param {Number} amount
     * @param {String} [transferType]
     * @param {Number} [frequency]
     * @returns {Promise<User>}
     */
    create(sender, receiver, amount, transfer_type, frequency) {
        let transfer = new this();
        transfer.sender = sender;
        transfer.receiver = receiver;
        transfer.amount = amount;
        if (typeof frequency !== 'undefined' || transfer_type !== 'regular') {
            transfer.transfer_type = transfer_type;
            transfer.frequency = frequency;
        }
        return transfer.save();
    },
};

/**
 * @typedef Transfer
 */
export default mongoose.model("Transfer", TransferSchema);