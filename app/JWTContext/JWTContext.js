"use client"

import { createContext, useContext, useEffect, useState } from 'react';

const MyContext = createContext();

import {setGlobalVariable, getGlobalVariable} from "@/apiGlobalVariable";

export function MyJWTContextProvider({ children }) {
    const [token, setToken] = useState(null);

    const fetchToken = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "username": "ffwc",
                "password": "ffwc123*#"
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

            setToken(newToken);
            setGlobalVariable(newToken)
            console.log('Token updated:', newToken);

            // Schedule the next token update after 18 hours
            // setTimeout(fetchToken, 18 * 60 * 60 * 1000);
            // setTimeout(fetchToken, 1000);
        } catch (error) {
            console.log('Error fetching token:', error);
        }
    };

    // Initial fetch on component mount
    useEffect(() => {
        console.log("Data in context")
        fetchToken();
    }, []);

    return (
        <MyContext.Provider value={token}>
            {children}
        </MyContext.Provider>
    );
}

export function useToken() {
    return useContext(MyContext);
}