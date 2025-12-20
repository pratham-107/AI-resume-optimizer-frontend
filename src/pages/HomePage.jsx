import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, FileText, Target, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }
    setResumeFile(file);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      setError('Please select a resume file');
      return;
    }
    
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }
    
    setIsUploading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescription);
      
      const response = await uploadResume(formData);
      
      if (response.status === 'success') {
        navigate(`/analysis/${response.data.resumeId}`);
      } else {
        setError(response.message || 'Failed to analyze resume');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while uploading the resume');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Sparkles className="h-8 w-8 text-black" />
          AI Resume Optimizer
        </h1>
        <p className="text-lg text-muted-foreground">
          Optimize your resume for any job position with AI-powered insights
        </p>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Your Resume
          </CardTitle>
          <CardDescription>
            Upload your PDF resume and enter the job description to get AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resume Upload */}
            <div className="space-y-2">
              <Label htmlFor="resume" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resume (PDF)
              </Label>
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="resume-upload" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF only (MAX. 10MB)
                    </p>
                  </div>
                  <input 
                    id="resume-upload" 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            
            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>
            
            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                'Analyze Resume'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ATS Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Improve your resume's chances of passing automated applicant tracking systems.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Skill Matching</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Identify missing skills and keywords from job descriptions.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Expert Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get actionable suggestions to enhance your resume's effectiveness.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}