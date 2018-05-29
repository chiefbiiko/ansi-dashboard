const { each } = require('async')
const { existsSync, mkdirSync } = require('fs')
const { join, resolve } = require('path')
const { launch } = require('puppeteer')
const { parse } = require('url')

const CHECK_RGX = /datenschutz(?:erklärung)?2018/i // PRELIM
const SHOTS_DIR = resolve(process.env.SHOTS_DIR || './screenshots')

function url2filename (url) {
  return join(SHOTS_DIR, `${parse(url).host}.png`)
}

async function check (browser, url) {
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle0' })
  const content = await page.content()
  const passing = CHECK_RGX.test(content)
  if (!passing) {
    await page.screenshot({ path: url2filename(url), fullPage: true })
  }
  await page.close()
  return passing
}

async function screencheck (urls) {
  const browser = await launch()
  return new Promise((resolve, reject) => {
    each(urls, check.bind(null, browser), async err => {
      await browser.close()
      err ? reject(err) : resolve(SHOTS_DIR)
    })
  })
}

if (!existsSync(SHOTS_DIR)) mkdirSync(SHOTS_DIR)

module.exports = screencheck
