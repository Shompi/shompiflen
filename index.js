//@ts-check

/**
 * @description Este bot no tendrá ningún tipo de prefijo, ya que utilizará la nueva utilidad implementada por Discord llamada
 * "slash-commands", osea, comandos a los que podrás acceder escribiendo "/" en algun canal de texto.
 */

const { Client } = require('discord.js');
const { ShompiFlen } = require('./tokens');

const fs = require('fs');
const client = new Client();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);

  client.commands.set(command.name, command);
}

client.on("message", (message) => {

  if (message.author.bot) return;
  const { channel } = message;
});

client.on("ready", async () => {
  console.log("ShompiFlen está listo!");

});

client.login(ShompiFlen);