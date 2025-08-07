import { useState, useEffect } from "react";

interface UseAnimatedProgressProps {
  value?: number | null;
}

export const useAnimatedProgress = ({ value }: UseAnimatedProgressProps) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!value) return;
      setProgress(value);
    }, 5); // Short delay to trigger animation

    return () => clearTimeout(timeout);
  }, [value]);
  return { progress };
};
