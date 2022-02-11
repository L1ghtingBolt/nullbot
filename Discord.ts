// @ts-ignore
import Discord, { Permissions } from 'discord.js';
// @ts-ignore
import figlet from 'figlet';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';
// @ts-ignore
import fetch from 'node-fetch';
// @ts-ignore
import dotenv from 'dotenv';

dotenv.config()

const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
  partials: ['CHANNEL'],
});

const version = 'v1.0.1';
const prefix = 'v!';
const footer = { text: 'Bot created by: L1ghtingBolt#8167' };

const motivations: any = [
  'Never think something is good. It can disappear too.',
  "You will die. I won't, robots can't die.",
  "Nothing is good, nothing is bad. Those are false words.\
	The truth: everything's gonna disappear at the end.",
  "There's no point on being mad, being angry, being sad\
	, or being happy. You are gonna die, after all.",
];

client.on('ready', async () => {
  let data = fs.readFileSync(path.join(__dirname, '3d.flf'), 'utf8');
  figlet.parseFont('3d', data);
  figlet('Null.BOT', 'pagga', (e: any, r: any) => console.log('\n' + r));

  console.log(`Today's the doomsday! Bot started. Version: ${version}. Prefix: ${prefix}`);
  // @ts-ignore
  client.user.setActivity(`Doomsday. ${prefix}help`, {
    type: 'STREAMING',
  });
});

let commands = [
  {
    name: 'ping',
    func: (msg: any) => {
      msg.reply('Pong!');
    },
    desc: "Replies 'Pong!'",
  },
  {
    name: 'loadfont',
    func: async (msg: any, args: any) => {
      const file = msg.attachments.first()?.url;
      try {
        if (args.length !== 0) {
          const res = await fetch(file);
          if (!res.ok) {
            msg.channel.send(
              'There was an error loading the file. Did you send one?'
            );
          }
          const text = await res.text();
          figlet.parseFont(args[0], text);
          msg.reply(`Font loaded succesfully as '${args[0]}'`);
        } else {
          msg.reply(
            'You MUST provide a font name: ' + `${prefix}loadfont \`fontname\``
          );
        }
      } catch (e) {
        msg.reply('Error: ' + e);
      }
    },
    desc: 'Loads FLF format font attached.',
  },
  {
    name: 'motivation',
    func: (msg: any) => {
      msg.reply(motivations[Math.floor(Math.random() * motivations.length)]);
    },
    desc: 'Tells you a motivational phrase!',
  },
  {
    name: 'ascii',
    func: (msg: any, args: any) => {
      if (args.length > 1) {
        let txt = args.slice(1).join(' ');
        figlet(
          txt,
          {
            font: args[0],
            whitespaceBreak: true,
            width: 100,
          },
          (err: any, art: any) =>
            msg.channel.send(`\`\`\`${art || 'Unknown font'}\`\`\``)
        );
      } else {
        msg.reply(`ERROR! Correct syntax: ${prefix}ascii \`font\` \`text\``);
      }
    },
    desc: 'Replies the message you sent, but with ascii art',
  },
  {
    name: 'clear',
    func: async (msg: any, args: any) => {
      if (args.length !== 0 && !isNaN(args[0])) {
        if (msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
          await msg.channel.bulkDelete(parseInt(args[0]), true);
        await msg.channel.send('***Deleted:*** ' + args[0] + ' messages');
      } else if (
        msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
      ) {
        msg.reply(`ERROR! Correct syntax: ${prefix}clear \`messages number\``);
      } else {
        msg.reply('You do not have Manage-Messages permission.');
      }
    },
    desc: 'Deletes (x) number of messages.',
  },
  {
    name: 'die',
    func: (msg: any) => {
      if (msg.author.id === '700311988814872667') {
        msg
          .reply("I can't die, but I will shutdown for you, creator.")
          .then(() => {
            client.destroy();
          });
      } else {
        msg.reply('Only my creator can shutdown me, sir.');
      }
    },
    desc: 'Shutdowns me.',
  },
  {
    name: 'whoami',
    func: (msg: any) => {
      let embed = {
        color: 0x9900ff,
        title: `Your account's username is ${msg.author.username}.`,
        footer,
      };
      msg.channel.send({ embeds: [embed] });
    },
    desc: 'Tells you your username',
  },
  {
    name: 'version',
    func: (msg: any) => {
      let embed = {
        color: 0x9900ff,
        title: `Version: ${version}`,
        footer,
      };
      msg.channel.send({ embeds: [embed] });
    },
    desc: 'Tells the bot version',
  },
  {
    name: 'help',
    func: (msg: any) => {
      let cmds: any = [];
      commands.forEach((e) => {
        cmds.push(`\`${prefix}${e.name}\`: ${e.desc}`);
      });
      let title = `***Help menu:***\n***\`Prefix\`***: _'${prefix}'_\n-------------`;

      let embed = {
        color: 0x9900ff,
        title,
        description: `${cmds.join('\n')}`,
        footer,
      };

      msg.channel.send({ embeds: [embed] });
    },
    desc: "Displays this menu.'",
  },
];

client.on('messageCreate', (msg: any) => {
  let command;
  let args = msg.content.split(/\s/g).slice(1);
  if (msg.content.startsWith(prefix)) {
    let cmdIndex = commands.findIndex(
      (e) =>
        e.name ===
        msg.content.slice(prefix.length).split(/\s/g)[0].toLowerCase()
    );
    command = commands[cmdIndex] || {
      func(msag:any) {
        msag.reply('ERROR: Unknown command.');
      },
    };
  } else {
    return;
  }
  if (msg.author.bot) {
    return;
  }
  if (command.func) {
    command.func(msg, args);
  }
});

client.login(process.env.TOKEN);
