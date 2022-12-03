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
    console.log('success: smart bar is available');
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
  saleEndTime = saleEndTime.trim().split("h");
  saleEndHour = saleEndTime[0];
  saleEndTime = saleEndTime[1].trim().split("m");
  saleEndMin = saleEndTime[0];
  saleEndSec = saleEndTime[1].trim().split("s")[0];
  console.log(saleEndHour, saleEndMin, saleEndSec);
  // NOTE: added 6 hours to account for my timezone... UTC-6?
  // TODO: double check this logic
  const endTime = ((saleEndHour + 6) * 60 * 60) + (saleEndMin * 60) + saleEndSec;
  const currentTime = new Date();
  const currentTimeInSeconds = currentTime.getTime();
  //TODO: check these times
  console.log(currentTime.toLocaleString());

  let endTimeInUtc = new Date(Number(endTime) + currentTimeInSeconds);
  console.log(endTimeInUtc.toLocaleString());

  // Extract the results from the page.

  await browser.close();
})();


exports.handler = function(event, context, callback) {
  // server tings
}