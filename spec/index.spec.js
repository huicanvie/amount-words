import {formmatter, convert, singleConvert } from '../index'
var assert = require('assert')

describe('Formatter test', () => {

  it ('123.00 should return 123', () => {
     assert.equal(formmatter('123.00'), 123)
  })
  
  it ('123. should return 123', () => {
    assert.equal(formmatter('123.'), 123)
  })

  it ('123 should return 123', () => {
    assert.equal(formmatter('123'), 123)
  })

  it ('123.01 should return 123', () => {
    assert.equal(formmatter('123.01'), '123.01')
  })

  it ('123.10 should return 123', () => {
    assert.equal(formmatter('123.10'), '123.1')
  })

  it ('0.01 should return 0.01', () => {
    assert.equal(formmatter('0.01'), '0.01')
  })

})

describe ('Convert test', () => {

  it('123.00 should return 壹佰贰拾叁圆', () => {
    assert.equal(convert(123.00), '壹佰贰拾叁圆整')
  })

  it('123.01 should return 壹佰贰拾叁圆零壹分', () => {
    assert.equal(convert(123.01), '壹佰贰拾叁圆零壹分')
  })

  it('123.10 should return 壹佰贰拾叁圆壹角', () => {
    assert.equal(convert(123.10), '壹佰贰拾叁圆壹角')
  })

  it('123.00 add prefix should return 总金额壹佰贰拾叁圆整', () => {
    assert.equal(convert(123.00, {prefix: '总金额'}), '总金额壹佰贰拾叁圆整')
  })

  it('123.00 add suffix should return 壹佰贰拾叁圆整金额', () => {
    assert.equal(convert(123.00, {suffix: '金额'}), '壹佰贰拾叁圆整金额')
  })

  it('0.10 should return 壹角', () => {
    assert.equal(convert(0.10), '壹角')
  })

  it('00.00 should return 零', () => {
    assert.equal(convert('00.00'), '零')
  })

  it('xx should return NaN', () => {
    assert.equal(convert('xx'), NaN)
  })
})

describe('single convert is ok', () => {

   it('1 should return 壹', () => {
     assert.equal(singleConvert(1), '壹')
   })

   it('12 should return undefined', () => {
    assert.equal(singleConvert(12), 12)
   })

   it('"" should return undefined', () => {
    assert.equal(singleConvert(""), "")
   })
})