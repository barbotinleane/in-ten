import { useEffect, useRef } from "react";
import * as Tone from "tone";

export default function useSounds() {
    const mySampler = useRef(null);
    
    useEffect(() => {
        const sampler = new Tone.Sampler({
            urls: {
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();

        Tone.loaded().then(() => {
            mySampler.current = sampler;
        })
    }, []);

    const buttonsList = [
        {
            soundPlay : () => mySampler.current.triggerAttackRelease(["C4"], 4)
        },
        {
            soundPlay : () => mySampler.current.triggerAttackRelease(["D#4"], 4)
        },
        {
            soundPlay : () => mySampler.current.triggerAttackRelease(["F#4"], 4)
        },
        {
            soundPlay : () => mySampler.current.triggerAttackRelease(["A4"], 4)
        }
    ]; 

    function handleKeyDown({ key }) {
        switch (key) {
            case "a": 
                mySampler.current.triggerAttackRelease(["A4"], 4);
                break;
            case "z": 
                mySampler.current.triggerAttackRelease(["F#4"], 4);
                break;
            case "e": 
                mySampler.current.triggerAttackRelease(["D#4"], 4);
                break;
            case "r": 
                mySampler.current.triggerAttackRelease(["C4"], 4);
                break;
            default:
                break;
        }
    }

    useEffect (() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    })
    
    return { buttonsList };
}