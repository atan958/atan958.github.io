const testElm = document.getElementById('testId');
const currentIteration = 15;
testElm.innerHTML = `testing #${currentIteration}...`;

const testUrlV1 = 'https://pokeapi.co/api/v2/pokemon/ditto';
const testUrlV2 = 'https://media-library-api.vistadevtest.workers.dev/api/test/weird2.jpg';

// select file input
const input = document.getElementById('avatar')

// add event listener
input.addEventListener('change', () => {
    const file = input.files[0];
    uploadFile(file);
    // uploadFileAsBinary(file);
    // uploadFileAsBinaryV2(file);
});

const uploadFile = (file) => {
    // add the file to the FormData object
    const fd = new FormData()
    fd.append('weird2', file)
  
    // send `POST` request
    alert('Uploaded!');
    console.log(fd);

    fetch(testUrlV2, { 
        method: 'POST',
        body: fd
    })
        .then(res => res.text())
        .then(data => {
            testElm.innerHTML = `testing #${currentIteration}...${data}`;
        });
}


async function uploadFileAsBinary(file) {
    const binary = await getBinaryFromFile(file);
    console.log('ANNOYING V1')
    console.log(binary)

    fetch(testUrlV2, { 
        method: 'POST',
        body: binary
    })
        .then(res => res.text())
        .then(data => {
            testElm.innerHTML = `testing #${currentIteration}...${data}`;
        });
}

// Get binary without ugly callbacks using ES7
function getBinaryFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => resolve(reader.result));
        reader.addEventListener("error", err => reject(err));

        reader.readAsBinaryString(file);
    });
}


async function uploadFileAsBinaryV2 (file) {
    var reader = new FileReader();
	reader.onload = function(e) {
		// binary data
        console.log('ANNOYING');
		console.log(e.target.result);
	};
	reader.onerror = function(e) {
		// error occurred
		console.log('Error : ' + e.type);
	};
	reader.readAsBinaryString(file);
}