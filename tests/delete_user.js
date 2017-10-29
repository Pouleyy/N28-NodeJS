import httpStatus from "http-status";
import request from "supertest";
import { expect } from "chai";
import app from "../server";
import config from "./config";

describe("Delete User/Profile", () => {

    describe("DELETE /users", () => {
        it("should delete user", (done) => {
            request(app)
                .delete(`/users/${config.user.id}`)
                .set("Authorization", config.token)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.id).to.equal(config.user.id);
                    done();
                })
                .catch(done);
        });
    });
});