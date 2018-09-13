export declare class ConsoleLogger {
    messages: Log[];
    private logStyles;
    constructor();
    log(title: string, message: string, options?: ConsoleOptions): void;
    clearMessages(): void;
    getMessages(): void;
    private add;
    private getConsoleDate;
    private console;
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
export {};
