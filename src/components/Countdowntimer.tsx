"use client";
import { useState, useRef, useEffect, ChangeEvent } from 'react';

const CountdownTimer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }, 1000);
    } else if (isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
    setInput('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSetTime = () => {
    setSeconds(parseInt(input, 10));
    setInput('');
  };

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-6xl font-bold mb-8">{formatTime()}</div>
      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Set time in seconds"
          className="p-2 text-black rounded"
        />
        <button
          onClick={handleSetTime}
          className="bg-blue-500 p-2 ml-2 rounded hover:bg-blue-700"
        >
          Set Time
        </button>
      </div>
      <div>
        <button
          onClick={handleStart}
          className="bg-green-500 p-2 mr-2 rounded hover:bg-green-700"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="bg-yellow-500 p-2 mr-2 rounded hover:bg-yellow-700"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 p-2 rounded hover:bg-red-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
