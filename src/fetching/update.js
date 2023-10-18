import { contentAddress } from "../config";
import handleResponse from "./handleResponse";

import { base_user_url } from "../config";

const fullBasePath = contentAddress + base_user_url;

export const deleteStory = (token, id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
    };

    return fetch(fullBasePath + "/substory/" + id, requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const changeStoryTitle = (token, id, title) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: title,
    redirect: 'follow'
    };

    return fetch(fullBasePath + "/substory/title/" + id, requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const createStory = (token, title) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "title": {
            de: title,
            pl: "",
            tr: "",
            uk: ""
        },
        "storyId": "64c26d0c539fbc6f404f2d96"
    });

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/substory", requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const createFrame = (token, storyId, prevFrameId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
        "substoryId": storyId,
        "prevFrameId": prevFrameId
    });

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/frame", requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const moveFrame = (token, frameId, newPrevFrameId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
        "frameId": frameId,
        "newPrevFrameId": newPrevFrameId
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/frame/moveFrame", requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const deleteFrame = (token, frameId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);


    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/frame/" + frameId, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.text())
    .catch(error => console.log('error', error));
}


export const addBackgroundToFrame = (token, id, image) => {

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    let formData = new FormData();

    console.log(image)

    formData.append("file", image);
    const requestOptions = {
        headers: myHeaders,
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/frame/image/" + id, requestOptions)
    .then(response => handleResponse(response))
        .then(response => response.json())
        .catch(e => console.log(e));
}

export const changeBackgroundImageSource = (token, id, imageSrc) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = imageSrc.toString();

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/frame/image/source/" + id, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const removeFrameBackground = (token, id) => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        headers: myHeaders,
        method: 'DELETE',
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/frame/image/" + id, requestOptions)
    .then(response => handleResponse(response))
        .then(response => response.json())
        .catch(e => console.log(e));
}

export const changeNextFrame = (token, frameId, nextFrameId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plane");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = nextFrameId;

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/frame/nextFrame/" + frameId, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const changePosition = (token, type, id, newPositionX, newPositionY) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
        "x": newPositionX,
        "y": newPositionY
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/" + type + "/position/" + id, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const changeCharacterHeight = (token, id, newHeight) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = newHeight.toString();

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/characterframe/height/" + id, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const changeCharacterImg = (token, id, image) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    let formData = new FormData();

    formData.append("file", image);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/characterframe/img/" + id, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const changeCharacterImgSrc = (token, id, imageSrc) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = imageSrc.toString();

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/characterframe/img/source/" + id, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const deleteCharacterImg = (token, id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/characterframe/image/" + id, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const saveBubbleWidth = (token, id, newWidth) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plane");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = newWidth.toString();

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/bubble/width/" + id, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const saveBubbleFontsize = (token, id, newFontsize) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plane");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = newFontsize.toString();

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/bubble/fontsize/" + id, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const saveBubbleContent = (token, id, newContent) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plane");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = newContent;

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/bubble/content/" + id, requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const addChoice = (token, id, frameId, substoryId, answerText) => {
    const myHeaders = new Headers();

    let tmpId = id;

    if (!id) {
        tmpId = "none"
    }

    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: answerText,
        redirect: 'follow'
    }

    return fetch(fullBasePath + "/choices/add/" + tmpId + "/" + frameId + "/" + substoryId, requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        return null;
    });
}

export const changeChoiceAnswer = (token, id, answerId, answerText) => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
        "identifier": answerId,
        "answer": answerText
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    return fetch(fullBasePath + "/choices/rename/" + id, requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        return null;
    });
}

export const changeChoiceNextFrame = (token, id, answerId, nextFrameId) => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
        "identifier": answerId,
        "nextFrame": nextFrameId
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    return fetch(fullBasePath + "/choices/nextFrame/" + id, requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        return null;
    });
}

export const changeChoiceIsCorrect = (token, id, answerId, isCorrect) => {
    console.log(isCorrect);
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
        "identifier": answerId,
        "correct": isCorrect
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    return fetch(fullBasePath + "/choices/isCorrect/" + id, requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        return null;
    });
}

export const removeChoice = (token, id, answerId) => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: answerId,
        redirect: 'follow'
    }

    return fetch(fullBasePath + "/choices/remove/" + id, requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        return null;
    });
}

export const deleteChoices = (token, id) => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    }

    return fetch(fullBasePath + "/choices/delete/" + id, requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        return null;
    });
}

export const changeChoicesPosition = (token, id, posX, posY) => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
        "x": posX,
        "y": posY
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    return fetch(fullBasePath + "/choices/position/" + id, requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        return null;
    });
}

export const getCharacterImageCollection = () => {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    return fetch(fullBasePath + "/characterframe/available/images", requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        return [];
    });
}

export const getBackgroundImageCollection = () => {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    return fetch(fullBasePath + "/frame/available/images", requestOptions)
    .then(handleWrongFetchResult)
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        return [];
    });
}

const handleWrongFetchResult = result => {
    if (result.ok) {
        return result;
    } else {
        throw new Error("Something went wrong " + result);
    }
}

