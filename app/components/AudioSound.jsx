"use client";

import React, { useRef } from 'react';

const MyComponent = () => {
    const audioRef = useRef(null);

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div>
            <audio ref={audioRef}>
                <source src="/mp3/loud_alarm.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <button onClick={playAudio}>Play Audio</button>
        </div>
    );
};

export default MyComponent;