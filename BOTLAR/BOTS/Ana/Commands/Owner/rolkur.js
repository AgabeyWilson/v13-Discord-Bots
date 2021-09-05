const roleBackup = require("../../../../Database/Role");
const { rolKur } = require("../../../../Helpers/BackupFunction")
class RolKur extends Command {
  constructor(client) {
    super(client, {
      name: "rolkur",
      aliases: ["rolkur"],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    if (!args[0] || isNaN(args[0])) return message.channel.send({ embeds: [embed.setDescription("Lütfen bir rol ID'si belirtiniz!")] });
    await roleBackup.findOne({ roleID: args[0] }, async (err, data) => {
      if (!data) return message.channel.send({ embeds: [embed.setDescription("Belirtilen rol ID'sine ait veri bulunamadı!")] });
      const newRole = await message.guild.roles.create({
        name: data.name,
        color: data.color,
        hoist: data.hoist,
        permissions: data.permissions,
        position: data.position,
        mentionable: data.mentionable,
        reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
      });
      await message.channel.send({ embeds: [embed.setDescription(`<@&${newRole.id}> (\`${newRole.id}\`) isimli rol oluşturuldu ${emojiler.mavionay}\n Rol üyelerine dağıtılmaya ve kanal izinleri eklenmeye başlanıyor.`)] })
      rolKur(args[0], newRole)
    });
  }
}

module.exports = RolKur