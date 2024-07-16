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

            // botao para excluir gato
            const btnExcluir = document.createElement('button');

            btnExcluir.addEventListener('click', () => {
                let conf = confirm('Tem certeza que quer excluir o gatuxo?');
                conf?excluirGatuxo(cat.id):'';
            });

            let lixImg = document.createElement('img')
            lixImg.src = '../../images/trash-fill.svg'
            btnExcluir.append(lixImg);
            linha.appendChild(btnExcluir)

            // botao para editar
            const btnAtualizar = document.createElement('button');

            let editImg = document.createElement('img')
            editImg.src = '../../images/pencil-square.svg'
            btnAtualizar.append(editImg)
            btnAtualizar.addEventListener('click', (evt) => {
                // vai disponibilizar o form para atualizar o gato e tornar o display none
                mostrarForm(cat);
            });
            linha.appendChild(btnAtualizar)

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

// criando o form de atualização do gatinho
document.querySelector('.btn-close').addEventListener('click', () => {
    document.getElementById('container-update').style.display = 'none';
})

var catToBeUpdated = 0;
const mostrarForm = (cat) => {
    document.getElementById('container-update').style.display = 'block';
    catToBeUpdated = cat.id;
    let name = document.getElementById('name');
    let age = document.getElementById('age');
    let gender = document.getElementById('gender');
    name.value = cat.name;
    age.value = cat.age;
    gender.value = cat.gender;
}

// metodo para atualizar o gato no banco de dados
document.querySelector('.update-form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    let name = document.getElementById('name');
    let age = document.getElementById('age');
    let gender = document.getElementById('gender');

    const cat = {
        id:catToBeUpdated,
        name:name.value,
        age:Number(age.value),
        gender:gender.value
    }
    // alert(`${cat.age}, ${cat.name}, ${cat.gender}, ${cat.id}`)

    const endpoint = 'http://localhost:8080/cats/update'
    fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cat)
    })
    .then(response => {
        if (response.status == 204) {
            alert('Gatuxo atualizado com sucesso!')
            document.getElementById('container-update').style.display = 'none';
            location.reload()
            return response.json();
        }  
    })

})