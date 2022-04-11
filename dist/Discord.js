"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
// @ts-ignore
const figlet_1 = __importDefault(require("figlet"));
// @ts-ignore
const fs_1 = __importDefault(require("fs"));
// @ts-ignore
const path_1 = __importDefault(require("path"));
// @ts-ignore
const node_fetch_1 = __importDefault(require("node-fetch"));
// @ts-ignore
const dotenv_1 = __importDefault(require("dotenv"));
const dirn = path_1.default.resolve();
dotenv_1.default.config();
// Get client
const client = new discord_js_1.default.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL'],
});
const version = 'v1.0';
const prefix = 'u!';
const footer = { text: 'undefined.bot created by the `Undefined Botters Team`' };
function toPascalCase(input) {
    return `${input}`
        .replace(new RegExp(/[-_]+/, 'g'), 'xyzSEP ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(new RegExp(/\s+(.)(\w+)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`)
        .replace(new RegExp(/\s/, 'g'), '')
        .replace(new RegExp(/\w/), (s) => s.toUpperCase())
        .replace('xyzSEP', ' ');
}
const /*un*/ motivations = [
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
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let data = fs_1.default.readFileSync(path_1.default.join(dirn, '3d.flf'), 'utf8');
    figlet_1.default.parseFont('3d', data);
    (0, figlet_1.default)('UNDEFINED.BOT', 'Pagga', (e, r) => console.log('\n' + r));
    console.log(`Today's the doomsday! Bot started. Version: ${version}. Prefix: ${prefix}`);
    let activNum = 0;
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity(`Doomsday. ${prefix}help`, {
        type: 'STREAMING',
    });
    setInterval(function () {
        var _a;
        if (activNum < statuses.length) {
            (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity(`${statuses[activNum]} ${prefix}help`, {
                type: 'STREAMING',
            });
            activNum++;
        }
        else {
            activNum = 0;
        }
    }, 10000);
}));
let commands = [
    {
        name: 'ping',
        func: (msg) => {
            msg.reply('***PONG***!');
        },
        desc: "Replies 'Pong!'",
    },
    {
        name: 'kick',
        func: (msg) => {
            let user = msg.mentions.members.first();
            if (user)
                if (msg.member.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))
                    try {
                        if (user.kickable) {
                            user.kick("Not cool, you had to be kicked by a bot named 'UNDEFINED'");
                            msg.reply(`***Kicked \`${user.user.tag}\`***!`);
                        }
                        else
                            msg.reply("No permissions for me.");
                    }
                    catch (_a) {
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
        func: (msg, args) => {
            let saidEmbed = {
                // Title
                title: `${msg.member.user.tag}'s words`,
                // Description has the args.
                description: args.join(' '),
                // Color
                color: 0xff0000,
            };
            msg.channel.send({ embeds: [saidEmbed] });
        },
        desc: 'Makes the bot say something!',
    },
    {
        name: 'team',
        aliases: ['info', 'about'],
        func: (msg) => {
            let saidEmbed = {
                // Title
                title: `Undefined Bot`,
                // Description has the args.
                description: 'Our team is composed from two people:\n ● *| Dihydrogen Monoxide | v2#5699*\n ● *Yuzof#7783*',
                // Color
                color: 0xff0000,
            };
            msg.channel.send({ embeds: [saidEmbed] });
        },
        desc: 'Shows info about our team!',
    },
    {
        name: 'ban',
        func: (msg) => {
            let user = msg.mentions.members.first();
            if (user)
                if (msg.member.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))
                    try {
                        if (user.bannable) {
                            user.ban({ reason: "Not cool, you had to be ban by a bot named 'UNDEFINED'" });
                            msg.reply(`***Banned \`${user.user.tag}\`***!`);
                        }
                        else
                            msg.reply("No permissions for me.");
                    }
                    catch (_a) {
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
        func: (msg, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            const file = (_b = msg.attachments.first()) === null || _b === void 0 ? void 0 : _b.url;
            try {
                if (args.length !== 0) {
                    const res = yield (0, node_fetch_1.default)(file);
                    if (!res.ok) {
                        msg.channel.send('There was an error loading the file. Did you send one?');
                    }
                    const text = yield res.text();
                    figlet_1.default.parseFont(toPascalCase(args[0]), text);
                    msg.reply(`Font loaded succesfully as '${args[0]}'`);
                }
                else {
                    msg.reply('You MUST provide a font name: ' + `${prefix}loadfont \`fontname\``);
                }
            }
            catch (e) {
                msg.reply('Error: ' + e);
            }
        }),
        desc: 'Loads FLF format font attached.',
    },
    {
        name: 'motivation',
        func: (msg) => {
            msg.reply(motivations[Math.floor(Math.random() * motivations.length)]);
        },
        desc: 'Tells you a motivational phrase!',
    },
    {
        name: 'ascii',
        func: (msg, args) => {
            if (args.length > 1) {
                let txt = args.slice(1).join(' ');
                (0, figlet_1.default)(txt, {
                    font: toPascalCase(args[0]),
                    whitespaceBreak: true,
                    width: 100,
                }, (err, art) => msg.channel.send(`\`\`\`${art || 'Unknown font'}\`\`\``));
            }
            else {
                msg.reply(`ERROR! Correct syntax: ${prefix}ascii \`font\` \`text\``);
            }
        },
        desc: 'Replies the message you sent, but with ascii art',
    },
    {
        name: 'clear',
        func: (msg, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d;
            if (args.length !== 0 && !isNaN(args[0])) {
                if (((_c = msg.member) === null || _c === void 0 ? void 0 : _c.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES)) && !(msg.channel.type === 'DM'))
                    yield msg.channel.bulkDelete(parseInt(args[0]), true);
                yield msg.channel.send('***Deleted:*** ' + args[0] + ' messages');
            }
            else if ((_d = msg.member) === null || _d === void 0 ? void 0 : _d.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES)) {
                msg.reply(`ERROR! Correct syntax: ${prefix}clear \`messages number\``);
            }
            else {
                msg.reply('You do not have Manage-Messages permission.');
            }
        }),
        desc: 'Deletes (x) number of messages.',
    },
    {
        name: 'die',
        func: (msg) => {
            if (msg.author.id === '952247526071894017' || msg.author.id === '551896144054190080') {
                msg
                    .reply("I shall go to sleep, master.")
                    .then(() => {
                    client.destroy();
                    process.exit(0);
                });
            }
            else {
                msg.reply('Only my creator can shut me down!');
            }
        },
        desc: 'Shutdowns me.',
    },
    {
        name: 'whoami',
        func: (msg) => {
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
        func: (msg) => {
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
        func: (msg) => {
            let cmds = [];
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
    };
    let command;
    let args = msg.content.split(/\s/g).slice(1);
    if (msg.content.startsWith(prefix)) {
        let cmdname = msg.content.slice(prefix.length).split(/\s/g)[0].toLowerCase();
        let cmdIndex = commands.findIndex((e) => { var _a; return e.name.toLowerCase() === cmdname || ((_a = e.aliases) === null || _a === void 0 ? void 0 : _a.includes(cmdname)); });
        command = commands[cmdIndex] || {
            func(msag) {
                msag.reply({ embeds: [unknownEmbed] });
            },
        };
    }
    else {
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
//# sourceMappingURL=Discord.js.map