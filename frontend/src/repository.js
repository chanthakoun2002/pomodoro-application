const API_BASE_URL ="http://localhost:5000/pomodoro"

function handleResponse(response) {
    if (!response.ok) {
        return response.json().then(errorData => {
            const error = new Error(errorData.message || 'HTTP error');
            error.status = response.status;
            throw error;
        });
    }
    return response.json(); 
}

function loginUser(credentials) {

}