export default function handleResponse(response) {
    
    if (response.ok) {
        return response;
    } else {
        throw new Error(response.text);
    }
}