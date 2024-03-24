"use client"

import {useState} from "react";
import {useDummyDataContext} from "@/app/context/DummyDataContext";

const Sound = () => {
    const { dummyData, setDummyData } = useDummyDataContext();

    const handleDummyData = () => {
        setDummyData(!dummyData);
    };

    return (
        <div className="h-screen flex justify-center items-center p-4">
            {dummyData ?
                <button onClick={handleDummyData}>DummyData ON</button>
                :
                <button onClick={handleDummyData}>DummyData OFF</button>
            }
        </div>
    )
}

export default Sound