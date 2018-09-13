"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
        this.logStyles = {
            default: 'color: #868e96;',
            danger: 'color: #dc3545;',
            info: 'color: #0275D8;',
            success: 'color: #25c88e;',
            warn: 'color: #fd7e14;'
        };
        this.messages = [];
    }
    ConsoleLogger.prototype.log = function (title, message, options) {
        options = (options || {
            type: 'default',
            isDetailed: false
        });
        this.console(title, message, options);
        this.add({
            date: (new Date().toISOString()),
            title: title,
            message: message,
            options: options
        });
    };
    ConsoleLogger.prototype.clearMessages = function () {
        this.messages.length = 0;
    };
    ConsoleLogger.prototype.getMessages = function () {
        console.table(this.messages);
    };
    ConsoleLogger.prototype.add = function (message) {
        this.messages.push(message);
    };
    ConsoleLogger.prototype.getConsoleDate = function (isDetailed) {
        var today = moment(new Date());
        isDetailed = (isDetailed || false);
        return (isDetailed ? today.format('MMMM Do YYYY @ h:mm:ss a') : today.format('h:mm:ss'));
    };
    ConsoleLogger.prototype.console = function (title, message, options) {
        var messagesLength = this.messages.length;
        var lastMessageMiliseconds = '';
        var date = this.getConsoleDate(options.isDetailed);
        if (messagesLength > 0) {
            var lastMessage = this.messages[messagesLength - 1];
            if (lastMessage.title === title) {
                lastMessageMiliseconds = moment.utc(moment(lastMessage.date).diff(new Date())).format('SSS');
                if (Number(lastMessageMiliseconds) < 2000) {
                    lastMessageMiliseconds = lastMessageMiliseconds + "ms ";
                }
            }
        }
        if (localStorage.getItem('ConsoleErrors') === 'true') {
            var titleStyle = this.logStyles.hasOwnProperty(options.type) ? options.type : 'default';
            var messageStyle = this.logStyles.hasOwnProperty(options.type) ? options.type : 'default';
            var isDetailed = options.isDetailed = (options.isDetailed || false);
            var separatorStyle = 'color: #adb5bd';
            titleStyle = "font-weight: bold; " + this.logStyles[titleStyle];
            // tslint:disable-next-line:max-line-length
            console.log("%c\u203A " + date + " %c" + title + " %c" + lastMessageMiliseconds + "\u2022%c " + message, separatorStyle, titleStyle, separatorStyle, messageStyle);
        }
    };
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;
