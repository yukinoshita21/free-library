

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const storageRef = storage.ref('uploads/' + file.name);

    storageRef.put(file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        loadFiles();
    }).catch((error) => {
        console.error('Upload failed:', error);
    });
});

function loadFiles() {
    const storageRef = storage.ref('uploads/');
    storageRef.listAll().then((result) => {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        result.items.forEach((fileRef) => {
            fileRef.getDownloadURL().then((url) => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = url;
                link.textContent = fileRef.name;
                link.setAttribute('download', '');
                listItem.appendChild(link);
                fileList.appendChild(listItem);
            });
        });
    }).catch((error) => {
        console.error('Error fetching files:', error);
    });
}

// Load files on page load
loadFiles();

