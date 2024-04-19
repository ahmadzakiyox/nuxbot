const fs = require('fs')
const chalk = require('chalk')

// TOKEN BOT TELEGRAM
global.token = ["6136209053:AAE2nhENFUk9eLkXQp8X1Qg17XoDTMq1Lvo"]
// BOTNAME
global.botname = 'HLXEVO'

//APIKEY XCODERS
global.xcoders = 'MoPCbxiToSFepcB'

//APIKET RSNCHAT 
global.rsnchat = 'rsnai_w3Fdj3wh0SrRs118UsBkjSRN'

//MONGODBURL 
global.MONGODB_URI = 'mongodb+srv://nuxysapi:lelang18@cluster0.cmvqrmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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