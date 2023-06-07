/**
 * 파일 이름: socket.js
 * 파일 경로: /
 * 파일 작성자: NeraCocoZ (NeraCocoZ@gmail.com)
 * 파일 작성일: 2023-06-07
 */

// 모듈 선언
const fs = require("fs"); // File System

// 소켓
function sockets(socket){
    // 로그인
    socket.on("login", login);
}

// 로그인
function login(userData){
    let userId = userData.userId;
    let userPw = userData.userPw;

    let userFind = fs.existsSync(`./userData/${userId}.json`);

    // 만약 유저 파일이 존재한다면
    if(userFind){
        let userFileData = fs.readFileSync(`./userData/${userId}.json`, {encoding: "utf-8"});
        let userDataJson = JSON.parse(userFileData);

        // 만약 비밀번호가 일치한다면
        if(userDataJson.password == userPw){
            this.emit("login", );
        }
        else this.emit("login", false);
        
    }
    else this.emit("login", false);
}

module.exports = sockets;