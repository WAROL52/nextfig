"use client";

import { Button } from "../ui/button";

export type HomeHeroProps = {};

export function HomeHero({}: HomeHeroProps) {
    return (
        <main className="bg-background text-foreground relative flex min-h-screen items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div
                    className="hidden h-[600px] w-[600px] animate-pulse rounded-full blur-[120px] dark:block dark:bg-blue-500/30"
                    style={{ animationDuration: "3s" }}
                ></div>
                <div
                    className="absolute hidden h-[400px] w-[400px] animate-pulse rounded-full blur-[100px] dark:block dark:bg-blue-400/20"
                    style={{
                        animationDuration: "3.5s",
                        animationDelay: "0.8s",
                    }}
                ></div>
                <div
                    className="absolute hidden h-[300px] w-[300px] animate-pulse rounded-full blur-[80px] dark:block dark:bg-blue-300/15"
                    style={{ animationDuration: "4s", animationDelay: "1.5s" }}
                ></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <div className="space-y-8">
                        <h1 className="mx-auto mt-8 max-w-4xl text-6xl font-bold text-balance md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                            The all-in-one productivity tool
                        </h1>
                        <p className="text-foreground mx-auto mt-8 max-w-2xl text-xl text-balance">
                            Streamline your workflow and collaborate seamlessly.{" "}
                            <br></br>
                            Everything your team needs in one intuitive
                            workspace.
                        </p>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Button
                            size="lg"
                            className="group bg-foreground/10 border-foreground/20 text-foreground hover:bg-foreground/20 hover:border-foreground/30 relative rounded-full border px-8 py-6 text-lg font-semibold shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl dark:hover:shadow-blue-500/20"
                        >
                            <span className="flex items-center gap-2">
                                Try it now
                                <svg
                                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
