'use client';

import * as React from 'react';
import { useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export type CloseHandler = ({ rating, review }: { rating: number; review: number }) => void;

type FilterButtonsProps = {
  onClose?: CloseHandler;
  defaultRating?: string | null;
  defaultReview?: string | null;
};

export const FilterButtons = ({ onClose, defaultRating, defaultReview }: FilterButtonsProps) => {
  const [ratingOpen, setRatingOpen] = React.useState(false);
  const [reviewOpen, setReviewOpen] = React.useState(false);
  const [ratingValue, setRatingValue] = React.useState([defaultRating ? parseFloat(defaultRating) :  0]);
  const [reviewValue, setReyValue] = React.useState([defaultReview ? parseFloat(defaultReview) :  0]);

  const ratingRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ratingRef.current && !ratingRef.current.contains(event.target as Node)) {
        setRatingOpen(false);
      }
      if (reviewRef.current && !reviewRef.current.contains(event.target as Node)) {
        setReviewOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ratingValue, reviewValue, onClose]);

  useEffect(() => {
    if (onClose && !reviewOpen && !ratingOpen) {
      onClose({
        rating: ratingValue?.[0],
        review: reviewValue?.[0],
      });
    }
  }, [onClose, ratingValue, ratingOpen, reviewOpen, reviewValue]);

  console.log(ratingValue, 'ratingValue');
  return (
    <div className="flex gap-4 p-4">
      <div ref={ratingRef} className="relative">
        <Button
          variant="ghost"
          className="bg-[#FF9102] hover:bg-[#FF9102]/90 text-white rounded-full px-6"
          onClick={() => setRatingOpen(!ratingOpen)}
        >
          Reyting{' '}
          {ratingOpen ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>

        <div
          className={cn(
            'absolute z-10 top-full mt-2 bg-white rounded-xl p-6 w-[300px] shadow-lg',
            'transition-all duration-200',
            ratingOpen
              ? 'opacity-100 translate-y-0 translate-x-[-70px]'
              : 'opacity-0 -translate-y-2 pointer-events-none',
          )}
        >
          <div className="flex justify-between mb-6 text-[#848484]">
            <span className="font-medium">1</span>
            <span className="font-medium">5</span>
          </div>

          <Slider
            value={ratingValue}
            onValueChange={value => {
              setRatingValue(value);
            }}
            max={5}
            min={1}
            step={0.1}
            className="mb-6"
          />

          <div className="text-[#848484]">Reyting {ratingValue[0]}</div>
        </div>
      </div>

      <div ref={reviewRef} className="relative">
        <Button
          variant="ghost"
          className="bg-[#FF9102] hover:bg-[#FF9102]/90 text-white rounded-full px-6"
          onClick={() => setReviewOpen(!reviewOpen)}
        >
          Rey{' '}
          {reviewOpen ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>

        <div
          className={cn(
            'absolute z-10 top-full mt-2 bg-white rounded-xl p-6 w-[300px] shadow-lg',
            'transition-all duration-200',
            reviewOpen
              ? 'opacity-100 translate-y-0 translate-x-[-200px]'
              : 'opacity-0 -translate-y-2 pointer-events-none',
          )}
        >
          <div className="flex justify-between mb-6 text-[#848484]">
            <span className="font-medium">0</span>
            <span className="font-medium">500</span>
          </div>

          <Slider
            value={reviewValue}
            onValueChange={value => {
              setReyValue(value);
            }}
            max={500}
            min={0}
            step={10}
            className="mb-6"
          />

          <div className="text-[#848484]">Rəy {reviewValue[0]}</div>
        </div>
      </div>
    </div>
  );
};
