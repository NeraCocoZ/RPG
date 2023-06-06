/**
 * 파일 이름: index.js
 * 파일 경로: /router
 * 파일 작성자: NeraCocoZ (NeraCocoZ@gmail.com)
 * 파일 작성일: 2023-06-06
 */

// 모듈 선언
const express = require("express"); // Express
const router = express.Router(); // Express Router

/**
 * 주소: /
 * 타입: GET
 * 설명: 메인 페이지
 */
router.get("/", (req, res) => {
    res.render("index");
})

module.exports = router;