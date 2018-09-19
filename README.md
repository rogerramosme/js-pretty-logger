# js-pretty-logger 🎨
A Simple beaultiful to read console logger

## Usage
First off all, you need to set the `localStorage` key `showConsole`.
This was made to avoid some users of seeing these infos into console by default.

```javascript
localStorage.setItem('showConsole', 'true');
```
Then just import and use:

```javascript
// CommonJS
const logger = require('console-logger');
logger('AuthGuard', 'User login initialized', { type: 'info' });

//ES6
import logger from 'js-pretty-logger';
logger('AuthGuard', 'User login initialized', { type: 'info' });
```
```sh
11:53:08 AuthGuard • Initialized
```

## Options

| param              | type    | description |
| ------------------ | ------- | ----------- |
| title              | string  | The context that will be logged. Just for visual. |
| message            | string  | The message that will be logged.. Just for visual too |
| options (optional) | object  | object with log configurations |
| options.type       | string  | type of message that will be logged. Defines what is the `title` color. Options: default, danger, info, success or warn |
| options.isDetailed | boolean | Show the log time with detailed information. Good when you need to let yout application running from one day to another |

## Examples

### All color options

```javascript
logger('AuthGuard', 'User login initialized', { type: 'default' });
logger('AuthGuard', 'Searching for user...', { type: 'info' });
logger('AuthGuard', 'User not found!', { type: 'danger' });
logger('AuthGuard', 'User found!', { type: 'success' });
logger('AuthGuard', 'User password will expire soon', { type: 'warn' });
```
![output](https://raw.githubusercontent.com/rodgerpaulo/js-pretty-logger/master/assets/log-styles.PNG)

### Detailed time

```javascript
logger('AuthGuard', 'User password will expire soon', { isDetailed: true });
```
![Output]![output](https://raw.githubusercontent.com/rodgerpaulo/js-pretty-logger/master/assets/log-detailed.PNG)

## Pro-tip 💡

Create methods inside yout code to abstract params:

``` javascript
// socket_middleware.js
import logger from 'js-pretty-logger';

// create a method to abstract title and type
const logIntoConsole = (message, type) => {
    logger('SocketMiddleware', message, {type: type});
}

// then use in yout code!
const onConnect = () => {
    logIntoConsole('Connected!', 'success');
}

const onError = () => {
    logIntoConsole('Failed to connect', 'danger');
}
```