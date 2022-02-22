// 필터 없이 가는거라 제가 가진 정보 중에 필요한 건 id 말고는 드릴 수가 있는게 있을까요?
// 로그인 시 리턴하는 정보에 필요한 값을 추가하시면 좋을 것 같습니다. 
// 로그인 시, 받는 데이터는 아래와 같습니다.
/**
 * 
Authority: "super_admin"
charge_time: -2490
lang: "ko"
name: "강민석"
token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMb2dpbiBKV1QiLCJleHAiOjE2NDU1MzczOTksImlhdCI6MTY0NTUzMDE5OSwibG9naW4iOnsiaWQiOiJrdGhya2RhbHNAdGVhbXNub3diYWxsLmNvbSIsInBhc3N3b3JkIjoicXdlcjEyMzQqIiwibGFuZyI6bnVsbCwiZGVtbyI6bnVsbCwidGltZWxpbWl0IjowLCJleGRhdGUiOm51bGwsInN0YXJ0ZWQiOjAsImF1dGhvcml0eSI6bnVsbCwiY2hhcmdlX3RpbWUiOjAsImdhbWV0eXBlIjpudWxsLCJ1c2VydHlwZSI6bnVsbCwibm90aWNlX2NvdW50IjpudWxsLCJuYW1lIjpudWxsLCJjaGtsb2dpbiI6bnVsbCwidG9rZW4iOm51bGwsImNoYXJnZV9kYXRlIjpudWxsLCJtYXN0ZXJrZXkiOm51bGwsImNlcm51bWJlciI6bnVsbCwiaXAiOm51bGwsImJyb3dzZXIiOm51bGwsImVycm9yIjpudWxsfX0.yKl_stGmLxK4AdBjgVld4VH2usNoVaHs5nHmWG_4TSg"
user:
  authority: "super_admin"
  browser: "Chrome"
  cernumber: "IPA10509"
  charge_date: null
  charge_time: -2490
  chklogin: "Y"
  demo: "0"
  error: null
  exdate: "2022-01-11 16:13:32"
  gametype: "TOTAL"
  id: "kthrkdals@teamsnowball.com"
  ip: "192.168.88.1"
  lang: "ko"
  masterkey: "775c1fb0ba552fa2"
  name: "강민석"
  notice_count: "0"
  password: "5e12ea97312b2fd693d61f72fc1118d695bd12fd8c2967901131427f67100aaa"
  started: 0
  timelimit: 0
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMb2dpbiBKV1QiLCJleHAiOjE2NDU1MzczOTksImlhdCI6MTY0NTUzMDE5OSwibG9naW4iOnsiaWQiOiJrdGhya2RhbHNAdGVhbXNub3diYWxsLmNvbSIsInBhc3N3b3JkIjoicXdlcjEyMzQqIiwibGFuZyI6bnVsbCwiZGVtbyI6bnVsbCwidGltZWxpbWl0IjowLCJleGRhdGUiOm51bGwsInN0YXJ0ZWQiOjAsImF1dGhvcml0eSI6bnVsbCwiY2hhcmdlX3RpbWUiOjAsImdhbWV0eXBlIjpudWxsLCJ1c2VydHlwZSI6bnVsbCwibm90aWNlX2NvdW50IjpudWxsLCJuYW1lIjpudWxsLCJjaGtsb2dpbiI6bnVsbCwidG9rZW4iOm51bGwsImNoYXJnZV9kYXRlIjpudWxsLCJtYXN0ZXJrZXkiOm51bGwsImNlcm51bWJlciI6bnVsbCwiaXAiOm51bGwsImJyb3dzZXIiOm51bGwsImVycm9yIjpudWxsfX0.yKl_stGmLxK4AdBjgVld4VH2usNoVaHs5nHmWG_4TSg"
  usertype: "관리자"
[[Prototype]]: Object
userId: "kthrkdals@teamsnowball.com"
[[Prototype]]: Object
 */

import { API } from "../../../../config"

const param = {
  id: "나는 담원 코치",
  token: "I am token. so long long.."
}

const url = `${API}/lolapi/soloRank/myTeam`

const data = {
  League: 'LCK', // 필터를 안써서 받아야함으로 필요.
  Team: { // 로그인 정보에 있으면 쓰는데 없어서 받아야 할 것 같네요
    약어: "DK",
    FullName: "DWG KIA"
  },
  PlayerCount: 5,
  Players: [{
    line: "mid",
    nickName: "ShowMaker",
    name: "김허수",
    star: true, // 관심 선수 등록 여부
    soloRankInfo: [{
      id: "DK ShowMaker",
      tier: {
        grade: "Challenger",
        lp: 1588
      },
      lastSeason: {
        game: 1042,
        win: 580,
        lose: 449,
        //winLate: 55% // 있으면 좋고 없으면 제가 계산해도 됩니다!
      },
      lastDay: {
        game: 30,
        win: 15,
        lose: 15,
        //winLate: 50%
      }
    }, {
      id: "내이름은 쇼메이커",
      tier: {
        grade: "Challenger",
        lp: 1588
      },
      lastSeason: {
        game: 1042,
        win: 580,
        lose: 449,
        //winLate: 55% // 있으면 좋고 없으면 제가 계산해도 됩니다!
      },
      lastDay: { // param으로 'last day'를 넘겨주고 받는 값
        game: 30,
        win: 15,
        lose: 15,
        //winLate: 50%
      }
    }],
    playChampion: [{ // param으로 'last day'를 넘겨주고 받는 값
      champion: 'Nunu',
      game: 30,
      win: 15,
      lose: 15,
      //winLate: 50%
    }, {
      champion: 'Vladimir',
      game: 30,
      win: 15,
      lose: 15,
      //winLate: 50%
    },
      // ...
    ]
  },
  {
    line: "top",
    nickName: "Khan",
    name: "김동하",
    star: false, // 관심 선수 등록 여부
    soloRankInfo: [{
      id: "DK Khan",
      tier: {
        grade: "Challenger",
        lp: 1588
      },
      lastSeason: {
        game: 1042,
        win: 580,
        lose: 449,
        //winLate: 55% // 있으면 좋고 없으면 제가 계산해도 됩니다!
      },
      lastDay: { // param으로 'last day'를 넘겨주고 받는 값
        game: 30,
        win: 15,
        lose: 15,
        //winLate: 50%
      },
      playChampion: [{ // param으로 'last day'를 넘겨주고 받는 값
        champion: 'Nunu',
        game: 30,
        win: 15,
        lose: 15,
        //winLate: 50%
      }, {
        champion: 'Vladimir',
        game: 30,
        win: 15,
        lose: 15,
        //winLate: 50%
      },
        // ...
      ]
    }]
  }]
}