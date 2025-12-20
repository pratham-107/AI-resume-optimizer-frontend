import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResumeAnalysis } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronLeft, Download, RefreshCw, FileText, Target } from 'lucide-react';

export default function AnalysisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const response = await getResumeAnalysis(id);
        
        if (response.status === 'success') {
          setAnalysisData(response.data);
        } else {
          setError(response.message || 'Failed to fetch analysis');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the analysis');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading analysis...</span>
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
          <Button onClick={() => navigate('/')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Alert variant="destructive">
          <AlertDescription>No analysis data found</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => navigate('/')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const { analysis, fileName, uploadedAt, jobRole } = analysisData;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          New Analysis
        </Button>
        
        <div className="text-right">
          <h1 className="text-2xl font-bold">Resume Analysis</h1>
          <p className="text-sm text-muted-foreground">{fileName}</p>
          <p className="text-xs text-muted-foreground">
            Analyzed on {new Date(uploadedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              ATS Score
            </CardTitle>
            <CardDescription>
              How well your resume matches Applicant Tracking Systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">{analysis.atsScore}%</span>
              <Badge variant={analysis.atsScore >= 70 ? "default" : analysis.atsScore >= 50 ? "secondary" : "destructive"}>
                {analysis.atsScore >= 70 ? "Good" : analysis.atsScore >= 50 ? "Average" : "Needs Improvement"}
              </Badge>
            </div>
            <Progress value={analysis.atsScore} className="h-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Suitability
            </CardTitle>
            <CardDescription>
              How well your resume matches the job description
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">{analysis.suitabilityPercentage}%</span>
              <Badge variant={analysis.suitabilityPercentage >= 70 ? "default" : analysis.suitabilityPercentage >= 50 ? "secondary" : "destructive"}>
                {analysis.suitabilityPercentage >= 70 ? "Good" : analysis.suitabilityPercentage >= 50 ? "Average" : "Needs Improvement"}
              </Badge>
            </div>
            <Progress value={analysis.suitabilityPercentage} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mistakes */}
        <Card>
          <CardHeader>
            <CardTitle>Identified Mistakes</CardTitle>
            <CardDescription>Issues found in your resume</CardDescription>
          </CardHeader>
          <CardContent>
            {analysis.mistakes && analysis.mistakes.length > 0 ? (
              <ul className="space-y-3">
                {analysis.mistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No major mistakes found!</p>
            )}
          </CardContent>
        </Card>

        {/* Improvements */}
        <Card>
          <CardHeader>
            <CardTitle>Suggested Improvements</CardTitle>
            <CardDescription>Ways to enhance your resume</CardDescription>
          </CardHeader>
          <CardContent>
            {analysis.improvements && analysis.improvements.length > 0 ? (
              <ul className="space-y-3">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Your resume looks great!</p>
            )}
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Missing Skills</CardTitle>
            <CardDescription>Skills mentioned in the job description but missing from your resume</CardDescription>
          </CardHeader>
          <CardContent>
            {analysis.missingSkills && analysis.missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No missing skills detected!</p>
            )}
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card>
          <CardHeader>
            <CardTitle>Important Keywords</CardTitle>
            <CardDescription>Key terms from the job description</CardDescription>
          </CardHeader>
          <CardContent>
            {analysis.keywords && analysis.keywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="py-1 px-3">
                    {keyword}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No keywords identified.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        <Button onClick={() => window.print()}>
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline" onClick={() => navigate('/')}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Analyze Another Resume
        </Button>
      </div>
    </div>
  );
}