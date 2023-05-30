import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

export default async function CreateBot(key) {
    const chatIds = [];

    const bot = new Telegraf(key);

      // @本机器人
    // bot.use(async (ctx, next) => {
    // try {

    //     if(ctx.update.message) {
    //         const msg = ctx.update.message.text || ctx.update.message.caption
    //         if(msg && msg.indexOf(`@${ctx.botInfo.username}`) !== -1) {
    //             console.log('===== @人逻辑 =====')
    //             await ctx.reply(`爸爸在此 @${ctx.update.message.from.first_name}`);
    //         }
    //     }
    // }catch(e) {
    //     console.error(e)
    // }
    // next() // runs next middleware
    // })

    // // 加入或踢出会话
    // bot.use(async (ctx, next) => {
    // try {
    //     if( ctx.update.my_chat_member && ctx.update.my_chat_member.new_chat_member) {
    //         console.log('update', ctx.update)
    //         if(ctx.update.my_chat_member.new_chat_member.user.id ===  ctx.botInfo.id) {
    //             // 被踢出
    //             if(['kicked', 'left'].includes(ctx.update.my_chat_member.new_chat_member.status)) {
    //                 console.log('===== 踢人逻辑 =====')
    //                 const idx = chatIds.indexOf(ctx.update.my_chat_member.chat.id)
    //                 if (idx !== -1) {
    //                     chatIds.splice(idx, 1)
    //                 }
    //             } else { // 加入会话
    //                 console.log('===== 加入逻辑 =====')
    //                 chatIds.push(ctx.update.my_chat_member.chat.id)
    //                 await ctx.reply(`爸爸来了 [${chatIds.join(',')}]`);
    //             }
    //         }
    //     }
    // } catch(e) {
    //     console.error(e)
    // }
    // next();
    // })

    // bot.on(message('text'), async (ctx) => {
    //     // Explicit usage
    //     // await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role} - ${ctx.message.chat.id}`);
      
    //     // Using context shortcut
    //     console.log('text', ctx)
    //     await ctx.reply(`逆子无须多言 ${ctx.message.chat.id}`);
    //   });
    
    // bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
    // bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    // bot.command('投票', (ctx) => ctx.reply('Hello'));

    const me = await bot.telegram.getMe();

    console.log(me)

    if(me) {
        // @机器人操作
        bot.mention(me.username, async (ctx) => {
            try {
                if(ctx.message) {
                    const msg = ctx.message.text || ctx.message.caption
                    if(msg && msg.indexOf(`@${ctx.botInfo.username}`) !== -1) {
                        await ctx.reply(`爸爸在此 @${ctx.message.from.first_name}`);
                    }
                }
            }catch(e) {
                console.error(e)
            }
        })
        // 加入会话
        bot.on(message('new_chat_members'), async (ctx) => {
            try {
                chatIds.push(ctx.message.chat.id)
                await ctx.reply(`爸爸来了 会话id: ${ctx.message.chat.id}`);
            }catch(e) {
                console.error(e)
            }
        })
        // 离开会话
        bot.on(message('left_chat_member'), async (ctx) => {
            try {
                const idx = chatIds.indexOf(ctx.message.chat.id)
                if (idx !== -1) {
                    chatIds.splice(idx, 1)
                }
            }catch(e) {
                console.error(e)
            }
        })

        // 获取会话最新集合
        bot.command('chats', async (ctx) => {
            try {
                ctx.reply(JSON.stringify(chatIds))
            } catch(e) {
                console.error(e)
            }
        });

        bot.command('getChat', async (ctx) => {
            try {
                const rs = await bot.telegram.getChat(ctx.message.chat.id)
                ctx.reply(JSON.stringify(rs))
            } catch(e) {
                console.error(e)
            }
        });

    }
    
    bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

    function sendMessage(chatId, msg) {
        try {
            bot.telegram.sendMessage(chatId, msg)
        } catch(e) {
            console.error(e)
        }
    }

    return {
        bot,
        text: sendMessage
    }
}

