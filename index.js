//=============Libray/=============
require('./config')
require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const chalk = require('chalk');
const { remini } = require('./lib/remini')
const fs = require('fs');
const download = require('download');
const bch = require("@bochilteam/scraper")
const axios = require("axios");
const figlet = require('figlet');
const os = require('os');
const countryFlags = require('./lib/flag');
const { uploadByUrl } = require('telegraph-uploader')
const telefile = require('telefile')
const s = require('./lib/scraper')
const { tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer } = require('./lib/function')
const nayan = require("nayan-server");
const fetch = require('node-fetch')
const mongoose = require('mongoose');
const { Hercai } = require('hercai');
const herc = new Hercai();
const { RsnChat } = require("rsnchat");
const rsnchat = new RsnChat(global.rsnchat);
//=============CONFIG=============
const bot = new Telegraf(global.token);
let wait = '⏳ Mohon tunggu sebentar'
//=============FS=============
const {
    simple
} = require('./lib/myfunc')

const filesDirectory = './img/';
let premiumUsers = {};

//=============Database=============// 
// Koneksi ke database MongoDB
mongoose.connect(global.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Mongoose schema untuk user
const UserSchema = new mongoose.Schema({
  username: String,
  isPremium: Boolean,
  premiumUntil: Date
});

const User = mongoose.model('User', UserSchema);

bot.use((ctx, next) => {
  const timestamp = new Date().toLocaleTimeString();
  const username = ctx.message.from.username || 'Unknown User';

  console.log(`[${timestamp}] User: @${username}, Command: ${ctx.message.text}`);
  next();
});

bot.use(async (ctx, next) => {
  const chatId = ctx.message.chat.id;
  console.log(`ID CHAT: ${chatId}`);
  await next();
});

bot.start((ctx) => {
const username = ctx.message.from.username;
const id = ctx.message.message_id;
ctx.reply(`Halo ${username}! Nama saya ${global.botname} Saya adalah Bot Telegram multi fungsi! Klik /menu untuk mengetahui lebih lanjut tentang cara menggunakan bot ini.

Kirim perintah /privacy untuk melihat syarat dan ketentuan penggunaan bot.
`, { reply_to_message_id: id })});

bot.command('menu', async (ctx) => {
  ctx.reply(`╭─❒ 「 Bot Info 」 
├ Creator :  [@ahmadzakiyo]
├ Sponsored :  [@BotFather]
├ Memory Used : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
├ Hostname : ${os.hostname()}
├ Platform : ${os.platform()}
╰❒ Runtime : ${simple.runtime(process.uptime())} 

╭─❒ 「 Downloader menu 」 
├ /ig link
├ /fb link
├ /ytmp3 link
├ /ytmp4 link
├ /tiktokaudio
├ /tiktok
╰❒ 

╭─❒ 「 Artificial Intelegen chat 」 
├ /ai 「 Command 」
├ /gemini 「 Command 」
├ /bard 「 Command 」
╰❒ 

╭─❒ 「 Artificial Intelegen Image 」 
├ /prodia「 Command 」  
├ /lexica「 Command 」
├ /prodia「 Command 」
├ /midjourney「 Command 」
├ /dalle「 Command 」
├ /absol「 Command 」
├ /kandin「 Command 」
├ /icon「 Command 」
╰❒ 

╭─❒ 「 Search」 
├ /pin 
├ /happymood 
├ /kusonime 「 Anime 」
├ /google 「 Comming Soon 」 
╰❒

╭─❒ 「 Stalking 」 
├ /igstalk 「 Username 」 
├ /githubstalk 「 Username 」 
├ /-
├ /-
╰❒ 

╭─❒ 「 Maker 」 
├ /badut 「 Reply Image 」 
├ /removebg「 Reply Image 」 
├ /patrick「 Reply Image 」 
├ /trigger「 Reply Image 」 
├ /tolol「 Text 」 
├ /nulis「 Text 」 
├ /gura「 Text 」 
├ /ren「 Text 」 
├ /kaneki「 Text 」 
├ /q「 Text 」 
├ /-
╰❒ 

╭─❒ 「  Tools 」 
├ /hd「 image 」
├ /upscale「 image 」
├ /ssweb「 image 」
├ /removebg「 image 」
├ /ip 「 Ip/Domain 」
├ /kenonwa 「 +62xxxxxxxx 」「 Premium 」
├ /cekprem「 username 」
├ /bin 「 Number 」 
╰❒ 

╭─❒ 「  Random 」 
├ /passgen「 Generate 」
├ /-
├ /-
╰❒ 

╭─❒ 「 Owner 」 
├ /addprem「 Username 」「 Day 」 
├ /-
├ /-
╰❒ `,
Markup.inlineKeyboard([
    Markup.button.url('🤖SOURCE CODE BOT🤖', 'https://github.com/ahmadzakiyox/nuxbot'),
  ]))});

//==========DOWNLOADER==========
bot.command('tiktok', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) {
    return ctx.reply('Gunakan perintah /tiktok [Link] untuk mendownload Video.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  try {
    const info = await api.downloader.tiktok(url)
                        ctx.replyWithVideo({
                            url: info.nowm
                        }, {
                            caption: 'Video Berhasil Di unduh'
                        })
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('tiktokaudio', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) {
    return ctx.reply('Gunakan perintah /tiktokaudio [Link] untuk mendownload Audio.', { reply_to_message_id: ctx.message.message_id });
  }
  try {
    const info = await api.downloader.tiktok(url)
                        ctx.replyWithAudio({
                          url: info.audio
                        }, {
                            caption: 'Audio Berhasil Di unduh'
                        })
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('fb', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) {
    return ctx.reply('Gunakan perintah /fb [Link] untuk mendownload Video.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  try {
    const info = await bch.snapsave(url).then(async(result)=> {
                for(let i of result)
                        {
                        ctx.replyWithVideo({
                            url: i.url
                        }, {
                            caption: 'Video Berhasil Di unduh'
                        })
                }
    })
                //console.log(info)
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('ig', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) {
    return ctx.reply('Gunakan perintah /ig [Link] untuk mendownload Video.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  try {
    const info = await bch.snapsave(url)   .then(async(result)=> {
                for(let i of result)
                        {
                        ctx.replyWithVideo({
                            url: i.url
                        }, {
                            caption: 'Video Berhasil Di unduh'
                        })
                }
    })
                //console.log(info)
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('ytmp3', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) {
    return ctx.reply('Gunakan perintah /ytmp3 [Link] untuk mendownload MP3.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  try {
    const info = await bch.youtubedlv2(url)
    const hasil = await data.audio['128kbps'].download()
                        ctx.replyWithAudio({
                            url: hasil
                        })
   //console.log(info)
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('ytmp4', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) {
    return ctx.reply('Gunakan perintah /ytmp4 [Link] untuk mendownload Video.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  try {
    const info = await bch.youtubedlv2(url)
    const hasil = await info.audio['720p'].download()
                        ctx.replyWithVideo({
                            url: hasil
                        })
   console.log(info)
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('capcut', (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) {
    return ctx.reply('Gunakan perintah /capcut [Link] untuk mendownload Video.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  if (!url) {
    return ctx.reply('Silakan sertakan tautan video CapCut.', { reply_to_message_id: ctx.message.message_id });
  }

  fetchJson(`https://api.sanzy.bar/api/download?type=aiodl&q=${url}`)
    .then(response => {
      const data = response.data;
      
      // Dapatkan tautan video dalam kualitas terbaik
      //const videoUrl = data['url']
      
      // Kirim video ke pengguna
      Object.keys(data).forEach(key => {
      console.log(data[key])
      ctx.replyWithVideo({ url: data.medias.url });
    });
      //ctx.replyWithVideo({ url: videoUrl });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      ctx.reply('Maaf, terjadi kesalahan saat mengunduh video.', { reply_to_message_id: ctx.message.message_id });
    });
});

//==========AI==========
bot.command('ai', async (ctx) => {
  const text = ctx.message.text.replace('').trim();

  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  
  try {
    let ai = await herc.question({model:"v3",content: text }).then(response => {
      ctx.reply(response.reply.replace(/[_*[\]()~>#\+\-=|{}.!]/g, "\\$&"), {parse_mode: "MarkdownV2"})
    });
    
    console.log(chalk.green('BERHASIL'));;
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('kandin', async (ctx) => {
  const que = ctx.message.text.replace('').trim();
  const nge = "blury, bad quality";
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  
  try {let ai = await rsnchat.kandinsky(que, nge).then(response => {
     let anjay = Buffer.from(response.image, "base64")
     ctx.replyWithPhoto({
                          source: anjay
                        }, {
                            caption: 'Gambar Berhasil di buat'
                        }, { reply_to_message_id: ctx.message.message_id })
   });
    
    console.log(chalk.green('BERHASIL'));;
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('gemini', async (ctx) => {
  const text = ctx.message.text.replace('').trim();
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  
  try {
    let ai = await rsnchat.gemini(text).then(response => {
      ctx.reply(response.message.replace(/[_**[\]()~>#\+\-=|{}.!]/g, "\\$&"), {parse_mode: "MarkdownV2"})
    });
    //{ reply_to_message_id: ctx.message.message_id }
    console.log(ai)
    console.log(chalk.green('BERHASIL'));;
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('midjourney', async (ctx) => {
  const que = ctx.message.text.split(' ')[1];
  if (!que) {
    return ctx.reply('Gunakan perintah /midjourney [Prompt] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
  
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  try {
     /* Available Models */
/* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia" */
/* Default Model; "v2" */
   let ai = await herc.drawImage({model:"v4",prompt: que }).then(response => {
     ctx.replyWithPhoto({
                          url: response.url
                        }, {
                            caption: 'Gambar Berhasil di buat'
                        }, { reply_to_message_id: ctx.message.message_id })
   });
  
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('absol', async (ctx) => {
  const que = ctx.message.text.split(' ')[1];
  if (!que) {
    return ctx.reply('Gunakan perintah /absol [Prompt] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
  const nge = "blury, bad quality";
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  
  try {
   let ai = await rsnchat.absolutebeauty(que, nge).then(response => {
     let anjay = Buffer.from(response.image, "base64")
     ctx.replyWithPhoto({
                          source: anjay
                        }, {
                            caption: 'Gambar Berhasil di buat'
                        }, { reply_to_message_id: ctx.message.message_id })
   });
  console.log(ai)
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('icon', async (ctx) => {
  const que = ctx.message.text.split(' ')[1];
  if (!que) {
    return ctx.reply('Gunakan perintah /icon [Prompt] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  
  try {
   let ai = await rsnchat.icon(que).then(response => {
     let anjay = Buffer.from(response.image, "base64")
     ctx.replyWithPhoto({
                          source: anjay
                        }, { reply_to_message_id: ctx.message.message_id })
   });
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('lexica', async (ctx) => {
  const que = ctx.message.text.split(' ')[1];
  if (!que) {
    return ctx.reply('Gunakan perintah /lexica [Prompt] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
  
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  try {
     /* Available Models */
/* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia" */
/* Default Model; "v2" */
   let ai = await herc.drawImage({model:"lexica",prompt: que }).then(response => {
     ctx.replyWithPhoto({
                          url: response.url
                        }, {
                            caption: 'Gambar Berhasil di buat'
                        })
   });
  
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('dalle', async (ctx) => {
  const que = ctx.message.text.split(' ')[1];
  if (!que) {
    return ctx.reply('Gunakan perintah /dalle [Prompt] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  
  try {
     /* Available Models */
/* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia" */
/* Default Model; "v2" */
   let ai = await herc.drawImage({model:"v3",prompt: que }).then(response => {
     ctx.replyWithPhoto({
                          url: response.url
                        }, {
                            caption: 'Gambar Berhasil di buat'
                        })
   });
  
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('prodia', async (ctx) => {
  const que = ctx.message.text.split(' ')[1];
  if (!que) {
    return ctx.reply('Gunakan perintah /prodia [Prompt] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  
  try {
     /* Available Models */
/* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia" */
/* Default Model; "v2" */
   let ai = await herc.drawImage({model:"prodia",prompt: que }).then(response => {
     ctx.replyWithPhoto({
                          url: response.url
                        }, {
                            caption: 'Gambar Berhasil di buat'
                        })
   });
  
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI', { reply_to_message_id: ctx.message.message_id });
  }
});

//==========STALKING==========
bot.command('githubstalk', async (ctx) => {
  const username = ctx.message.text.split(' ')[1];
  if (!username) {
    return ctx.reply('Gunakan perintah /githubstalk [username] untuk mengetahui informasi GitHub.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })

  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const user = response.data;

    const message = `
𝗜𝗗: ${user.id}
𝗝𝗲𝗻𝗶𝘀: ${user.type}
𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${user.login}
𝗡𝗮𝗺𝗮: ${user.name || 'Tidak Di Temukan'}
𝗕𝗶𝗼: ${user.bio || 'Tidak Di Temukan'}
𝗕𝗶𝗼 𝗟𝗶𝗻𝗸: ${user.blog || 'Tidak Di Temukan'}
𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿: ${user.followers}
𝗙𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴: ${user.following}
𝗣𝘂𝗯𝗹𝗶𝗰 𝗥𝗲𝗽𝗼: ${user.public_repos}
𝗣𝘂𝗯𝗹𝗶𝗰 𝗚𝗶𝘁𝘀: ${user.public_gists}
𝗘𝗺𝗮𝗶𝗹: ${user.email || 'Tidak Di Temukan'}
𝗧𝗮𝗻𝗴𝗴𝗮𝗹 𝗣𝗲𝗺𝗯𝘂𝗮𝘁𝗮𝗻: ${user.created_at}
    `;

    console.log(chalk.green('BERHASIL'));
    ctx.replyWithPhoto({ url: user.avatar_url }, { caption: message });
  } catch (error) {
    ctx.reply('User GitHub tidak ditemukan.', { reply_to_message_id: ctx.message.message_id });
  }
});

//==========SEARCH==========
bot.command('pin', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) {
    return ctx.reply('Gunakan perintah /pin [text] untuk mencari Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
{ reply_to_message_id: ctx.message.message_id }  try {
   let { pinterest } = require('./lib/scraper')
   let search = (url)
   anu = await pinterest(search)
   result = anu[Math.floor(Math.random() * anu.length)]
                        ctx.replyWithPhoto({
                            url: result
                        }, {
                            caption: 'Nih...'
                        })
                 
   console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('happymood', async (ctx) => {
  const bin = ctx.message.text.split(' ')[1];
  if (!bin) {
    return ctx.reply('Gunakan perintah /happymod [text] untuk mencari Aplikasi.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  try {
    const hpy = await api.search.happymod(bin)
    for (let i of hpy.result) {
                   let teks = `⭔ Titile: ${i.title}\n⭔ Link : ${i.link}`
                   
               ctx.replyWithPhoto({
                 url: i.thumb
                        }, {
                 caption: teks
                        })
                   
    }
    console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error(error.message);
    ctx.reply('Maaf, terjadi kesalahan saat mengambil data HAPPYMOOD. Silakan coba lagi nanti.', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('kusonime', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) {
    return ctx.reply('Gunakan perintah /kusonime [text] untuk mencari anime.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  
  try {
    const bsk = await api.search.kusonime(url)
    
    let teks = `⭔ Judul: ${bsk.result.judul}\n⭔ Desc : ${bsk.result.desk}\n⭔ Genre : ${bsk.result.genre}\n⭔ Status : ${bsk.result.status}\n⭔ Produser : ${bsk.result.produser}\n⭔ Rate : ${bsk.result.rate}\n⭔ Type : ${bsk.result.type}\n⭔ Total Episode : ${bsk.result.total_eps}\n⭔ Durasi Per eps : ${bsk.result.durasi}\n⭔ Tanggal Rilis : ${bsk.result.tgl_rilis}`;
                   
               ctx.replyWithPhoto({
                            url: bsk.result.thumb
                        }, {
                            caption: teks
                        })
              
    //console.log(bsk)
    console.log(chalk.green('BERHASIL'));
  } catch (error) {
    console.error('Error fetching BIN data:', error.message);
    ctx.reply('Maaf, terjadi kesalahan saat mengambil data BIN. Silakan coba lagi nanti.', { reply_to_message_id: ctx.message.message_id });
  }
});

//==========MAKER==========

bot.command('telegraph', async (ctx) => {
    const message = ctx.message.reply_to_message;
    if (!message || !message.photo) {
        return ctx.reply('Mohon reply pesan dengan foto yang ingin diubah menjadi link.', { reply_to_message_id: ctx.message.message_id });
    }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })

    const photo = ctx.message.reply_to_message.photo[ctx.message.reply_to_message.photo.length - 1];
    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
  try {
    const hoh = await uploadByUrl(fileLink)
    ctx.reply(`Ini Linknya : ${hoh.link}`, { reply_to_message_id: ctx.message.message_id });
    console.log(chalk.green('BERHASIL'));
  } catch {
    ctx.reply('Maaf Terjadi kesalahan', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('badut', async (ctx) => {
  const message = ctx.message.reply_to_message;
    
    if (!message || !message.photo) {
        return ctx.reply('Mohon reply pesan dengan foto yang ingin diubah menjadi badut.', { reply_to_message_id: ctx.message.message_id });
    }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
  // Mengecek apakah caption mengandung '/hd'
    const photo = ctx.message.reply_to_message.photo[ctx.message.reply_to_message.photo.length - 1];
    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
       // Download foto
     const hoh = await uploadByUrl(fileLink)
    if(photo){
    const anu = await getBuffer(`https://xcoders-api.onrender.com/api/maker/badut3?url=${hoh.link}&apikey=${global.xcoders}`);
    //console.log(anu)
    ctx.replyWithPhoto({
                          source: anu
                        }, { reply_to_message_id: ctx.message.message_id })
    } else {
                ctx.reply('Maaf, terjadi kesalahan saat mengunggah gambar.', { reply_to_message_id: ctx.message.message_id });
            }
  //console.log("File ID foto:", fileLink);
});

bot.command('patrick', async (ctx) => {
  const message = ctx.message.reply_to_message;
    
    if (!message || !message.photo) {
        return ctx.reply('Mohon reply pesan dengan foto yang ingin diubah menjadi patrick.', { reply_to_message_id: ctx.message.message_id });
    }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
  // Mengecek apakah caption mengandung '/hd'
    const photo = ctx.message.reply_to_message.photo[ctx.message.reply_to_message.photo.length - 1];
    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
       // Download foto
     const hoh = await uploadByUrl(fileLink)
    if(photo){
    const anu = await getBuffer(`https://xcoders-api.onrender.com/api/maker/patrick-scary?url=${hoh.link}&apikey=${global.xcoders}`);
    //console.log(anu)
    ctx.replyWithPhoto({
                          source: anu
                        }, { reply_to_message_id: ctx.message.message_id })
    } else {
                ctx.reply('Maaf, terjadi kesalahan saat mengunggah gambar.', { reply_to_message_id: ctx.message.message_id });
            }
  //console.log("File ID foto:", fileLink);
});

bot.command('trigger', async (ctx) => {
  const message = ctx.message.reply_to_message;
    
    if (!message || !message.photo) {
        return ctx.reply('Mohon reply pesan dengan foto yang ingin diubah menjadi trigger.', { reply_to_message_id: ctx.message.message_id });
    }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
  // Mengecek apakah caption mengandung '/hd'
    const photo = ctx.message.reply_to_message.photo[ctx.message.reply_to_message.photo.length - 1];
    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
       // Download foto
     const hoh = await uploadByUrl(fileLink)
    if(photo){
    const anu = await getBuffer(`https://itzpire.site/maker/trigger?url=${hoh.link}`);
    //console.log(anu)
    ctx.replyWithPhoto({
                          source: anu
                        }, { reply_to_message_id: ctx.message.message_id })
    } else {
                ctx.reply('Maaf, terjadi kesalahan saat mengunggah gambar.', { reply_to_message_id: ctx.message.message_id });
            }
  //console.log("File ID foto:", fileLink);
});

bot.command('tolol', async (ctx) => { 
    const url = ctx.message.text.split(' ')[1];  
    if (!url) {
    return ctx.reply('Gunakan perintah /tolol [text] untuk membuat Sertifikat TOLOL.', { reply_to_message_id: ctx.message.message_id });
  }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    try {  
        const anu = await getBuffer(`https://xcoders-api.onrender.com/api/maker/serti-tolol?text=${url}&apikey=${global.xcoders}`);
      
        ctx.replyWithPhoto({
                          source: anu
                        }, { reply_to_message_id: ctx.message.message_id });
        //console.log('info:');
        console.log(chalk.green('BERHASIL'));;
    } catch (error) {    
        console.error(error);    
        ctx.reply('Terjadi kesalahan saat mengambil email', { reply_to_message_id: ctx.message.message_id });
    }
});

bot.command('carbon', async (ctx) => { 
    const url = ctx.message.text.split(' ')[1];  
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    try {  
        const anu = await fetchJson(`https://api.betabotz.eu.org/api/maker/carbon?text=${url}&apikey=rSL8CVDk`);
        ctx.replyWithPhoto({
                          url: anu.result
                        }, { reply_to_message_id: ctx.message.message_id });
        //console.log('info:', anu);
        console.log(chalk.green('BERHASIL'));;
    } catch (error) {    
        console.error(error);    
        ctx.reply('Terjadi kesalahan saat mengambil email', { reply_to_message_id: ctx.message.message_id });
    }
});

bot.command('gura', async (ctx) => { 
    const url = ctx.message.text.split(' ')[1];  
    if (!url) {
    return ctx.reply('Gunakan perintah /gura [text] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    try {  
        const anu = await getBuffer(`https://xcoders-api.onrender.com/api/maker/gura?text=${url}&apikey=${global.xcoders}`);
        ctx.replyWithPhoto({
                          source: anu
                        }, { reply_to_message_id: ctx.message.message_id });
        //console.log('info:');
        console.log(chalk.green('BERHASIL'));;
    } catch (error) {    
        console.error(error);    
        ctx.reply('Terjadi kesalahan saat mengambil email', { reply_to_message_id: ctx.message.message_id });
    }
});

bot.command('ren', async (ctx) => { 
    const url = ctx.message.text.split(' ')[1];  
    if (!url) {
    return ctx.reply('Gunakan perintah /ren [text] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    try {  
        const anu = await getBuffer(`https://xcoders-api.onrender.com/api/maker/ren?text=${url}&apikey=${global.xcoders}`);
        ctx.replyWithPhoto({
                          source: anu
                        }, { reply_to_message_id: ctx.message.message_id });
        //console.log('info:');
        console.log(chalk.green('BERHASIL'));;
    } catch (error) {    
        console.error(error);    
        ctx.reply('Terjadi kesalahan saat mengambil email', { reply_to_message_id: ctx.message.message_id });
    }
});

bot.command('kaneki', async (ctx) => { 
    const url = ctx.message.text.split(' ')[1];  
    if (!url) {
    return ctx.reply('Gunakan perintah /kaneki [text] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    try {  
        const anu = await getBuffer(`https://xcoders-api.onrender.com/api/maker/kaneki?text=${url}&apikey=${global.xcoders}`);
        ctx.replyWithPhoto({
                          source: anu
                        }, { reply_to_message_id: ctx.message.message_id });
        //console.log('info:');
        console.log(chalk.green('BERHASIL'));;
    } catch (error) {    
        console.error(error);    
        ctx.reply('Terjadi kesalahan saat mengambil email', { reply_to_message_id: ctx.message.message_id });
    }
});

bot.command('q', async (ctx) => { 
    const url = ctx.message.text.split(' ')[1];  
    if (!url) {
    return ctx.reply('Gunakan perintah /q [text] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    
    try {  
        const anu = await getBuffer(`https://xcoders-api.onrender.com/api/maker/quote?url=https://xcoders-api.onrender.com/images/avatar.png&username=${url}&text=xcoders+api&apikey=${global.xcoders}`);
        const emoji = '😎';
        const packTitle = 'Pack by @nuxysbot';

        await ctx.telegram.createNewStickerSet(
            ctx.message.from.id,
            packTitle,
            'sticker_name',
            anu, 
            { emojis: emoji }
        );

        ctx.reply('Sticker pack created successfully!');
        /*ctx.replyWithSticker({
                          source: anu
                        }, { reply_to_message_id: ctx.message.message_id });
        //console.log('info:');
        console.log(chalk.green('BERHASIL'));;*/
    } catch (error) {    
        console.error(error);    
        ctx.reply('Terjadi kesalahan saat mengambil email', { reply_to_message_id: ctx.message.message_id });
    }
});

//==========TOOLS==========
bot.command('ssweb', async (ctx) => { 
    const url = ctx.message.text.split(' ')[1];  
    if (!url) {
    return ctx.reply('Gunakan perintah /ssweb [Link] untuk membuat Screenshot.', { reply_to_message_id: ctx.message.message_id });
  }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    try {  
        const anu = await getBuffer(`https://xcoders-api.onrender.com/api/maker/screenshot-web?url=${url}&apikey=${global.xcoders}`);
        ctx.replyWithPhoto({
                          source: anu
                        }, { reply_to_message_id: ctx.message.message_id });
        //console.log('info:');
        console.log(chalk.green('BERHASIL'));;
    } catch (error) {    
        console.error(error);    
        ctx.reply('Terjadi kesalahan saat mengambil email', { reply_to_message_id: ctx.message.message_id });
    }
});

bot.command('upscale', async (ctx) => {
   const message = ctx.message.reply_to_message;
    
    if (!message || !message.photo) {
        return ctx.reply('Mohon reply pesan dengan foto yang ingin diubah menjadi upscale.', { reply_to_message_id: ctx.message.message_id });
    }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    const photo = ctx.message.reply_to_message.photo[ctx.message.reply_to_message.photo.length - 1];
    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
    
    if(photo){
      const model = "1"// model 1 or 2
    let giniaja = await nayan.upscale(fileLink, model);
    ctx.replyWithPhoto({
                          url: giniaja.image_url
                        }, { reply_to_message_id: ctx.message.message_id })
    } else {
                ctx.reply('Maaf, terjadi kesalahan saat mengunggah gambar.', { reply_to_message_id: ctx.message.message_id });
            }
  console.log("File ID foto:", fileLink);
});

bot.command('hd', async (ctx) => {
    const message = ctx.message.reply_to_message;
    
    if (!message || !message.photo) {
        return ctx.reply('Mohon reply pesan dengan foto yang ingin diubah menjadi hd.', { reply_to_message_id: ctx.message.message_id });
    }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    const photo = ctx.message.reply_to_message.photo[ctx.message.reply_to_message.photo.length - 1];
    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
    const img = await fetch(fileLink)
    let res = await img.buffer()
    if(photo){
    let proses = await remini(res, "enhance");
    ctx.replyWithPhoto({
                          source: proses
                        }, { reply_to_message_id: ctx.message.message_id })
    } else {
                ctx.reply('Maaf, terjadi kesalahan saat mengunggah gambar.', { reply_to_message_id: ctx.message.message_id });
            }
  console.log("File ID foto:", fileLink);
});

bot.command('removebg', async (ctx) => {
  const message = ctx.message.reply_to_message;
    
    if (!message || !message.photo) {
        return ctx.reply('Mohon reply pesan dengan foto yang ingin diubah menjadi Removebg.', { reply_to_message_id: ctx.message.message_id });
    }
    const photo = ctx.message.reply_to_message.photo[ctx.message.reply_to_message.photo.length - 1];
    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
    
    if(photo){
    let giniaja = await nayan.removebg(fileLink);
    ctx.replyWithPhoto({
                          url: giniaja.data
                        }, { reply_to_message_id: ctx.message.message_id })
    } else {
                ctx.reply('Maaf, terjadi kesalahan saat mengunggah gambar.', { reply_to_message_id: ctx.message.message_id });
            }
  console.log("File ID foto:", fileLink);
});

bot.command('ip', async (ctx) => { 
    const url = ctx.message.text.split(' ')[1];  
    if (!url) {
    return ctx.reply('Gunakan perintah /ip [ Contoh : 8.8.8.8 ] untuk membuat Gambar.', { reply_to_message_id: ctx.message.message_id });
  }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    try {  
        const anu = await nayan.ip(url)
        const ben = countryFlags[anu.data.country_code]
        let teks = `🌐IP : ${anu.data.ip}\n🔍Type IP : ${anu.data.type}\nNegara : ${anu.data.country} ${ben}\n🌍Kode Negara : ${anu.data.country_code}\n📍Daerah : ${anu.data.region}\n🏙️Kota : ${anu.data.city}\n🏢Organisasi : ${anu.data.org}\n🛜ISP : ${anu.data.isp}\n ⏳Zona waktu : ${anu.data.timezone}\n💰Mata uang: ${anu.data.currency}`
        ctx.reply(teks, { reply_to_message_id: ctx.message.message_id });
        //console.log('info:', anu.result.mails);
        console.log(chalk.green('BERHASIL'));;
    } catch (error) {    
        console.error(error);    
        ctx.reply('Terjadi kesalahan saat mengambil email', { reply_to_message_id: ctx.message.message_id });
    }
});

bot.command('kenonwa', async (ctx) => { 
    const url = ctx.message.text.split(' ')[1];  
    const username = ctx.message.from.username;
    if (!url) {
    return ctx.reply('Gunakan perintah /kenonwa [Number] untuk memproses.', { reply_to_message_id: ctx.message.message_id });
  }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
  const user = await User.findOne({ username });
  if (user && user.isPremium) {
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    try {  
        const anu = await fetchJson(`https://api.betabotz.eu.org/api/tools/kenonwa?nomor=${url}&apikey=rSL8CVDk`);
        
        ctx.reply(`Terima kasih telah melaporkan nomor ${url} WhatsApp yang bersangkutan. Kami akan segera memproses laporan Anda dan melakukan tindakan yang diperlukan untuk membantu menjaga keamanan dan kenyamanan pengguna WhatsApp. Apabila Anda memiliki informasi tambahan atau pertanyaan lain, jangan ragu untuk menghubungi kami kembali. Terima kasih atas perhatian dan kerjasamanya`)
        console.log(anu);
        console.log(chalk.green('BERHASIL'));;
    } catch (error) {    
        console.error(error);    
        ctx.reply('Terjadi kesalahan saat mengirim Email ', { reply_to_message_id: ctx.message.message_id });
    }
    } else {
        ctx.reply('Anda bukan pengguna premium. Silakan upgrade ke premium untuk menggunakan fitur ini.', { reply_to_message_id: ctx.message.message_id });
    }
});

bot.command('bin', async (ctx) => {
  const bin = ctx.message.text.split(' ')[1];
  if (!bin) {
    return ctx.reply('Gunakan perintah /bin [Number] untuk mencari data BIN.', { reply_to_message_id: ctx.message.message_id });
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })

   if (!/^\d{6}$/.test(bin)) {
    return ctx.reply('Format nomor BIN tidak valid. Harap masukkan 6 digit angka.', { reply_to_message_id: ctx.message.message_id });
  }

  try {
    const response = await axios.get(`https://data.handyapi.com/bin/${bin}`);
    const binData = response.data;
    //console.log(binData)
    const flagEmoji = countryFlags[binData.Country.A2]

    const message = `BIN : ${bin}\nBrand: ${binData.Scheme}\nType : ${binData.Type}\nLevel : ${binData.CardTier}\nBank : ${binData.Issuer}\nCountry : ${binData.Country.Name} ${flagEmoji}\nNegara Bagian : ${binData.Country.Cont}\nStatus : ${binData.Status} ✔️
    `;

    ctx.reply(message);
  } catch (error) {
    console.error('Error fetching BIN data:', error.message);
    ctx.reply('Maaf, terjadi kesalahan saat mengambil data BIN. Silakan coba lagi nanti.', { reply_to_message_id: ctx.message.message_id });
  }
});

//==========GAME==========
let gameaktif = false;
bot.command('tebakgambar', async (ctx) => {
  if (gameaktif) {
    ctx.reply('Maaf, permainan sedang berjalan. Tunggu hingga selesai sebelum memulai lagi.', { reply_to_message_id: ctx.message.message_id });
    return;
  }
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
  
  gameaktif = true;
    let game = await bch.tebakgambar();
    let jawaban = game.jawaban.toLowerCase();
    
    await ctx.reply("Silahkan tebak gambar ini selama 30 detik:");
    await ctx.replyWithPhoto({ url: game.img }, { reply_to_message_id: ctx.message.message_id });
    
    const timer = setTimeout(async () => {
      if (gameaktif) {
       gameaktif = false;
        await ctx.reply(`Waktu sudah habis! Jawabannya adalah: ${jawaban}`, { reply_to_message_id: ctx.message.message_id });
      }
    }, 30000);
bot.on('text', (ctx) => {
  if (gameaktif) {
    if (ctx.message.text.toLowerCase() === game.jawaban.toLowerCase()) {
      gameaktif = false;
      ctx.reply('Selamat! Jawaban Anda benar. Permainan selesai. Gunakan command /tebakgambar untuk memulai lagi.', { reply_to_message_id: ctx.message.message_id });
    } else {
      ctx.reply('Maaf, jawaban Anda salah. Silakan coba lagi.', { reply_to_message_id: ctx.message.message_id });
    }
  }
})
});

//==========OWNER==========
bot.command('addprem', async (ctx) => {
  const ownerUsername = global.owner;
  
  if (ctx.message.from.username === global.owner) {
    let [command, username, days] = ctx.message.text.split(' ');
    days = parseInt(days);
    if (!username || !days) {
      ctx.reply('Usage: /addprem username <days>', { reply_to_message_id: ctx.message.message_id });
      return;
    }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    try {
      const user = await User.findOne({ username });
      if (!user) {
        await User.create({
          username,
          isPremium: true,
          premiumUntil: new Date(Date.now() + days * 24 * 60 * 60 * 1000)
        });
         ctx.reply(`[💰Premium Add💰]\nUser ${username} Telah di angkat menjadi user Premium Selama ${days} Hari 🎊`,  { reply_to_message_id: ctx.message.message_id });
      } else {
        user.isPremium = true;
        user.premiumUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        await user.save();
        ctx.reply(`Perpanjang masa berlaku premium untuk ${username} selama ${days} hari.`);
      }
    } catch (err) {
      console.error(err);
      ctx.reply('Terjadi kesalahan saat menambahkan pengguna premium.', { reply_to_message_id: ctx.message.message_id });
    }
  } else {
    ctx.reply('Hanya Owner yang dapat melakukan ini', { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command('delprem', async (ctx) => {
  let owner = global.owner;
  if (ctx.message.from.username === global.owner) {
    const [, username] = ctx.message.text.split(' ');
    if (!username) {
      ctx.reply('Usage: /delprem username', { reply_to_message_id: ctx.message.message_id });
      return;
    }
    ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })
    
    await User.deleteOne({ username });
    ctx.reply(`Pengguna ${username} telah dihapus dari daftar premium.`);
  } else {
    ctx.reply('Hanya Owner yang dapat melakukan ini', { reply_to_message_id: ctx.message.message_id });
  }
});
bot.command('cekprem', async (ctx) => {
  const username = ctx.message.from.username;
  const user = await User.findOne({ username });
  ctx.reply(wait, { reply_to_message_id: ctx.message.message_id })

  if (user && user.isPremium) {
    const remainingTimeMs = user.premiumUntil - Date.now();
        const remainingDays = Math.floor(remainingTimeMs / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((remainingTimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60)); // Menghitung sisa waktu dalam hari
    ctx.reply(`[Premium User]\nUsername :${username}\nSisa Waktu : ${remainingDays} Hari ${remainingHours} Jam ${remainingMinutes} Menit`,  { reply_to_message_id: ctx.message.message_id });
  } else {
    ctx.reply("Anda Bukan user Premium");
  }
});
bot.command('passgen', (ctx) => {
  const password = generateRandomPassword();
  ctx.reply(`${password}`, { reply_to_message_id: ctx.message.message_id });
});

// Command '/daftargiveaway' untuk mendaftar ke giveaway
bot.command('daftargiveaway', (ctx) => {
  // Check if the user is a member of the jualbeligithub group
  if (ctx.chat.id === -1001915142805) {
    // Get the username of the user who sent the command
    const username = ctx.message.from.username;

    // Read existing data from file.json
    let data = {};
    try {
      const jsonData = fs.readFileSync('user.json');
      data = JSON.parse(jsonData);
    } catch (error) {
      console.error(error);
    }

    // Add the username to the data
    data[username] = true;

    // Write the updated data back to file.json
    fs.writeFileSync('user.json', JSON.stringify(data));

    // Reply to the user
    ctx.reply(`Terima kasih, ${username}! Kamu berhasil mendaftar giveaway.`);
  } else {
    // Reply to non-members
    ctx.reply('𝙈𝙖𝙖𝙛, 𝙥𝙚𝙧𝙞𝙣𝙩𝙖𝙝 𝙞𝙣𝙞 𝙝𝙖𝙣𝙮𝙖 𝙗𝙞𝙨𝙖 𝙙𝙞𝙜𝙪𝙣𝙖𝙠𝙖𝙣 𝙤𝙡𝙚𝙝 𝙖𝙣𝙜𝙜𝙤𝙩𝙖 𝙜𝙧𝙤𝙪𝙥 t.me/jualbeligithub', { reply_to_message_id: ctx.message.message_id });
  }
});


bot.launch();
/*
figlet('HLX BOT SIAP', function(err, data) {
  if (err) {
    console.log('Terjadi kesalahan:', err);
    return;
  }
  console.log(data);
});*/