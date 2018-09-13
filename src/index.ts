import * as moment from 'moment';

export class consoleLogger {

    messages: Log[];
    private logStyles: Colors = {
        default: 'color: #868e96;',
        danger: 'color: #dc3545;',
        info: 'color: #0275D8;',
        success: 'color: #25c88e;',
        warn: 'color: #fd7e14;'
    };

    constructor() {
        this.messages = [];
    }

    log(title: string, message: string, options?: ConsoleOptions): void {


        options = (options || {
            type: 'default',
            isDetailed: false
        });

        this.console(title, message, options);
        this.add({
            date: (new Date().toISOString()),
            title,
            message,
            options
        });
    }

    clearMessages(): void {
        this.messages.length = 0;
    }

    getMessages(): void {
        console.table(this.messages);
    }

    private add(message: Log): void {

        this.messages.push(message);
    }

    private getConsoleDate(isDetailed?: boolean): string {

        const today = moment(new Date());
        isDetailed = (isDetailed || false);

        return (isDetailed ? today.format('MMMM Do YYYY @ h:mm:ss a') : today.format('h:mm:ss'));
    }

    private console(title: string, message: string, options: ConsoleOptions): void {

        const messagesLength = this.messages.length;
        let lastMessageMiliseconds = '';
        const date = this.getConsoleDate(options.isDetailed);

        if (messagesLength > 0) {

            const lastMessage = this.messages[messagesLength - 1];
            if (lastMessage.title === title) {

                lastMessageMiliseconds = moment.utc(moment(lastMessage.date).diff(new Date())).format('SSS');
                if (Number(lastMessageMiliseconds) < 2000) {

                    lastMessageMiliseconds = `${lastMessageMiliseconds}ms `;
                }
            }
        }

        if (localStorage.getItem('ConsoleErrors') === 'true') {

            let titleStyle = this.logStyles.hasOwnProperty(options.type) ? options.type : 'default';
            const messageStyle = this.logStyles.hasOwnProperty(options.type) ? options.type : 'default';
            const isDetailed = options.isDetailed = (options.isDetailed || false);
            const separatorStyle = 'color: #adb5bd';

            titleStyle = `font-weight: bold; ${this.logStyles[titleStyle]}`;

            // tslint:disable-next-line:max-line-length
            console.log(`%c› ${date} %c${title} %c${lastMessageMiliseconds}•%c ${message}`, separatorStyle, titleStyle, separatorStyle, messageStyle);
        }
    }
}

interface Log {
    title: string;
    message: string;
    options?: ConsoleOptions;
    date?: string;
}

interface ConsoleOptions {
    type: string;
    isDetailed: boolean;
}

interface Colors {
    [color_name: string]: string;
}