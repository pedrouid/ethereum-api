import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

import { FastifyInstance } from "fastify";

interface TestAccountBalanceParams {
  address: string;
  chainId: number;
  expected: any;
}

export function testAccountBalance(
  app: FastifyInstance,
  params: TestAccountBalanceParams,
  done?: any,
) {
  const { address, chainId, expected } = params;
  app.inject(
    { method: "GET", url: `/account-balance?address=${address}&chainId=${chainId}` },
    (err, response) => {
      chai.expect(err).to.be.null;
      chai.expect(response.statusCode).to.equal(200);
      chai.expect(response.body).to.equal(
        JSON.stringify({
          success: true,
          result: expected,
        }),
      );
      chai.expect(true).to.be.true;
      if (done) {
        done();
      }
    },
  );
}

interface TestAccountAssetsParams {
  address: string;
  chainId: number;
  expected: any;
}

export function testAccountAssets(
  app: FastifyInstance,
  params: TestAccountAssetsParams,
  done?: any,
) {
  const { address, chainId, expected } = params;
  app.inject(
    { method: "GET", url: `/account-assets?address=${address}&chainId=${chainId}` },
    (err, response) => {
      chai.expect(err).to.be.null;
      chai.expect(response.statusCode).to.equal(200);
      chai.expect(response.body).to.equal(
        JSON.stringify({
          success: true,
          result: expected,
        }),
      );
      chai.expect(true).to.be.true;
      if (done) {
        done();
      }
    },
  );
}
