const testElm = document.getElementById('testId');
const currentIteration = 2;
testElm.innerHTML = `testing #${currentIteration}...`;

const testUrlV1 = 'https://pokeapi.co/api/v2/pokemon/ditto';
const testUrlV2 = 'https://media-library-api.vistadevtest.workers.dev/api/test';

fetch(testUrlV2, { method: 'POST' })
    .then(res => res.text())
    .then(data => {
        testElm.innerHTML = `testing #${currentIteration}...${data}`;
    });