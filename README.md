Chatty App
=====================

A single page app built using ReactJS that allows multiple users to 
communicate via web sockets.  It allows for text messages and displays
images when a image URL is added to the message field.

### Usage

1. Fork this repository, then clone your fork of this repository.

2. Install dependencies using the npm install command.

3. To start the web server, open a Terminal window, navigate to /Chatty_app and use the    npm run command. The app will be served at http://localhost:3000/.

4. To start the web socket, open a new Terminal window, navigate to /Chatty_app/           chatty_server and use the npm run command. Any other users who run chatty-app and       connect http://localhost:3000/ will be able to communicate with you.

5. If you wish, you can start typing messages right away. When another user connects,      the user count will update. Any messages you send at this point will be seen by you     and all other connected users.

6. The default username is "Anonymous", but you can change this at any time by typing      out a new username and pressing Enter.

### Screenshots

!["Screenshot of Chatty App"](https://github.com/brianeshores/Chatty-app/blob/master/docs/chatty_app.png)

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* React-dom

### Dev Dependencies

* @babel/core
* @babel/preset-env
* @babel/preset-react
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
