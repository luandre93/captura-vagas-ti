const { Crawling } = require('./crawling');

const url = "https://fiesc.pandape.infojobs.com.br/?PageNumber=1&PageSize=999";

let filtroLocalizacao = ['Florianópolis', 'São José', 'Palhoça', 'Biguaçu'];
let filtroTitulo = ['TI', 'Programador', 'Desenvolvedor', 'JavaScript', 'Infraestrutura', 'Suporte']
let result = new Crawling(url)

async function resultado() {
    let vagas = [];
    let data = await result.fetchData(($) => {
        $('#VacancyList > a').each(function () {
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
    });
    let dadosFiltrados = vagas.filter(
        vaga =>
            filtroLocalizacao.find(item => vaga.localizacao.includes(item)) &&
            filtroTitulo.find(item => vaga.titulo.includes(item))
    )
    console.table(dadosFiltrados)
    return data;
}

resultado();
