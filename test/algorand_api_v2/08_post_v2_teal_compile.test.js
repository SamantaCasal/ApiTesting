const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const fs = require("fs");

chai.use(chaiHttp);

require("dotenv").config();

describe.only("POST - /v2/teal/compile", () => {
  let response;
  before(async () => {
    response = await chai
      .request(process.env.BASE_URL_NODE)
      .post('/v2/teal/compile')
      .set('Content-Type', 'text/plain')
      .send(fs.readFileSync(`${__dirname}/teal.txt`, 'utf8'));
  });
  it("should return hash", () => {
    expect(response.body.hash).to.be.a('string');
    expect(response.body.result).to.be.a('string');
  });
});
