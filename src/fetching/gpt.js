import { gptAddress } from "../config";

const firebase_url = "https://story-editor-7ee30-default-rtdb.europe-west1.firebasedatabase.app"


export const getRecommendation = (gptSetup, storyHistory) => {

    const requestOptions = {
        method: "POST",
        redirect: "follow",
        body: JSON.stringify({
            history: storyHistory,
            setup: gptSetup
        })
    }
    const temperature = localStorage.getItem("temperature")
    const tempString = temperature ? `/${temperature}` : "";

    return fetch(gptAddress + `/api/recommend${tempString}`, requestOptions)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.text);
        }
    });
}

export const getOutlineRecommendation = (gptSetup) => {

    const requestOptions = {
        method: "POST",
        redirect: "follow",
        body: JSON.stringify({
            setup: gptSetup
        })
    }
    const temperature = localStorage.getItem("temperature")
    const tempString = temperature ? `/${temperature}` : "";

    return fetch(gptAddress + `/api/recommend/outline${tempString}`, requestOptions)
    .then(response => {
        console.log(response)
        console.log(response.ok)
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.text);
        }
    });
}

export function getGptConfig() { 
    // The path from where you want to fetch the data
    const path = '/config/.json';
  
    // Full URL to your Firebase Realtime Database path
    const url = `${firebase_url}${path}`;
  
    // Make a GET request using fetch API
    return fetch(url)
      .then(response => {
        // Check if the request was successful
        if (response.ok) {
          // Parse the JSON response
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // Here, we have the data from `/config`
        return data
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching config:', error);
      });
  }