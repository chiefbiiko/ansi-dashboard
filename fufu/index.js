const { each } = require('async')
const { existsSync, mkdirSync } = require('fs')
const { join, resolve } = require('path')
const { launch } = require('puppeteer')
const { parse } = require('url')

const CHECK_RGX = /datenschutz(?:erklärung)?2018/i // PRELIM
const SHOTS_DIR = resolve(process.env.SHOTS_DIR || './screenshots')
const HEADER = `<span class="date"></span>` +
  `<span class="title"></span>` +
  `<span class="url"></span>` +
  `<span class="pageNumber"></span>` +
  `<span class="totalPages"></span>`

function url2filename (url) {
  return join(SHOTS_DIR, `${parse(url).host}.pdf`)
}

async function check (browser, url) {
  const page = await browser.newPage()
  await page.goto(url, { timeout: 1000 })
  const content = await page.content()
  const passing = CHECK_RGX.test(content)
  if (!passing) {
    await page.emulateMedia('screen')
    await page.pdf({
      headerTemplate: HEADER,
      path: url2filename(url),
      printBackground: true
    })
  }
  await page.close()
  return passing
}

async function screencheck (urls) {
  const browser = await launch()
  // return new Promise((resolve, reject) => {
  //   each(urls, check.bind(null, browser), err => {
  //     browser.close()
  //     err ? reject(err) : resolve(SHOTS_DIR)
  //   })
  // })
  return Promise.all(urls.map(check.bind(null, browser)))
}

if (!existsSync(SHOTS_DIR)) mkdirSync(SHOTS_DIR)

module.exports = screencheck
