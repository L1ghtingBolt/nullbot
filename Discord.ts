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
const dirn = path.resolve();

dotenv.config()
// Get client
const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
  partials: ['CHANNEL'],
});

const version = 'v1.0';
const prefix = 'u!';
const footer = { text: 'undefined.bot created by the `Undefined Botters Team`' };

function toPascalCase(input:string) {
  return `${input}`
    .replace(new RegExp(/[-_]+/, 'g'), 'xyzSEP ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), (s) => s.toUpperCase())
    .replace('xyzSEP', ' ');
}

const /*un*/motivations = [
  'Never think something is good. It **will** disappear too.',
  "You will die. I won't, robots can't die.",
  "Nothing is good, nothing is bad. Those are false words. The truth: everything's gonna disappear at the end.",
  "People don't die from suicide, they die from sadness.",
  "Don't feel lost inside of yourself.",
  "There's no point on being mad, being angry, being sad, or being happy. You are gonna die, after all.",
  "It might be emptyness, but use your greatness to fill!"
];

const statuses = [
  `Doomsday.`,
  "life = undefined;",
  "you = undefined;",
  "nullbot = null;",
  "me = 'undefined.bot'",
];

client.on('ready', async () => {
  let data = fs.readFileSync(path.join(dirn, '3d.flf'), 'utf8');
  figlet.parseFont('3d', data);
  figlet('UNDEFINED.BOT', 'Pagga', (e:any, r:any) => console.log('\n' + r));

  console.log(`Today's the doomsday! Bot started. Version: ${version}. Prefix: ${prefix}`);
  let activNum:number = 0
  
  client.user?.setActivity(`Doomsday. ${prefix}help`, {
    type: 'STREAMING',
  });
  setInterval(function() {
    if (activNum < statuses.length) {
    client.user?.setActivity(`${statuses[activNum]} ${prefix}help`, {
      type: 'STREAMING',
    });
    activNum++;
  }
  else {
    activNum = 0;
  }
  }, 10000);

});

let commands = [
  {
    name: 'ping',
    func: (msg:any) => {
      msg.reply('***PONG***!');
    },
    desc: "Replies 'Pong!'",
  },
  {
    name: 'kick',
    func: (msg:any) => {
      let user = msg.mentions.members.first();
      
      if (user)
      	if(msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
          try
          {
            if(user.kickable){
          		user.kick("Not cool, you had to be kicked by a bot named 'UNDEFINED'");
            	msg.reply(`***Kicked \`${user.user.tag}\`***!`);
            }
            else msg.reply("No permissions for me.")
          }
      		catch
          {
            msg.reply('Error.');
          }
      	else
          msg.reply("You don't have permissions.");
      else
        msg.reply("ERROR! Correct syntax: v!kick `mentioned user`. You must ping someone.");
    },
    desc: "Kicks a player out of the server.", 
  },
  {
    name: 'say',
    func: (msg:any, args:string[]) => {
      let saidEmbed = {
        // Title
        title: `${msg.member.user.tag}'s words`,
        // Description has the args.
        description: args.join(' '),
        // Color
        color: 0xff0000,
      }
      msg.channel.send({embeds: [saidEmbed]});
    },
    desc: 'Makes the bot say something!',
  },
  {
    name: 'team',
    aliases: ['info', 'about'],
    func: (msg:any) => {
      let saidEmbed = {
        // Title
        title: `Undefined Bot`,
        // Description has the args.
        description: 'Our team is composed from two people:\n ● *| Dihydrogen Monoxide | v2#5699*\n ● *Yuzof#7783*',
        // Color
        color: 0xff0000,
      }
      msg.channel.send({embeds: [saidEmbed]});
    },
    desc: 'Shows info about our team!',
  },
  {
    name: 'ban',
    func: (msg:any) => {
      let user = msg.mentions.members.first();
      
      if (user)
      	if(msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
          try
          {
            if(user.bannable){
          		user.ban({reason:"Not cool, you had to be ban by a bot named 'UNDEFINED'"});
            	msg.reply(`***Banned \`${user.user.tag}\`***!`);
            }
            else msg.reply("No permissions for me.")
          }
      		catch
          {
            msg.reply('Error.');
          }
      	else
          msg.reply("You don't have permissions.");
      else
        msg.reply("ERROR! Correct syntax: v!ban `mentioned user`. You must ping someone.");
    },
    desc: "Bans a player out of the server.", 
  },
  {
    name: 'loadfont',
    func: async (msg:any, args:any) => {
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
          figlet.parseFont(toPascalCase(args[0]), text);
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
    func: (msg:any) => {
      msg.reply(motivations[Math.floor(Math.random() * motivations.length)]);
    },
    desc: 'Tells you a motivational phrase!',
  },
  {
    name: 'ascii',
    func: (msg:any, args:any) => {
      if (args.length > 1) {
        let txt = args.slice(1).join(' ');
        figlet(
          txt,
          {
            font: toPascalCase(args[0]),
            whitespaceBreak: true,
            width: 100,
          },
          (err:any, art:any) =>
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
    func: async (msg:Discord.Message, args:any) => {
      if (args.length !== 0 && !isNaN(args[0])) {
        if (msg.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !(msg.channel.type === 'DM'))
          await msg.channel.bulkDelete(parseInt(args[0]), true);
        await msg.channel.send('***Deleted:*** ' + args[0] + ' messages');
      } else if (
        msg.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
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
    func: (msg:Discord.Message) => {
      if (msg.author.id === '952247526071894017' || msg.author.id === '551896144054190080') {
        msg
          .reply("I shall go to sleep, master.")
          .then(() => {
            client.destroy();
            process.exit(0);
          });
      } else {
        msg.reply('Only my creator can shut me down!');
      }
    },
    desc: 'Shutdowns me.',
  },
  {
    name: 'whoami',
    func: (msg:Discord.Message) => {
      let embed = {
        color: 0xff0000,
        title: `Your account's username is ${msg.author.username}.`,
        footer,
      };
      msg.channel.send({ embeds: [embed] });
    },
    desc: 'Tells you your username',
  },
  {
    name: 'version',
    func: (msg:Discord.Message) => {
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
    func: (msg:Discord.Message) => {
      let cmds:any = [];
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

client.on('messageCreate', (msg) => {
  let unknownEmbed = {
    color: 0xff0000,
    description: "Sorry, undefined.bot cannot understand what you are saying..",
    title: "Unknown command"
  }
  let command;
  let args = msg.content.split(/\s/g).slice(1);
  if (msg.content.startsWith(prefix)) {
    let cmdname = msg.content.slice(prefix.length).split(/\s/g)[0].toLowerCase();
    let cmdIndex = commands.findIndex(
      (e) =>
        e.name.toLowerCase() === cmdname || e.aliases?.includes(cmdname)
        
    );
    command = commands[cmdIndex] || {
      func(msag:any) {
        msag.reply({embeds: [unknownEmbed]});
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
