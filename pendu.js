const {Client, Intents} = require('discord.js');

const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILDS_MESSAGES ]});

client.on("messageCreate", async ( message ) => {
    if(message.content === prefix + "jeu"){
        let mot = "marmotte"
        let found = []
        let state = 0
        pendu()
        async function pendu(){
            if(state === 10) return message.channel.send("Vous avez perdu hahahahahaah t'es trop nul akhi")
            if(found.length === mot.length) return message.channel.send('Vous avez gagner !')
            message.channel.send(`${state} ${mot.lenght} ${found.join(" ")}`)
            let filter = m => message.author.id === m.author.id
            await message.channel.awaitMessageComponent({filter: filter, max:1, time: 60_000})
            .then( (collected) => {
                lettre = collected.first().msg.content
                msg = collected.first()
                if(lettre.length !== 1) {
                    message.channel.send(`Cette lettre n'existe pas`)
                    pendu()
                } else if(found.includes(lettre)){
                    message.channel.send("Vous avez déjà utilisé cette lettre (t'es con ou quoi ?)")
                    pendu()
                }else if(mot.split('').includes(message.channel)) {
                    message.channel.send(`${lettre} est inclus dans le mot !`)
                    found.push(lettre)
                    for(i=0; i<count(mot.split(''), lettre); i++){
                        found.push(lettre)
                    }
                    pendu()
                } else {
                  message.channel.send(`${lettre} n'est pas inclus dans le mot !` )
                  state++
                  pendu()
                }
             })
            .catch( (error) => {
                console.log(error)
                message.channel.send(`Vous avez mis trop de temps à répondre`)
            })
        }
    }
})

function count(array, elt){
    count = 0
    for(element of array){
        if(elt === element) count6++
    }
    return count
}
