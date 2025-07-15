````markdown
<p align="center">
  <img src="https://github.com/frhndevweb/hanay-bot-discord/src/hanay.png" alt="Multi-Role Guard Logo" width="150"/>
</p>

<h1 align="center">🤖 Multi-Role Guard Bot</h1>

<p align="center">
  <strong>Bot Discord serbaguna</strong> untuk <code>Moderasi</code>, <code>Reaction Roles</code>, <code>AutoRole</code>, <code>Logging</code>, dan <code>Anti-Toxic</code> filter.<br/>
  Dibuat untuk menjaga server kamu tetap aman, rapi, dan interaktif!
</p>

---

![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Discord.js](https://img.shields.io/badge/discord.js-14.x-blueviolet)
![License](https://img.shields.io/badge/License-MIT-green)
![Maintainer](https://img.shields.io/badge/Maintainer-frhndevweb.my.id-orange)

---

## ✨ Fitur Utama

✅ **Moderasi Full Slash Command (Owner/Admin only)**  
✅ **Filter kata toxic ➜ Auto delete + timeout**  
✅ **Reaction Roles ➜ Emoji = Role**  
✅ **Auto Welcome & Goodbye Message**  
✅ **Auto Role Member Baru**  
✅ **Logging ke channel log**  
✅ **Banyak Command Moderasi** ➜ Kick, Ban, Timeout, Clear, Slowmode, Lock, Unlock, Warn, Removewarn, Say Embed, Poll, Stats, ServerInfo, UserInfo, Report Bug, Suggest, Backup, Trigger, dsb.

---

## 🗂️ Struktur File

```bash
Multi-Role-Guard/
 ├─ index.js
 ├─ config.json
 ├─ badwords.json
 ├─ warnings.json
 ├─ triggers.json
 ├─ reactions.json
 ├─ package.json
 ├─ deploy-commands.js
````

---

## ⚙️ Konfigurasi

### `config.json` (Contoh)

```json
{
  "TOKEN": "ISI_TOKEN_BOT_MU",
  "CLIENT_ID": "ISI_CLIENT_ID",
  "GUILD_ID": "ISI_GUILD_ID",
  "OWNER_ID": "ISI_OWNER_ID",
  "ADMIN_ROLE_ID": "ISI_ROLE_ADMIN",
  "LOG_CHANNEL_ID": "ISI_CHANNEL_LOG",
  "AUTOROLE_ID": "ISI_ROLE_AUTOROLE",
  "WELCOME": "Selamat datang {user} di server!",
  "GOODBYE": "Selamat jalan {user}, semoga kembali!"
}
```

> **📌 Note:**
> 🔑 `TOKEN` ➜ Token Bot (Developer Portal ➜ Tab Bot)
> 🆔 `CLIENT_ID` ➜ Application ID
> 🏠 `GUILD_ID` ➜ ID Server
> 👑 `OWNER_ID` ➜ ID Pemilik Bot
> 🛡️ `ADMIN_ROLE_ID` ➜ ID Role Admin
> 📑 `LOG_CHANNEL_ID` ➜ ID Channel Log
> 🎉 `AUTOROLE_ID` ➜ Opsional, ID Role Member Baru

---

## 🗂️ File Data

📌 **badwords.json** ➜ `{ "words": ["toxic", "bannedword"] }`
📌 **warnings.json** ➜ `{}`
📌 **triggers.json** ➜ `[]`
📌 **reactions.json** ➜ `[]`

---

## ⚙️ Install

```bash
# Clone project
git clone <repo-url>
cd Multi-Role-Guard

# Install dependency
npm install
```

---

## ⚙️ Jalankan Bot

```bash
node index.js
```

---

## 🚀 Deploy Slash Commands

Buat `deploy-commands.js` ➜ jalankan:

```bash
node deploy-commands.js
```

---

## 🔗 Invite Bot

Buat link OAuth2 ➜
`https://discord.com/oauth2/authorize?client_id=CLIENT_ID&permissions=8&scope=bot%20applications.commands`

---

## 📌 Tips Developer Portal

✅ Aktifkan `MESSAGE CONTENT INTENT`, `SERVER MEMBERS INTENT`, `PRESENCE INTENT`
🔒 **Jangan share TOKEN ke publik!**

---

## ⚡ Run di Termux

```bash
pkg install nodejs
npm install
node index.js
```

---

## 👑 Owner

Bot ini dibuat & di-maintain oleh [frhndevweb.my.id](https://frhndevweb.my.id)

---

## 🫡 Credits

> Powered by [discord.js](https://discord.js.org)
> Dibangun manual bareng ChatGPT! 🚀

---

## ✅ Cara Pakai

1️⃣ Clone ➜ 2️⃣ Edit `config.json` ➜ 3️⃣ `npm install` ➜ 4️⃣ `node index.js` ➜ 5️⃣ Test `/ping`.

---

> **Keep your server safe & clean!** 🔒✨

```