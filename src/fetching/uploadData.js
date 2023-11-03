export default function uploadClick(area, click) {

    const user = localStorage.getItem("user")

    const serverAddress = "https://story-editor-7ee30-default-rtdb.europe-west1.firebasedatabase.app/";

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        id: click,
        timestamp: Date.now()
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverAddress + area + "/" + user + ".json", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}