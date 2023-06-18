# RPG - Fantasy World

## 목차
* [1. 할일](#1-할일)
* [2. 한일](#2-한일)
* [3. 시스템](#3-시스템)
    - [1차 스탯](#1차-스탯)
    - [2차 스탯](#2차-스탯)
    - [스탯 계산식](#스탯-계산식)
    - [대미지 계산식](#대미지-계산식)
* [4. 클래스](#4-클래스)
    - [물리 공격 클래스](#물리-공격-클래스)
    - [마법 공격 클래스](#마법-공격-클래스)

---

## 1. 할일
* 게임 방식은 TextRPG
* 모든 처리는 서버에서, 클라이언트는 선택지를 보여주고 고른 선택지를 서버로 전송하는 역활.
* 게임의 모든 숫자는 16비트. (MAX: 65535)
* 클래스는 기본 클래스, 1차 클래스, 2차 클래스, 최종 클래스 예정
* 클래스 목록은 [나무위키 - 클래스(게임 용어)](https://namu.wiki/w/%ED%81%B4%EB%9E%98%EC%8A%A4(%EA%B2%8C%EC%9E%84%20%EC%9A%A9%EC%96%B4)) 참조
* 서버 연결 방식은 Socket.io 로 변경 (이전 WebSocket은 연결 문제로 인한 실패) - 완료
* /public/script/index.js 파일 정리 필요 및 좀더 깔끔한 방법 강구
* 로그인 및 플레이어 데이터는 json 파일로 내부 저장

---

## 2. 한일
* 2023-06-05
    - 프로젝트 시작
    - README.md 작성
* 2023-06-06
    - 서버 생성
    - 메인 화면 생성
    - 타이핑 효과 추가
* 2023-06-07
    - 서버와 클라이언트 연결
    - 로그인 통신 완료

---

## 3. 시스템

### 1차 스탯 - 장비 장착, 버프 또는 아이템 사용으로만 올릴수 있는 스탯.
* HP (체력)
    * 적의 공격을 받거나 상태이상으로 줄어드는 스탯.
    * 0이 되면 플레이어가 사망한다.  
  
* MP (마나)
    * 스킬을 사용할때 줄어드는 스탯.
    * 스킬의 필요 MP 이하로 줄어들면 스킬을 사용할수 없다.  

* ATK (공격력)
    * 적을 공격할때 가장 중요한 스탯.
    * 장착한 아이템, 사용한 아이템 또는 스킬들로 인해 수치가 변경된다.  

* DEF (방어력)
    * 적의 공격을 맞을때 줄어드는 HP를 줄이는 스탯.
    * 장착한 아이템, 사용한 아이템 또는 스킬들로 인해 수치가 변경된다.  

* HIT (명중)
    * 공격이 성공할 확률을 표시하는 스탯.
    * 높을수록 공격의 성공률이 높아진다. (MAX: 100, 단위: %)  

* DODGE (회피)
    * 공격을 피할 확률을 표시하는 스탯.
    * 높을수록 공격의 회피율이 높아진다. (MAX: 100, 단위: %)  

* BLOCK (블록)
    * 공격을 막을 확률을 표시하는 스탯.
    * 높을수록 공격을 막을 확률이 높아진다. (MAX: 100, 단위: %)  
    
* CRIT (크리티컬)
    * 추가 데미지를 입힐 확률을 표시하는 스탯.
    * 높을수록 추가 데미지를 입힐 확률이 높아진다. (MAX: 100, 단위: %)  

* CRIT-DMG (크리티컬 데미지)
    * 추가 데미지의 피해량을 정하는 스탯.
    * 높을수록 추가 데미지를 높게 입힌다. (MIN: 50, MAX: 300, 단위: %)  

* EXP (경험치)
    * 플레이어의 레벨을 올리는 스탯.
    * 레벨별 정해진 경험치를 채우면 다음 레벨로 업한다.  

### 2차 스탯 - 아이템 장착, 버프, 아이템 사용 외에도 직접 스탯 포인트를 투자해 올릴수 있는 스탯.
* STR (힘)
    * 물리 공격 클래스의 공격력을 관여하는 스탯.
    * 일정 수치 이상에만 착용 가능한 장비가 있다.

* INT (지능)
    * 마법 공격 클래스의 공격력을 관여하는 스탯.
    * 일정 수치 이상에만 착용 가능한 장비가 있다.

* DEX (민첩)
    * 회피율에 관여하는 스탯.
    * 일정 수치 이상에만 착용 가능한 장비가 있다.

* CHA (매력)
    * NPC들의 호감도를 올릴때 필요한 스탯.
    * 일정 수치 이상에만 착용 가능한 장비가 있다.

* CON (건강)
    * 체력의 회복 속도 및 체력의 최댓값에 관여하는 스탯.

* WIS (지혜)
    * 마나의 회복 속도 및 마나의 최댓값에 관여하는 스탯.

### 스탯 계산식
* `HP (체력) = 장비 체력 합 + (CON (건강) * 0.7)`
* `MP (마나) = 장비 마나 합 + (WIS (지혜) * 1.0)`
* `ATK (공격력) = 장비 공격력 합`
* `DEF (방어력) = 장비 방어력 합`

### 대미지 계산식
* `P-DMG (물리 대미지) = (공격력 + (STR (힘) * 0.7) - DEF (방어력)) * 스킬 배율`
* `M-DMG (마법 대미지) = (공격력 + (INT (지능) * 0.8) - DEF (방어력)) * 스킬 배율`

---

## 4. 클래스

### 물리 공격 클래스
* 전사 (기본 클래스)
    * 광전사 (1차 클래스) - 버서커 (2차 클래스) - 광마 (최종 클래스) = 사용 무기: 대검
    * 기사 (1차 클래스) - 나이트 (2차 클래스) - 도제 (최종 클래스) = 사용 무기: 한손검
    * 검사 (1차 클래스) - 소드 마스터 (2차 클래스) - 검성 (최종 클래스) = 사용 무기: 두손검

* 무도가 (기본 클래스)
    * 파이터 (1차 클래스) - 스트라이커 (2차 클래스) - 무제 (최종 클래스) = 사용 무기: 너클
    * 격투가 (1차 클래스) - 미스틱 (2차 클래스) - 투희 (최종 클래스) = 사용 무기: 권갑

* 로그 (기본 클래스)
    * 도적 (1차 클래스) - 시프 (2차 클래스) - 시프 마스터 (최종 클래스) = 사용 무기: 단검
    * 암살자 (1차 클래스) - 어쌔신 (2차 클래스) - 어쌔신 마스터 (최종 클래스) = 사용 무기: 아대

* 사수 (기본 클래스)
    * 궁수 (1차 클래스) - 헌터 (2차 클래스) - 신궁 (최종 클래스) = 사용 무기: 활
    * 거너 (1차 클래스) - 건슬링거 (2차 클래스) - 스나이퍼 (최종 클래스) = 사용 무기: 총

### 마법 공격 클래스
* 마법사 (기본 클래스)
    * 위저드 (1차 클래스) - 메이지 (2차 클래스) - 아크 메이지 (최종 클래스) = 사용 무기: 스태프
    * 원소술사 (1차 클래스) - 엘리멘탈 리스트 (2차 클래스) - 엘리멘탈 마스터 (최종 클래스) = 사용 무기: 완드
    * 소환술사 (1차 클래스) - 서머너 (2차 클래스) - 마스터 서머너 (최종 클래스) = 사용 무기: 오브

* 흑마법사 (기본 클래스)
    * 다크 위저드 (1차 클래스) - 다크 메이지 (2차 클래스) - 워록 (최종 클래스) = 사용 무기: 염주
    * 사령술사 (1차 클래스) - 네크로맨서 (2차 클래스) - 트루 네크로맨서 (최종 클래스) = 사용 무기: 강령술서

* 성직자 (기본 클래스)
    * 사제 (1차 클래스) - 클레릭 (2차 클래스) - 프리스트 (최종 클래스) = 사용 무기: 성경
    * 비숍 (1차 클래스) - 이단심문관 (2차 클래스) - 인퀴지터 (최종 클래스) = 사용 무기: 십자가