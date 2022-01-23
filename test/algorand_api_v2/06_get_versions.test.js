const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

require('dotenv').config();

describe("GET - /versions", () => {
    let response;
    before(async () => {
      response = await chai.request(process.env.BASE_URL_NODE).get("/versions");
    });

    it("should build be an object",  () => expect(response.body.build).to.be.a("object"));

    it('should genesis_hash_b64 be equal to wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=', () => {
      expect(response.body["genesis_hash_b64"]).to.equal(
        "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8="
      );
    });

    it("should genesis_id equal to mainnet-v1.0", () => expect(response.body["genesis_id"]).to.equal("mainnet-v1.0"));
    it("should genesis_id to be a string", () => expect(response.body["genesis_id"]).to.be.a("string"));
    it("should verision to be an array", () => expect(response.body.versions).to.be.a("array"));
    it("should major to be a number", () => expect(response.body.build.major).to.be.a("number"));
    it("should minor to be a number", () => expect(response.body.build.minor).to.be.a("number"));
    it("should build_number to be a number", () => expect(response.body.build.build_number).to.be.a("number"));
    it("should commit_hash to be a string", () => expect(response.body.build.commit_hash).to.be.a("string"));
    it("should branch to be a string", () => expect(response.body.build.branch).to.be.a("string"));
    it("should channel to be a string", () => expect(response.body.build.channel).to.be.a("string"));
    
});