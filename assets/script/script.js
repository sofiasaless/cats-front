document.querySelector('#cat-save-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // objeto que vai ser salvo e transformado em json
    const cat = {
        name: e.target.name.value,
        age: e.target.age.value,
        gender: e.target.gender.value,
    };

    // método fetch que vai interagir com a api
    fetch('http://localhost:8080/cats/save', {
        // tipo da requisição
        method: 'POST',
        // headers
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cat)
    })
    // convertendo para json
    .then(response => response.json())
    // pegando o estando da requisição, se foi bem sucessido ou não
    .then(cat => {
        console.log('Success:', cat);
        alert('Gatuxo cadastrado com sucesso!');
    })
    // se houver erro, o catch vai pegar e disparar uma mensagem
    .catch((error) => {
        console.error('Error:', error);
        alert('Ocorreu um erro ao cadastrar o gatuxo.');
    });


});