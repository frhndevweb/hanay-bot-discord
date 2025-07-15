// === BLOK 1 ===
// ---------------
// IMPORT & SETUP
import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import fs from 'fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

// === DAFTAR SLASH COMMAND (FULL) ===

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Tes bot online.'),
  new SlashCommandBuilder().setName('secret').setDescription('Tes akses Owner/Admin.'),
  new SlashCommandBuilder().setName('kick').setDescription('Kick member.')
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true)),
  new SlashCommandBuilder().setName('ban').setDescription('Ban member.')
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true)),
  new SlashCommandBuilder().setName('timeout').setDescription('Timeout user sementara.')
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true))
    .addIntegerOption(opt => opt.setName('duration').setDescription('Durasi detik').setRequired(true)),
  new SlashCommandBuilder().setName('clear').setDescription('Hapus pesan.')
    .addIntegerOption(opt => opt.setName('count').setDescription('Jumlah').setRequired(true)),
  new SlashCommandBuilder().setName('announce').setDescription('Pengumuman ke channel.')
    .addChannelOption(opt => opt.setName('channel').setDescription('Channel tujuan').setRequired(true))
    .addStringOption(opt => opt.setName('pesan').setDescription('Isi pengumuman').setRequired(true)),
  new SlashCommandBuilder().setName('autorole').setDescription('Set role join otomatis.')
    .addRoleOption(opt => opt.setName('role').setDescription('Role').setRequired(true)),
  new SlashCommandBuilder().setName('mute').setDescription('Mute member.')
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true)),
  new SlashCommandBuilder().setName('unmute').setDescription('Unmute member.')
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true)),
  new SlashCommandBuilder().setName('stats').setDescription('Jumlah member & bot.'),
  new SlashCommandBuilder().setName('setupbadword').setDescription('Tambah kata toxic.')
    .addStringOption(opt => opt.setName('kata').setDescription('Kata').setRequired(true)),
  new SlashCommandBuilder().setName('warn').setDescription('Beri warning.')
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true)),
  new SlashCommandBuilder().setName('warnings').setDescription('Lihat warning user.')
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true)),
  new SlashCommandBuilder().setName('removewarn').setDescription('Hapus warning user.')
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true)),
  new SlashCommandBuilder().setName('slowmode').setDescription('Set slowmode.')
    .addIntegerOption(opt => opt.setName('seconds').setDescription('Detik').setRequired(true)),
  new SlashCommandBuilder().setName('lock').setDescription('Lock channel ini.'),
  new SlashCommandBuilder().setName('unlock').setDescription('Unlock channel ini.'),
  new SlashCommandBuilder().setName('say').setDescription('Bot kirim embed.')
    .addStringOption(opt => opt.setName('text').setDescription('Isi teks').setRequired(true)),
  new SlashCommandBuilder().setName('poll').setDescription('Buat voting.')
    .addStringOption(opt => opt.setName('question').setDescription('Pertanyaan').setRequired(true)),
  new SlashCommandBuilder().setName('serverinfo').setDescription('Info server.'),
  new SlashCommandBuilder().setName('userinfo').setDescription('Info user.')
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true)),
  new SlashCommandBuilder().setName('role').setDescription('Add/remove role.')
    .addStringOption(opt => opt.setName('mode').setDescription('add/remove').setRequired(true))
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true))
    .addRoleOption(opt => opt.setName('role').setDescription('Role').setRequired(true)),
  new SlashCommandBuilder().setName('nick').setDescription('Ganti nickname.')
    .addUserOption(opt => opt.setName('target').setDescription('User').setRequired(true))
    .addStringOption(opt => opt.setName('nick').setDescription('Nickname baru').setRequired(true)),
  new SlashCommandBuilder().setName('welcome').setDescription('Set welcome msg.')
    .addStringOption(opt => opt.setName('pesan').setDescription('Pesan').setRequired(true)),
  new SlashCommandBuilder().setName('goodbye').setDescription('Set goodbye msg.')
    .addStringOption(opt => opt.setName('pesan').setDescription('Pesan').setRequired(true)),
  new SlashCommandBuilder().setName('logs').setDescription('Set channel log.')
    .addChannelOption(opt => opt.setName('channel').setDescription('Channel log').setRequired(true)),
  new SlashCommandBuilder().setName('backup').setDescription('Backup config.')
    .addStringOption(opt => opt.setName('mode').setDescription('create/load').setRequired(true)),
  new SlashCommandBuilder().setName('invite').setDescription('Link invite server.'),
  new SlashCommandBuilder().setName('botinfo').setDescription('Info bot.'),
  new SlashCommandBuilder().setName('report').setDescription('Lapor bug.')
    .addStringOption(opt => opt.setName('teks').setDescription('Isi bug').setRequired(true)),
  new SlashCommandBuilder().setName('suggest').setDescription('Kirim saran.')
    .addStringOption(opt => opt.setName('teks').setDescription('Isi saran').setRequired(true)),
  new SlashCommandBuilder().setName('trigger').setDescription('Tambah trigger.')
    .addStringOption(opt => opt.setName('input').setDescription('Kata trigger').setRequired(true))
    .addStringOption(opt => opt.setName('reply').setDescription('Balasan').setRequired(true)),
  new SlashCommandBuilder()
    .setName('reactionroles')
    .setDescription('Buat reaction roles.')
    .addChannelOption(opt => opt.setName('channel').setDescription('Channel tujuan').setRequired(true))
    .addStringOption(opt => opt.setName('pesan').setDescription('Isi embed').setRequired(true))
    .addStringOption(opt => opt.setName('emoji').setDescription('Emoji react').setRequired(true))
    .addRoleOption(opt => opt.setName('role').setDescription('Role yang diberikan').setRequired(true))
].map(cmd => cmd.toJSON());

// === BLOK 2 ===
// -----------------
// REGISTER COMMANDS KE GUILD
const rest = new REST({ version: '10' }).setToken(config.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Semua Slash Command berhasil di-register ke server!');
  } catch (err) {
    console.error(err);
  }
})();

// === BOT READY EVENT ===
client.once('ready', () => {
  console.log(`🤖 Bot aktif sebagai ${client.user.tag}`);
});

// === UTILS ===
// Cek Owner/Admin
function isAdmin(member) {
  return member.id === config.OWNER_ID || member.roles.cache.has(config.ADMIN_ROLE_ID);
}

// Cek protected user
function isProtected(member) {
  return member.id === config.OWNER_ID || member.roles.cache.has(config.ADMIN_ROLE_ID);
}

// Log ke channel log
function logAction(teks) {
  const logChannel = client.channels.cache.get(config.LOG_CHANNEL_ID);
  if (logChannel) logChannel.send(`📌 ${teks}`);
}

// === BLOK 3 ===
// ---------------------------------------
// HANDLE SEMUA COMMAND
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const member = interaction.member;
  const admin = isAdmin(member);

  switch (interaction.commandName) {

    case 'ping':
      return interaction.reply('🏓 Pong! Bot aktif.');

    case 'secret':
      return admin
        ? interaction.reply('✅ Akses Owner/Admin diterima.')
        : interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });

    case 'kick': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const user = interaction.options.getUser('target');
      const target = interaction.guild.members.cache.get(user.id);
      if (isProtected(target)) return interaction.reply('❌ Target Owner/Admin dilindungi.');
      await target.kick();
      interaction.reply(`👢 ${user.tag} di-kick.`);
      logAction(`${interaction.user.tag} kick ${user.tag}`);
      break;
    }

    case 'ban': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const user = interaction.options.getUser('target');
      const target = interaction.guild.members.cache.get(user.id);
      if (isProtected(target)) return interaction.reply('❌ Target Owner/Admin dilindungi.');
      await target.ban();
      interaction.reply(`⛔ ${user.tag} di-ban.`);
      logAction(`${interaction.user.tag} ban ${user.tag}`);
      break;
    }

    case 'timeout': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const user = interaction.options.getUser('target');
      const duration = interaction.options.getInteger('duration') * 1000;
      const target = interaction.guild.members.cache.get(user.id);
      if (isProtected(target)) return interaction.reply('❌ Target Owner/Admin dilindungi.');
      await target.timeout(duration, 'Manual timeout');
      interaction.reply(`⏳ ${user.tag} di-timeout ${duration / 1000}s.`);
      logAction(`${interaction.user.tag} timeout ${user.tag} ${duration / 1000}s`);
      break;
    }

    case 'clear': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const count = interaction.options.getInteger('count');
      if (count < 1 || count > 100) return interaction.reply({ content: '❌ Jumlah 1–100.', ephemeral: true });
      await interaction.channel.bulkDelete(count, true);
      interaction.reply({ content: `🧹 ${count} pesan dihapus!`, ephemeral: true });
      logAction(`${interaction.user.tag} clear ${count} pesan`);
      break;
    }

    case 'announce': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const channel = interaction.options.getChannel('channel');
      const pesan = interaction.options.getString('pesan');
      const embed = new EmbedBuilder()
        .setTitle('📢 Pengumuman')
        .setDescription(pesan)
        .setColor('Blue')
        .setTimestamp();
      channel.send({ embeds: [embed] });
      interaction.reply({ content: `✅ Pengumuman terkirim ke ${channel}`, ephemeral: true });
      logAction(`${interaction.user.tag} announce ke ${channel.name}`);
      break;
    }

    case 'autorole': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const role = interaction.options.getRole('role');
      config.AUTOROLE_ID = role.id;
      fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
      interaction.reply(`✅ Autorole di-set ke ${role.name}`);
      logAction(`${interaction.user.tag} set autorole ke ${role.name}`);
      break;
    }

    case 'mute': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const user = interaction.options.getUser('target');
      const target = interaction.guild.members.cache.get(user.id);
      if (isProtected(target)) return interaction.reply('❌ Target Owner/Admin dilindungi.');
      const muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
      if (!muteRole) return interaction.reply('❌ Role Muted tidak ditemukan.');
      target.roles.add(muteRole);
      interaction.reply(`🔇 ${user.tag} di-mute.`);
      logAction(`${interaction.user.tag} mute ${user.tag}`);
      break;
    }

    case 'unmute': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const user = interaction.options.getUser('target');
      const target = interaction.guild.members.cache.get(user.id);
      const muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
      if (!muteRole) return interaction.reply('❌ Role Muted tidak ditemukan.');
      target.roles.remove(muteRole);
      interaction.reply(`🔊 ${user.tag} di-unmute.`);
      logAction(`${interaction.user.tag} unmute ${user.tag}`);
      break;
    }

    case 'stats': {
      const total = interaction.guild.memberCount;
      const bots = interaction.guild.members.cache.filter(m => m.user.bot).size;
      interaction.reply(`👥 Member: ${total}\n🤖 Bot: ${bots}`);
      break;
    }

    case 'setupbadword': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const kata = interaction.options.getString('kata').toLowerCase();
      const data = JSON.parse(fs.readFileSync('./badwords.json'));
      if (!data.words.includes(kata)) {
        data.words.push(kata);
        fs.writeFileSync('./badwords.json', JSON.stringify(data, null, 2));
      }
      interaction.reply(`🚫 Badword "${kata}" ditambahkan.`);
      logAction(`${interaction.user.tag} tambah badword "${kata}"`);
      break;
    }

    case 'warn': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const user = interaction.options.getUser('target');
      const target = interaction.guild.members.cache.get(user.id);
      if (isProtected(target)) return interaction.reply('❌ Target Owner/Admin dilindungi.');
      const warnings = JSON.parse(fs.readFileSync('./warnings.json'));
      warnings[user.id] = (warnings[user.id] || 0) + 1;
      fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 2));
      interaction.reply(`⚠️ ${user.tag} dapat warning. Total: ${warnings[user.id]}`);
      logAction(`${interaction.user.tag} warn ${user.tag} (Total: ${warnings[user.id]})`);
      break;
    }

        case 'warnings': {
      const user = interaction.options.getUser('target');
      const warnings = JSON.parse(fs.readFileSync('./warnings.json'));
      const count = warnings[user.id] || 0;
      interaction.reply(`⚠️ ${user.tag} punya ${count} warning.`);
      break;
    }

    case 'removewarn': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const user = interaction.options.getUser('target');
      const warnings = JSON.parse(fs.readFileSync('./warnings.json'));
      warnings[user.id] = 0;
      fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 2));
      interaction.reply(`✅ Warning ${user.tag} di-reset.`);
      logAction(`${interaction.user.tag} reset warning ${user.tag}`);
      break;
    }

    case 'slowmode': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const seconds = interaction.options.getInteger('seconds');
      interaction.channel.setRateLimitPerUser(seconds);
      interaction.reply(`🐌 Slowmode di channel ini di-set ${seconds} detik.`);
      logAction(`${interaction.user.tag} set slowmode ${seconds}s`);
      break;
    }

    case 'lock': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      await interaction.channel.permissionOverwrites.create(interaction.guild.roles.everyone, { SendMessages: false });
      interaction.reply('🔒 Channel di-lock.');
      logAction(`${interaction.user.tag} lock channel`);
      break;
    }

    case 'unlock': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      await interaction.channel.permissionOverwrites.create(interaction.guild.roles.everyone, { SendMessages: true });
      interaction.reply('🔓 Channel di-unlock.');
      logAction(`${interaction.user.tag} unlock channel`);
      break;
    }

    case 'say': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const text = interaction.options.getString('text');
      const embed = new EmbedBuilder()
        .setDescription(text)
        .setColor('Random');
      await interaction.channel.send({ embeds: [embed] });
      interaction.reply({ content: '📢 Pesan embed terkirim!', ephemeral: true });
      logAction(`${interaction.user.tag} pakai /say`);
      break;
    }

    case 'poll': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const question = interaction.options.getString('question');
      const msg = await interaction.channel.send(`📊 **Poll:** ${question}\n👍 = Yes | 👎 = No`);
      await msg.react('👍');
      await msg.react('👎');
      interaction.reply({ content: '✅ Poll dibuat.', ephemeral: true });
      logAction(`${interaction.user.tag} buat poll`);
      break;
    }

    case 'serverinfo': {
      const owner = await interaction.guild.fetchOwner();
      interaction.reply(`📌 **Server:** ${interaction.guild.name}\n👑 Owner: ${owner.user.tag}\n🌍 Region: ${interaction.guild.preferredLocale}\n👥 Member: ${interaction.guild.memberCount}`);
      break;
    }

    case 'userinfo': {
      const user = interaction.options.getUser('target');
      const member = await interaction.guild.members.fetch(user.id);
      interaction.reply(`🙋‍♂️ **User:** ${user.tag}\n🆔 ID: ${user.id}\n📅 Bergabung: ${member.joinedAt}`);
      break;
    }

    case 'role': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const mode = interaction.options.getString('mode');
      const user = interaction.options.getUser('target');
      const role = interaction.options.getRole('role');
      const target = interaction.guild.members.cache.get(user.id);
      if (mode === 'add') {
        target.roles.add(role);
        interaction.reply(`✅ Role ${role.name} ditambahkan ke ${user.tag}.`);
        logAction(`${interaction.user.tag} tambah role ${role.name} ke ${user.tag}`);
      } else {
        target.roles.remove(role);
        interaction.reply(`✅ Role ${role.name} dihapus dari ${user.tag}.`);
        logAction(`${interaction.user.tag} hapus role ${role.name} dari ${user.tag}`);
      }
      break;
    }

    case 'nick': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const user = interaction.options.getUser('target');
      const nick = interaction.options.getString('nick');
      const target = interaction.guild.members.cache.get(user.id);
      target.setNickname(nick);
      interaction.reply(`✅ Nickname ${user.tag} diubah jadi ${nick}.`);
      logAction(`${interaction.user.tag} ganti nick ${user.tag} -> ${nick}`);
      break;
    }

    case 'welcome': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const pesan = interaction.options.getString('pesan');
      config.WELCOME = pesan;
      fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
      interaction.reply(`✅ Pesan welcome di-set.`);
      break;
    }

    case 'goodbye': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const pesan = interaction.options.getString('pesan');
      config.GOODBYE = pesan;
      fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
      interaction.reply(`✅ Pesan goodbye di-set.`);
      break;
    }

    case 'logs': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const channel = interaction.options.getChannel('channel');
      config.LOG_CHANNEL_ID = channel.id;
      fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
      interaction.reply(`✅ Channel log di-set ke ${channel}.`);
      break;
    }

    case 'backup': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const mode = interaction.options.getString('mode');
      if (mode === 'create') {
        fs.copyFileSync('./config.json', './config-backup.json');
        interaction.reply('💾 Backup dibuat.');
      } else {
        fs.copyFileSync('./config-backup.json', './config.json');
        interaction.reply('♻️ Backup di-load.');
      }
      break;
    }

    case 'invite': {
      const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 });
      interaction.reply(`🔗 Invite: ${invite.url}`);
      break;
    }

    case 'botinfo': {
      const uptime = Math.floor(process.uptime());
      const ram = process.memoryUsage().heapUsed / 1024 / 1024;
      interaction.reply(`🤖 **Bot Info:**\n⏳ Uptime: ${uptime}s\n💾 RAM: ${ram.toFixed(2)} MB`);
      break;
    }

    case 'report': {
      const teks = interaction.options.getString('teks');
      logAction(`🐞 Bug Report: ${interaction.user.tag} => ${teks}`);
      interaction.reply('✅ Laporan bug terkirim ke owner.');
      break;
    }

    case 'suggest': {
      const teks = interaction.options.getString('teks');
      logAction(`💡 Saran: ${interaction.user.tag} => ${teks}`);
      interaction.reply('✅ Saran terkirim ke channel saran.');
      break;
    }

    case 'trigger': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });
      const input = interaction.options.getString('input').toLowerCase();
      const reply = interaction.options.getString('reply');
      const triggers = JSON.parse(fs.readFileSync('./triggers.json'));
      triggers.push({ input, reply });
      fs.writeFileSync('./triggers.json', JSON.stringify(triggers, null, 2));
      interaction.reply(`✅ Trigger "${input}" => "${reply}" ditambahkan.`);
      logAction(`${interaction.user.tag} tambah trigger "${input}"`);
      break;
    }

    case 'reactionroles': {
      if (!admin) return interaction.reply({ content: '❌ Kamu bukan Owner/Admin.', ephemeral: true });

      const channel = interaction.options.getChannel('channel');
      const pesan = interaction.options.getString('pesan');
      const emoji = interaction.options.getString('emoji');
      const role = interaction.options.getRole('role');

      const embed = new EmbedBuilder()
        .setTitle('📌 Reaction Roles')
        .setDescription(pesan)
        .setColor('Green');

      const msg = await channel.send({ embeds: [embed] });
      await msg.react(emoji);

      // Simpan ke file
      const reactions = fs.existsSync('./reactions.json') ? JSON.parse(fs.readFileSync('./reactions.json')) : [];
      reactions.push({
        messageId: msg.id,
        emoji: emoji,
        roleId: role.id
      });
      fs.writeFileSync('./reactions.json', JSON.stringify(reactions, null, 2));

      interaction.reply({ content: `✅ Reaction role dibuat di ${channel}`, ephemeral: true });
      logAction(`${interaction.user.tag} buat reaction role ${emoji} => ${role.name}`);
      break;
    }
  }
});

// === BLOK 4 ===
// ---------------------------------------
// MEMBER JOIN → AUTOROLE & WELCOME
client.on('guildMemberAdd', member => {
  if (config.AUTOROLE_ID) {
    const role = member.guild.roles.cache.get(config.AUTOROLE_ID);
    if (role) {
      member.roles.add(role);
      logAction(`✅ Autorole "${role.name}" diberikan ke ${member.user.tag}`);
    }
  }
  if (config.WELCOME) {
    member.guild.systemChannel?.send(config.WELCOME.replace('{user}', `<@${member.id}>`));
  }
});

// MEMBER LEAVE → GOODBYE
client.on('guildMemberRemove', member => {
  if (config.GOODBYE) {
    member.guild.systemChannel?.send(config.GOODBYE.replace('{user}', `<@${member.id}>`));
  }
});

// CHAT MONITOR → BADWORD & TRIGGER
client.on('messageCreate', message => {
  if (message.author.bot) return;

  // BADWORD
  const badwords = JSON.parse(fs.readFileSync('./badwords.json')).words;
  const found = badwords.find(w => message.content.toLowerCase().includes(w));
  if (found) {
    message.delete();
    message.channel.send(`🚫 Pesan berisi kata terlarang!`);
    const member = message.member;
    if (!isProtected(member)) {
      member.timeout(60 * 1000, 'Kata terlarang');
      message.channel.send(`⏳ ${member.user.tag} timeout 1 menit karena "${found}"`);
    }
    logAction(`Badword "${found}" di ${message.author.tag}`);
  }

  // TRIGGER
  const triggers = JSON.parse(fs.readFileSync('./triggers.json'));
  triggers.forEach(t => {
    if (message.content.toLowerCase().includes(t.input)) {
      message.reply(t.reply);
      logAction(`Trigger "${t.input}" dibalas di ${message.author.tag}`);
    }
  });
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;

  const reactions = JSON.parse(fs.readFileSync('./reactions.json'));
  const match = reactions.find(r => r.messageId === reaction.message.id && r.emoji === reaction.emoji.name);
  if (match) {
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    member.roles.add(match.roleId);
    logAction(`✅ ${user.tag} react ${reaction.emoji.name} → role ditambah.`);
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (user.bot) return;

  const reactions = JSON.parse(fs.readFileSync('./reactions.json'));
  const match = reactions.find(r => r.messageId === reaction.message.id && r.emoji === reaction.emoji.name);
  if (match) {
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    member.roles.remove(match.roleId);
    logAction(`❌ ${user.tag} unreact ${reaction.emoji.name} → role dihapus.`);
  }
});

client.login(config.TOKEN);
