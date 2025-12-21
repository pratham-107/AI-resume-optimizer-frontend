import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ArrowRight, Building, Briefcase } from "lucide-react";
import { getAllResumes } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function History() {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const response = await getAllResumes();

                if (response.status === 'success') {
                    setHistoryData(response.data.resumes || []);
                } else {
                    setError(response.message || 'Failed to fetch history');
                }
            } catch (err) {
                setError(err.message || 'An error occurred while fetching history');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/analysis/${id}`);
    };

    return (
        <div className="min-h-screen bg-white px-4 py-12">
            <div className="max-w-3xl mx-auto">
                {/* Minimal Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-light text-black mb-2">History</h1>
                    <p className="text-gray-400 text-sm">
                        {historyData.length} {historyData.length === 1 ? 'analysis' : 'analyses'}
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        <p className="text-gray-400 text-sm mt-3">Loading history...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FileText className="h-12 w-12 text-red-200 mb-3" strokeWidth={1} />
                        <p className="text-red-400 text-sm">{error}</p>
                        <Button onClick={() => window.location.reload()} className="mt-4">
                            Try Again
                        </Button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && historyData.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FileText className="h-12 w-12 text-gray-200 mb-3" strokeWidth={1} />
                        <p className="text-gray-400 text-sm">No history yet</p>
                        <Button onClick={() => navigate('/')} className="mt-4">
                            Analyze Your First Resume
                        </Button>
                    </div>
                )}

                {/* History List */}
                {!loading && !error && historyData.length > 0 && (
                    <div className="space-y-6">
                        {historyData.map((item) => (
                            <div
                                key={item.resumeId}
                                className="group border-b border-gray-200 pb-6 hover:border-black transition-colors cursor-pointer"
                                onClick={() => handleViewDetails(item.resumeId)}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="space-y-1 mb-2">
                                            <h3 className="text-xl font-light text-black mb-0 truncate">
                                                {item.role || 'Not provided by user'}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Building className="h-4 w-4" />
                                                <span>{item.companyName || 'Not provided by user'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                                                <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-2xl font-light text-black">
                                                {item.atsScore}
                                            </p>
                                            <p className="text-xs text-gray-400">ATS Score</p>
                                        </div>
                                        <ArrowRight
                                            className="h-5 w-5 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}