const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

require('dotenv').config();

describe("GET - /v2/transactions/params", () => {
    let response;
    
    before(async () => {
      response = await chai.request(process.env.BASE_URL_NODE).get("/v2/transactions/params");
    });

    it("should consensus-version equal to bc36005dbd776e6d1eaf0c560619bb183215645c tree", () => {
      expect(response.body["consensus-version"]).to.equal(
        "https://github.com/algorandfoundation/specs/tree/bc36005dbd776e6d1eaf0c560619bb183215645c"
      );
    });

    it("should genesis-hash equal to wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=", () => {
      expect(response.body["genesis-hash"]).to.equal(
        "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8="
        );
    });

    it("should fee be a number", () => expect(response.body.fee).to.be.a("number"));
    it("should gensis-id be a number", () => expect(response.body["genesis-id"]).to.be.a("string"));
    it('should last-round be a number', () => expect(response.body["last-round"]).to.be.a("number"));
    it("should min-fee be a number", () => expect(response.body["min-fee"]).to.be.a("number"));
    it("should min-fee equal to 1000", () => expect(response.body["min-fee"]).to.equal(1000));
});