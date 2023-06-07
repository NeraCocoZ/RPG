/**
 * 파일 이름: function.js
 * 파일 경로: /public/script
 * 파일 작성자: NeraCocoZ (NeraCocoZ@gmail.com)
 * 파일 작성일: 2023-06-07
 */

/**
 * 함수 이름: clear
 * 함수 설명: 텍스트 영역을 비웁니다.
 */
function clear(){
    $("#textarea").html("");
}

/**
 * 함수 이름: inputLine
 * 함수 설명: 텍스트 영역에 선을 추가합니다.
 */
async function inputLine(){
    // 상수 선언
    const typingSpeed = 10;

    // 변수 선언
    let textElement = $(`<a id="text"></a><br>`);
    let inputText = "========================================";

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

/**
 * 함수 이름: inputText
 * 매개 변수: data: JSON (Text, Header)
 * 함수 설명: 텍스트 영역에 텍스트를 추가합니다.
 */
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


/**
 * 함수 이름: delay
 * 매개 변수: ms: Number (밀리세컨드)
 * 함수 설명: 입력한 시간만큼 딜레이를 준다.
 */
function delay(ms){
    return new Promise(res => setTimeout(res, ms));
}