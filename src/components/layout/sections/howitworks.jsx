"use client";
import React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useId } from "react";

// Skeleton Components for Visual Interest
const SkeletonOne = () => {
	return (
		<div className="relative flex py-8 px-2 gap-10 h-full">
			<div className="w-full mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
				<div className="flex flex-1 w-full h-full flex-col space-y-2">
					{/* Newsletter Upload Interface */}
					<div className="h-8 w-full bg-gray-100 dark:bg-neutral-800 rounded-md animate-pulse"></div>
					<div className="h-6 w-3/4 bg-gray-100 dark:bg-neutral-800 rounded-md animate-pulse"></div>
					<div className="h-4 w-1/2 bg-blue-200 dark:bg-blue-900 rounded-md animate-pulse"></div>
				</div>
			</div>
		</div>
	);
};

const SkeletonTwo = () => {
	return (
		<div className="relative flex py-8 px-2 gap-10 h-full">
			<div className="w-full mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
				<div className="flex flex-1 w-full h-full flex-col space-y-2">
					{/* Matching Algorithm Visualization */}
					<div className="flex space-x-2">
						<div className="h-6 w-6 bg-blue-200 dark:bg-blue-900 rounded-full animate-pulse"></div>
						<div className="h-6 w-6 bg-blue-200 dark:bg-blue-900 rounded-full animate-pulse"></div>
						<div className="h-6 w-6 bg-green-200 dark:bg-green-900 rounded-full animate-pulse"></div>
					</div>
					<div className="h-4 w-full bg-gray-100 dark:bg-neutral-800 rounded-md animate-pulse"></div>
					<div className="h-8 w-2/3 bg-blue-200 dark:bg-blue-900 rounded-md animate-pulse"></div>
				</div>
			</div>
		</div>
	);
};

const SkeletonThree = () => {
	return (
		<div className="relative flex py-8 px-2 gap-10 h-full">
			<div className="w-full mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
				<div className="flex flex-1 w-full h-full flex-col space-y-2">
					{/* Analytics Dashboard */}
					<div className="flex justify-between">
						<div className="h-4 w-1/4 bg-green-200 dark:bg-green-900 rounded-md animate-pulse"></div>
						<div className="h-4 w-1/6 bg-blue-200 dark:bg-blue-900 rounded-md animate-pulse"></div>
					</div>
					<div className="h-6 w-full bg-gray-100 dark:bg-neutral-800 rounded-md animate-pulse"></div>
					<div className="h-4 w-3/4 bg-blue-200 dark:bg-blue-900 rounded-md animate-pulse"></div>
				</div>
			</div>
		</div>
	);
};

const steps = [
	{
		title: "Submit Your Newsletter",
		subtitle: "Get Started in Minutes",
		description:
			"Provide your newsletter's URL and basic information. Our AI analyzes your content, audience demographics, and engagement patterns to create your unique profile.",
		icon: "📝",
		features: ["AI Content Analysis", "Audience Insights", "Performance Metrics"],
		skeleton: <SkeletonOne />,
	},
	{
		title: "Get Matched with Partners",
		subtitle: "Smart AI Matching",
		description:
			"Our advanced algorithm finds complementary newsletters that align with your content style, audience overlap, and growth goals for maximum synergy.",
		icon: "🎯",
		features: ["Compatibility Score", "Audience Analysis", "Growth Potential"],
		skeleton: <SkeletonTwo />,
	},
	{
		title: "Cross-Promote & Grow",
		subtitle: "Seamless Integration",
		description:
			"Launch coordinated campaigns with your partners. Track performance, measure growth, and optimize strategies with real-time analytics.",
		icon: "🚀",
		features: ["Campaign Management", "Real-time Analytics", "Growth Tracking"],
		skeleton: <SkeletonThree />,
	},
];

const HowItWorks = () => {
	const { theme } = useTheme();
	const isDarkMode = theme === "dark";

	return (
		<section className="relative py-20 lg:py-32 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div 
					className="text-center mb-20"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-black dark:text-white mb-4">
						How it works{" "}
						<span className="text-blue-500">⚡</span>
					</h2>
					<p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
						From newsletter submission to successful partnerships in three simple steps. 
						Our AI-powered platform handles the complexity while you focus on creating great content.
					</p>
				</motion.div>

				{/* Feature Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
					{steps.map((step, index) => (
						<motion.div
							key={step.title}
							className={cn(
								"relative group bg-gradient-to-b dark:from-neutral-900 from-neutral-50 dark:to-neutral-950 to-white",
								"border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 overflow-hidden",
								"hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
							)}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							viewport={{ once: true }}
						>
							<Grid size={20} />
							
							{/* Step Number */}
							<div className="flex items-center justify-between mb-6">
								<div className="w-12 h-12 rounded-full bg-blue-500/10 border-2 border-blue-500 flex items-center justify-center text-blue-500 font-bold text-lg">
									{index + 1}
								</div>
								<div className="text-4xl">{step.icon}</div>
							</div>

							{/* Content */}
							<div className="relative z-20">
								<p className="text-sm font-semibold text-blue-500 mb-2">{step.subtitle}</p>
								<h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">
									{step.title}
								</h3>
								<p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed mb-6">
									{step.description}
								</p>

								{/* Features List */}
								<div className="space-y-2 mb-6">
									{step.features.map((feature, featureIndex) => (
										<div key={featureIndex} className="flex items-center space-x-2">
											<div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
											<span className="text-sm text-neutral-600 dark:text-neutral-400">{feature}</span>
										</div>
									))}
								</div>

								{/* Skeleton Component */}
								<div className="h-32 relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
									{step.skeleton}
								</div>
							</div>

							{/* Connection Line */}
							{index < steps.length - 1 && (
								<div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-30">
									<div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300"></div>
									<div className="w-2 h-2 rounded-full bg-blue-500 absolute -right-1 top-1/2 transform -translate-y-1/2"></div>
								</div>
							)}
						</motion.div>
					))}
				</div>

			</div>
		</section>
	);
};

// Grid Component for Background Pattern
const Grid = ({ pattern, size }) => {
	const p = pattern ?? [
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
	];
	return (
		<div className="pointer-events-none absolute left-1/2 top-1/2 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
			<div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
				<GridPattern
					width={size ?? 20}
					height={size ?? 20}
					x="-12"
					y="4"
					squares={p}
					className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
				/>
			</div>
		</div>
	);
};

export function GridPattern({ width, height, x, y, squares, ...props }) {
	const patternId = useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern
					id={patternId}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y]) => (
						<rect
							strokeWidth="0"
							key={`${x}-${y}`}
							width={width + 1}
							height={height + 1}
							x={x * width}
							y={y * height}
						/>
					))}
				</svg>
			)}
		</svg>
	);
}

export const HowItWorksSection = HowItWorks;
