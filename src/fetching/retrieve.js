import { contentAddress } from "../config";
import handleResponse from "./handleResponse";

import { base_user_url } from "../config";

const fullBasePath = contentAddress + base_user_url;

export const fetchStories = (token) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(fullBasePath + "/substory/student", requestOptions)
    .then(response => handleResponse(response))
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        return []
    });
}

export const fetchStory = (storyId) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };

  return fetch(fullBasePath + "/substory/" + storyId, requestOptions)
  .then(response => handleResponse(response))
  .then(response => response.json())
  .catch(error => {
      console.log('error', error)
      return []
  });
}

export const fetchFrames = () => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      return fetch(fullBasePath + "/frame/all", requestOptions)
      .then(response => handleResponse(response))
        .then(response => response.json())
        .catch(error => {
          console.log('error', error);
          return [];
        });
  }

  export const fetchFramesOf = (storyId) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      return fetch(fullBasePath + "/frame/all/of/" + storyId, requestOptions)
      .then(response => handleResponse(response))
        .then(response => response.json())
        .catch(error => {
          console.log('error', error);
          return [];
        });
  }
  
  export const fetchBubbles = () => {
      const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        return fetch(fullBasePath + "/bubble/all" , requestOptions)
        .then(response => handleResponse(response))
        .then(response => response.json())
        .catch(error => {
          console.log('error', error);
          return [];
        });
  }

  export const fetchBubblesOf = (storyId) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      return fetch(fullBasePath + "/bubble/of/" + storyId, requestOptions)
      .then(response => handleResponse(response))
      .then(response => response.json())
      .catch(error => {
        console.log('error', error);
        return [];
      });
  }
  
  export const fetchCharacterFrames = () => {
      const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        return fetch(fullBasePath + "/characterframe/all", requestOptions)
        .then(response => handleResponse(response))
        .then(response => response.json())
        .catch(error => {
          console.log('error', error);
          return [];
        });
  }

  export const fetchCharactersOf = (storyId) => {
      const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        return fetch(fullBasePath + "/characterframe/of/" + storyId, requestOptions)
        .then(response => handleResponse(response))
        .then(response => response.json())
        .catch(error => {
          console.log('error', error);
          return [];
        });
  }
  
  export const fetchChoices = () => {
      const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        return fetch(fullBasePath + "/choices/all", requestOptions)
        .then(response => {
          return handleResponse(response)
        })
        .then(response => response.json())
        .catch(error => {
          console.log('error', error);
          return [];
        });
  }

  export const fetchChoicesOf = (storyId) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      return fetch(fullBasePath + "/choices/of/" + storyId, requestOptions)
      .then(response => {
        return handleResponse(response)
      })
      .then(response => response.json())
      .catch(error => {
        console.log('error', error);
        return [];
      });
}
