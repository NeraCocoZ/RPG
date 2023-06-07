/**
 * 파일 이름: index.js
 * 파일 경로: /public/script
 * 파일 작성자: NeraCocoZ (NeraCocoZ@gmail.com)
 * 파일 작성일: 2023-06-06
 */

// 상수 선언
const socket = io(); // Socket.IO 불러오기
const version = "DEV"; // 현재 버전

// 변수 선언
let loggedin = false; // 로그인 상태를 확인하는 변수
let nowStage = "mainMenu"; // 현재 스테이지

let loginID, loginPass; // 로그인 아이디 비밀번호

// 페이지가 로드되면 실행
$(document).ready(() => {
    mainMenu(); // 메인메뉴

    // 엔터 클릭시
    $("#input").keyup((key) => {if(key.keyCode == 13) button_click();});

    // 버튼 클릭시
    $("#button").click(button_click);

    // 소켓 받기
    socket_on();
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
    else
        offlineInput(inputText);

    // 입력 내용 삭제
    $("#input").val("");

    console.log(`After Stage: ${nowStage}`);
}

// 오프라인 입력
function offlineInput(inputText){
    // 메인 메뉴 에서 입력
    if(nowStage == "mainMenu"){
        // 입력값이 로그인
        if(inputText == 1){
            // 로그인으로 이동
            login();
        }
        // 입력값이 회원가입
        else if(inputText == 2){

        }
    }

    // 로그인 에서 입력
    else if(nowStage == "login"){
        // 로그인 아이디 값 저장
        loginID = inputText;
        login_pw();
    }

    // 로그인 비밀번호 에서 입력
    else if(nowStage == "login_pw"){
        // 로그인 비밀번호 값 저장
        loginPass = inputText;
        // 로그인 요청
        request_login();
    }
}

// 메인 메뉴 출력
async function mainMenu(){
    nowStage = "mainMenu";

    clear(); // 화면 비우기

    await inputText({Text: `Fantasy World V. ${version}`});
    await inputLine();
    await inputText({Text: "1. 로그인", Header: "선택"});
    await inputText({Text: "2. 회원가입", Header: "선택"});
}

// 로그인 출력
async function login(){
    nowStage = "login";

    clear(); // 화면 비우기

    await inputText({Text: "로그인"});
    await inputLine();
    await inputText({Text: "아이디를 입력해주세요.", Header: "입력"});
}

// 로그인 비밀번호 출력
async function login_pw(){
    nowStage = "login_pw";

    await inputText({Text: "비밀번호를 입력해주세요.", Header: "입력"});
}

// 로그인 요청
function request_login(){
    socket.emit("login", {userId: loginID, userPw: loginPass});
}

// 소켓 받기
function socket_on(){
    // 로그인 결과 받기
    socket.on("login", async (result) => {
        // 로그인 실패
        if(result == false) {
            clear(); // 화면 비우기
            await inputText({Text: "로그인에 실패했습니다. 5초 후 메인화면으로 이동됩니다."});

            // 입력창 비활성화
            $("#input").attr("disabled", true);
            $("#input").attr("placeholder", "대기중...");

            // 딜레이 5초
            await delay(5000);

            // 입력창 활성화
            $("#input").attr("placeholder", "입력후 Enter 클릭!");
            $("#input").focus();

            // 메인메뉴
            mainMenu();
        }
        // 로그인 성공
        else{
            loggedin = true;
            new Function(result);
        }
    })
}