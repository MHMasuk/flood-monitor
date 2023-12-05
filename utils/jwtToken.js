import jwt from 'jsonwebtoken'


let storedToken = "YOUR_STORED_TOKEN";

const fetchToken = async () => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": process.env.NEXT_PUBLIC_USERNAME,
            "password": process.env.NEXT_PUBLIC_PASSWORD
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("https://swh.bwdb.gov.bd/auth/login", requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const newToken = result.token;

        storedToken = result.token

        // Schedule the next token update after 18 hours
        // setTimeout(fetchToken, 18 * 60 * 60 * 1000);
        // setTimeout(fetchToken, 1000);

        return newToken
    } catch (error) {
        console.log('Error fetching token:', error);
    }
};

// Decode JWT token to get expiration time
const decodeToken = (token) => {
    try {
        const decoded = jwt.decode(token);
        return decoded.exp * 1000; // Convert seconds to milliseconds
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};


export const fetchTokenIfExpired = async () => {
    try {
        // let storedToken = "YOUR_STORED_TOKEN"; // Store your token somewhere
        const expirationTime = decodeToken(storedToken);

        // Check if the token is expired or doesn't exist
        if (expirationTime && expirationTime > Date.now()) {
            console.log('Token is still valid.');
            return storedToken;
        } else {
            console.log('Token is expired or invalid. Fetching a new one...');
            const newToken = await fetchToken();
            return newToken;
        }
    } catch (error) {
        console.error('Error checking/fetching token:', error);
    }
};