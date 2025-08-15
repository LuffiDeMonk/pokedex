import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useAnimatedProgress } from './use-animated-progress';

interface AnimatedProgressBarProps
  extends React.ComponentProps<typeof Progress> {
  step?: number;
}
export default function AnimatedProgressBar({
  step,
  value,
  ...rest
}: AnimatedProgressBarProps) {
  const { progress } = useAnimatedProgress({ value });
  return (
    <>
      <Progress value={progress} {...rest} />
    </>
  );
}
