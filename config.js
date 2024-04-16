const fs = require('fs')
const chalk = require('chalk')

{
// TOKEN BOT TELEGRAM
global.token = ["BOT_TOKEN"]

// BOTNAME
global.botname = 'BOT_NAME'

//APIKEY XCODERS
global.xcoders = 'YOUR_APIKEY'

//MONGODBURL 
global.MONGODB_URI = 'YOUR_URL'

//APIKET RSNCHAT 
global.rsnchat = 'YOUR_APIKEY'

//OTHER 
global.owner = 'YOUR_USERNAME_TELEGRAM'
}


global.wait = '⏳ Mohon tunggu sebentar'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})