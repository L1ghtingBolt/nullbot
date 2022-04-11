"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// @ts-ignore
var discord_js_1 = require("discord.js");
// @ts-ignore
var figlet_1 = require("figlet");
// @ts-ignore
var fs_1 = require("fs");
// @ts-ignore
var path_1 = require("path");
// @ts-ignore
var node_fetch_1 = require("node-fetch");
// @ts-ignore
var dotenv_1 = require("dotenv");
var __dirname = path_1["default"].resolve();
dotenv_1["default"].config();
// Get client
var client = new discord_js_1["default"].Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL']
});
var version = 'v1.5.1';
var prefix = 'v!';
var footer = { text: 'undefined.bot created by the ``Undefined Botters Team``' };
function toPascalCase(input) {
    return "".concat(input)
        .replace(new RegExp(/[-_]+/, 'g'), 'xyzSEP ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(new RegExp(/\s+(.)(\w+)/, 'g'), function ($1, $2, $3) { return "".concat($2.toUpperCase() + $3.toLowerCase()); })
        .replace(new RegExp(/\s/, 'g'), '')
        .replace(new RegExp(/\w/), function (s) { return s.toUpperCase(); })
        .replace('xyzSEP', ' ');
}
var /*un*/ motivations = [
    'Never think something is good. It **will** disappear too.',
    "You will die. I won't, robots can't die.",
    "Nothing is good, nothing is bad. Those are false words. The truth: everything's gonna disappear at the end.",
    "People don't die from suicide, they die from sadness.",
    "Don't feel lost inside of yourself.",
    "There's no point on being mad, being angry, being sad, or being happy. You are gonna die, after all.",
];
client.on('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        data = fs_1["default"].readFileSync(path_1["default"].join(__dirname, '3d.flf'), 'utf8');
        figlet_1["default"].parseFont('3d', data);
        (0, figlet_1["default"])('UNDEFINED.BOT', 'Pagga', function (e, r) { return console.log('\n' + r); });
        console.log("Today's the doomsday! Bot started. Version: ".concat(version, ". Prefix: ").concat(prefix));
        // @ts-ignore
        client.user.setActivity("Doomsday. ".concat(prefix, "help"), {
            type: 'STREAMING'
        });
        return [2 /*return*/];
    });
}); });
var commands = [
    {
        name: 'ping',
        func: function (msg) {
            msg.reply('***PONG***!');
        },
        desc: "Replies 'Pong!'"
    },
    {
        name: 'kick',
        func: function (msg) {
            var user = msg.mentions.members.first();
            if (user)
                if (msg.member.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))
                    try {
                        if (user.kickable) {
                            user.kick("Not cool, you had to be kicked by a bot named 'UNDEFINED'");
                            msg.reply("***Kicked `".concat(user.user.tag, "`***!"));
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
        desc: "Kicks a player out of the server."
    },
    {
        name: 'ban',
        func: function (msg) {
            var user = msg.mentions.members.first();
            if (user)
                if (msg.member.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))
                    try {
                        if (user.bannable) {
                            user.ban({ reason: "Not cool, you had to be ban by a bot named 'UNDEFINED'" });
                            msg.reply("***Banned `".concat(user.user.tag, "`***!"));
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
        desc: "Bans a player out of the server."
    },
    {
        name: 'loadfont',
        func: function (msg, args) { return __awaiter(void 0, void 0, void 0, function () {
            var file, res, text, e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        file = (_a = msg.attachments.first()) === null || _a === void 0 ? void 0 : _a.url;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        if (!(args.length !== 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, node_fetch_1["default"])(file)];
                    case 2:
                        res = _b.sent();
                        if (!res.ok) {
                            msg.channel.send('There was an error loading the file. Did you send one?');
                        }
                        return [4 /*yield*/, res.text()];
                    case 3:
                        text = _b.sent();
                        figlet_1["default"].parseFont(toPascalCase(args[0]), text);
                        msg.reply("Font loaded succesfully as '".concat(args[0], "'"));
                        return [3 /*break*/, 5];
                    case 4:
                        msg.reply('You MUST provide a font name: ' + "".concat(prefix, "loadfont `fontname`"));
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        msg.reply('Error: ' + e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); },
        desc: 'Loads FLF format font attached.'
    },
    {
        name: 'motivation',
        func: function (msg) {
            msg.reply(motivations[Math.floor(Math.random() * motivations.length)]);
        },
        desc: 'Tells you a motivational phrase!'
    },
    {
        name: 'ascii',
        func: function (msg, args) {
            if (args.length > 1) {
                var txt = args.slice(1).join(' ');
                (0, figlet_1["default"])(txt, {
                    font: toPascalCase(args[0]),
                    whitespaceBreak: true,
                    width: 100
                }, function (err, art) {
                    return msg.channel.send("```".concat(art || 'Unknown font', "```"));
                });
            }
            else {
                msg.reply("ERROR! Correct syntax: ".concat(prefix, "ascii `font` `text`"));
            }
        },
        desc: 'Replies the message you sent, but with ascii art'
    },
    {
        name: 'clear',
        func: function (msg, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(args.length !== 0 && !isNaN(args[0]))) return [3 /*break*/, 4];
                        if (!msg.member.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES)) return [3 /*break*/, 2];
                        return [4 /*yield*/, msg.channel.bulkDelete(parseInt(args[0]), true)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, msg.channel.send('***Deleted:*** ' + args[0] + ' messages')];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (msg.member.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES)) {
                            msg.reply("ERROR! Correct syntax: ".concat(prefix, "clear `messages number`"));
                        }
                        else {
                            msg.reply('You do not have Manage-Messages permission.');
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); },
        desc: 'Deletes (x) number of messages.'
    },
    {
        name: 'die',
        func: function (msg) {
            if (msg.author.id === '952247526071894017') {
                msg
                    .reply("I shall go to sleep, master.")
                    .then(function () {
                    client.destroy();
                    process.exit(0);
                });
            }
            else {
                msg.reply('Only my creator can shut me down!');
            }
        },
        desc: 'Shutdowns me.'
    },
    {
        name: 'whoami',
        func: function (msg) {
            var embed = {
                color: 0x9900ff,
                title: "Your account's username is ".concat(msg.author.username, "."),
                footer: footer
            };
            msg.channel.send({ embeds: [embed] });
        },
        desc: 'Tells you your username'
    },
    {
        name: 'version',
        func: function (msg) {
            var embed = {
                color: 0x9900ff,
                title: "Version: ".concat(version),
                footer: footer
            };
            msg.channel.send({ embeds: [embed] });
        },
        desc: 'Tells the bot version'
    },
    {
        name: 'help',
        func: function (msg) {
            var cmds = [];
            commands.forEach(function (e) {
                cmds.push("`".concat(prefix).concat(e.name, "`: ").concat(e.desc));
            });
            var title = "***Help menu:***\n***`Prefix`***: _'".concat(prefix, "'_\n-------------");
            var embed = {
                color: 0x9900ff,
                title: title,
                description: "".concat(cmds.join('\n')),
                footer: footer
            };
            msg.channel.send({ embeds: [embed] });
        },
        desc: "Displays this menu.'"
    },
];
client.on('messageCreate', function (msg) {
    var unknownEmbed = {
        color: 0xff0000,
        description: "Sorry, undefined.bot cannot understand what you are saying..",
        title: "Unknown command?"
    };
    // I'll run   it. wait a sec
    var command;
    var args = msg.content.split(/\s/g).slice(1);
    if (msg.content.startsWith(prefix)) {
        var cmdIndex = commands.findIndex(function (e) {
            return e.name ===
                msg.content.slice(prefix.length).split(/\s/g)[0].toLowerCase();
        });
        command = commands[cmdIndex] || {
            func: function (msag) {
                msag.reply({ embeds: [unknownEmbed] });
            }
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
