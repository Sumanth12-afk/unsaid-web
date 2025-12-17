'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import ProgressSteps from '@/components/ProgressSteps';
import {
  PRIMARY_CATEGORIES,
  SUB_CATEGORIES,
  EMPLOYMENT_STATUS,
  TEAM_FUNCTIONS,
  SENTIMENTS,
  POST_LIMITS,
} from '@/lib/constants';

const STEPS = ['Category', 'Details', 'Context', 'Sentiment', 'Write'];

export default function NewPostPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?returnUrl=${encodeURIComponent('/post/new')}`);
    }
  }, [user, loading, router]);

  // Form data
  const [formData, setFormData] = useState({
    company_id: '',
    company_search: '',
    primary_category: '',
    sub_category: '',
    employment_status: '',
    team_function: '',
    location: '',
    sentiment: '',
    content: '',
  });

  // Fetch companies for search
  useEffect(() => {
    if (formData.company_search.length >= 2) {
      fetchCompanies(formData.company_search);
    }
  }, [formData.company_search]);

  const fetchCompanies = async (query: string) => {
    try {
      const response = await fetch(`/api/companies/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setCompanies(data.companies || []);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const nextStep = () => {
    // Validation for each step
    if (currentStep === 1 && !formData.company_id) {
      setError('Please select a company');
      return;
    }
    if (currentStep === 1 && !formData.primary_category) {
      setError('Please select a primary category');
      return;
    }
    if (currentStep === 3 && !formData.employment_status) {
      setError('Please select your employment status');
      return;
    }
    if (currentStep === 4 && !formData.sentiment) {
      setError('Please select a sentiment');
      return;
    }
    if (currentStep === 5) {
      // Content validation
      if (formData.content.length < POST_LIMITS.MIN_CHARACTERS) {
        setError(`Content must be at least ${POST_LIMITS.MIN_CHARACTERS} characters`);
        return;
      }
      if (formData.content.length > POST_LIMITS.MAX_CHARACTERS) {
        setError(`Content must be less than ${POST_LIMITS.MAX_CHARACTERS} characters`);
        return;
      }
      handleSubmit();
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError(null);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_id: formData.company_id,
          primary_category: formData.primary_category,
          sub_category: formData.sub_category || null,
          employment_status: formData.employment_status,
          team_function: formData.team_function || null,
          location: formData.location || null,
          sentiment: formData.sentiment,
          content: formData.content,
          firebase_uid: user?.uid, // Send firebase UID
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create post');
      }

      const data = await response.json();
      
      // Redirect to success or company page
      router.push(`/post/success`);
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
      setSubmitting(false);
    }
  };

  const characterCount = formData.content.length;
  const characterProgress = (characterCount / POST_LIMITS.MAX_CHARACTERS) * 100;
  const meetsMinimum = characterCount >= POST_LIMITS.MIN_CHARACTERS;

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-secondary">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  // Don't render form if not logged in (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Post Anonymously</h1>
            <p className="text-secondary">
              Share your workplace experience. Your identity stays private.
            </p>
          </div>

          {/* Progress Steps */}
          <ProgressSteps currentStep={currentStep} totalSteps={5} steps={STEPS} />

          {/* Form Card */}
          <div className="card fade-in">
            {/* Step 1: Category */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Select Company & Category</h2>
                <p className="text-secondary text-sm mb-6">
                  Choose the company and primary topic of your post
                </p>

                {/* Company Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company_search}
                    onChange={(e) => updateField('company_search', e.target.value)}
                    placeholder="Search for a company..."
                    className="input-field w-full"
                  />
                  
                  {companies.length > 0 && formData.company_search && (
                    <div className="mt-2 bg-surface-hover rounded-lg border border-secondary/20 max-h-48 overflow-y-auto">
                      {companies.map((company) => (
                        <button
                          key={company.id}
                          onClick={() => {
                            updateField('company_id', company.id);
                            updateField('company_search', company.name);
                            setCompanies([]);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-surface transition-colors border-b border-secondary/10 last:border-0"
                        >
                          <div className="font-medium text-primary">{company.name}</div>
                          {company.industry && (
                            <div className="text-sm text-secondary">{company.industry}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {formData.company_id && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-positive">
                      <CheckCircle2 className="w-4 h-4" />
                      Company selected
                    </div>
                  )}
                </div>

                {/* Primary Category */}
                <div>
                  <label className="block text-sm font-medium mb-3">Primary Category</label>
                  <div className="space-y-2">
                    {PRIMARY_CATEGORIES.map((category) => (
                      <label
                        key={category.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.primary_category === category.id
                            ? 'border-accent bg-accent/5'
                            : 'border-secondary/20 hover:border-secondary/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="primary_category"
                          value={category.id}
                          checked={formData.primary_category === category.id}
                          onChange={(e) => updateField('primary_category', e.target.value)}
                          className="w-4 h-4 text-accent"
                        />
                        <span className="text-sm text-primary">{category.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Sub-category */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">More Specific Details</h2>
                <p className="text-secondary text-sm mb-6">
                  Optional: Choose a more specific sub-category
                </p>

                <div className="space-y-2">
                  {SUB_CATEGORIES[formData.primary_category]?.map((subCat) => (
                    <label
                      key={subCat.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.sub_category === subCat.id
                          ? 'border-accent bg-accent/5'
                          : 'border-secondary/20 hover:border-secondary/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sub_category"
                        value={subCat.id}
                        checked={formData.sub_category === subCat.id}
                        onChange={(e) => updateField('sub_category', e.target.value)}
                        className="w-4 h-4 text-accent"
                      />
                      <span className="text-sm text-primary">{subCat.label}</span>
                    </label>
                  )) || (
                    <p className="text-secondary text-center py-8">
                      No sub-categories available for this topic
                    </p>
                  )}

                  <button
                    onClick={() => updateField('sub_category', '')}
                    className="w-full text-center py-3 text-sm text-secondary hover:text-primary transition-colors"
                  >
                    Skip this step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Context */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Your Context</h2>
                <p className="text-secondary text-sm mb-6">
                  Help others understand your perspective
                </p>

                {/* Employment Status */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Employment Status</label>
                  <div className="space-y-2">
                    {EMPLOYMENT_STATUS.map((status) => (
                      <label
                        key={status.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.employment_status === status.id
                            ? 'border-accent bg-accent/5'
                            : 'border-secondary/20 hover:border-secondary/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="employment_status"
                          value={status.id}
                          checked={formData.employment_status === status.id}
                          onChange={(e) => updateField('employment_status', e.target.value)}
                          className="w-4 h-4 text-accent"
                        />
                        <span className="text-sm text-primary">{status.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Team Function */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Team/Function (Optional)
                  </label>
                  <select
                    value={formData.team_function}
                    onChange={(e) => updateField('team_function', e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="">Select a function...</option>
                    {TEAM_FUNCTIONS.map((func) => (
                      <option key={func} value={func}>
                        {func}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="e.g., Bangalore, Mumbai, Remote"
                    className="input-field w-full"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Sentiment */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Overall Sentiment</h2>
                <p className="text-secondary text-sm mb-6">
                  How would you describe your overall experience?
                </p>

                <div className="space-y-3">
                  {SENTIMENTS.map((sentiment) => (
                    <label
                      key={sentiment.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.sentiment === sentiment.id
                          ? 'border-accent bg-accent/5'
                          : 'border-secondary/20 hover:border-secondary/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sentiment"
                        value={sentiment.id}
                        checked={formData.sentiment === sentiment.id}
                        onChange={(e) => updateField('sentiment', e.target.value)}
                        className="w-4 h-4 text-accent"
                      />
                      <span className={`text-sm font-medium ${sentiment.color}`}>
                        {sentiment.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Content */}
            {currentStep === 5 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Share Your Experience</h2>
                <p className="text-secondary text-sm mb-6">
                  Write your honest opinion. Focus on behaviors and patterns.
                </p>

                <div className="mb-4">
                  <textarea
                    value={formData.content}
                    onChange={(e) => updateField('content', e.target.value)}
                    placeholder="Share your experience..."
                    rows={10}
                    className="input-field w-full resize-none"
                  />

                  {/* Character Counter */}
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className={meetsMinimum ? 'text-positive' : 'text-secondary'}>
                      {characterCount} / {POST_LIMITS.MAX_CHARACTERS} characters
                      {!meetsMinimum && ` (min ${POST_LIMITS.MIN_CHARACTERS})`}
                    </span>
                    <div className="w-32 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          meetsMinimum ? 'bg-positive' : 'bg-accent'
                        }`}
                        style={{ width: `${Math.min(characterProgress, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-secondary">
                      <p className="font-medium text-primary mb-1">Important Guidelines:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Avoid mentioning names of people</li>
                        <li>Don't share confidential information</li>
                        <li>Focus on behaviors, not personal attacks</li>
                        <li>Be honest and constructive</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-negative/10 border border-negative/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-negative">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 mt-8">
              {currentStep > 1 && (
                <button onClick={prevStep} className="btn-secondary flex-1" disabled={submitting}>
                  Back
                </button>
              )}
              <button
                onClick={nextStep}
                className="btn-primary flex-1"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : currentStep === 5 ? 'Submit Post' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

