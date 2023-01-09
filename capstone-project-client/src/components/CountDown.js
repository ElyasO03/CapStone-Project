import { useEffect, useRef, useState } from "react";
import "../style/QuizE.css";

const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)

    if (minutes <= 10) minutes = '0' + minutes;
    if (seconds <= 10) minutes = '0' + seconds;
    return minutes + ':' + seconds
}

export default function CountDown({seconds}) {
    const [countdown, setCountdown] = useState(seconds)
    const timerId = useRef

    useEffect(() => {
        timerId.currrent = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.currrent)
    }, [])

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current)
            alert('End!! Please refresh the page and click on the ok button to restart your quiz')
        }
    }, [countdown])
    
    return (
        <h2 className="textcr"><h2 className="textct">Count Down:  </h2>  {formatTime(countdown)} </h2>
    )
}