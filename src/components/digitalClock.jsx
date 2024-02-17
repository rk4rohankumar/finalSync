import React from "react";
import { useState, useEffect } from "react";

const AnalogClock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="digiClock-outer">
            <div className="digital-clock">
        <h1>{time.toLocaleTimeString()}</h1>
        </div>
        </div>
        
    );
    }
    export default AnalogClock;