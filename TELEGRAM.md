# tg bot
基于[Telegraf](https://github.com/telegraf/telegraf)

## 使用方法

```javascript
import { Bot } from '@kali/logger'

const bot = await Bot('tg bot token')

bot.text('chat id', 'send message')
```

## `bot` Objects
| 属性   | 类型 | 描述 |
| ----------| -----------  | ----------- |
| `bot`      | `Telegraf` | 参考[Telegraf](https://github.com/telegraf/telegraf) |
| `text`    | `(chatId: string, msg: string)=> void` | 发送消息方法 |


## 指令
| 名字   | 描述 |
| ----------| ----------- |
| `/getChat`      | 获取当前会话信息 |


## 操作说明
1. 通过`@BotFather`创建获取机器人，并获取`token`
2. 把机器人添加到群组, 并启动服务
3. 输入`/getChat`指令，获取当前会话信息，获取`id`字段用于后续发消息操作