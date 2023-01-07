const testElm = document.getElementById('testId');
const currentIteration = 8;
testElm.innerHTML = `testing #${currentIteration}...`;

const testUrlV1 = 'https://pokeapi.co/api/v2/pokemon/ditto';
const testUrlV2 = 'https://media-library-api.vistadevtest.workers.dev/api/test/weird2.jpg';

// select file input
const input = document.getElementById('avatar')

// add event listener
input.addEventListener('change', () => {
  uploadFile(input.files[0])
});

const uploadFile = file => {
    // add the file to the FormData object
    const fd = new FormData()
    fd.append('avatar', file)
  
    // send `POST` request
    alert('Uploaded!');
    console.log(fd);

    fetch(testUrlV2, { 
        method: 'POST'
    })
        .then(res => res.text())
        .then(data => {
            testElm.innerHTML = `testing #${currentIteration}...${data}`;
        });
}