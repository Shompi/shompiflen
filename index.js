const { MessageEmbed, Collection, Client } = require('discord.js');
const { ShompiFlen } = require('../tokens/tokens');
const fs = require('fs');
const client = new Client();
client.commands = new Collection();
const PREFIX = "s!";
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);

  client.commands.set(command.name, command);
}

client.on("message", (message) => {

  if (message.author.id !== "166263335220805634") return;
  const { channel } = message;

  let args;

  args = message.content.slice(PREFIX.length).split(/ +/);

  console.log(args);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(c => c.aliases.includes(commandName));
  if (!command) return;

  if (command.guildOnly && !message.guild) return message.channel.send("Este comando solo se puede usar en Guilds.");


  try {
    return command.execute(message, args);
  }
  catch (e) {
    console.log(e);
    return channel.send(`¡Ocurrió un error en la ejecución de este comando!`);
  }

});

client.on("ready", async () => {
  console.log("ShompiFlen está listo!");

});

client.login(ShompiFlen);