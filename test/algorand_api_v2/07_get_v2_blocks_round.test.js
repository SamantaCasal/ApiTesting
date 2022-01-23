const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

require('dotenv').config();

describe("GET - /v2/blocks/{round}", () => {
    let response;

    before(async () => {
      response = await chai.request(process.env.BASE_URL_BLACKWIDOW).get("/v2/blocks/18418505");
    });

    describe('Body Props', () => {
      
      const isBodyPropString = [
        'genesis-hash',
        'hash',
        'original-proposer',
        'previous-block-hash',
        'fee-sink',
        'rewards-pool'
      ];
  
      
      isBodyPropString.forEach((prop, i) => {
        it(`should ${prop} be a string`, () => {
          expect(i < 4 ? response.body[prop] : response.body.rewards[prop]).to.be.a('string')
        })
      });
  
      const isBodyPropNumber = [
        'rewards-calculation-round',
        'rewards-level',
        'rewards-rate',
        'rewards-residue'
      ];
  
      isBodyPropNumber.forEach(prop => {
        it(`should ${prop} to be a number`, () => {
          expect(response.body.rewards[prop]).to.be.a('number')
        });
      });
  
      it("should gensis-id equal to mainnet-v1.0", () => expect(response.body['genesis-id']).to.equal('mainnet-v1.0'));
      it("should transactions to be an array", () => expect(response.body.transactions).to.be.a('array'));
    })

    describe('Transaction', () => {
        
        let transaction;
        before(async () => {
          transaction = response.body.transactions[0];
        })
        it("should signature to be an object", () => expect(transaction.signature.sig).to.be.a('string'))

        const isTransactionPropString = [
          'id',
          'note',
          'sender',
          'tx-type'
        ];

        isTransactionPropString.forEach(prop => {
          it(`should ${prop} to be a string`, () => {
            expect(transaction[prop]).to.be.a('string')
          });
        });

        const isTransactionElementNumber = [
          'asset-tx-counter',
          'block-rewards-level',
          'close-rewards',
          'closing-amount',
          'confirmed-round',
          'fee',
          'first-valid',
          'index',
          'inner-tx-offset',
          'intra-round-offset',
          'last-valid',
          'receiver-rewards',
          'round-time',
          'sender-acc-rewards',
          'sender-balance',
          'sender-rewards',
          'sender-tx-counter'
        ];
        isTransactionElementNumber.forEach(prop => {
          it(`should ${prop} to be a number`, () => {
            
            expect(transaction[prop]).to.be.a('number')
          });
        });
      });
      
      describe('Asset transfer transaction', () => {
        let transaction, assetTransferTransaction;
        before(async () => {
          transaction = response.body.transactions[0];
          assetTransferTransaction = transaction['asset-transfer-transaction'];
        })
          const isAssetTransferTransactionPropsNumber = [
            'amount',
            'asset-decimals',
            'asset-id',
            'asset-score',
            'close-acc-rewards',
            'close-amount',
            'close-asset-balance',
            'close-balance',
            'receiver-acc-rewards',
            'receiver-asset-balance',
            'receiver-tx-counter',
            'sender-asset-balance'
          ];

          isAssetTransferTransactionPropsNumber.forEach(prop => {
            it(`should ${prop} to be number`, () => {
              expect(assetTransferTransaction[prop]).to.be.a('number');
            })
          })

          it("should asset-name to be string", () => {
            expect(assetTransferTransaction['asset-name']).to.be.a('string');
          });
          it("should asset-unit-name to be string", () => {
            expect(assetTransferTransaction['asset-unit-name']).to.be.a('string');
          });
          it("should asset-verified to be boolean", () => {
            expect(assetTransferTransaction['asset-verified']).to.be.a('boolean');
          });
          it("should opt-in to be boolean", () => {
            expect(assetTransferTransaction['opt-in']).to.be.a('boolean');
          })
          it("should receiver to be string",() => {
            expect(assetTransferTransaction['receiver']).to.be.a('string');
          });
      });
  });