# 飞云四期API设计使用说明

代码仓库名：feiyun_website

cr：张曼薇、张潇菡

## 一、项目目录结构说明(例)

src

 | -- api											*api文件总目录

 |    | -- api.js								  *导出所有api

 |    | -- homepage						*按页面/功能分区分类

 |    |    |-- api.js							*该分类下定义的api

 |    | -- test

 |    |    |-- api.js

 | -- views

 |    | -- homepage					 *按页面/功能分区分类

 |    |    |-- homepage.vue		*使用api/homepage/api中定义的api

 | -- utils

 |    | -- axios.js							*实例化axio对象

 |    | -- request.js						*配置axios实例，全局拦截request和response并作处理

## 二、使用说明

包括配置全局参数、编写新api、获取并使用axios请求返回的数据等

### 1. 配置基本参数

在src/utils/request.js中配置：

- 基本url 和 超时

```js
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: YOUR_URL,
  timeout: YOUR_TIMEOUT(seconds) * 1000 // 请求超时时间
})
```

### 2. 编写拦截器

在src/utils/request.js中配置：

- error拦截器

```js
const errorHandler = (error) => {
  
  //此处进行你的处理
    
  return Promise.reject(error)
}
```

- request拦截器 —— 配置请求的config，添加token等

```js
request.interceptors.request.use(config => {
    
  // 此处进行你的处理
    
  return config
}, errorHandler)
```

- response拦截器

```js
request.interceptors.response.use((response) => {
        
  // 此处进行你的处理
    
   return Promise.resolve(response.data || response)  //防止data为null，但应确保不管在任何情况下，data都包含前端所需数据，404等异常除外
}, errorHandler)
```

### 3. 创建并使用一个新api

#### Step 1 - 阅读已有的api，确保自己要添加的api是必要的。

#### Step 2 - 与后端人员沟通，确定传入、传出数据格式和请求方式。

#### Step 3 - 创建新文件或选择合适的文件来添加api，编写的api文件格式应类似于：

```js
//以src/api/test/api.js为例：

import request from '@/utils/request'

const api = {
  //设置api的url接口，如：
  post: '/posts'
}

export const exportName = {
  //编写请求函数并配置请求参数，格式如下：
  test: function(parameter) {
    return request({
      url: api.posts,
      method: 'get',
      params: parameter
    })
  },
    
  //需要注意的是，若请求方法为get，则用'params'设置参数，若请求方法为post，则用'data'设置参数。例如：
  testPost: function(parameter) {
    return request({
      url: api.posts,
      method: 'post',
      data: parameter
    })
  },
    
  //若需要在url中使用参数，可像下面这样使用：
  edit: function (parameter) {
    return request({
      url: `/bridge/file/${parameter['id']}`,	
      method: 'put',
      data: parameter
    })
  },
  //或：
  detail: function (id) {
    return request({
      url: `/bridge/file/${id}`,
      method: 'get'
    })
  },
}
```

#### Step 4 - 在最外层的api.js中导入写好的api

假设你要导入的文件所处的目录结构如下：

api

 | -- api.js       <-- 最外层的api.js，所有api函数均要在此导入，不如称它为api(main)

 | -- [filename]

 |     | -- api.js		<-- 你写好的api文件

则修改api(main)如下：

```js
import * as test from './test/api.js'
//以及一些已有的导入

//添加以下行 ↓ exportName在./[filename]/api.js中定义
import * as exportName from './filename/api.js'

const api = {
    ...test,
    //以及一些已有的导入
    
    //添加：
    ...exportName
}

export default api
```

#### Step 5 - 使用api

假设你需要使用api/test/api.js中的接口函数，首先查看它在api(main)中的导出名为`test`：

```js
// api/api.js
import * as test from './test/api.js'
//			 ↑ here

const api = {
    ...test
//      ↑ and here
}

export default api

```

需要调用的函数名为`test`：

```js
// api/test/api.js
import request from '@/utils/http/request'

const api = {
  posts: '/posts',
}


export const test = {
  test: function(parameter) {
//	↑ here
      
    return request({
      url: api.posts,
      method: 'get',
      params: parameter
    })
  }
}
```

则在需要的函数内以如下格式调用：

```js
//使用await时，调用函数必须用a
async function someFunction(){
    
    await this.$api.test.test({参数对象} || 参数)
    .then(res => {
        //说明：由于response拦截器，此处的res其实是response.data
        
        //此处进行你的处理
        
    })

}
```

## 三、其他文件内的相关代码

- `main.js`

```js
import axios from 'axios'
Vue.prototype.$axios = axios

import api from '@/api/api'
Vue.prototype.$api = api

import { VueAxios } from './utils/request'
Vue.use(VueAxios)
```

