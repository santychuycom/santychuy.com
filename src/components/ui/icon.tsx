import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";

import { cn } from "@/lib/utils";

type IconProps = Omit<HugeiconsIconProps, "size" | "strokeWidth" | "color"> & {
	size?: number | string;
	strokeWidth?: number;
	color?: string;
	className?: string;
};

function Icon({
	className,
	size = 18,
	strokeWidth = 1.8,
	color = "currentColor",
	...props
}: IconProps) {
	return (
		<HugeiconsIcon
			className={cn("shrink-0", className)}
			size={size}
			strokeWidth={strokeWidth}
			color={color}
			{...props}
		/>
	);
}

export { Icon };
