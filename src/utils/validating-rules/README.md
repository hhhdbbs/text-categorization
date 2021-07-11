# README of validating-rules.js

validating-rules.js 提供了用于基于vuelidate.js表单验证的格式的工具类。请在使用前阅读本文档。

## validating-rules.js 的格式

​	本js文件export一个rules对象，其中包括了required min max 和 is* not*等成员，各自提供一个箭头函数，调用来自$test成员的正则表达式验证箭头函数进行匹配验证。

### required

​	required接受一个value并判断其是否为空。

### min 与 max

​	min 和 max 都是双层箭头函数，外层接受一个值来指定阈值，内层为一个正常的用于vuelidate.js的箭头函数。

### is*

​	一个典型的 is* 规则格式如下：

```js
value => this.$test.test*(value) || '提示信息'
```

| is*            | 功能                                 | 合法示例                                                     | 非法示例          |
| -------------- | ------------------------------------ | ------------------------------------------------------------ | ----------------- |
| `isDigits`     | 值为数字串                           | 0123456789                                                   | 123456789-0       |
| `isNumber`     | 值为自然数                           | 1234567890 \| 0                                              | 0123456789        |
| `isInteger`    | 值为整数                             | 123 \| -123                                                  | 123.0             |
| `isReal`       | 值为实数（整数.小数）                | 123.5 \| -123.5 \| +123.5 \| 0 \| 123                        |                   |
| `isChinese`    | 值为中文字符                         | 飞云 \| 龥 \| 一                                             | 龦                |
| `isEnglish`    | 值为英文字母（及空格）               | feiyun \| feiyun cloud                                       | feiyun-cloud      |
| `isNumEngUdl`  | 值为数字、英文字母、下划线组成的串   | feiyun_contract_1                                            | feiyun-contract-1 |
| `isNumEngSym`  | 值为数字、英文字母、特殊字符组成的串 | feiyun_1_~`!@#$%^&*()_+-={}\|[]\:";'<>?,./'                  |                   |
| `isEmail`      | 值为email地址                        | example.which+domain-is@this.asked.him                       |                   |
| `isPhone`      | 值为任意格式电话号码                 | +86-010-40020020 \| 010-40020020 \| +86-10-13523458056 \| +86-13523458056 \| 10-13523458056\| 13523458056（国家号、区号、分隔符"-" 均选填） |                   |
| `isDomainname` | 值为域名                             | what.com \| go.get.some.sleep.man                            |                   |
| `isUrl`        | 值为URL                              | xxx://xxx.xxx.xxxx:xxxxx/xxxx/xxxx.xxx?xxxx=xxxx             |                   |

### not*

​	一个典型的 not* 规则格式如下：

```javascript
value => !this.$test.test*(value) || '提示信息'
```

| not*       | 功能          | 合法示例  | 非法示例                         |
| ---------- | ------------- | --------- | -------------------------------- |
| `notAdmin` | 值中不含admin | a_d_m_i_n | ADMIN \| admin \| Admin233233233 |

### $test

​	$test对象存储所有的正则表达式匹配函数留作以后使用。一个典型的 $test.test* 箭头函数格式如下：

```javascript
s => /regExp/.test(s)
```

## validating-rules.js 的使用方法

​	要使用validating-rules.js，首先通过

```javascript
import {rules} from '@/utils/validating-rules.js';
```

引入validating-rules.js的rules对象。

### 用作vuelidate.js的验证

​	以vuetify的v-text-field组件为例，对于某个v-text-field的验证如下：

```html
<template>
	...
    <v-text-field :rules="[rules.required]"></v-text-field>
    ...
</template>

<script>
	import rules from '@/utils/validating-rules.js';
</script>
```

### 直接调用validating-rules.js的方法

​	直接通过rules.*引用rules对象的成员