const format = require('date-fns/format');
const diff = require('date-fns/difference_in_milliseconds');
const logStyles = require('./lib/log-styles');
const env = require('./enums/env');

const isNode = env.isNode;
let messages = [];

const addLog = message => messages.push(message);

const getConsoleDate = (isDetailed = false) => {
    const today = new Date();

    return (isDetailed ? format(today, 'MMMM Do YYYY @ HH:mm:ss') : format(today, 'HH:mm:ss'));
}

const consoleMessage = (title, message, options) => {

    const messagesLength = messages.length;
    let lastMessageMiliseconds = '';
    const date = getConsoleDate(options.isDetailed);

    if (messagesLength > 0) {

        const lastMessage = messages[messagesLength - 1];
        if (lastMessage.title === title) {

            lastMessageMiliseconds = diff(lastMessage.date, new Date());
            if (Number(lastMessageMiliseconds) < 2000) {
                lastMessageMiliseconds = (lastMessageMiliseconds > 0 ? `${lastMessageMiliseconds}ms ` : '');
            }
        }
    }

    if (isNode || localStorage.getItem('showConsole') === 'true') {

        let titleStyle = logStyles.hasOwnProperty(options.type) ? options.type : 'default';
        const messageStyle = logStyles.hasOwnProperty(options.type) ? options.type : 'default';
        const separatorStyle = 'color: #adb5bd';

        titleStyle = `font-weight: bold; ${logStyles[titleStyle]}`;

        // tslint:disable-next-line:max-line-length
        console.log(`%c› ${date} %c${title} %c${lastMessageMiliseconds}•%c ${message}`, separatorStyle, titleStyle, separatorStyle, messageStyle);
    }
}

const log = (title, message, options) => {

    options = (options || {
        type: 'default',
        isDetailed: false
    });

    consoleMessage(title, message, options);
    addLog({
        date: (new Date().toISOString()),
        title,
        message,
        options
    });
}

module.exports = log;