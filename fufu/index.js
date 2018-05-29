const { each } = require('async')
const { existsSync, mkdirSync } = require('fs')
const { join, resolve } = require('path')
const { launch } = require('puppeteer')
const { parse } = require('url')

const CHECK_RGX = /datenschutz(?:erklärung)?/i // PRELIM

async function screencheck (urls, dir) {
  dir = resolve(dir || './screenshots')
  if (!existsSync(dir)) mkdirSync(dir)

  const browser = await launch()
  const stash = { info: {}, filepaths: [] }
  const url2filepath = url => join(dir, `${parse(url).host}.png`)

  async function check (browser, url) {
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle0' })

    // maybe check for visible links with Datenschu... rather
    const content = await page.content()
    const passing = CHECK_RGX.test(content)
    stash.info[url] = passing

    if (!passing) {
      const filepath = url2filepath(url)
      stash.filepaths.push(filepath)
      await page.screenshot({ path: filepath, fullPage: true })
    }

    await page.close()
    return passing
  }

  return new Promise((resolve, reject) => {
    each(urls, check.bind(null, browser), async err => {
      await browser.close()
      err ? reject(err) : resolve(stash)
    })
  })
}

module.exports = screencheck
