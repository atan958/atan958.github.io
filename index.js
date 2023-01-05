const testElm = document.getElementById('testId');
testElm.innerHTML = 'testing...';

const testUrl = 'https://pokeapi.co/api/v2/pokemon/ditto';

fetch(testUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data.name);
        testElm.innerHTML = `testing...${data.name}`;
    });