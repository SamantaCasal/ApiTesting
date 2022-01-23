const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

require('dotenv').config();

describe("GET - /v2/status", () => {
    let response;
    before(async () => {
      response = await chai.request(process.env.BASE_URL_NODE).get("/v2/status");
    });

    describe("Should return properties", () => {
      const properties = [
        "catchpoint",
        "catchpoint-acquired-blocks",
        "catchpoint-processed-accounts",
        "catchpoint-processed-accounts",
        "catchpoint-total-accounts",
        "catchpoint-total-blocks",
        "catchpoint-verified-accounts",
        "catchup-time",
        "last-catchpoint",
        "last-round",
        "next-version",
        "next-version-supported",
        "stopped-at-unsupported-round",
        "time-since-last-round",
      ];

      properties.forEach(prop => it(`should ${prop} be number`, () => expect(response.body).to.have.property(prop)));

    });
    describe("The properties should return the following typeOf", () => {
      
      const isStatusPropNumber = [
        'catchpoint-acquired-blocks',
        'catchpoint-processed-accounts',
        'catchpoint-total-accounts',
        'catchpoint-total-blocks',
        'catchpoint-verified-accounts',
        'catchup-time',
        'last-round'
      ];
      isStatusPropNumber.forEach(prop => it(`should ${prop} be number`, () => expect(response.body[prop]).to.be.a('number')))
      
      it("should catchpoint be string", () => expect(response.body.catchpoint).to.be.a("string"));
      it("should last-catchpoint be string", () => expect(response.body["last-catchpoint"]).to.be.a("string"));
      it("should last-version equal to bc36005dbd776e6d1eaf0c560619bb183215645c tree", () => {
        expect(response.body["last-version"]).to.equal(
          "https://github.com/algorandfoundation/specs/tree/bc36005dbd776e6d1eaf0c560619bb183215645c"
        );

      });
      it("should next-version equal to bc36005dbd776e6d1eaf0c560619bb183215645c tree", () => {
        expect(response.body["next-version"]).to.equal(
          "https://github.com/algorandfoundation/specs/tree/bc36005dbd776e6d1eaf0c560619bb183215645c"
        );
      });
      
      it("should next-version-supported to be boolean", () => expect(response.body["next-version-supported"]).to.be.a("boolean"));
      it("should stopped-at-unsupported-round to be boolean", () => expect(response.body["stopped-at-unsupported-round"]).to.be.a("boolean"))
      it("should time-since-last-round to be boolean", () => expect(response.body["time-since-last-round"]).to.be.a("number"))
    });
});