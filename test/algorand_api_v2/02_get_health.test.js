const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

require('dotenv').config();

describe("GET - /health", () => {
    let response;
    before(async () => {
      response = await chai.request(process.env.BASE_URL_BLACKWIDOW).get("/health");
    });

    it("Status code", () => {
      expect(response.status).to.equal(200);
    });
});