const { join } = require('path')
const { parse } = require('url')
const { each } = require('async')
const { existsSync, mkdirSync } = require('fs')
const { launch } = require('puppeteer')

const CHECK_RGX = /datenschutz(?:erklärung)?/i // PRELIM
const SHOTS_DIR = 'screenshots'

if (!existsSync(SHOTS_DIR)) mkdirSync(SHOTS_DIR)

function url2filename (url) {
  return join(SHOTS_DIR, `${parse(url).host}.png`)
}

async function maybeSnap (page, url) {
  await page.goto(url)
  const content = await page.content()
  if (!CHECK_RGX.test(content)) {
    await page.screenshot({ path: url2filename(url), fullPage: true })
  }
}

async function screencheck (url) {
  const browser = await launch()
  const page = await browser.newPage()
  return await maybeSnap(page, url)
}

async function screenchecks (urls) {
  const browser = await launch()
  const page = await browser.newPage()
  each(urls, maybeSnap.bind(null, page), function (err) {
    if (err) return console.error(err)
    console.log('done')
  })
}

module.exports = { screencheck, screenchecks }
