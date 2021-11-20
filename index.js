const Discord = require("discord.js");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

const prefix = "a!";

Client.on("ready", () => {
    console.log("Le bot fonctionne bien tia capté")

    const arrayOfStatus = [
        `${Client.guilds.cache.size} serveurs`,
        `Si tu es perdu fait a!help`
    ];

    let index = 0;
    setInterval(() => {
        if(index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        console.log(status);
        Client.user.setActivity(status);
        index++;
    }, 14000)
});

Client.login("process.env.TOKEN");

Client.on("messageCreate", message => {
    if (message.author.bot) return;


    if(message.member.permissions.has("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès !");
                }
                else {
                    message.reply("Impossible de bannir ce membre...");
                }
            }
        }
    }

    ///a!help
    if(message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
        .setColor("BD00FF")
        .setTitle("Liste des Commandes")
        .setAuthor("ArtoKan", "https://zupimages.net/up/21/46/f9vi.jpg")
        .setDescription("*Vous y trouverez la liste de toutes les commandes proposées par ce fabuleux bot*")
        .setThumbnail("https://zupimages.net/up/21/46/pcsc.jpg")
        .addField("**__a!help__**", "Affiche la liste des commandes")
        .addField("**__a!ping__**", "Vous renvoie pong... (oui c'est drôle)")
        .addField("**__a!ban__**", "Permet de ban un membre (uniquement réservé aux modérateurs/admin)")
        .addField("**__a!cringe__**", "Réponds avec le gif Oh No Cringe ")
        .setTimestamp()
        .setFooter("ArtoBot a été entièrement crée par ArtoKan", "https://zupimages.net/up/21/46/f9vi.jpg");

        message.channel.send({ embeds: [embed]});
    }

    ///a!ping
    else if(message.content === prefix + "ping"){
        message.reply("*...pong*");
    }

    ///a!cringe
    if(message.content === prefix + "cringe"){
        message.reply("https://tenor.com/view/oh-no-cringe-cringe-oh-no-kimo-kimmo-gif-23168319");
    }

    

    else if(message.content.includes("ratio")) {
        message.react('✅')
        message.react('🚫').catch(error => {
         console.log(error)
       });
    }

    else if(message.content.includes("oh non")) {
        message.react('🤡')
        .catch(error => {
         console.log(error)
       });
    }

    else if(message.content.includes("flop")) {
        message.react('✅')
        message.react('🚫').catch(error => {
         console.log(error)
       });
    }
    
    

});
