import App from "../src/App";

const request = require("supertest");

describe("GET /", () => {

    let app: App;

    before((done) => {
        app = new App();
        app.start();
        done();
    });

    it("respond with 404", (done) => {
        request(app.getExpressApp()).get("/").expect(404, done);
    })


    after((done) => {
        app.stop();
        done();
    });

});
