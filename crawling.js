const axios = require('axios');
const cheerio = require('cheerio');

class Crawling {

    constructor(url) {
        this.url = url;
    }

    async fetchData(callback) {
        console.log("Crawling data...")
        let response = await axios(this.url).catch((err) => console.log(err));
        if (response.status !== 200) {
            console.log("Error occurred while fetching data");
            return;
        }
        return callback(cheerio.load(response.data));
    }

}

module.exports = { Crawling }