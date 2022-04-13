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

class ErrorEmbed {
  constructor(message: string) {
    this.message = message;
  }
  message: string;
  get() {
    return {
      color: 0xFF0000,
      title: 'Error',
      description: this.message,
      footer: footer,
    }
  }
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
    func: (msg:Discord.Message) => {
      let emb = {
        color: 0x00FF00,
        title: "P o n g",
      }
      msg.channel.send({embeds: [emb]});
    },
    desc: "Replies 'Pong!'",
  },
  {
    name: 'fontlist',
    func: (msg:Discord.Message) => {
      figlet.fonts(function(err:any, fonts:any) {
        if (err) {
            console.log('something went wrong...');
            console.dir(err);
            return;
        }
        let emb = {
          color: 0xFF0000,
          title: "Font List",
          description: fonts.join("**, **"),
        }
        msg.channel.send({embeds: [emb]});
      })
      
    },
    desc: "Tells you the names of the default fonts. Replace spaces with '_'",
  },
  {
    name: 'kick',
    func: (msg:Discord.Message) => {
      let user = msg.mentions.members?.first();
      
      if (user)
      	if(msg.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
          try
          {
            let kickEmbed = {
              color:0xff0000,
              title: 'Kicked',
              description: `${user.user.tag} has been **kicked**.`,
            }
            if(user.kickable){
          		user.kick("Not cool, you had to be kicked by a bot named 'UNDEFINED'");
            	msg.channel.send({embeds:[kickEmbed]});
            }
            else {
              let emb = new ErrorEmbed("I don't have permissions to kick this user.");
              msg.channel.send({embeds:[emb.get()]});
            }
          }
      		catch
          {
            let emb = new ErrorEmbed("I couldn't kick this user.");
            msg.channel.send({embeds:[emb.get()]});
          }
      	else {
          let emb = new ErrorEmbed("You don't have permission to perform this action.");
          msg.channel.send({embeds:[emb.get()]});
        }
      else{
        let emb = new ErrorEmbed("You didn't mention a user to kick.");
        msg.channel.send({embeds:[emb.get()]});
      }
      },
    desc: "Kicks a player out of the server.", 
  },
  {
    name: 'say',
    func: (msg:Discord.Message, args:string[]) => {
      let saidEmbed = {
        // Title
        title: args.join(' '),
        // Description.
        description: msg.member?.user.tag,
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
    func: (msg:Discord.Message) => {
      let saidEmbed = {
        // Title
        title: `Undefined Bot`,
        // Description has the args.
        description: 'Our team was composed from two people:',
        // Color
        color: 0xff0000,
        fields: [
          {
            name: '**`| Dihydrogen Monoxide | v2#5699`**',
            value: 'Made the logic from the bot, and also the bot itself.',
            inline: true,
          },
          {
            name: '**`Yuzof#7783`** *(Left the team)*',
            value: 'Fixed some messages from the bot. Also had the idea of making the bot',
            inline: true,
          },
        ]
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
            let banEmbed = {
              color:0xff0000,
              title: 'Banned',
              description: `${user.user.tag} has been **banned**.`,
            }
            if(user.bannable){
          		user.ban({reason:"Not cool, you had to be banned by a bot named 'UNDEFINED'"});
            	msg.channel.send({embeds:[banEmbed]});
            }
            else {
              let emb = new ErrorEmbed("I don't have permissions to ban this user.");
              // Send error embed to the channel
              msg.channel.send({embeds:[emb.get()]});
            }
          }
      		catch
          {
            let emb = new ErrorEmbed("I couldn't ban this user.");
            // Send error embed to the channel
            msg.channel.send({embeds:[emb.get()]});
          }
      	else{
          let emb = new ErrorEmbed("You don't have permissions to perform this action.");
          // Send error embed to the channel
          msg.channel.send({embeds:[emb.get()]});
        }
      else{
        let emb = new ErrorEmbed("You didn't mention a user to ban.");
        // Send error embed to the channel
        msg.channel.send({embeds:[emb.get()]});
      }
    },
    desc: "Bans a player out of the server.", 
  },
  {
    name: 'loadfont',
    func: async (msg:Discord.Message, args:any) => {
      const file = msg.attachments.first()?.url;
      let emb = new ErrorEmbed("I couldn't load the font.");
      let succEmb = {
        color: 0x00ff00,
        title: "Success",
        description: "Font loaded successfully.",
      }
      try {
        if (args.length !== 0 && file) {
          const res = await fetch(file);
          if (!res.ok) {
            msg.channel.send({embeds:[emb.get()]});
          }
          const text = await res.text();
          figlet.parseFont(args[0].join(" "), text);
          msg.channel.send({embeds:[succEmb]});
        } else {
          emb.message = "You didn't upload a file or didn't write a font name. " + `${prefix}loadfont \`fontname\``;
          msg.channel.send({embeds:[emb.get()]});
        }
      } catch (e) {
        emb.message = e + '\n';
        msg.channel.send({embeds:[emb.get()]});
      }
    },
    desc: 'Loads FLF format font attached.',
  },
  {
    name: 'motivation',
    aliases: ['motivate', 'phrase', 'phrases', 'citation'],
    func: (msg:any) => {
      msg.reply(motivations[Math.floor(Math.random() * motivations.length)]);
    },
    desc: 'Tells you a motivational phrase!',
  },
  {
    name: 'ascii',
    aliases: ['font', 'asciiart', 'text2ascii', 'figlet', 'figletfont'],
    func: (msg:Discord.Message, args:any) => {
      if (args.length > 1) {
        let emb = new ErrorEmbed("Unknown font name.");
        let txt = args.slice(1).join(' ');
        figlet(
          txt,
          {
            font: args[0].replace("_", " "),
            whitespaceBreak: true,
            width: 100,
          },
          (err:any, art:any) =>
            art ? msg.channel.send(`\`\`\`${art}\`\`\``) : msg.channel.send({embeds:[emb.get()]}),
        );
      } else {
        let emb = new ErrorEmbed("You either didn't write a text to convert or a font. " + `Correct syntax: ${prefix}ascii \`font\` \`text\``);
        msg.channel.send({embeds: [emb.get()]});
      }
    },
    desc: 'Replies the message you sent, but with ascii art',
  },
  {
    name: 'clear',
    func: async (msg:Discord.Message, args:string[]) => {
      let embed = {
        color: 0xff0000,
        title: "Clear",
        description: "Cleared " + args[0] + " messages.",
        footer: footer,
      }
      if (args.length !== 0 && !isNaN(parseInt(args[0]))) {
        if (msg.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !(msg.channel.type === 'DM'))
          await msg.channel.bulkDelete(parseInt(args[0]), true);
        await msg.channel.send({embeds:[embed]});
      } else if (
        msg.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
      ) {
        embed.title = "Error!";
        embed.description = `Correct syntax: ${prefix}clear \`messages number\``
        msg.channel.send({embeds:[embed]});
      } else {
        embed.title = "Error!";
        embed.description = 'You don\'t have permissions to perform this action.';
        msg.channel.send({embeds:[embed]});
      }
    },
    desc: 'Deletes (x) number of messages.',
  },
  {
    name: 'die',
    func: (msg:Discord.Message) => {
      if (msg.author.id === '952247526071894017' || msg.author.id === '551896144054190080') {
        let embed = {
          title: 'Shutting down...',
          description: 'I can\'t die, but I will shutdown for you, master.',
          color: 0xff0000
        }
        msg.channel.send({embeds:[embed]})
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
        color: 0xff0000,
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
        cmds.push({
          name: `${e.name}`,
          value: `\`\`\`${e.desc}\`\`\``,
          inline: true,
        });
      });
      let title = `***Help menu:***`;
      
      let embed = {
        color: 0xff0000,
        title,
        description: `***\`Prefix\`***: _'${prefix}'_`,
        fields: cmds,
        footer,
      };

      msg.channel.send({ embeds: [embed] });
    },
    desc: "Displays this menu.",
  },
  
];

client.on('messageCreate', (msg) => {
  let unknownEmbed = new ErrorEmbed("Unknown command.").get();
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
