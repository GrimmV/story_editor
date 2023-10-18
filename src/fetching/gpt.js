const authAddress = "http://localhost:5000";

export const getRecommendation = (gptSetup, storyHistory) => {

    const requestOptions = {
        method: "POST",
        redirect: "follow",
        body: JSON.stringify({
            history: storyHistory,
            setup: gptSetup
        })
    }

    return fetch(authAddress + "/api/recommend", requestOptions)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.text);
        }
    });
}