import { getPokemonVariant } from "@/utils/get-pokemon-variant";
import AppIcon from "../common/AppIcon";
import { Badge } from "./badge";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";

/**
 * Props for the MultiSelect component.
 */
interface MultiSelectProps {
  /**
   * List of selectable options.
   * Each option must contain a `label` (shown to the user) and a `value` (unique identifier).
   */
  options: { label: string; value: string }[];

  /**
   * Currently selected values (array of option `value`s).
   */
  values: string[];

  maxCount?: number;

  /**
   * Whether the MultiSelect is disabled.
   * Defaults to `false`.
   */
  disabled?: boolean;

  /**
   * Called when a value is selected or deselected.
   * @param value The value that was clicked.
   */
  onValueChange: (value: string) => void;

  /**
   * Called when the close icon on an individual badge is clicked.
   * @param value The value of the badge being removed.
   */
  onBadgeCloseIconClick: (value: string) => void;

  /**
   * Called when the "remove all" (X icon) button is clicked,
   * which clears all selected values.
   */
  onCloseAllClick: () => void;

  /**
   * Placeholder text shown when no values are selected.
   * Defaults to `"Select value"`.
   */
  placeholder?: string;

  /**
   * Additional class names for the outer Button (trigger).
   */
  className?: string;

  /**
   * Additional class names for each Badge element.
   */
  badgeClassNames?: string;
}

/**
 * A multi-select dropdown component that:
 * - Shows a button containing selected values as badges
 * - Uses a popover to display selectable options with checkboxes
 * - Allows removing individual badges or clearing all
 *
 * Example usage:
 * ```tsx
 * <MultiSelect
 *   options={[
 *     { label: "Pikachu", value: "pikachu" },
 *     { label: "Charmander", value: "charmander" }
 *   ]}
 *   values={["pikachu"]}
 *   onValueChange={(value) => console.log("Toggled:", value)}
 *   onBadgeCloseIconClick={(value) => console.log("Remove badge:", value)}
 *   onCloseAllClick={() => console.log("Clear all")}
 * />
 * ```
 */

export default function MultiSelect({
  onValueChange,
  onBadgeCloseIconClick,
  onCloseAllClick,
  options,
  values,
  disabled,
  placeholder = "Select value",
  badgeClassNames,
  className,
}: MultiSelectProps) {
  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant={"outline"}
          className={cn(
            "w-full flex items-center justify-between py-2 min-h-10 h-auto",
            className
          )}>
          <div className="flex-1 flex flex-wrap items-start gap-1 h-full">
            {values.length === 0 && placeholder}

            {values.length > 0 &&
              values.map((value) => (
                <Badge
                  key={value}
                  variant={getPokemonVariant(value)}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "text-xs text-white font-normal px-2 flex items-center justify-between gap-2",
                    badgeClassNames
                  )}>
                  {value}
                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                      onBadgeCloseIconClick(value);
                    }}>
                    <AppIcon
                      name="plus"
                      className="size-4 stroke-white rotate-45"
                    />
                  </div>
                </Badge>
              ))}
          </div>
          <div className="flex items-center gap-2 h-full">
            <AppIcon
              name="chevron-down"
              className="stroke-gray-300 size-4 shrink-0"
            />
            {values.length > 0 && (
              <>
                <Separator
                  orientation="vertical"
                  className="w-0.5 min-h-4 max-h-full"
                />
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseAllClick();
                  }}>
                  <AppIcon
                    name="plus"
                    className="size-6 shrink-0 stroke-gray-300 rotate-45"
                  />
                </div>
              </>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="font-Poppins max-h-40 overflow-hidden overflow-y-scroll hide-scrollbar max-w-sm p-0 py-2">
        {options.map((option) => (
          <div
            key={option.label}
            className="flex items-center gap-2 cursor-pointer hover:bg-accent px-4 py-2"
            onClick={() => onValueChange(option.value)}>
            <Checkbox
              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              checked={values.includes(option.value)}
            />
            <span className="text-sm">{option.label}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
