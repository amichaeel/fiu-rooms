import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date('2025-01-06T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference < 0) {
        setTimeLeft('Time to update!');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <span className="text-md flex flex-col gap-2 p-6 items-center">
        <Clock size={24} />
        <span className="text-sm text-center">
          FIU Rooms is currently being updated for the Spring 2025 semester. We will be back in:
        </span>
        <span className="text-base-content text-sm font-bold">{timeLeft}</span>
        <span className='text-xs text-base-content/30'>January 6th, 2025 @ 12AM</span>
      </span>
    </div>
  );
}