/**
 * 파일 이름: app.js
 * 파일 경로: /
 * 파일 작성자: NeraCocoZ (NeraCocoZ@gmail.com)
 * 파일 작성일: 2023-06-06
 */

// 모듈 선언
const express = require("express"); // Express
const http = require("http"); // Http
const {Server} = require("socket.io"); // Socket.IO
const chalk = require("chalk"); // Chalk
const path = require("path"); // Path

// 상수 선언
const address = "127.0.0.1";
const port = 8080;

// 변수 선언

// Express 서버 선언
let app = express();

// Http 서버 선언
let server = http.createServer(app);

// Socket.IO 서버 선언
let io = new Server(server);

// Express 서버 설정
app.set("views", path.join(__dirname, "/views")); // view 폴더
app.set("view engine", "ejs"); // EJS 사용
app.use(express.static("public")); // Public 정적 폴더

// Express 라우터
let indexRouter = require("./router/index");

app.use("/", indexRouter);

// http 서버 실행
server.listen(port, address, () => {
    console.log(`${chalk.blueBright("[ 서버 ]")} 서버가 실행됬습니다.`);
    console.log(`${chalk.blueBright(`[ 서버 ]`)} 주소: http://${address}:${port}`);
});