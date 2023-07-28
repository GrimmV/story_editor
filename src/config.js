export let contentAddress;
export let authAddress;
export let userAddress;
// process.env.NODE_ENV is predefined by react and is "production" if it was started via "npm run build" and "development" if it was started via "npm start".
if (process.env.NODE_ENV === "production") {
    contentAddress = "https://gekonnt-handeln.de";
    authAddress = "https://gekonnt-handeln.de:8444";
    userAddress = "https://gekonnt-handeln.de:8445";
} else {
    contentAddress = "https://localhost:8443";
    authAddress = "https://localhost:8444";
    userAddress = "https://localhost:8445";
}

export const base_user_url = "/api/v1/content";