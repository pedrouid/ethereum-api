import BN from "bn.js";
import * as encUtils from "enc-utils";
import { FastifyRequest, FastifyReply } from "fastify";

import { sendInvalidParamError } from "./errors";
import {
  RequestWithAddressQuerystring,
  RequestWithChainIdQuerystring,
  RequestWithContractQuerystring,
  RequestWithDataQuerystring,
  RequestWithFiatQueryString,
} from "./rest";

export function verifyParam<R = any>(
  req: FastifyRequest<R>,
  res: FastifyReply,
  param: string,
  expectedType: string,
  sanitizer: any,
) {
  const value = sanitizer(req.query[param]);

  // tslint:disable-next-line:strict-type-predicates
  if (!value || typeof value !== expectedType) {
    sendInvalidParamError(res, param);
  }

  return value;
}

export function verifyAddress(
  req: FastifyRequest<RequestWithAddressQuerystring>,
  res: FastifyReply,
) {
  return verifyParam(req, res, "address", "string", encUtils.sanitizeHex);
}

export function verifyChainId(
  req: FastifyRequest<RequestWithChainIdQuerystring>,
  res: FastifyReply,
) {
  return verifyParam(req, res, "chainId", "number", encUtils.utf8ToNumber);
}

export function verifyContractAddress(
  req: FastifyRequest<RequestWithContractQuerystring>,
  res: FastifyReply,
) {
  return verifyParam(req, res, "contractAddress", "string", encUtils.sanitizeHex);
}

export function verifyData(req: FastifyRequest<RequestWithDataQuerystring>, res: FastifyReply) {
  const sanitizeData = () => encUtils.sanitizeHex(req.query.data) || "0x";
  return verifyParam(req, res, "data", "number", sanitizeData);
}

export function verifyFiat(req: FastifyRequest<RequestWithFiatQueryString>, res: FastifyReply) {
  return verifyParam(req, res, "fiat", "string", encUtils.sanitizeHex);
}
