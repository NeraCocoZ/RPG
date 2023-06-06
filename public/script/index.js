/**
 * 파일 이름: index.js
 * 파일 경로: /public/script
 * 파일 작성자: NeraCocoZ (NeraCocoZ@gmail.com)
 * 파일 작성일: 2023-06-06
 */

// 상수 선언
const socket = io();
const version = "DEV";

// 변수 선언
let loggedin = false; // 로그인 상태를 확인하는 변수
let nowStage = "mainMenu";

let loginID, loginPass;

// 페이지가 로드되면 실행
$(document).ready(async () => {
    mainMenu();

    $("#input").keyup((key) => {if(key.keyCode == 13) button_click();});
    $("#button").click(button_click);
});

// 버튼 클릭
function button_click(){
    console.log(`Before Stage: ${nowStage}`);

    // 변수 선언
    let inputText = $("#input").val();

    // 빈칸 꺼져
    if(inputText == "") return;

    // 로그인 상태 확인
    if(loggedin){
        socket.emit("sendInput", inputText);
    }
    else{
        // 현재 스테이지 확인
        if(nowStage == "mainMenu") mainMenu_input(inputText);
        else if(nowStage == "login" || nowStage == "login_password") login_input(inputText);
        else if()
    }

    // 입력 내용 삭제
    $("#input").val("");

    console.log(`After Stage: ${nowStage}`);
}

// 메인 메뉴 출력
async function mainMenu(){
    await inputText({Text: `Fantasy World V. ${version}`});
    await inputLine();
    await inputText({Text: "1. 로그인", Header: "선택"});
    await inputText({Text: "2. 회원가입", Header: "선택"});
}

// 메인 메뉴 선택
function mainMenu_input(inputText){
    if(inputText == 1){
        // 로그인
        login();
    }
    else if(inputText == 2){
        // 회원가입
    }
}

// 로그인 출력
async function login(){
    if(nowStage == "mainMenu"){
        nowStage = "login";

        clear();
        await inputText({Text: `로그인`});
        await inputLine();
        await inputText({Text: "아이디를 입력해주세요.", Header: "입력"});
    }
    else if(nowStage == "login"){
        nowStage = "login_password"
        await inputText({Text: "비밀번호를 입력해주세요.", Header: "입력"});
        $("#input").attr("type", "password");
    }
}

// 로그인 선택
function login_input(inputText){
    // 스테이지 확인
    if(nowStage == "login"){
        loginID = inputText;
        login();
    }
    else if(nowStage == "login_password"){
        loginPass = inputText;
    }
}

// 텍스트 비우기
function clear(){
    $("#textarea").html("");
}

// 선 출력
async function inputLine(){
    // 상수 선언
    const typingSpeed = 10;

    // 변수 선언
    let textElement = $(`<a id="text"></a><br>`);
    let inputText = "================================================================================";

    $(textElement).html(``);
    $("#textarea").append(textElement);
    $("#input").attr("disabled", true);
    $("#input").attr("placeholder", "대기중...");

    for(let i = 0; i < inputText.length; i ++){
        await delay(typingSpeed);
        $(textElement).html(`${$(textElement).html()}${inputText[i]}`);
    }

    $("#input").attr("disabled", false);
    $("#input").attr("placeholder", "입력후 Enter 클릭!");
    $("#input").focus();
}

// 텍스트 출력
async function inputText(data){
    // 상수 선언
    const typingSpeed = 50;

    // 변수 선언
    let textElement = $(`<a id="text"></a><br>`);
    let text = data.Text;
    let header = data.Header == undefined ? "시스템" : data.Header;
    let inputText = `[ ${header} ] ${text}`;

    $(textElement).html(``);
    $("#textarea").append(textElement);
    $("#input").attr("disabled", true);
    $("#input").attr("placeholder", "대기중...");

    for(let i = 0; i < inputText.length; i ++){
        await delay(typingSpeed);
        $(textElement).html(`${$(textElement).html()}${inputText[i]}`);
    }

    //await delay(250);
    $("#input").attr("disabled", false);
    $("#input").attr("placeholder", "입력후 Enter 클릭!");
    $("#input").focus();
}


// 딜레이
function delay(ms){
    return new Promise(res => setTimeout(res, ms));
}