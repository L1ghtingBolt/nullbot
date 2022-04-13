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
class ErrorEmbed {
    constructor(message) {
        this.message = message;
    }
    get() {
        return {
            color: 0xFF0000,
            title: 'Error',
            description: this.message,
            footer: footer,
        };
    }
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
            let emb = {
                color: 0x00FF00,
                title: "P o n g",
            };
            msg.channel.send({ embeds: [emb] });
        },
        desc: "Replies 'Pong!'",
    },
    {
        name: 'fontlist',
        func: (msg) => {
            figlet_1.default.fonts(function (err, fonts) {
                if (err) {
                    console.log('something went wrong...');
                    console.dir(err);
                    return;
                }
                let emb = {
                    color: 0xFF0000,
                    title: "Font List",
                    description: fonts.join("**, **"),
                };
                msg.channel.send({ embeds: [emb] });
            });
        },
        desc: "Tells you the names of the default fonts. Replace spaces with '_'",
    },
    {
        name: 'kick',
        func: (msg) => {
            var _a, _b;
            let user = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
            if (user)
                if ((_b = msg.member) === null || _b === void 0 ? void 0 : _b.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))
                    try {
                        let kickEmbed = {
                            color: 0xff0000,
                            title: 'Kicked',
                            description: `${user.user.tag} has been **kicked**.`,
                        };
                        if (user.kickable) {
                            user.kick("Not cool, you had to be kicked by a bot named 'UNDEFINED'");
                            msg.channel.send({ embeds: [kickEmbed] });
                        }
                        else {
                            let emb = new ErrorEmbed("I don't have permissions to kick this user.");
                            msg.channel.send({ embeds: [emb.get()] });
                        }
                    }
                    catch (_c) {
                        let emb = new ErrorEmbed("I couldn't kick this user.");
                        msg.channel.send({ embeds: [emb.get()] });
                    }
                else {
                    let emb = new ErrorEmbed("You don't have permission to perform this action.");
                    msg.channel.send({ embeds: [emb.get()] });
                }
            else {
                let emb = new ErrorEmbed("You didn't mention a user to kick.");
                msg.channel.send({ embeds: [emb.get()] });
            }
        },
        desc: "Kicks a player out of the server.",
    },
    {
        name: 'say',
        func: (msg, args) => {
            var _a;
            let saidEmbed = {
                // Title
                title: args.join(' '),
                // Description.
                description: (_a = msg.member) === null || _a === void 0 ? void 0 : _a.user.tag,
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
                        let banEmbed = {
                            color: 0xff0000,
                            title: 'Banned',
                            description: `${user.user.tag} has been **banned**.`,
                        };
                        if (user.bannable) {
                            user.ban({ reason: "Not cool, you had to be banned by a bot named 'UNDEFINED'" });
                            msg.channel.send({ embeds: [banEmbed] });
                        }
                        else {
                            let emb = new ErrorEmbed("I don't have permissions to ban this user.");
                            // Send error embed to the channel
                            msg.channel.send({ embeds: [emb.get()] });
                        }
                    }
                    catch (_a) {
                        let emb = new ErrorEmbed("I couldn't ban this user.");
                        // Send error embed to the channel
                        msg.channel.send({ embeds: [emb.get()] });
                    }
                else {
                    let emb = new ErrorEmbed("You don't have permissions to perform this action.");
                    // Send error embed to the channel
                    msg.channel.send({ embeds: [emb.get()] });
                }
            else {
                let emb = new ErrorEmbed("You didn't mention a user to ban.");
                // Send error embed to the channel
                msg.channel.send({ embeds: [emb.get()] });
            }
        },
        desc: "Bans a player out of the server.",
    },
    {
        name: 'loadfont',
        func: (msg, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            const file = (_b = msg.attachments.first()) === null || _b === void 0 ? void 0 : _b.url;
            let emb = new ErrorEmbed("I couldn't load the font.");
            let succEmb = {
                color: 0x00ff00,
                title: "Success",
                description: "Font loaded successfully.",
            };
            try {
                if (args.length !== 0 && file) {
                    const res = yield (0, node_fetch_1.default)(file);
                    if (!res.ok) {
                        msg.channel.send({ embeds: [emb.get()] });
                    }
                    const text = yield res.text();
                    figlet_1.default.parseFont(args.join(" "), text);
                    msg.channel.send({ embeds: [succEmb] });
                }
                else {
                    emb.message = "You didn't upload a file or didn't write a font name. " + `${prefix}loadfont \`fontname\``;
                    msg.channel.send({ embeds: [emb.get()] });
                }
            }
            catch (e) {
                emb.message = e + '\n';
                msg.channel.send({ embeds: [emb.get()] });
            }
        }),
        desc: 'Loads FLF format font attached.',
    },
    {
        name: 'motivation',
        aliases: ['motivate', 'phrase', 'phrases', 'citation'],
        func: (msg) => {
            msg.reply(motivations[Math.floor(Math.random() * motivations.length)]);
        },
        desc: 'Tells you a motivational phrase!',
    },
    {
        name: 'ascii',
        aliases: ['font', 'asciiart', 'text2ascii', 'figlet', 'figletfont'],
        func: (msg, args) => {
            if (args.length > 1) {
                let emb = new ErrorEmbed("Unknown font name.");
                let txt = args.slice(1).join(' ');
                (0, figlet_1.default)(txt, {
                    font: args[0].replace("_", " "),
                    whitespaceBreak: true,
                    width: 100,
                }, (err, art) => art ? msg.channel.send(`\`\`\`${art}\`\`\``) : msg.channel.send({ embeds: [emb.get()] }));
            }
            else {
                let emb = new ErrorEmbed("You either didn't write a text to convert or a font. " + `Correct syntax: ${prefix}ascii \`font\` \`text\``);
                msg.channel.send({ embeds: [emb.get()] });
            }
        },
        desc: 'Replies the message you sent, but with ascii art',
    },
    {
        name: 'error',
        func: (msg, args) => {
            args[0].join("shoot");
        },
        desc: "Errors",
    },
    {
        name: 'clear',
        func: (msg, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d;
            let embed = {
                color: 0xff0000,
                title: "Clear",
                description: "Cleared " + args[0] + " messages.",
                footer: footer,
            };
            if (args.length !== 0 && !isNaN(parseInt(args[0]))) {
                if (((_c = msg.member) === null || _c === void 0 ? void 0 : _c.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES)) && !(msg.channel.type === 'DM'))
                    yield msg.channel.bulkDelete(parseInt(args[0]), true);
                yield msg.channel.send({ embeds: [embed] });
            }
            else if ((_d = msg.member) === null || _d === void 0 ? void 0 : _d.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES)) {
                embed.title = "Error!";
                embed.description = `Correct syntax: ${prefix}clear \`messages number\``;
                msg.channel.send({ embeds: [embed] });
            }
            else {
                embed.title = "Error!";
                embed.description = 'You don\'t have permissions to perform this action.';
                msg.channel.send({ embeds: [embed] });
            }
        }),
        desc: 'Deletes (x) number of messages.',
    },
    {
        name: 'die',
        func: (msg) => {
            if (msg.author.id === '952247526071894017' || msg.author.id === '551896144054190080') {
                let embed = {
                    title: 'Shutting down...',
                    description: 'I can\'t die, but I will shutdown for you, master.',
                    color: 0xff0000
                };
                msg.channel.send({ embeds: [embed] })
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
        func: (msg) => {
            let cmds = [];
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
    let unknownEmbed = new ErrorEmbed("Unknown command.");
    let command;
    let args = msg.content.split(/\s/g).slice(1);
    if (msg.author.bot) {
        return;
    }
    if (msg.content.startsWith(prefix)) {
        let cmdname = msg.content.slice(prefix.length).split(/\s/g)[0].toLowerCase();
        let cmdIndex = commands.findIndex((e) => { var _a; return e.name.toLowerCase() === cmdname || ((_a = e.aliases) === null || _a === void 0 ? void 0 : _a.includes(cmdname)); });
        command = commands[cmdIndex] || {
            func(msag) {
                msag.channel.send({ embeds: [unknownEmbed.get()] });
            },
        };
    }
    else {
        return;
    }
    if (command.func) {
        try {
            command.func(msg, args);
        }
        catch (e) {
            unknownEmbed.message = e + "\n";
            msg.channel.send({ embeds: [unknownEmbed.get()] });
        }
    }
});
client.login(process.env.TOKEN);
//# sourceMappingURL=Discord.js.map