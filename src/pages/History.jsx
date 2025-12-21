import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

// TEMP dummy data (replace with API later)
const historyData = [
    {
        id: "1",
        role: "Frontend Developer Intern",
        atsScore: 72,
        date: "2025-01-12",
        status: "Completed",
    },
    {
        id: "2",
        role: "React Developer",
        atsScore: 85,
        date: "2025-01-10",
        status: "Completed",
    },
    {
        id: "3",
        role: "Software Engineer",
        atsScore: 64,
        date: "2025-01-05",
        status: "Completed",
    },
];

export default function History() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">History</h1>
                <p className="text-muted-foreground mt-1">
                    View all your previously analyzed resumes
                </p>
            </div>

            {/* Empty State */}
            {historyData.length === 0 ? (
                <Card className="flex flex-col items-center justify-center py-16">
                    <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                        No resume history found
                    </p>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {historyData.map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg">
                                        {item.role}
                                    </CardTitle>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        {item.date}
                                    </div>
                                </div>

                                <Badge
                                    variant={
                                        item.atsScore >= 80
                                            ? "success"
                                            : item.atsScore >= 60
                                                ? "secondary"
                                                : "destructive"
                                    }
                                >
                                    ATS {item.atsScore}%
                                </Badge>
                            </CardHeader>

                            <CardContent className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Status: {item.status}
                                </span>

                                <Button
                                    size="sm"
                                    onClick={() => navigate(`/analysis/${item.id}`)}
                                >
                                    View Analysis
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
