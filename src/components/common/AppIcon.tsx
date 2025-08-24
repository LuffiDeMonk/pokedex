import { DynamicIcon } from "lucide-react/dynamic";
import type { ComponentProps } from "react";

type IconProps = ComponentProps<typeof DynamicIcon>;

const AppIcon = (props: IconProps) => {
  return <DynamicIcon {...props} />;
};
export default AppIcon;
