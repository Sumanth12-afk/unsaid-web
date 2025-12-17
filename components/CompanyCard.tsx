import Link from 'next/link';
import { Building2, MapPin, TrendingUp } from 'lucide-react';

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    slug: string;
    industry?: string | null;
    location?: string | null;
    postCount?: number;
  };
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/company/${company.slug}`}>
      <div className="card card-hover cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-accent" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-primary mb-1 truncate">
                {company.name}
              </h3>

              <div className="flex items-center gap-3 text-xs text-secondary">
                {company.industry && (
                  <span className="truncate">{company.industry}</span>
                )}
                
                {company.location && (
                  <>
                    {company.industry && <span>•</span>}
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {company.location}
                    </span>
                  </>
                )}
              </div>

              {company.postCount !== undefined && company.postCount > 0 && (
                <div className="flex items-center gap-1 mt-2 text-xs text-accent">
                  <TrendingUp className="w-3 h-3" />
                  <span>{company.postCount} {company.postCount === 1 ? 'post' : 'posts'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

