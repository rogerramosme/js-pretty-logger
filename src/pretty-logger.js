const moment  = require('moment');
const logStyles = require('./lib/log-styles');
const env = require('./enums/env');

const isNode = env.isNode;

let messages = [];

const addLog = message => messages.push(message);

const getConsoleDate = isDetailed => {

    const today = moment(new Date());
    isDetailed = (isDetailed || false);

    return (isDetailed ? today.format('MMMM Do YYYY @ h:mm:ss a') : today.format('h:mm:ss'));
}

const consoleMessage = (title, message, options) => {

    const messagesLength = messages.length;
    let lastMessageMiliseconds = '';
    const date = getConsoleDate(options.isDetailed);

    if (messagesLength > 0) {

        const lastMessage = messages[messagesLength - 1];
        if (lastMessage.title === title) {

            lastMessageMiliseconds = moment.utc(moment(lastMessage.date).diff(new Date())).format('SSS');
            if (Number(lastMessageMiliseconds) < 2000) {
                lastMessageMiliseconds = `${lastMessageMiliseconds}ms `;
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