import App from "../src/App";

const request = require("supertest");

describe("POST /auth/register", () => {

    let app: App;

    before((done) => {
        app = new App();
        app.start();
        done();
    });

    it("respond with 400, missing body information", (done) => {
        request(app.getExpressApp()).post("/auth/register", ).send({

        }).expect(400, done);
    })


    after((done) => {
        app.stop();
        done();
    });

});
