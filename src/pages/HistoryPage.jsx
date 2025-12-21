import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeAPI } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    FileText,
    Target,
    Calendar,
    Clock,
    Search,
    RefreshCw,
    ChevronRight,
    File,
    Sparkles,
    Trash2
} from 'lucide-react';

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date'); // 'date' or 'score'
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResumes, setTotalResumes] = useState(0);
    const [deleting, setDeleting] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchHistory();
    }, [page, sortBy, searchTerm]);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await resumeAPI.getHistory({
                page,
                limit: 10,
                search: searchTerm,
                sortBy
            });

            if (response.status === 'success') {
                setHistory(response.data.resumes);
                setTotalPages(response.data.pagination.totalPages);
                setTotalResumes(response.data.pagination.totalResumes);
            } else {
                setError(response.message || 'Failed to fetch history');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching history');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteResume = async (resumeId, fileName) => {
        if (!confirm(`Are you sure you want to delete "${fileName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            setDeleting(resumeId);
            await resumeAPI.deleteResume(resumeId);

            // Refresh history
            if (history.length === 1 && page > 1) {
                setPage(page - 1);
            } else {
                fetchHistory();
            }
        } catch (err) {
            alert(err.message || 'Failed to delete resume');
        } finally {
            setDeleting('');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getScoreText = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Average';
        return 'Needs Improvement';
    };

    if (loading && history.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex items-center justify-center h-64">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-lg">Loading history...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Sparkles className="h-8 w-8 text-black" />
                        Resume Analysis History
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        View your previous resume analyses and track your progress
                        {totalResumes > 0 && ` • ${totalResumes} total analyses`}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2"
                    >
                        <FileText className="h-4 w-4" />
                        Analyze New Resume
                    </Button>
                </div>
            </div>

            {/* Search and Filter */}
            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by filename or job role..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="score">Sort by Score</option>
                        </select>
                        <Button onClick={fetchHistory} variant="outline" className="flex items-center gap-2">
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Error Display */}
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* History List */}
            <div className="space-y-4">
                {history.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <File className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No analyses found</h3>
                            <p className="text-muted-foreground mb-4">
                                {searchTerm
                                    ? "Try adjusting your search terms or filters."
                                    : "Upload your first resume to get started with AI-powered analysis."}
                            </p>
                            <Button onClick={() => navigate('/')} className="flex items-center gap-2 mx-auto">
                                <FileText className="h-4 w-4" />
                                Analyze Resume
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    history.map((item) => (
                        <Card key={item._id} className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => navigate(`/analysis/${item._id}`)}>
                            <CardHeader className="pb-2">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            <FileText className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{item.fileName}</CardTitle>
                                            <CardDescription>
                                                {item.jobRole ? (
                                                    <span className="flex items-center gap-2">
                                                        <Target className="h-4 w-4" />
                                                        {item.jobRole}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">No job role specified</span>
                                                )}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(item.uploadedAt)}
                                        </Badge>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteResume(item._id, item.fileName);
                                            }}
                                            disabled={deleting === item._id}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className={`h-4 w-4 ${deleting === item._id ? 'animate-pulse' : ''}`} />
                                        </Button>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* ATS Score */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Target className="h-4 w-4 text-primary" />
                                                <span className="text-sm font-medium">ATS Score</span>
                                            </div>
                                            <span className="text-sm font-bold">{item.analysis?.atsScore || 0}%</span>
                                        </div>
                                        <Progress value={item.analysis?.atsScore || 0} className="h-2" />
                                        <Badge className={getScoreColor(item.analysis?.atsScore || 0)}>
                                            {getScoreText(item.analysis?.atsScore || 0)}
                                        </Badge>
                                    </div>

                                    {/* Suitability Score */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Target className="h-4 w-4 text-green-500" />
                                                <span className="text-sm font-medium">Suitability</span>
                                            </div>
                                            <span className="text-sm font-bold">{item.analysis?.suitabilityPercentage || 0}%</span>
                                        </div>
                                        <Progress value={item.analysis?.suitabilityPercentage || 0} className="h-2" />
                                    </div>

                                    {/* Keywords Found */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Search className="h-4 w-4 text-blue-500" />
                                                <span className="text-sm font-medium">Keywords</span>
                                            </div>
                                            <span className="text-sm font-bold">
                                                {item.analysis?.keywords?.length || 0} found
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {item.analysis?.keywords?.slice(0, 3).map((keyword, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {keyword}
                                                </Badge>
                                            ))}
                                            {item.analysis?.keywords?.length > 3 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{item.analysis.keywords.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <Badge variant="outline" className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        {new Date(item.uploadedAt).toLocaleDateString()}
                                    </Badge>
                                    <Badge variant="outline">
                                        {item.analysis?.mistakes?.length || 0} issues found
                                    </Badge>
                                    <Badge variant="outline">
                                        {item.analysis?.improvements?.length || 0} improvements suggested
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Pagination */}
            {history.length > 0 && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        First
                    </Button>
                    <Button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        Next
                    </Button>
                    <Button
                        onClick={() => setPage(totalPages)}
                        disabled={page === totalPages}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        Last
                    </Button>
                </div>
            )}
        </div>
    );
}