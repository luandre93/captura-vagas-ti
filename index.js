const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://fiesc.pandape.infojobs.com.br/?PageNumber=1&PageSize=999";



fetchData(url).then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const statsTable = $('#VacancyList > a');
    statsTable.each(function () {
        let title = $(this).find('div > .vacancy-title').text().trim();
        let detail = $(this).find('div > .vacancy-details').text().trim();
        console.table(title + "");
    });
})


async function fetchData(url) {
    console.log("Crawling data...")
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if (response.status !== 200) {
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}