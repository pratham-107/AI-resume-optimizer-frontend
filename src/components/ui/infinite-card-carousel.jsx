import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, FileText, Sparkles } from "lucide-react";

const carouselData = [
    {
        id: 1,
        title: "ATS Optimization",
        description: "Optimize your resume for Applicant Tracking Systems",
        icon: Target,
        color: "bg-primary text-primary-foreground",
    },
    {
        id: 2,
        title: "Skill Matching",
        description: "Identify missing skills and keywords from job descriptions",
        icon: FileText,
        color: "bg-card text-foreground border-2 border-border",
    },
    {
        id: 3,
        title: "Expert Insights",
        description: "Get actionable recommendations to enhance your resume",
        icon: Sparkles,
        color: "bg-primary text-primary-foreground",
    },
    {
        id: 4,
        title: "Resume Analysis",
        description: "Comprehensive analysis of your resume strengths and weaknesses",
        icon: FileText,
        color: "bg-background text-foreground border-2 border-border",
    },
    {
        id: 5,
        title: "Job Matching",
        description: "Find the perfect job matches based on your skills and experience",
        icon: Target,
        color: "bg-primary text-primary-foreground",
    },
];

export default function InfiniteCardCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoplayRef = useRef(null);

    // Create infinite loop by duplicating items
    const extendedData = [...carouselData, ...carouselData, ...carouselData];
    const itemsToShow = 3; // Reduced from 5 to 3 for better card width
    const totalItems = carouselData.length;

    // Auto-play functionality
    useEffect(() => {
        autoplayRef.current = setInterval(() => {
            handleNext();
        }, 2000);

        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, [currentIndex]);

    // Auto-advance logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
        }, 2000);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    // Reset to middle section when reaching boundaries
    useEffect(() => {
        if (currentIndex >= totalItems * 2) {
            setTimeout(() => {
                setCurrentIndex(totalItems);
            }, 500);
        } else if (currentIndex < totalItems) {
            setTimeout(() => {
                setCurrentIndex(totalItems);
            }, 500);
        }
    }, [currentIndex, totalItems]);

    const getVisibleCards = () => {
        const cards = [];
        for (let i = 0; i < itemsToShow; i++) {
            const index = (currentIndex + i) % extendedData.length;
            cards.push(extendedData[index]);
        }
        return cards;
    };

    const visibleCards = getVisibleCards();

    return (
        <div className="container mx-auto px-8 py-8 max-w-6xl">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Why Choose Our AI Resume Optimizer?
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                    We combine cutting-edge AI technology with resume expertise to give you
                    the competitive edge in today's job market.
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Cards Container */}
                <div className="overflow-hidden">
                    <div
                        className={`flex gap-6 transition-transform duration-500 ease-in-out`}
                        style={{
                            transform: `translateX(-${(currentIndex % totalItems) * (100 / itemsToShow)}%)`,
                        }}
                    >
                        {extendedData.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={`${card.id}-${index}`}
                                    className="flex-shrink-0"
                                    style={{ width: `calc(${100 / itemsToShow}% - ${(6 * (itemsToShow - 1)) / itemsToShow}rem)` }}
                                >
                                    <Card className={`${card.color} transition-all duration-300 hover:scale-105 border-0`}>
                                        <CardHeader>
                                            <div className="w-12 h-12 bg-background/20 rounded-lg flex items-center justify-center mb-4">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <CardTitle className="text-xl font-semibold">
                                                {card.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm opacity-80">
                                                {card.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {carouselData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentIndex(totalItems + index);
                                resetAutoplay();
                            }}
                            className={`h-2 rounded-full transition-all ${(currentIndex % totalItems) === index
                                ? "w-8 bg-primary"
                                : "w-2 bg-border hover:bg-muted"
                                }`}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}