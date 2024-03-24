"use client"

import React, { createContext, useContext, useState } from 'react';

const DummyDataContext = createContext();

export const useDummyDataContext = () => useContext(DummyDataContext);

export const DummyDataProvider = ({ children }) => {
    const [dummyData, setDummyData] = useState(false);

    return (
        <DummyDataContext.Provider value={{ dummyData, setDummyData }}>
            {children}
        </DummyDataContext.Provider>
    );
};
