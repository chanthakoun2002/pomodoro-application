const API_BASE_URL="http://localhost:5000/pomodoro";


// The code here provides the service layer/functionality to connect to the api backend

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
    return fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
    })
    .then(handleResponse)
    .then(data => {
        if (data.token) {
            sessionStorage.setItem('authToken', data.token);
            //localStorage.setItem('authToken', data.token);
            return data;
        }
        throw new Error('token was not provided');
    })
    .catch((error) => {
        console.error("error logging in", error);
        throw error;
    });
}

function registerUser(userData) {
    return fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    })
    .then(handleResponse)
    .catch((error) => {
        console.error("Error registering user:", error);
        throw error;
    });
}

function logoutUser() {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        console.log("No token found, already logged out or never logged in.");
        alert("No session to log out from.");
        return;
    }
    return fetch(`${API_BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    .then(response => {
        console.log('Logged out successfully', response);
        sessionStorage.removeItem('authToken');
    })
    .catch((error) => {
        console.error("Error logging out:", error);
    });
}

function getSettings() {
    const token = sessionStorage.getItem('authToken');

    return fetch(`${API_BASE_URL}/settings`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    .then(handleResponse)
    .catch((error) => {
        console.error("Error fetching settings items:", error);
        throw error;
    });
}

export {loginUser, registerUser, logoutUser, getSettings};