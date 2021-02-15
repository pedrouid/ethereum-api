import "mocha";
import { use, expect } from "chai";
import chaiHttp from "chai-http";
import { HttpService } from "../src/http";

use(chaiHttp);

const TEST_ADDRESS = "0xfeBD6abD30D8E1AD477957C376efb79d1758B8c1";

describe("HTTP", () => {
  it("GET hello", done => {
    const { app } = new HttpService({ logger: "fatal" });
    app.inject({ method: "GET", url: "/hello" }, (err, response) => {
      expect(err).to.be.null;
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal(`Hello World`);
      expect(true).to.be.true;
      app.close(); // THis is not working so we need --exit in mocha
      done();
    });
  });
  it("GET account balance with chainId=1", done => {
    const { app } = new HttpService({ logger: "fatal" });
    const address = TEST_ADDRESS;
    const chainId = 1;
    app.inject(
      { method: "GET", url: `/account-balance?address=${address}&chainId=${chainId}` },
      (err, response) => {
        expect(err).to.be.null;
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.equal(
          JSON.stringify({
            success: true,
            result: {
              symbol: "ETH",
              name: "Ethereum",
              decimals: "18",
              contractAddress: "",
              balance: "0",
            },
          }),
        );
        expect(true).to.be.true;
        app.close(); // THis is not working so we need --exit in mocha
        done();
      },
    );
  });
  it("GET account balance with chainId=5", done => {
    const { app } = new HttpService({ logger: "fatal" });
    const address = TEST_ADDRESS;
    const chainId = 1;
    app.inject(
      { method: "GET", url: `/account-balance?address=${address}&chainId=${chainId}` },
      (err, response) => {
        expect(err).to.be.null;
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.equal(
          JSON.stringify({
            success: true,
            result: {
              symbol: "ETH",
              name: "Ethereum",
              decimals: "18",
              contractAddress: "",
              balance: "0",
            },
          }),
        );
        expect(true).to.be.true;
        app.close(); // THis is not working so we need --exit in mocha
        done();
      },
    );
  });
});
