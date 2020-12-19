const { Message, MessageEmbed } = require('discord.js');
const path = require('path');


module.exports = {
  name: "anuncio",
  description: "Envía un anuncio.",
  aliases: ["",],
  filename: path.basename(__filename),
  usage: "anuncio [Mención del Canal]",
  nsfw: false,
  enabled: true,
  permissions: [""],
  botOwnerOnly: false,
  guildOnly: true,
  moderationOnly: false,
  async execute(message = new Message(), args = new Array()) {
    /*Code Here*/


    const image = "https://cdn.discordapp.com/icons/752272228334174290/d7ef1bdfc027aa07d8b43dfe2d9b8143.webp?size=512";
    const description = "Me complace anunciarles mi querida **comunidad de Exiliados** que la ciudad de **Desterrados** tiene fecha inaugural **¡Viernes 06 de Noviembre del 2020 a las 18:00 horas!** ¡No te la pierdas!" +
      "\n\nLa ciudad cuenta con una gran variedad de empleos, tales como; **Delivery**, **Limpiador de Piscinas**, **Minero**, **Limpia Vidrios**, ¡Incluso puedes trabajar como **Correos de Chile!**" +

      "\n\nLa **economía** utilizada en la ciudad es **Totalmente Chilena**." +
      "\n**Vehículos exclusivos**." +

      "\n\nLa ciudad cuenta con las siguientes facciones legales: **Carabineros, SAMU, Mecánicos y Taxistas.**" +

      "\n\nSi deseas unirte a Desterrados RP, o dar una visita a la ciudad, puedes hacer click [-> aquí <-](https://acortar.link/desterrados) para entrar directamente al servidor (Debes tener el cliente de FiveM instalado)." +

      "\n\nTe recomendamos unirte al Servidor de Discord [-> haciendo click aqui <-](https://discord.gg/4N47dSD) donde te podrás informar de los cambios que ocurran y donde podrás resolver dudas conversando con el Staff.";

    const anuncio = new MessageEmbed()
      .setAuthor("Desterrados RP (FiveM)", image, "https://acortar.link/desterrados")
      .setTitle("¡Tenemos servidor oficial de Roleplay!")
      .setDescription(description)
      .setThumbnail(image)
      .setFooter("¡Te esperamos ciudadano!")
      .setColor("GREEN")
      .setTimestamp();



    const channel = message.mentions.channels.first() || message.mentions.users.first();


    if (!channel) return message.channel.send(`Debes mencionar un canal o un usuario para enviarle el anuncio.`);
    const everyone = message.guild.roles.everyone;
    return channel.send(`${everyone}`, { embed: anuncio });

  }
}