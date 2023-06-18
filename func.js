/**
 * 파일 이름: func.js
 * 파일 경로: /
 * 파일 작성자: NeraCocoZ (NeraCocoZ@gmail.com)
 * 파일 작성일: 2023-06-15
 */

// 모듈 선언
const mysql = require("mysql2/promise");

// 상수 선언
const config = {
    "host": "112.175.184.60",
    "port": 3306,
    "user": "rpg",
    "password": "psh11080!",
    "database": "rpg",
    "connectionLimit": 1000
}
let pool = mysql.createPool(config);

/**
 * 함수 이름: sendQuery(string SQL);
 * 설명: SQL을 보내 값을 받아옵니다.
 * @param {string} SQL 
 * @returns rows;
 */
exports.sendQuery = async function(SQL){
    try{
        let conn = await pool.getConnection(async conn => conn);
        let [rows] = await conn.query(SQL);

        conn.release();

        return rows;
    }
    catch(e){
        console.log(e)
        return 0;
    }
}