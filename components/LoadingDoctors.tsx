'use client';

import { useState, useEffect } from 'react';
import { Loader2, UserRound } from 'lucide-react';

export function LoadingDoctors() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const scaleInterval = setInterval(() => {
      setScale(prev => (prev === 1 ? 1.1 : 1));
    }, 1000);

    return () => clearInterval(scaleInterval);
  }, []);

  return (
    <div className="opacity-1 translate-y-5 animate-[fadeIn_0.5s_ease-out_forwards] flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-6">
        <div className="text-primary animate-spin">
          <Loader2 size={64} />
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
      <h2 className="text-2xl font-bold mb-2">Loading doctors</h2>
      <p className="text-muted-foreground max-w-md">
        Please wait while we fetch the list of available doctors for you. This should only take a
        moment.
      </p>
    </div>
  );
}
