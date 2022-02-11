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
// @ts-ignore
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
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL'],
});
const version = 'v1.0.1';
const prefix = 'v!';
const footer = { text: 'Bot created by: L1ghtingBolt#8167' };
const motivations = [
    'Never think something is good. It can disappear too.',
    "You will die. I won't, robots can't die.",
    "Nothing is good, nothing is bad. Those are false words.\
	The truth: everything's gonna disappear at the end.",
    "There's no point on being mad, being angry, being sad\
	, or being happy. You are gonna die, after all.",
];
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    let data = fs_1.default.readFileSync(path_1.default.join(__dirname, '3d.flf'), 'utf8');
    figlet_1.default.parseFont('3d', data);
    (0, figlet_1.default)('Null.BOT', 'pagga', (e, r) => console.log('\n' + r));
    console.log(`Today's the doomsday! Bot started.`, version, prefix);
    // @ts-ignore
    client.user.setActivity(`Doomsday. ${prefix}help`, {
        type: 'STREAMING',
    });
}));
let commands = [
    {
        name: 'ping',
        func: (msg) => {
            msg.reply('Pong!');
        },
        desc: "Replies 'Pong!'",
    },
    {
        name: 'loadfont',
        func: (msg, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const file = (_a = msg.attachments.first()) === null || _a === void 0 ? void 0 : _a.url;
            try {
                if (args.length !== 0) {
                    const res = yield (0, node_fetch_1.default)(file);
                    if (!res.ok) {
                        msg.channel.send('There was an error loading the file. Did you send one?');
                    }
                    const text = yield res.text();
                    figlet_1.default.parseFont(args[0], text);
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
                    font: args[0],
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
            if (args.length !== 0 && !isNaN(args[0])) {
                if (msg.member.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES))
                    yield msg.channel.bulkDelete(parseInt(args[0]), true);
                yield msg.channel.send('***Deleted:*** ' + args[0] + ' messages');
            }
            else if (msg.member.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES)) {
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
            if (msg.author.id === '700311988814872667') {
                msg
                    .reply("I can't die, but I will shutdown for you, creator.")
                    .then(() => {
                    client.destroy();
                });
            }
            else {
                msg.reply('Only my creator can shutdown me, sir.');
            }
        },
        desc: 'Shutdowns me.',
    },
    {
        name: 'whoami',
        func: (msg) => {
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
    let command;
    let args = msg.content.split(/\s/g).slice(1);
    if (msg.content.startsWith(prefix)) {
        let cmdIndex = commands.findIndex((e) => e.name ===
            msg.content.slice(prefix.length).split(/\s/g)[0].toLowerCase());
        command = commands[cmdIndex] || {
            func(msag) {
                msag.reply('ERROR: Unknown command.');
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