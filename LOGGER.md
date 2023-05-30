# @kali/logger
基于[winston](https://github.com/winstonjs/winston/)封装，按日分割日志文件

## 使用方法

```javascript
import Logger from '@kali/logger'
import { resolve } from 'path'

const logger = Logger({
    dir: resolve('./', 'data', 'logs'),
    debug: true
})

logger.log('app message', {key: 'app info'})
logger.log('splat message %d - %s', 123, 'title', {key: 'app info'})
logger.error('error msg', { extra: 'hello'})
 
```

## 创建日志对象
使用`Logger`函数创建日志对象:

``` js
const logger = Logger({
   dir: resolve('./', 'data', 'logs'),
   debug: true
});
```

实例化函数接收的参数:

| 名字          | 默认值                     |  描述    |
| ------------- | --------------------------- | --------------- |
| `dir`       | `./`                    | 日志目录  |
| `debug`      | `false` | 是否开发模式，开发模式会在控制台打印所有日志 |

创建后会返回`logger`实例。

## `logger` Objects
| 属性   | 描述 |
| ---------- | ----------- |
| `log`      | 参考[winston logger.info](https://github.com/winstonjs/winston/) |
| `error`    | 参考[winston logger.error](https://github.com/winstonjs/winston/) |
