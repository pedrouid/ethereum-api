import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

import { FastifyInstance } from "fastify";

import { HttpService } from "../src/http";

import { testAccountAssets, testAccountBalance } from "./shared";

const TEST_ACCOUNT_ADDRESS = "0xed4de13de52c03f7FC85025B051E5C82Cbe20F2A";

const EXPECTED_ETH_BALANCE = {
  symbol: "ETH",
  name: "Ether",
  decimals: "18",
  contractAddress: "",
  balance: "0",
};

describe("HTTP", () => {
  let app: FastifyInstance;
  before(() => {
    const http = new HttpService({ logger: "fatal" });
    app = http.app;
  });
  it("GET hello", done => {
    app.inject({ method: "GET", url: "/hello" }, (err, response) => {
      chai.expect(err).to.be.null;
      chai.expect(response.statusCode).to.equal(200);
      chai.expect(response.body).to.equal(`Hello World`);
      chai.expect(true).to.be.true;
      done();
    });
  });

  it("GET account balance with chainId=1", done => {
    const params = {
      address: TEST_ACCOUNT_ADDRESS,
      chainId: 1,
      expected: EXPECTED_ETH_BALANCE,
    };
    testAccountBalance(app, params, done);
  });
  it("GET account balance with chainId=5", done => {
    const params = {
      address: TEST_ACCOUNT_ADDRESS,
      chainId: 5,
      expected: EXPECTED_ETH_BALANCE,
    };
    testAccountBalance(app, params, done);
  });
  it("GET account balance with chainId=10", done => {
    const params = {
      address: TEST_ACCOUNT_ADDRESS,
      chainId: 10,
      expected: EXPECTED_ETH_BALANCE,
    };
    testAccountBalance(app, params, done);
  });
  it("GET account balance with chainId=420", done => {
    const params = {
      address: TEST_ACCOUNT_ADDRESS,
      chainId: 420,
      expected: EXPECTED_ETH_BALANCE,
    };
    testAccountBalance(app, params, done);
  });
  it("GET account assets with chainId=1", done => {
    const params = {
      address: TEST_ACCOUNT_ADDRESS,
      chainId: 1,
      expected: [EXPECTED_ETH_BALANCE],
    };
    testAccountAssets(app, params, done);
  });
  it("GET account assets with chainId=5", done => {
    const params = {
      address: TEST_ACCOUNT_ADDRESS,
      chainId: 5,
      expected: [EXPECTED_ETH_BALANCE],
    };
    testAccountAssets(app, params, done);
  });
  it("GET account assets with chainId=10", done => {
    const params = {
      address: TEST_ACCOUNT_ADDRESS,
      chainId: 10,
      expected: [EXPECTED_ETH_BALANCE],
    };
    testAccountAssets(app, params, done);
  });
  it("GET account assets with chainId=420", done => {
    const params = {
      address: TEST_ACCOUNT_ADDRESS,
      chainId: 420,
      expected: [EXPECTED_ETH_BALANCE],
    };
    testAccountAssets(app, params, done);
  });
});
