const puppeteer = require('puppeteer');

async function scrapePlayerPoints(playerName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Navigate to the player's profile page
        await page.goto(`https://kog.tw/#p=players&player=${playerName}`);

        // Wait for the player points container to appear
        await page.waitForSelector('ul.list-group.list-group-flush', {waituntil: 'load', timeout:60000});

        // Extract player points from the profile
        const playerPoints = await page.evaluate(() => {
            const pointsList = [];
            const listItems = document.querySelectorAll('ul.list-group.list-group-flush li.list-group-item');
            listItems.forEach(item => {
                pointsList.push(item.textContent.trim());
            });

            // Extract rank, fixed points, and season points
            const rank = pointsList[0].replace(/\s+/g, ' ').replace(/\s*Rank\s*with\s*/, 'Rank: ').replace('.', '. '); // Adjusted to remove extra space
            const fixedPoints = pointsList[1].replace('Fixed points: ', '');
            const seasonPoints = pointsList[2].replace('Season points: ', '');

            return [rank, `Fixed points: ${fixedPoints}`, `Season points: ${seasonPoints}`];
        });

        // Close the browser
        await browser.close();

        // Return the scraped player points
        return playerPoints;
    } catch (error) {
        console.error('Error:', error);
        await browser.close(); // Make sure to close the browser in case of errors
        throw error; // Propagate the error
    }
}

module.exports = scrapePlayerPoints;
