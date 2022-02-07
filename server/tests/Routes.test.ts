import App from "../src/App";

const request = require("supertest");

const testUser = {
    "email": "hello.world@test.com",
    "firstname": "Hello",
    "lastname": "World",
    "password": "Testabc123"
}

describe("GET /me", () => {

    let app: App;
    let userToken: string;

    before((done) => {
        app = new App();
        app.start(7899);

        request(app.getExpressApp()).post('/auth/register').send(testUser).expect(200, () => {
            done();
        });
    });



    it("respond with a correct 401 Unauthorized", (done) => {
        request(app.getExpressApp()).get("/me").expect(401).expect({
            "error": "You need to be logged !"
        }, done);
    })

    it("respond with 401 with a bad bearer token", (done) => {
        request(app.getExpressApp()).get("/me").set('Authorization', 'Bearer helloworldimabadtoken').expect(401).expect({
            "error": "You need to be logged !"
        }, done);
    })

    it("respond with 200 and with correct user information", (done) => {
        request(app.getExpressApp()).get("/me").set('Authorization', `Bearer ${process.env.TEST_USER_TOKEN}`).expect(200, done);
    });

    after((done) => {
        request(app.getExpressApp()).delete('/me').set('Authorization', `Bearer ${userToken}`).expect({
            "success": true
        }).expect(200, () => {
            done();
        });
        app.stop();
    });

});
