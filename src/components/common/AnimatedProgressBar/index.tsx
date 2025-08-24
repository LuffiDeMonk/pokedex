import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useAnimatedProgress } from './use-animated-progress';

interface AnimatedProgressBarProps
  extends React.ComponentProps<typeof Progress> {
  step?: number;
  min: number;
}
export default function AnimatedProgressBar({
  step,
  value,
  max,
  min,
  ...rest
}: AnimatedProgressBarProps) {
  const { progress } = useAnimatedProgress({ value });
  return (
    <div>
      <Progress value={progress} {...rest} />
      <div className="flex items-center justify-between">
        <p>{min}</p>
        <p>{max}</p>
      </div>
    </div>
  );
}
