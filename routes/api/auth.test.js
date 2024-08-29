const mongoose = reqire('mongoose');
const request = require('supertest');
require('dotenv').config();

const app = require("../../app");
const {User} = require("../../models/userModel");

const {DB_TEST_HOST, PORT} = process.env;

describe("test auth routes", () => {
    let server;
    beforeAll(() => server = app.listen(PORT));
    afterAll(() => server.close());

    beforeEach ((done) => {
        mongoose.connect(DB_TEST_HOST).then(() => done())
    })

    afterEach((done) => {
        mongoose.connection.db.dropCollection(() => {
            mongoose.connection.close(() => done())
        })
    });

    test("test login", async() => {
        const newUser = {
            email: "master@test.com",
            password: "12345678"
        };

        const user  = await User.create(newUser);

        const loginUser = { 
            email: "master@test.com",
            password: "12345678"
        };

        const response = await request(app).post("/api/auth/login").send(loginUser);

        expect(response.statusCode).toBe(200);
        const {body} = response;
        expect(body.token).toByTruthy();
        const {token} = await User.findById(user._id);
        expect(token).toBe(body.token);

    })
})