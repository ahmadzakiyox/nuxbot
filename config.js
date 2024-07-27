const fs = require('fs')
const chalk = require('chalk')

// TOKEN BOT TELEGRAM
global.token = ["YOUR API BOT"]

// BOTNAME
global.botname = 'YOUR BOT NAME'

// DIGITAL OCEAN API FOR CONTROLER
global.doapi = 'YOUR DO API'

//APIKEY XCODERS
global.xcoders = 'YOUR API XCODERS'

//APIKET RSNCHAT 
global.rsnchat = 'YOUR API RSNCHAT'

//MONGODBURL 
global.MONGODB_URI = 'YOUR MONGODB API'

//OTHER 
global.owner = 'ahmadzakiyo'
global.wait = '⏳ Mohon tunggu sebentar'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
