const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://fiesc.pandape.infojobs.com.br/?PageNumber=1&PageSize=999";

let vagas = new Array();
let filtroLocalizacao = ['Florianópolis', 'São José', 'Palhoça', 'Biguaçu'];
let filtroTitulo = ['TI', 'Programador', 'Desenvolvedor', 'JavaScript', 'Infraestrutura', 'Suporte']

fetchData(url).then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const statsTable = $('#VacancyList > a');
    statsTable.each(function () {
        let title = $(this).find('div > .vacancy-title').text().trim();
        let detailLocation = $(this).find('div > .vacancy-detail > .vacancy-location:first').text();
        let detailVagas = $(this).find('div > .vacancy-detail > .mb-2').text().trim();
        let dataVagas = $(this).find('div > .vacancy-date').text().trim();
        vagas.push({
            'titulo': title,
            'data': dataVagas,
            'localizacao': detailLocation,
            'descrição': detailVagas
        })
    });
})
    .then(() =>
        console.table(
            vagas.filter(
                vaga =>
                    filtroLocalizacao.find(item => vaga.localizacao.includes(item)) &&
                    filtroTitulo.find(item => vaga.titulo.includes(item))
            )
        )
    )


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