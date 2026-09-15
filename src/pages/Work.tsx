import React, { useState } from 'react';
import { useFeatures } from '../context/FeatureContext';
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Search,
  Code2,
  RefreshCw,
  Server,
  Cloud,
  Database,
  Layers,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Repository {
  id: number | string;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics?: string[];
  category?: string;
}

const FALLBACK_PROJECTS: Repository[] = [
  {
    id: 'p1',
    name: 'facility-maintenance-aws-fullstack',
    description:
      'Built a maintenance request tracking system with a Python backend on AWS EC2, RDS (MySQL/PostgreSQL), role-based authentication using Amazon Cognito, S3 document uploads, IAM access controls, and CloudWatch monitoring.',
    html_url: 'https://github.com/niketbmane/facility-maintenance-aws',
    homepage: '',
    stargazers_count: 64,
    forks_count: 18,
    language: 'Python',
    topics: ['python', 'aws-ec2', 'aws-rds', 'aws-s3', 'amazon-cognito', 'cloudwatch', 'iam'],
    category: 'Cloud & AWS',
  },
  {
    id: 'p2',
    name: 'hive-oracle-plsql-to-python-migration',
    description:
      'Turnberry Solutions / Schreiber Foods modern backend modernization engine. Migrated 100+ Oracle PL/SQL procedures & packages into Python backend services using SQLAlchemy ORM, resolving legacy logic errors and cutting execution time by 30%.',
    html_url: 'https://github.com/niketbmane/hive-plsql-to-python-migration',
    homepage: '',
    stargazers_count: 98,
    forks_count: 24,
    language: 'Python',
    topics: ['fastapi', 'sqlalchemy', 'oracle-plsql', 'pandas', 'pytest', 'python'],
    category: 'Python & FastAPI',
  },
  {
    id: 'p3',
    name: 'fastapi-rest-microservices-suite',
    description:
      'Designed and built 100+ RESTful APIs with FastAPI, interactive documentation via Swagger UI / OpenAPI, Pydantic data validation schemas, Pytest unit tests, and Postman regression suites, reducing downstream integration time by 40%.',
    html_url: 'https://github.com/niketbmane/fastapi-rest-microservices-suite',
    homepage: '',
    stargazers_count: 85,
    forks_count: 21,
    language: 'Python',
    topics: ['fastapi', 'rest-api', 'swagger-ui', 'openapi', 'pytest', 'postman'],
    category: 'Python & FastAPI',
  },
  {
    id: 'p4',
    name: 'pandas-large-scale-batch-optimizer',
    description:
      'Data-processing workflow optimizer using Pandas, diagnosing bottlenecks in high-volume batch data handling, tuning SQL queries, and cutting backend execution latency by 25–30%.',
    html_url: 'https://github.com/niketbmane/pandas-batch-optimizer',
    homepage: '',
    stargazers_count: 52,
    forks_count: 14,
    language: 'Python',
    topics: ['pandas', 'sql-optimization', 'etl', 'postgresql', 'performance-tuning'],
    category: 'Databases & ETL',
  },
  {
    id: 'p5',
    name: 'enterprise-lms-hrms-platform',
    description:
      'Proiuvo Pvt Ltd enterprise platform modules built with React.js (employee onboarding, performance evaluation, attendance tracking) featuring role-based access control (RBAC), cutting HR workflow time by 35% and syncing with Spring Boot REST APIs.',
    html_url: 'https://github.com/niketbmane/enterprise-lms-hrms-platform',
    homepage: '',
    stargazers_count: 73,
    forks_count: 19,
    language: 'JavaScript',
    topics: ['react', 'javascript', 'html5', 'css3', 'bootstrap', 'rbac', 'spring-boot'],
    category: 'Frontend UI',
  },
  {
    id: 'p6',
    name: 'aws-serverless-s3-rds-pipeline',
    description:
      'Event-driven serverless workflow using AWS Lambda, Amazon S3 triggers, RDS PostgreSQL connection pools, and AWS IAM policies, architected according to AWS SAA-C03 best practices.',
    html_url: 'https://github.com/niketbmane/aws-serverless-pipeline',
    homepage: '',
    stargazers_count: 91,
    forks_count: 27,
    language: 'Python',
    topics: ['aws-lambda', 'amazon-s3', 'amazon-rds', 'aws-iam', 'boto3', 'cloud'],
    category: 'Cloud & AWS',
  },
];

export const Work: React.FC = () => {
  const { features } = useFeatures();

  const [repos, setRepos] = useState<Repository[]>(FALLBACK_PROJECTS);
  const [githubUser, setGithubUser] = useState('niketbmane');
  const [inputUsername, setInputUsername] = useState('niketbmane');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchGithubRepos = async (usernameToFetch: string) => {
    if (!features.githubApiFeed) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/github/${usernameToFetch}`);
      const data = await response.json();

      if (response.ok && data.success && data.repos.length > 0) {
        const apiRepos: Repository[] = data.repos.map((repo: any) => {
          let category = 'Python & FastAPI';
          const topics = repo.topics || [];
          if (topics.includes('aws') || topics.includes('cloud') || topics.includes('lambda')) {
            category = 'Cloud & AWS';
          } else if (topics.includes('sql') || topics.includes('etl') || topics.includes('pandas') || topics.includes('database')) {
            category = 'Databases & ETL';
          } else if (repo.language === 'JavaScript' || repo.language === 'TypeScript' || topics.includes('react')) {
            category = 'Frontend UI';
          }
          return {
            ...repo,
            category,
          };
        });
        setRepos(apiRepos);
        setGithubUser(usernameToFetch);
      } else {
        setRepos(FALLBACK_PROJECTS);
      }
    } catch (err) {
      setRepos(FALLBACK_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      fetchGithubRepos(inputUsername.trim());
    }
  };

  const categories = ['All', 'Python & FastAPI', 'Cloud & AWS', 'Databases & ETL', 'Frontend UI'];

  const filteredProjects = repos.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.language && project.language.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.topics && project.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container" style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '780px' }}>
        <span className="badge-pill" style={{ width: 'fit-content' }}>
          <Github size={14} /> Backend & Cloud Repositories
        </span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', lineHeight: '1.15' }}>
          Production Systems, <span className="gradient-text">FastAPI Services</span> & AWS Architecture
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          Explore modern Python backend projects, legacy Oracle PL/SQL modernization pipelines, AWS cloud deployments, and REST API architectures.
        </p>
      </div>

      {/* GitHub Live Feed Controls */}
      {features.githubApiFeed && (
        <section className="glass-panel" style={{ padding: '24px 32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="brand-icon" style={{ width: '38px', height: '38px' }}>
                <Github size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>Live GitHub Sync Engine</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Viewing repositories for <strong style={{ color: 'var(--accent-cyan-light)' }}>@{githubUser}</strong>
                </p>
              </div>
            </div>

            <form onSubmit={handleFetchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="form-group" style={{ margin: 0, minWidth: '220px' }}>
                <input
                  type="text"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  placeholder="Enter GitHub handle..."
                  className="form-input"
                  style={{ padding: '10px 14px', fontSize: '0.85rem' }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary btn-sm"
                style={{ padding: '10px 16px', fontSize: '0.85rem' }}
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                <span>{loading ? 'Syncing...' : 'Sync'}</span>
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`badge-pill ${activeCategory === cat ? 'active' : ''}`}
                style={{
                  cursor: 'pointer',
                  padding: '8px 16px',
                  background: activeCategory === cat ? 'var(--accent-indigo)' : 'var(--bg-surface)',
                  color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                  borderColor: activeCategory === cat ? 'var(--accent-indigo)' : 'var(--border-subtle)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or tech..."
              className="form-input"
              style={{ paddingLeft: '40px', paddingRight: '16px', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Repos Count Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Showing {filteredProjects.length} projects</span>
          {activeCategory !== 'All' && (
            <button
              onClick={() => setActiveCategory('All')}
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan-light)', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              Clear Category Filter
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="work-grid">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card project-card"
          >
            <div className="project-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', color: 'var(--accent-indigo-light)' }}>
                  <Code2 size={20} />
                </div>
                <div>
                  <h3 className="project-title">{project.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan-light)', fontWeight: 600 }}>{project.category}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noreferrer"
                  title="View GitHub Repository"
                  style={{ color: 'var(--text-muted)', display: 'flex' }}
                >
                  <Github size={18} />
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noreferrer"
                    title="Live Demo"
                    style={{ color: 'var(--accent-cyan-light)', display: 'flex' }}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            <p className="project-desc">{project.description}</p>

            {/* Topics Tags */}
            {project.topics && project.topics.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.topics.map((t) => (
                  <span key={t} className="project-topic-badge">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Project Footer Meta */}
            <div className="project-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: project.language === 'Python' ? '#3572A5' : project.language === 'JavaScript' ? '#f1e05a' : '#06b6d4' }} />
                <span>{project.language}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} color="#f59e0b" fill="#f59e0b" />
                  <span>{project.stargazers_count}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <GitFork size={14} />
                  <span>{project.forks_count}</span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
