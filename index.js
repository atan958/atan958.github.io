// MEDIA LIBRARY ENDPOINTS
const ML_URL = `https://media-library-api.vistadevtest.workers.dev`;
const ML_UPLOAD_URL = `https://media-library-api.vistadevtest.workers.dev/api/upload`;
const ML_DELETE_URL = `https://media-library-api.vistadevtest.workers.dev/api/delete`;
const ML_TEST_URL = `https://media-library-api.vistadevtest.workers.dev/api/test`;

// PAGE ELEMENTS
const uploadResponseElm = document.getElementById('uploadResponse');
const uploadFileNameInputElm = document.getElementById('uploadFileNameInput');
const uploadFileInputElm = document.getElementById('uploadFileInput');
const uploadFileLabelElm = document.getElementById('uploadFileLabel');
const uploadFileBtnElm = document.getElementById('uploadFileBtn');

const downloadFileBtnElm = document.getElementById('downloadFileBtn');
const downloadFileNameInputElm = document.getElementById('downloadFileNameInput');

const deleteFileBtnElm = document.getElementById('deleteFileBtn');


// UPLOAD

const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = event.target.result;
        const fileUploadName = `${getFileNameToUpload()}.${getFileExtension(file)}`;
        uploadFile(fileUploadName, data);
    };
    reader.readAsArrayBuffer(file);     // triggers the onload callback function
}

const uploadFile = (fileName, fileData) => {
    fetch(`${ML_UPLOAD_URL}/${fileName}`, { 
        method: 'POST',
        body: fileData,
    })
        .then(res => res.text())
        .then(data => {
            uploadResponseElm.innerHTML = `${data}`;
            resetFileUploadElms();
        })
        .catch(error => {
            uploadResponseElm.innerHTML = `${error}`;
        });
}

const getFileNameToUpload = () => {
    return uploadFileNameInputElm.value;
}

const getFileExtension = (file) => {
    const fileName = file.name;
    return fileName.split('.').pop();
}

const resetFileUploadElms = () => {
    uploadFileNameInputElm.value = '';
    uploadFileInputElm.value = null;
    uploadFileLabelElm.innerText = 'Select Image';
}

uploadFileBtnElm.addEventListener('click', () => {
    const file = uploadFileInputElm.files[0];
    handleFileUpload(file);
});

uploadFileInputElm.addEventListener('change', () => {
    const file = uploadFileInputElm.files[0];
    uploadFileLabelElm.innerText = file.name;
});



// DOWNLOAD

const handleFileDownloadAsync = async (fileName) => {
    try {
        setDownloadResponse('Loading...');
        const imageObjectUrl = await downloadFileAsync(fileName);
        loadImageBoxElm(imageObjectUrl);
        setDownloadResponse(`\"${fileName}\" was successfully downloaded.`);
    }
    catch (e) {
        setDownloadResponse(`\"${fileName}\" does not exist.`);
    }
}

const setDownloadResponse = (message) =>  {
    const downloadResponseElm = document.getElementById('downloadResponse');
    downloadResponseElm.innerText = message;
}

const downloadFileAsync = async (fileName) => {
    const downloadUrl = `${ML_URL}/${fileName}`;
    console.log(downloadUrl);
    const response = await fetch(downloadUrl);
    const imageBlob = await response.blob();
    console.log(imageBlob);
    return URL.createObjectURL(imageBlob);
}

const loadImageBoxElm = (src) => {
    const imageElm = document.createElement('img');
    imageElm.src = src;
    
    imageElm.alt = 'testing...';
    
    const imageBoxElm = document.getElementById('imageBox');
    imageBoxElm.innerHTML = '';
    imageBoxElm.appendChild(imageElm);
}

const getFileNameToDownload = () => {
    return downloadFileNameInputElm.value;
}

downloadFileBtnElm.addEventListener('click', () => {
    const fileName = getFileNameToDownload();
    handleFileDownloadAsync(fileName);
});


// DELETE

const handleFileDeleteAsync = async (fileName) =>  {
    const data = await deleteFileAsync(fileName);
    const deleteResponseElm = document.getElementById('deleteResponse');
    deleteResponseElm.innerText = data;
}

const deleteFileAsync = async (fileName) => {
    const response = await fetch(`${ML_DELETE_URL}/${fileName}`, { method: 'POST' });
    const data = await response.text();
    return data;
}

const getFileNameToDelete = () => {
    const deleteFileNameInputElm = document.getElementById('deleteFileNameInput');
    return deleteFileNameInputElm.value;
}

deleteFileBtnElm.addEventListener('click', () => {
    const fileName = getFileNameToDelete();
    handleFileDeleteAsync(fileName);
});
