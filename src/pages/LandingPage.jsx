import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Upload, Target, FileText, ArrowRight, ChevronDown } from 'lucide-react';

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

                    <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                        Transform Your
                        <span className="text-primary"> Resume</span>
                    </h1>

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

            {/* Features Section */}
            <div id="features" className="py-20 bg-card">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Why Choose Our AI Resume Optimizer?
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                            We combine cutting-edge AI technology with resume expertise to give you
                            the competitive edge in today's job market.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <Card className="border-border hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Target className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">ATS Optimization</CardTitle>
                                <CardDescription>Optimize for Applicant Tracking Systems</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Our AI analyzes your resume against industry-standard ATS algorithms
                                    to ensure it passes automated screening processes.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="border-border hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">Skill Matching</CardTitle>
                                <CardDescription>Identify missing skills and keywords</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Compare your resume against job descriptions to identify missing
                                    skills, keywords, and areas for improvement.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="border-border hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Sparkles className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">Expert Insights</CardTitle>
                                <CardDescription>Get actionable recommendations</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Receive personalized, actionable suggestions to enhance your
                                    resume's effectiveness and impact.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

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