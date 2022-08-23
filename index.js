const BIGNUMBER = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
const UNIT = ['圆','拾', '佰', '仟', '万', '分','角']
const DEFAULT_OPTIONS = {
  suffix: '',
  prefix: ''
}
const ZEROTEXT = '零'
const INTTEXT = '整'

/**格式数据，
 * 排除xx., xx.00, xx.x0等无用的尾数0
 * 排除00000.xx
 * */
export const formmatter = num => {
  try {
    num = (new Number(num)).valueOf()
    if (num === NaN) {
      return NaN
    }
    num = num.toString()
    if (num.indexOf('.') > 1) {
       const handler = num => {
        const lastIndex = num.length - 1
        if (['0', '.'].includes(num[lastIndex])) {
          num = num.substring(0, lastIndex)
          num = handler(num)
        } 
        return num 
       }
       
       return handler(num)
       
    }
    
    return num
  }catch (e) {
    console.error(e)
  }
 
}

export const convert = (num, options) => {
  options = {...DEFAULT_OPTIONS, ...options}
  num = formmatter(num)
  
  if (num === 'NaN') {
    console.log(num)
    return NaN
  }
  const numArr = num.split('');
  let intArr, decimalArr

  if (numArr.includes('.')) {
    const index = numArr.indexOf('.')
    intArr = numArr.slice(0, index)
    decimalArr = numArr.slice(index + 1)
    if (decimalArr.length < 2){
      decimalArr.push('0')
    }
   // console.log(decimalArr)
   const bigInt =  handler(intArr, UNIT.slice(0, UNIT.length - 2))
   const bigDecimal = handler(decimalArr, UNIT.slice(UNIT.length - 2))
   return getRes(bigInt + bigDecimal, options)
  } else {
    // 整数
    intArr = [...numArr]
    if (intArr.length == 1 && intArr[0] == 0) {
      return getRes(ZEROTEXT, options)
    }
    return getRes( handler(intArr, UNIT.slice(0, UNIT.length - 2), INTTEXT), options )
  }
}

export const getRes = (value, options) => {
  return options.prefix +  value + options.suffix
}

export const handler = (arr, scale, text) => {
  arr = arr.map(item => BIGNUMBER[item])
  
  if (arr.length > 0) {
    
    const bigNumber = text ? [text] : []
    // if (arr.length === 1 && arr[0] === ZEROTEXT) {
    //   bigNumber.pop(text)
    // } 
    for(var i = arr.length - 1, j = 0; i >= 0; i--) {
      let isZero = arr[i] === ZEROTEXT
      if (isZero) {
        if (bigNumber[0] != ZEROTEXT && bigNumber.length > 0){
          bigNumber.unshift(ZEROTEXT)
        }
      }else{
         bigNumber.unshift(`${arr[i]}${scale[j]}`)
      }
       
      j++
    }
    // console.log(bigNumber)
    return bigNumber.join('')
  }
  return ''
}
