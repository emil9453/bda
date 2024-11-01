'use client';

import { useState, useEffect } from 'react';
import { Search, UserRound } from 'lucide-react';

export function NoDoctorsFound() {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  // Handle rotation animation
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50); // Adjust speed as needed

    return () => clearInterval(rotationInterval);
  }, []);

  // Handle scale animation
  useEffect(() => {
    const scaleInterval = setInterval(() => {
      setScale(prev => (prev === 1 ? 1.1 : 1));
    }, 1000); // Pulse every second

    return () => clearInterval(scaleInterval);
  }, []);

  return (
    <div className="opacity-1 translate-y-5 animate-[fadeIn_0.5s_ease-out_forwards] flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-6">
        <div
          className="text-primary"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.05s linear',
          }}
        >
          <Search size={64} />
        </div>
        <div
          className="absolute -bottom-2 -right-5 bg-background rounded-full p-1"
          style={{
            transform: `scale(${scale})`,
            transition: 'transform 0.5s ease',
          }}
        >
          <UserRound size={24} className="text-muted-foreground" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">No doctors found</h2>
      <p className="text-muted-foreground max-w-md">
        We couldnt find any doctors matching your criteria. Dont worry, though! Try adjusting your
        search or explore other specialties to find the right doctor for you.
      </p>
    </div>
  );
}
