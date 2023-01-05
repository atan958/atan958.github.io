const testElm = document.getElementById('testId');
const currentIteration = 1;
testElm.innerHTML = `testing #${currentIteration}...`;

const testUrlV1 = 'https://pokeapi.co/api/v2/pokemon/ditto';
const testUrlV2 = 'https://media-library-api.vistadevtest.workers.dev/api/test';

fetch(testUrlV2)
    .then(res => res.text())
    .then(data => {
        testElm.innerHTML = `testing #${currentIteration}...${data}`;
    });