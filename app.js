var http = require('http');
var express = require("express");
var RED = require("node-red");
var fs = require('fs')


// Importing the required modules
const WebSocketServer = require('ws');

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8060 })

const sockets = [];

// Creating connection using websocket
wss.on("connection", ws => {
    sockets.push(ws);

    console.log(ws._socket.localAddress)


    // sending message
    ws.on("message", data => {


        // fs.writeFile('./ws.txt', JSON.stringify(ws));


        // console.log(ws)
        console.log(a == ws, 'or', b == ws)

        console.log(hosts)
        console.log(`Client has sent us: ${data}`)

        // if (data.id) {
        //     connections[data.id] = ws
        // }
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/", express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot: "/red",
    httpNodeRoot: "/api",
    userDir: "./.nodered/",
    functionGlobalContext: {}    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server, settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);

// https://stackoverflow.com/questions/28017698/intercept-and-potentially-deny-web-socket-upgrade-request
// https://masteringjs.io/tutorials/node/websocket-server
// https://stackoverflow.com/questions/4361173/http-headers-in-websockets-client-api

const hosts = []
let a, b;

server.on('upgrade', (request, socket, head) => {
    console.log(request.headers.origin)

    // if (request.headers.host === 'localhost:8000') {
    //     socket.write('Error!')
    //     socket.destroy();
    // }
    if (!a) {
        a = socket;
    }
    else {
        b = socket;
    }

    if (!hosts.includes(request.headers.host)) {
        hosts.push(request.headers.host)
        wss.handleUpgrade(request, socket, head, socket => {
            wss.emit('connection', socket, request);
        });
    }
});

server.listen(8000);

// Start the runtime
RED.start();