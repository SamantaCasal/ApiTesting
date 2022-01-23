const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

require('dotenv').config();

describe("GET - /genesis", () => {

    let response;
    before(async () => {
      response = await chai.request(process.env.BASE_URL_BLACKWIDOW).get("/v2/genesis");
    });

    it("should return genesis block", () => {
      expect(response.body.fees).to.equal(
        "Y76M3MSY6DKBRHBL7C3NNDXGS5IIMQVQVUAB6MP4XEMMGVF2QWNPL226CA"
      );
      expect(response.body.fees).to.be.a("string");
    });

    it("should return the version of the api", () => {
      expect(response.body.id).to.equal("v1.0");
      expect(response.body.id).to.be.a("string");
    });

    it("should return the network", () => {
      expect(response.body.network).to.equal("mainnet");
      expect(response.body.network).to.be.a("string");
    });

    it("should return the proto to go Algorand Specifications ", () => {
      expect(response.body.proto).to.equal(
        "https://github.com/algorandfoundation/specs/tree/5615adc36bad610c7f165fa2967f4ecfa75125f0"
      );
      expect(response.body.proto).to.be.a("string");
    });

    it("should return rwd", async () => {
      expect(response.body.rwd).to.equal(
        "737777777777777777777777777777777777777777777777777UFEJ2CI"
      );
      expect(response.body.rwd).to.be.a("string");
    });

    it("should return timestamp", () => {
      expect(response.body.timestamp).to.equal(1560211200);
      expect(response.body.timestamp).to.be.a("number");
    });
});