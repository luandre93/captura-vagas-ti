const { Crawling } = require('./crawling');

const url = "https://fiesc.pandape.infojobs.com.br/?PageNumber=1&PageSize=999";
const filtroLocalizacao = ['Florianópolis', 'São José', 'Palhoça', 'Biguaçu'];
const filtroTitulo = ['TI', 'Programador', 'Desenvolvedor', 'JavaScript', 'Infraestrutura', 'Suporte']
const result = new Crawling(url)
const pathConstruct = (pathName) => url.split('/')[0] + '//' + url.split('/')[2] + pathName

async function layoutFiesc() {
    let vagas = [];
    await result.fetchData(($) => {
        $('#VacancyList > a').each(function () {
            let title = $(this).find('div > .vacancy-title').text().trim();
            let detailLocation = $(this).find('div > .vacancy-detail > .vacancy-location:first').text();
            let detailVagas = $(this).find('div > .vacancy-detail > .mb-2').text().trim();
            let dataVagas = $(this).find('div > .vacancy-date').text().trim();
            let link = $(this).attr('href');
            vagas.push({
                'titulo': title,
                'data': dataVagas,
                'localizacao': detailLocation,
                'descrição': detailVagas,
                'Link': pathConstruct(link)
            })
        });
    });
    let dadosFiltrados = vagas.filter(
        vaga =>
            filtroLocalizacao.find(item => vaga.localizacao.includes(item)) &&
            filtroTitulo.find(item => vaga.titulo.includes(item))
    )
    console.table(dadosFiltrados)
    return dadosFiltrados;
}

layoutFiesc();
