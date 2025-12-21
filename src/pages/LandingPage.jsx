import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Upload, Target, FileText, ArrowRight, ChevronDown } from 'lucide-react';
import { SparklesText } from '@/components/ui/sparkles-text';
import InfiniteCardCarousel from '@/components/ui/infinite-card-carousel';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isScrolling, setIsScrolling] = useState(false);

    // Check if user is authenticated
    const token = sessionStorage.getItem('token');

    const scrollToFeatures = () => {
        setIsScrolling(true);
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleGetStarted = () => {
        if (token) {
            navigate('/upload');
        } else {
            navigate('/login');
        }
    };

    const handleSecondaryAction = () => {
        if (token) {
            navigate('/history');
        } else {
            navigate('/signup');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-3 bg-card border border-border px-4 py-2 rounded-full">
                            <Sparkles className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">AI-Powered Resume Optimization</span>
                        </div>
                    </div>

                    <SparklesText
                        className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                        colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
                        sparklesCount={15}
                    >
                        Transform Your Resume
                    </SparklesText>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                        Get AI-powered insights to optimize your resume for any job position.
                        Increase your chances of landing interviews with data-driven recommendations.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                            onClick={handleGetStarted}
                        >
                            <Upload className="mr-3 h-5 w-5" />
                            {token ? 'Get Started' : 'Login'}
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold transition-all duration-300"
                            onClick={handleSecondaryAction}
                        >
                            {token ? 'View History' : 'Sign In'}
                        </Button>
                    </div>

                    <div className="mt-12">
                        <p className="text-sm text-muted-foreground">Trusted by thousands of job seekers worldwide</p>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <button
                        onClick={scrollToFeatures}
                        className="p-3 bg-card border border-border rounded-full hover:bg-accent transition-all duration-300"
                    >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Features Section - Infinite Carousel */}
            <InfiniteCardCarousel />

            {/* CTA Section */}
            <div className="py-20 bg-background border-t border-border">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Ready to Transform Your Resume?
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of successful job seekers who have optimized their resumes
                        and landed their dream jobs with our AI-powered platform.
                    </p>
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                        onClick={handleGetStarted}
                    >
                        Get Started Now
                        <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}