const axios = require('axios');
const fs = require("fs");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const src = 'https://www.udemy.com';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto(src);
  // Wait for the results page to load and display the results.
  await page.waitForSelector("div[data-purpose='smart-bar-container']", { timeout: 0 })
  .then((element) => {
    console.log('success');
  })
  .catch((err) => {
    console.log(err);
  });
  let bannerText = await page.evaluate(() => {
    let Element = Array.from(document.body.querySelectorAll("div[data-purpose='smart-bar-container']"), (el) => el.textContent);
    return Element;
  });
  bannerText = JSON.stringify(bannerText);
  console.log(bannerText);
  let saleEndTime = bannerText.split('Ends in');
  saleEndTime = JSON.stringify(saleEndTime[1]).replace('.', '').replace("\\", '').replace('"', '').replace('"\]"', '');
  saleEndTime = saleEndTime.trim().toString();
  saleEndTime = saleEndTime.split('h');
  saleEndHours = saleEndTime[0];
  saleEndTime = saleEndTime[1].trim().toString();
  saleEndMin = saleEndTime.split('m')[0];
  saleEndTime = saleEndTime[1].trim().toString();
  saleEndSec = saleEndTime.split('s')[0];
  console.log(saleEndHours, saleEndMin, saleEndSec);
  const endTime = (saleEndHours * 3600) + (saleEndMin * 60) + saleEndSec;
  console.log(endTime);
  const currentTimeInSeconds = new Date().getTime() / 1000;
  console.log(currentTimeInSeconds);
  let endTimeInUtc = new Date(endTime + currentTimeInSeconds);
  console.log(endTimeInUtc);

  // let saleHeadline = document.body.querySelector("[data-purpose='smart-bar-title']").textContent;
  // console.log(saleHeadline);
  // Extract the results from the page.

  // await browser.close();
})();


exports.handler = function(event, context, callback) {
  // server tings
}