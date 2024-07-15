document.addEventListener('DOMContentLoaded', () => {
    const endpoint = 'http://localhost:8080/cats';
    
    fetch(endpoint)
    .then(res=> res.json())
    .then(cats => {
        const tabelaResposta = document.querySelector('#cats-table-response');
        tabelaResposta.innerHTML = '';

        cats.forEach(cat => {
            const linha = document.createElement('tr');

            const nome = document.createElement('td');
            nome.textContent = cat.name;
            linha.appendChild(nome);

            const idade = document.createElement('td');
            idade.textContent = cat.age;
            linha.appendChild(idade);

            const genero = document.createElement('td');
            genero.textContent = cat.gender;
            linha.appendChild(genero);

            const btnExcluir = document.createElement('button');

            btnExcluir.addEventListener('click', () => {
                excluirGatuxo(cat.id);
            });

            let lixImg = document.createElement('img')
            lixImg.src = '../../images/trash-fill.svg'
            lixImg.id = 'lixinho'
            btnExcluir.append(lixImg);
            linha.appendChild(btnExcluir)

            tabelaResposta.appendChild(linha);

        });
    })
    .catch((error) => {
        console.log('Erro ao tentar listar gatos: ', error);
        alert('Ocorreu um erro ao buscar os gatuxos.');
    })
})

// metodo para excluir o gato do banco de dados
function excluirGatuxo (id) {
    // metodo fetch para excluir
    const endpoint = `http://localhost:8080/cats/${id}`
    fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // console.log(response.status)
        location.reload()
    })
    .catch((error) => {
        console.log(error);
    });

}