const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

require('dotenv').config();

describe('Accounts', () => {

    describe('Get account', () => {
        let response;
        before(async () => {
            response = await chai.request(process.env.BASE_URL_ALGOINDEXER_V2)
                .get("/accounts/MTCEM5YJJSYGW2RCXYXGE4SXLSPUUEJKQAWG2GUX6CNN72KQ3XPJCM6NOI")
        })

        it("", () => {
            console.log(response.body)
        })
        describe("Response typeof", () => {

            const isAccountPropTypeNumber = [
                'amount',
                'amount-without-pending-rewards',
                'created-at-round',
                'pending-rewards',
                'reward-base',
                'rewards',
                'round'
            ];

            isAccountPropTypeNumber.forEach(prop => {
                it(`should ${prop} to be number`, () => {
                    expect(response.body.account[prop]).to.be.a('number');
                });
            });

            it('should address to be string', () => {
                expect(response.body.account.address).to.be.a('string');
            });

            it('should deleted to be boolean', () => {
                expect(response.body.account.deleted).to.be.a('boolean');
            });

            it('should sig-type to be string', () => {
                expect(response.body.account['sig-type']).to.be.a('string')
            });

            describe('Status', async () => {
                const status = await response.body.account.status
                it('should be string', () => {
                    expect(status).to.be.a('string');
                    console.log(response.body.account);
                })
                it('should take value one of the following values: Online, Offline, Not Participating', () => {
                    expect(status, 'Status is not Online, Offline or Not Participating')
                        .satisfy(() => status == "Online" || status ==  "Offline" || status == "Not Participating")
                })
            })

        })
    })

})