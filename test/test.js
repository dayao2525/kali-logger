import { Logger, Bot} from '../index.js'

import { resolve } from 'path'

function main() {
    const logger = Logger({
        dir: resolve('./', 'data', 'logs'),
        debug: false
    })

    logger.log('app message', {key: 'app info'})
    logger.log('splat message %d - %s', 123, 'title', {key: 'app info'})
    logger.error('error msg', { extra: 'hello'})

}

function client() {
    const dns = ""
}



async function telegram() {
    // infinix
    const key = ''
    // big
    // const key = ''
    const chatId = ''
    // 小
    // const chatId = ''
    const { bot, text} = await Bot(key);
    // console.log(bot, text)

    text(chatId, '给你发消息啦')

    // try {
    //     console.log('get updates')
    //     const updates = await bot.telegram.getUpdates();
    //         console.log('updates', updates)
    // } catch(e) {
    //     console.error(e)
    // }



}

try {
    main()
    // telegram();
    // console.log(process.env)
} catch(e) {
    console.error(e)
}