// UNSAID - Platform Constants

export const PRIMARY_CATEGORIES = [
  { id: 'manager', label: 'Manager behavior / toxicity' },
  { id: 'wlb', label: 'Work-life balance / night calls' },
  { id: 'salary', label: 'Salary / CTC / appraisal' },
  { id: 'layoffs', label: 'Layoffs / job insecurity' },
  { id: 'hr', label: 'HR policies / pressure' },
  { id: 'culture', label: 'Team culture / favoritism' },
  { id: 'hiring', label: 'Hiring / interviews' },
];

export const SUB_CATEGORIES: Record<string, { id: string; label: string }[]> = {
  manager: [
    { id: 'micromanagement', label: 'Micromanagement' },
    { id: 'public_humiliation', label: 'Public humiliation' },
    { id: 'credit_stealing', label: 'Credit stealing' },
    { id: 'unrealistic_expectations', label: 'Unrealistic expectations' },
    { id: 'poor_communication', label: 'Poor communication' },
    { id: 'favoritism', label: 'Favoritism' },
  ],
  wlb: [
    { id: 'night_calls', label: 'Late night calls' },
    { id: 'weekend_work', label: 'Weekend work expected' },
    { id: 'no_boundaries', label: 'No work-life boundaries' },
    { id: 'burnout', label: 'Burnout culture' },
    { id: 'long_hours', label: 'Excessive working hours' },
  ],
  salary: [
    { id: 'delayed_salary', label: 'Delayed salary' },
    { id: 'low_appraisal', label: 'Low/no appraisal' },
    { id: 'false_promises', label: 'False promises' },
    { id: 'below_market', label: 'Below market rate' },
    { id: 'no_transparency', label: 'No salary transparency' },
  ],
  layoffs: [
    { id: 'sudden_layoffs', label: 'Sudden layoffs' },
    { id: 'no_severance', label: 'Poor/no severance' },
    { id: 'mass_layoffs', label: 'Mass layoffs' },
    { id: 'performance_excuse', label: 'Fake performance issues' },
  ],
  hr: [
    { id: 'toxic_policies', label: 'Toxic policies' },
    { id: 'biased_hr', label: 'Biased HR' },
    { id: 'no_support', label: 'No employee support' },
    { id: 'forced_resignation', label: 'Forced resignation' },
  ],
  culture: [
    { id: 'office_politics', label: 'Office politics' },
    { id: 'cliques', label: 'Cliques and groups' },
    { id: 'discrimination', label: 'Discrimination' },
    { id: 'no_recognition', label: 'No recognition' },
    { id: 'blame_culture', label: 'Blame culture' },
  ],
  hiring: [
    { id: 'fake_job_posting', label: 'Fake job posting' },
    { id: 'lowball_offer', label: 'Lowball offer' },
    { id: 'unprofessional', label: 'Unprofessional interview' },
    { id: 'long_process', label: 'Unnecessarily long process' },
  ],
};

export const EMPLOYMENT_STATUS = [
  { id: 'current', label: 'Currently working' },
  { id: 'past', label: 'Worked in the past' },
  { id: 'interviewing', label: 'Interviewing / offer stage' },
];

export const TEAM_FUNCTIONS = [
  'Engineering',
  'Product',
  'Design',
  'Sales',
  'Marketing',
  'Support',
  'HR',
  'Finance',
  'Operations',
  'Other',
];

export const SENTIMENTS = [
  { id: 'positive', label: 'Positive', color: 'text-positive' },
  { id: 'neutral', label: 'Neutral', color: 'text-secondary' },
  { id: 'negative', label: 'Negative', color: 'text-negative' },
];

export const REPORT_REASONS = [
  { id: 'harassment', label: 'Harassment or personal attack' },
  { id: 'fake', label: 'Fake or misleading information' },
  { id: 'confidential', label: 'Contains confidential information' },
  { id: 'spam', label: 'Spam or irrelevant' },
  { id: 'other', label: 'Other' },
];

export const POST_LIMITS = {
  MIN_CHARACTERS: 150,
  MAX_CHARACTERS: 1500,
  PREVIEW_LENGTH: 300,
  PUBLISH_DELAY_MINUTES: 3,
  AUTO_HIDE_REPORTS_THRESHOLD: 5,
};

export const TRUST_WEIGHTS = {
  ANONYMOUS_USER: 0.3,
  LOGGED_IN_USER: 0.7,
  VERIFIED_USER: 1.0,
};

