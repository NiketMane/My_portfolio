import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFeatures } from '../context/FeatureContext';
import {
  User,
  Briefcase,
  GraduationCap,
  Cpu,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building,
  Award,
  Rocket,
  Download,
  ExternalLink,
  ShieldCheck,
  Cloud,
  Database,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const { features, resumeConfig } = useFeatures();

  const handleResumeClick = () => {
    if (resumeConfig.mode === 'drive') {
      window.open(resumeConfig.driveUrl, '_blank');
    } else {
      window.open(resumeConfig.fileUrl, '_blank');
    }
  };

  const experiences = [
    {
      period: 'Aug 2024 – Present',
      role: 'Python Backend Developer (Consultant)',
      company: 'Turnberry Solutions',
      client: 'Schreiber Foods — The Hive Backend Modernization Project',
      description:
        'Spearheading backend modernization by migrating legacy Oracle PL/SQL procedures and business packages into modular Python services using FastAPI and SQLAlchemy ORM, resolving legacy logic errors and optimizing data execution latency.',
      achievements: [
        'Migrated 100+ Oracle PL/SQL procedures and packages into Python backend services using SQLAlchemy ORM, resolving legacy logic errors and data inconsistencies, and cutting execution time by 30%.',
        'Designed and built 100+ RESTful APIs with FastAPI, documented via Swagger UI/OpenAPI, reducing downstream integration time by 40%.',
        'Diagnosed and optimized slow data-processing workflows using Pandas, identifying performance bottlenecks in large dataset handling and reducing backend execution latency by 25–30%.',
        'Used GitHub Copilot to accelerate PL/SQL-to-Python conversion, personally reviewing, debugging, and validating all generated code for correctness before release.',
        'Wrote unit and integration tests with Pytest and validated 100+ API endpoints with Postman, catching regressions early and improving release reliability.',
        'Deployed and maintained services on AWS (Lambda, S3, EC2, IAM, VPC); collaborated cross-functionally in an Agile/Scrum environment using Git and Jira.',
      ],
      techStack: [
        'Python',
        'FastAPI',
        'SQLAlchemy',
        'Oracle PL/SQL',
        'Pandas',
        'Pytest',
        'Postman',
        'Swagger UI',
        'AWS (Lambda, S3, EC2, IAM, VPC)',
        'Git',
        'GitHub Copilot',
        'Jira',
      ],
    },
    {
      period: 'Mar 2023 – Dec 2023',
      role: 'Associate Web Developer',
      company: 'Proiuvo Pvt Ltd',
      client: 'Enterprise LMS & HRMS Platform',
      description:
        'Engineered responsive frontend modules for an enterprise LMS & HRMS platform with role-based access control, working in tandem with Java Spring Boot REST backend services.',
      achievements: [
        'Built modules for a React.js-based LMS & HRMS platform (onboarding, performance evaluation, attendance tracking) with role-based access control, improving HR workflow efficiency by 35%.',
        'Integrated RESTful APIs from a Java Spring Boot backend, resolving data sync issues between frontend and backend and cutting sync errors by 25%.',
        'Debugged and fixed UI defects identified during QA and post-release, reducing post-release bugs by 40%.',
      ],
      techStack: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'Java Spring Boot', 'REST APIs'],
    },
  ];

  const certifications = [
    {
      title: 'AWS Certified Solutions Architect – Associate',
      code: 'SAA-C03',
      issuer: 'Amazon Web Services (AWS)',
      badgeColor: 'linear-gradient(135deg, #ff9900, #f59e0b)',
      description:
        'Demonstrates comprehensive capability in designing secure, resilient, high-performance, and cost-optimized cloud architectures on AWS (Lambda, EC2, S3, RDS, VPC, IAM).',
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      code: 'CLF-C02',
      issuer: 'Amazon Web Services (AWS)',
      badgeColor: 'linear-gradient(135deg, #6366f1, #3b82f6)',
      description:
        'Validates overall knowledge of AWS Cloud platform, core infrastructure services, security principles, compliance, and cloud economics.',
    },
  ];

  const academics = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Gogte Institute of Technology, Belagavi',
      year: '2020 – 2022',
      score: 'Postgraduate Degree',
      highlights: 'Advanced Software Architecture, Database Management Systems, Distributed Computing, Object-Oriented Analysis & Design.',
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Rani Chennamma University, Belagavi',
      year: '2017 – 2020',
      score: 'Undergraduate Degree',
      highlights: 'Core Computing Fundamentals, Relational Database Systems, Programming Languages, Data Structures, and Web Technologies.',
    },
  ];

  const technicalMatrix = [
    {
      category: 'Backend Frameworks & ORM',
      icon: Terminal,
      skills: ['FastAPI', 'SQLAlchemy ORM', 'Alembic', 'REST API Design', 'Python 3', 'Pydantic'],
    },
    {
      category: 'Databases & Performance Tuning',
      icon: Database,
      skills: [
        'Oracle PL/SQL',
        'PostgreSQL',
        'MySQL',
        'SQL Query Optimization',
        'RDBMS Design',
        'API Latency Optimization',
        'Root-Cause Troubleshooting',
      ],
    },
    {
      category: 'Cloud Platforms (AWS)',
      icon: Cloud,
      skills: ['AWS Lambda', 'Amazon EC2', 'Amazon S3', 'Amazon RDS', 'AWS IAM', 'Amazon VPC', 'Amazon Cognito', 'Amazon CloudWatch'],
    },
    {
      category: 'Testing & Engineering Tools',
      icon: Cpu,
      skills: ['Pytest', 'Postman', 'Swagger UI / OpenAPI', 'Pandas', 'Git', 'GitHub Copilot', 'Jira', 'Agile / Scrum'],
    },
    {
      category: 'Frontend Technologies (Secondary)',
      icon: Sparkles,
      skills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'REST APIs'],
    },
  ];

  return (
    <div className="container page-container" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 64px)' }}>
      {/* Profile Banner */}
      <section className="glass-panel about-banner-panel">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <span className="badge-pill">
                <User size={14} /> About Me
              </span>
              <span className="badge-pill badge-fullstack">
                <Award size={14} /> AWS SAA-C03 Certified
              </span>
              <span className="badge-pill" style={{ color: 'var(--accent-emerald-light)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                ~3 Years Backend Experience
              </span>
            </div>

            <h1 className="about-banner-title">
              Engineering resilient backend services with <span className="gradient-text">Python, FastAPI, and AWS.</span>
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.7' }}>
              I am a <strong style={{ color: 'white' }}>Python Backend Developer</strong> with <strong style={{ color: 'white' }}>~3 years of experience</strong> building reliable RESTful APIs and backend services using <strong style={{ color: 'white' }}>FastAPI</strong> and <strong style={{ color: 'white' }}>SQLAlchemy ORM</strong>. Based in Bangalore, India, my primary focus is backend engineering—migrating legacy <strong style={{ color: 'var(--accent-cyan-light)' }}>Oracle PL/SQL business logic to Python</strong>, tuning SQL queries, and deploying services on AWS (<strong style={{ color: 'white' }}>Lambda, EC2, S3, RDS</strong>).
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              With hands-on frontend experience building responsive web modules in <strong style={{ color: 'white' }}>React</strong>, I also bring full-stack versatility to collaborate across the entire stack and deliver end-to-end features. I hold the <strong style={{ color: 'var(--accent-cyan-light)' }}>AWS Certified Solutions Architect (SAA-C03)</strong> certification.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '8px' }}>
              <NavLink to="/contact" className="btn-primary">
                <span>Contact Niket</span>
              </NavLink>
              <button onClick={handleResumeClick} className="btn-secondary">
                {resumeConfig.mode === 'drive' ? <ExternalLink size={18} /> : <Download size={18} />}
                <span>{resumeConfig.mode === 'drive' ? 'View Resume' : 'Download Resume (PDF)'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="brand-icon" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #ff9900, #f59e0b)', flexShrink: 0 }}>
            <ShieldCheck size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: 'white' }}>AWS Official Certifications</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Industry-standard cloud architectural validation</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
          {certifications.map((cert) => (
            <motion.div
              key={cert.code}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '4px solid #ff9900' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge-pill" style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255, 153, 0, 0.15)', color: '#ffb74d', borderColor: 'rgba(255, 153, 0, 0.3)' }}>
                  {cert.code}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{cert.issuer}</span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>{cert.title}</h3>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      {features.experienceTimeline && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="brand-icon" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
              <Briefcase size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.35rem, 3.5vw, 1.8rem)', fontWeight: 800, color: 'white' }}>Work Experience (~3 Years)</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Professional software engineering roles, enterprise clients, and impact</p>
            </div>
          </div>

          <div className="timeline-container">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="timeline-item"
              >
                <div className="timeline-node">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-indigo)' }} />
                </div>

                <div className="glass-card timeline-card">
                  <div className="timeline-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>{exp.role}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-indigo-light)', fontSize: '0.95rem', fontWeight: 600 }}>
                        <Building size={14} />
                        <span>{exp.company}</span>
                        {exp.client && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>— {exp.client}</span>}
                      </div>
                    </div>
                    <span className="badge-pill" style={{ fontFamily: 'var(--font-mono)' }}>
                      <Calendar size={12} color="var(--accent-cyan-light)" />
                      <span>{exp.period}</span>
                    </span>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '16px', lineHeight: '1.6' }}>
                    {exp.description}
                  </p>

                  <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                      Key Responsibilities & Deliverables:
                    </span>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      {exp.achievements.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <CheckCircle2 size={16} color="var(--accent-emerald-light)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: '0.75rem',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--accent-cyan-light)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Academic Background */}
      {features.academicBackground && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="brand-icon" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))', flexShrink: 0 }}>
              <GraduationCap size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: 'white' }}>Academic Education</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Formal university degree credentials in Computer Applications</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
            {academics.map((acad, idx) => (
              <motion.div
                key={acad.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card"
                style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Award size={26} color="var(--accent-cyan-light)" />
                  <span className="badge-pill" style={{ fontFamily: 'var(--font-mono)' }}>{acad.year}</span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{acad.degree}</h3>
                  <p style={{ color: 'var(--accent-indigo-light)', fontSize: '0.88rem', fontWeight: 600 }}>{acad.institution}</p>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', fontSize: '0.82rem' }}>
                  <strong style={{ color: 'white', display: 'block', marginBottom: '4px' }}>Degree Level: {acad.score}</strong>
                  <p style={{ color: 'var(--text-muted)' }}>{acad.highlights}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Expertise Matrix */}
      {features.technicalExpertise && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="brand-icon" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))', flexShrink: 0 }}>
              <Cpu size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: 'white' }}>Technical Skills Matrix</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Categorized breakdown of programming languages, frameworks, cloud, and tools</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
            {technicalMatrix.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.category} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
                    <Icon size={16} color="var(--accent-cyan-light)" />
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'white' }}>
                      {item.category}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: '5px 10px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Ready to Collaborate CTA Banner */}
      <section className="glass-panel about-banner-panel" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div className="brand-icon" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))' }}>
          <Rocket size={24} color="white" />
        </div>
        <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'white' }}>
            Ready to Build or Modernize Your Backend?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Whether you need a high-performance Python FastAPI service, Oracle PL/SQL modernization, or secure AWS cloud architecture, let's connect directly.
          </p>
        </div>
        <NavLink to="/contact" className="btn-primary" style={{ padding: '12px 28px' }}>
          <span>Get In Touch & Connect</span>
          <ArrowRight size={18} />
        </NavLink>
      </section>
    </div>
  );
};
