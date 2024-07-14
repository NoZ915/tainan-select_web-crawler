import "dotenv/config";
import axios from "axios";
import express from "express";
import cheerio from "cheerio";

import googleRequestCURL from "./utils/googleRequestCURL.js"

const app = express();
const courses = [];

// 抓111-2年
axios.post(
  'https://ecourse.nutn.edu.tw/public/tea_preview_list.aspx',
  // 前端發request才能得到我們要的表單資料（才能得到正確年份）
  googleRequestCURL,
  {
    headers: {
      'accept': '*/*',
      'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6',
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'cookie': '_ga_KBTFR9VFYX=GS1.3.1689954257.1.0.1689954257.0.0.0; _ga_PS0433VQVF=GS1.1.1714835699.1.1.1714835713.46.0.0; _ga=GA1.1.1027456643.1629120893; moo=sd1j4d5vfoshqkpfhe14js2u; __RequestVerificationToken=pCWrJympzkXGHwZWESrREP0YsL_JY13a_ufXUsAeb4X0klIyUGuOrRRySDx98E9dHYKOqgCRT3nSmyH7FQKvuy33lHO3TMLjU9JLx_bfOGg1',
      'origin': 'https://ecourse.nutn.edu.tw',
      'pragma': 'no-cache',
      'priority': 'u=1, i',
      'referer': 'https://ecourse.nutn.edu.tw/public/tea_preview_list.aspx',
      'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-platform': '"Android"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
      'x-microsoftajax': 'Delta=true',
      'x-requested-with': 'XMLHttpRequest'
    }
  }
).then(response => {

  // cheerio取得資料
  const $ = cheerio.load(response.data);
  $('table > tbody > tr > td').each(function () {
    courses.push($(this).text().split("\n")[1].replace(/\s*/g, ""));
    if ($(this).find("a").attr("href")) {
      courses.push($(this).find("a").attr("href"));
    }
  })
  // cheerio取得學期
  const semester = $("#label_title2").text().replace(/[^0-9]/ig, "");

  // 整理取得的資料
  const formattedData = [];
  for (let i = 0; i < courses.length; i += 11) {
    const course = {
      semester: `${semester.slice(0, 3)}-${semester.slice(3)}`,
      academy: courses.slice(53)[i],
      department: courses.slice(53)[i + 1],
      courseName: courses.slice(53)[i + 2]?.split("[")[0],
      courseURL: `https://ecourse.nutn.edu.tw/public/${courses.slice(53)[i + 3]}`,
      instructor: courses.slice(53)[i + 4],
      instructorURL: courses.slice(53)[i + 5],
      creditHours: courses.slice(53)[i + 6],
    };
    formattedData.push(course);
  }
  console.log(formattedData);
})

app.listen(process.env.PORT, () => {
  console.log(`listen to PORT ${process.env.PORT}`);
})