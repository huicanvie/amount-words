## 用于将小写数字金额转换成大写金额

### 使用
```
import { convert, singleConvert} from 'amount-words'

// 转换参数
const options = {};

const amount =  123;

const big = convert(amount, options)

// ==> 壹佰贰拾叁圆整

// 单个数字转换

const single = singleConvert(1)
// ==> '壹'

```

### OPTIONS
```
1. suffix
  后缀，默认为空

2. prefix
  前缀， 默认为空


```