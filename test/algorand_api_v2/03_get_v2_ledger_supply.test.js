const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

require('dotenv').config();

describe("GET - /v2/ledger/supply", () => {
    let response;
    before(async () => {
      response = await chai.request(process.env.BASE_URL_NODE).get("/v2/ledger/supply");
    });
    it("Status code", () => {
      expect(response.status).to.equal(200);
    });

    it("Should return the property current round", async () => {
      expect(response.body).to.have.property("current_round");
    });
    it("Should return the property online money", async () => {
      expect(response.body).to.have.property("online-money");
    });
    it("Should return the property total money", async () => {
      expect(response.body).to.have.property("total-money");
    });
});