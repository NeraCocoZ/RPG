/**
 * 파일 이름: api.js
 * 파일 경로: /router
 * 파일 작성자: NeraCocoZ (NeraCocoZ@gmail.com)
 * 파일 작성일: 2023-06-13
 */

// 모듈 선언
const express = require("express"); // Express
const router = express.Router(); // Express Router
const fs = require("fs"); // File System

/**
 * 주소: /api/v1/class.json
 * 타입: GET
 * 설명: class API
 */
router.get("/v1/class.json", (req, res) => {
    let classJson = JSON.parse(fs.readFileSync("./metadata/class.json", "utf-8"));
    res.json(classJson);
});

/**
 * 주소: /api/v1/weaponType.json
 * 타입: GET
 * 설명: weaponType API
 */
router.get("/v1/weaponType.json", (req, res) => {
    let weaponTypeJson = JSON.parse(fs.readFileSync("./metadata/weaponType.json", "utf-8"));
    res.json(weaponTypeJson);
});

module.exports = router;