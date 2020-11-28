
const puppeteer = require('puppeteer');


async function scrapeProduct1(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    /** go to site, inspect element, copy xPath
    //[@id="imgBlkFront"]
     page is the open page, $x is a puppeteer selector that allows us to select an item on a page through the use of xPath
     xPath is just another way to navigate the page like jQuery. xPath is usually prefixed with 1 or 2 slashes -- those are
     not comments.
    */

    /**
     * const [ele] is a 'destructuring'. We are pulling the 0 element out of the array (in this case there is only one),
     * and then assigning it to a variable called 'ele1', 'ele2', etc.
     */
    // Date taken
    const [ele1] = await page.$x('//*[@id="quote-market-notice"]/span')
    const txt1 = await ele1.getProperty('textContent');
    const date = await txt1.jsonValue();

    // name of instrument
    const [ele2] = await page.$x('//*[@id="quote-header-info"]/div[2]/div[1]/div[1]/h1');
    const txt2 = await ele2.getProperty('textContent');
    const instrument = await txt2.jsonValue();

    // underlying current price or close if market closed
    const [ele3] = await page.$x('//*[@id="quote-header-info"]/div[3]/div[1]/div/span[1]');
    const txt3 = await ele3.getProperty('textContent');
    const currentPrice = await txt3.jsonValue();

    // day's range
    const [ele4] = await page.$x('//*[@id="quote-summary"]/div[2]/table/tbody/tr[1]/td[2]');
    const txt4 = await ele4.getProperty('textContent');
    const daysRange = await txt4.jsonValue();

    // year's range
    const [ele5] = await page.$x('//*[@id="quote-summary"]/div[2]/table/tbody/tr[2]/td[2]');
    const txt5 = await ele5.getProperty('textContent');
    const yearsRange = await txt5.jsonValue();

    // output
    const fs = require('fs');
    const obj = { date, instrument, currentPrice, daysRange, yearsRange };
    fs.appendFile("/Users/clu/Desktop/JSscrape/S&P500.txt",JSON
        .stringify(obj) + "\n\n", function(err) {

            if(err){
         return console.log(err);
         }
     console.log("The file was saved~");
        });
    browser.close();
    // use 'copy full xPath' if any errors arise
}

// function calls
scrapeProduct1('https://finance.yahoo.com/quote/%5EGSPC?p=%5EGSPC')
