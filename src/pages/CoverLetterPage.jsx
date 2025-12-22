import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCoverLetter } from '../services/coverLetter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronLeft, Download, RefreshCw, Mail, Copy, Share2, Printer } from 'lucide-react';
import { toast } from 'sonner';

export default function CoverLetterPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coverLetterData, setCoverLetterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCoverLetter = async () => {
            try {
                setLoading(true);
                const response = await getCoverLetter(id);

                if (response.status === 'success') {
                    setCoverLetterData(response.data);
                } else {
                    setError(response.message || 'Failed to fetch cover letter');
                }
            } catch (err) {
                setError(err.message || 'An error occurred while fetching the cover letter');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCoverLetter();
        }
    }, [id]);

    // Handle copying cover letter to clipboard
    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(coverLetterData.coverLetterContent);
            toast.success("Copied to clipboard", {
                description: "Your cover letter has been copied successfully",
            });
        } catch (err) {
            toast.error("Copy failed", {
                description: "Failed to copy to clipboard",
            });
        }
    };

    // Handle printing
    const handlePrint = () => {
        window.print();
    };

    // Handle sharing
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Cover Letter for ${coverLetterData.jobRole}`,
                    text: `Check out my AI-generated cover letter for ${coverLetterData.companyName}`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        } else {
            // Fallback: copy link to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied", {
                    description: "Share link copied to clipboard",
                });
            } catch (err) {
                toast.error("Copy failed", {
                    description: "Failed to copy share link",
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex items-center justify-center h-64">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-lg">Loading cover letter...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <div className="mt-4">
                    <Button onClick={() => navigate(-1)}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                </div>
            </div>
        );
    }

    if (!coverLetterData) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Alert variant="destructive">
                    <AlertDescription>No cover letter found</AlertDescription>
                </Alert>
                <div className="mt-4">
                    <Button onClick={() => navigate(-1)}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex items-center"
                >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Analysis
                </Button>

                <div className="text-right">
                    <h1 className="text-2xl font-bold">Cover Letter</h1>
                    <p className="text-sm text-muted-foreground">
                        Generated on {new Date(coverLetterData.generatedAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Cover Letter Header */}
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                {coverLetterData.companyName}
                            </CardTitle>
                            <CardDescription>
                                Position: {coverLetterData.jobRole}
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">
                                Tone: {coverLetterData.tone}
                            </Badge>
                            <Badge variant="outline">
                                Length: {coverLetterData.length}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Cover Letter Content */}
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="whitespace-pre-wrap leading-relaxed"
                            style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
                        >
                            {coverLetterData.coverLetterContent}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Keywords */}
            {coverLetterData.keywords && coverLetterData.keywords.length > 0 && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Key Skills & Keywords</CardTitle>
                        <CardDescription>
                            Important keywords identified in your cover letter
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {coverLetterData.keywords.map((keyword, index) => (
                                <Badge key={index} variant="secondary" className="py-1 px-3">
                                    {keyword}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
                <Button onClick={handleCopyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                </Button>

                <Button onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                </Button>

                <Button onClick={handleShare} variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                </Button>

                <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Analyze Another Resume
                </Button>
            </div>
        </div>
    );
}