/* global describe it  */

import { expect } from 'chai'
//
import {
  debounceRequest
  // capitalize,
  // padLeft,
  // getDataString,
  // getNakedAddress,
  // sanitizeHex
} from '../src/utilities'

describe('// -------------- ethereum-indexer -------------- //', () => {
  describe('debounceRequest', () => {
    it('returns a Promise', () => {
      const fn: Function = function () {}
      const params: Array<any> = []
      const timeout = 5000
      const result = debounceRequest(fn, params, timeout)
      expect(result).to.be.a('promise')
    })
  })
})
