import jwt from 'jsonwebtoken'


let storedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYzLCJyb2xlX2lkIjoxLCJ1c2VybmFtZSI6ImZsb29kIiwibmFtZSI6IlRlc3N0YSBNb25pdG9yIiwiZGVzaWduYXRpb24iOiJkZXZlbG9wZXIiLCJlbWFpbCI6Im1hc3VrQHJpbWVzLmludCIsInBlcm1pc3Npb25zIjpbIm1vZGlmeSBDb25maWd1cmF0aW9ucyIsIm1vZGlmeSBhbmFseXNpcyIsIm1vZGlmeSBkYXEiLCJtb2RpZnkgZGFxLXByb2Nlc3NvciIsIm1vZGlmeSBkYXRhLW9yaWdpbiIsIm1vZGlmeSBkYXRhLW9yaWdpbi1wYXJhbWV0ZXIiLCJtb2RpZnkgZGF0YS1zZXJpZXMiLCJtb2RpZnkgZGF0YS1zb3VyY2UiLCJtb2RpZnkgZWRpdC1vYnNlcnZhdGlvbiIsIm1vZGlmeSBmb2xkZXIiLCJtb2RpZnkgaWRhcSIsIm1vZGlmeSBpbWFnZXMiLCJtb2RpZnkgaW52ZW50b3J5IiwibW9kaWZ5IG1haW50ZW5hbmNlIiwibW9kaWZ5IG1ldGEtZGF0YSIsIm1vZGlmeSBtZXRhLWRhdGEtdGVtcGxhdGUiLCJtb2RpZnkgcGFyYW1ldGVyIiwibW9kaWZ5IHBhcmFtZXRlci10eXBlIiwibW9kaWZ5IHBlcm1pc3Npb24iLCJtb2RpZnkgcWMtY2hlY2siLCJtb2RpZnkgcWMtcnVsZSIsIm1vZGlmeSByb2xlIiwibW9kaWZ5IHN0YXRpb24iLCJtb2RpZnkgdGFnIiwibW9kaWZ5IHRvb2xzIiwibW9kaWZ5IHVuaXQiLCJtb2RpZnkgdXNlciIsInZpZXcgQ29uZmlndXJhdGlvbnMiLCJ2aWV3IGFuYWx5c2lzIiwidmlldyBkYXEiLCJ2aWV3IGRhcS1wcm9jZXNzb3IiLCJ2aWV3IGRhdGEtb3JpZ2luIiwidmlldyBkYXRhLW9yaWdpbi1wYXJhbWV0ZXIiLCJ2aWV3IGRhdGEtc2VyaWVzIiwidmlldyBkYXRhLXNvdXJjZSIsInZpZXcgZWRpdC1vYnNlcnZhdGlvbiIsInZpZXcgZm9sZGVyIiwidmlldyBpZGFxIiwidmlldyBpbWFnZXMiLCJ2aWV3IGludmVudG9yeSIsInZpZXcgbWFpbnRlbmFuY2UiLCJ2aWV3IG1ldGEtZGF0YSIsInZpZXcgbWV0YS1kYXRhLXRlbXBsYXRlIiwidmlldyBwYXJhbWV0ZXIiLCJ2aWV3IHBhcmFtZXRlci10eXBlIiwidmlldyBwZXJtaXNzaW9uIiwidmlldyBxYy1jaGVjayIsInZpZXcgcWMtcnVsZSIsInZpZXcgcm9sZSIsInZpZXcgc3RhdGlvbiIsInZpZXcgdGFnIiwidmlldyB0b29scyIsInZpZXcgdW5pdCIsInZpZXcgdXNlciJdLCJjbGllbnRpcCI6IjE3Mi4zMS4xMS4yMiIsImlhdCI6MTcwMTY5NTE4NCwiZXhwIjoxNzAxNzgxNTg0fQ.Nzu1sf7m3LxXoojFyZ-ln8jeR4Uy1QLK1R95ko75I4A";

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