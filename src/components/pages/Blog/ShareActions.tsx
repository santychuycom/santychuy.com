"use client";

import {
	CopyLinkIcon,
	Facebook01Icon,
	NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type ShareLayout = "desktop" | "mobile";

interface ShareActionsProps {
	title: string;
	layout: ShareLayout;
}

function ShareActions({ title, layout }: ShareActionsProps) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogMessage, setDialogMessage] = useState(
		"Link copied to clipboard.",
	);

	const actions = useMemo(
		() => [
			{
				label: "Share on X",
				icon: NewTwitterIcon,
				run: () => {
					const currentUrl = window.location.href;
					const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this post: ${title}`)}&url=${encodeURIComponent(currentUrl)}`;
					window.open(twitterUrl, "_blank", "noopener,noreferrer");
				},
			},
			{
				label: "Share on Facebook",
				icon: Facebook01Icon,
				run: () => {
					const currentUrl = window.location.href;
					const facebookUrl = `https://www.facebook.com/sharer/sharer.php?display=popup&u=${encodeURIComponent(currentUrl)}`;
					window.open(facebookUrl, "_blank", "noopener,noreferrer");
				},
			},
			{
				label: "Copy link",
				icon: CopyLinkIcon,
				run: async () => {
					try {
						await navigator.clipboard.writeText(window.location.href);
						setDialogMessage("Link copied to clipboard.");
					} catch {
						setDialogMessage(
							"We could not copy the link. Please copy the URL manually.",
						);
					}
					setDialogOpen(true);
				},
			},
		],
		[title],
	);

	if (layout === "mobile") {
		return (
			<>
				<DropdownMenu>
					<DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
						Share article
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-52">
						{actions.map((action) => (
							<DropdownMenuItem key={action.label} onClick={action.run}>
								<Icon icon={action.icon} size={16} />
								{action.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogContent showCloseButton={false}>
						<DialogHeader>
							<DialogTitle>Share link</DialogTitle>
							<DialogDescription>{dialogMessage}</DialogDescription>
						</DialogHeader>
						<DialogFooter showCloseButton />
					</DialogContent>
				</Dialog>
			</>
		);
	}

	return (
		<>
			<TooltipProvider delay={100}>
				<aside className="hidden w-[100px] shrink-0 items-center gap-9 rounded-xl bg-primary/10 px-8 py-[38px] lg:sticky lg:top-[100px] lg:flex">
					{actions.map((action) => (
						<Tooltip key={action.label}>
							<TooltipTrigger
								render={
									<Button
										variant="ghost"
										size="icon-sm"
										className="rounded-xl"
									/>
								}
								onClick={action.run}
								aria-label={action.label}
							>
								<Icon icon={action.icon} size={18} />
							</TooltipTrigger>
							<TooltipContent>{action.label}</TooltipContent>
						</Tooltip>
					))}
				</aside>
			</TooltipProvider>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>Share link</DialogTitle>
						<DialogDescription>{dialogMessage}</DialogDescription>
					</DialogHeader>
					<DialogFooter showCloseButton />
				</DialogContent>
			</Dialog>
		</>
	);
}

export default ShareActions;
