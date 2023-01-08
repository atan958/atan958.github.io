// MEDIA LIBRARY ENDPOINTS
const ML_URL = `https://media-library-api.vistadevtest.workers.dev`;
const ML_UPLOAD_URL = `https://media-library-api.vistadevtest.workers.dev/api/upload`;
const ML_DELETE_URL = `https://media-library-api.vistadevtest.workers.dev/api/delete`;

const loadingGifUrl = 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif';

// PAGE ELEMENTS
const uploadFileInputElm = document.getElementById('uploadFileInput');
const uploadFileBtnElm = document.getElementById('uploadFileBtn');
const downloadFileBtnElm = document.getElementById('downloadFileBtn');
const deleteFileBtnElm = document.getElementById('deleteFileBtn');


// UPLOAD

const handleFileUpload = () => {
    const file = uploadFileInputElm.files[0];
    if (!file) {
        setUploadResponse('No file selected');
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        const fileData = e.target.result;
        const fileUploadName = `${getUploadNameOfFile()}.${getFileExtension(file)}`;
        try {
            const responseData = await uploadFileAsync(fileUploadName, fileData);
            setUploadResponse(responseData);
            resetUploadSection();
        }
        catch (e) {
            setUploadResponse(e.message);
        }
    }
    reader.readAsArrayBuffer(file);     // triggers the onload callback function of the FileReader
}

const setUploadResponse = (message) =>  {
    const uploadResponseElm = document.getElementById('uploadResponse');
    uploadResponseElm.innerText = message;
}

const uploadFileAsync = async (fileName, fileData) => {
    const response = await fetch(`${ML_UPLOAD_URL}/${fileName}`, { method: 'POST', body: fileData });
    const data = await response.text();
    return data;
}

const getUploadNameOfFile = () => {
    const uploadFileNameInputElm = document.getElementById('uploadFileNameInput');
    return uploadFileNameInputElm.value;
}

const getFileExtension = (file) => {
    const fileName = file.name;
    return fileName.split('.').pop();
}

const resetUploadSection = () => {
    const uploadFileNameInputElm = document.getElementById('uploadFileNameInput');
    uploadFileNameInputElm.value = '';
    uploadFileInputElm.value = null;
    const uploadFileLabelElm = document.getElementById('uploadFileLabel');
    uploadFileLabelElm.innerText = 'Select Image';
}

uploadFileBtnElm.addEventListener('click', handleFileUpload);

uploadFileInputElm.addEventListener('change', () => {
    const file = uploadFileInputElm.files[0];
    const uploadFileLabelElm = document.getElementById('uploadFileLabel');
    uploadFileLabelElm.innerText = file.name;
});


// DOWNLOAD

const handleFileDownloadAsync = async (fileName) => {
    loadImageBox(loadingGifUrl);
    setDownloadResponse('Loading...');
    try {
        const imageObjectUrl = await downloadFileAsync(fileName);
        loadImageBox(imageObjectUrl);
        setDownloadResponse(`\"${fileName}\" was successfully downloaded.`);
    }
    catch (e) {
        loadImageBox(null);
        setDownloadResponse(`\"${fileName}\" does not exist.`);
    }
}

const setDownloadResponse = (message) =>  {
    const downloadResponseElm = document.getElementById('downloadResponse');
    downloadResponseElm.innerText = message;
}

const downloadFileAsync = async (fileName) => {
    const downloadUrl = `${ML_URL}/${fileName}`;
    const response = await fetch(downloadUrl);
    const imageBlob = await response.blob();
    return URL.createObjectURL(imageBlob);
}

const loadImageBox = (src) => {
    const imageElm = document.createElement('img');
    imageElm.src = src;
    imageElm.alt = 'media-library';
    
    const imageBoxElm = document.getElementById('imageBox');
    imageBoxElm.innerHTML = '';
    imageBoxElm.appendChild(imageElm);
}

const getFileNameToDownload = () => {
    const downloadFileNameInputElm = document.getElementById('downloadFileNameInput');
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
