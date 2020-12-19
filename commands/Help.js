const { Message, MessageEmbed, Util } = require('discord.js');
const path = require('path');

module.exports = {
  name: "help",
  aliases: [],
  description: "Comando de ayuda.",
  filename: path.basename(__filename),
  nsfw: false,
  enabled: true,
  permissions: [],
  usage: "help (comando)",
  guildOnly: false,
  botOwnerOnly: false,
  moderationOnly: true,
  cooldown: 5,
  async execute(message = new Message(), args = new Array()) {
    //For now lets just return a message.
    const { client, guild, channel, author } = message;

    const prefix = "!";
    const { commands } = client;

    if (args[0]) {
      const command = commands.get(args[0]) || commands.find(c => c.aliases.includes(args[0]));
      if (!command) return channel.send("No encontré un comando con ese nombre.");

      const commandUsage = new MessageEmbed()
        .setTitle(`Comando: ${args[0].toUpperCase()}`)
        .setDescription(command.description)
        .addField("Modo de uso:", `\`${prefix}${command.usage}\``)
        .addField("Cooldown:", `${command.cooldown || 2} segundos.`)
        .setColor("BLUE");

      if (command.name !== 'neko') commandUsage.setFooter(`Aliases: ${command.aliases.join(", ")}`);
      else commandUsage.addField('Endpoints:', ` \`\`\`\n${command.aliases.join(", ")}\`\`\``);
      return channel.send(commandUsage);
    }

    let description = "";

    commands.forEach(command => {
      if (command.botOwnerOnly || command.exclusive || !command.enabled)
        return;

      description += `\`${prefix}${command.usage}\`\n${command.description}\n\n`
    });

    const descriptions = Util.splitMessage(description, { char: '\n\n' });
    let embeds = [];

    for (section of descriptions) {
      embeds.push(
        new MessageEmbed()
          .setTitle(`Prefijo: **!**`)
          .setDescription(section)
          .setColor("BLUE")
      );
    }

    try {
      for (embed of embeds) {
        await author.send(embed);
      }

      if (message.channel.type !== "dm")
        return message.reply('¡Te he enviado mi lista de comandos por mensaje privado!')
    } catch (e) {
      console.log(e);
      console.log("No puedo mensajear a este usuario.");
      return message.reply('Al parecer no puedo enviarte mensajes privados, ¿Los tienes desactivados?');
    }
  }
}