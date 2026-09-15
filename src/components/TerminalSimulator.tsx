import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, FileCode, Server, Cloud, Info, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeSnippet {
  filename: string;
  badge: string;
  icon: React.ElementType;
  color: string;
  language: string;
  title: string;
  description: string;
  testOutput: string;
  code: string;
}

const CODE_SNIPPETS: Record<'fastapi' | 'plsql' | 'aws', CodeSnippet> = {
  fastapi: {
    filename: 'fastapi_service.py',
    badge: 'REST API & ORM',
    icon: Server,
    color: 'var(--accent-emerald-light)',
    language: 'Python 3.11 • FastAPI & SQLAlchemy',
    title: 'FastAPI Microservice with Pydantic & SQLAlchemy ORM',
    description:
      'Exposes an asynchronous REST API endpoint, validates incoming JSON payloads with Pydantic, and handles database transactions via SQLAlchemy ORM dependency injection with connection pooling.',
    testOutput: 'PASSED tests/test_fastapi.py::test_create_record [100%] • 201 CREATED (Latency: 14.8ms)',
    code: `# 1. FastAPI REST API with Pydantic & SQLAlchemy ORM
from fastapi import FastAPI, Depends, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

app = FastAPI(title="Modernized Backend Service", version="2.0")

class MaintenanceRecord(BaseModel):
    asset_id: str
    facility_code: str
    priority: str
    contact_email: EmailStr

@app.post("/api/v2/maintenance/records", status_code=status.HTTP_201_CREATED)
async def create_record(payload: MaintenanceRecord, db: Session = Depends(get_db)):
    """
    Replaced legacy Oracle PL/SQL stored procedure with FastAPI endpoint.
    Leverages SQLAlchemy connection pooling to cut execution latency by 30%.
    """
    new_entry = MaintenanceModel(**payload.dict())
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return {"status": "SUCCESS", "record_id": new_entry.id, "latency_ms": 14.8}`,
  },
  plsql: {
    filename: 'plsql_migration.py',
    badge: 'PL/SQL Modernization',
    icon: FileCode,
    color: 'var(--accent-cyan-light)',
    language: 'Python 3.11 • Oracle PL/SQL Migration & Pandas',
    title: 'Modernizing Oracle PL/SQL to Vectorized Python',
    description:
      'Refactored legacy cursor-based PL/SQL packages into vectorized Pandas operations, eliminating row-by-row bottlenecks and reducing ETL latency by 25–30% across 250,000+ rows.',
    testOutput: 'PASSED tests/test_migration.py::test_batch_workflow [100%] • 250,000 rows processed in 1.4s',
    code: `# 2. Legacy Oracle PL/SQL Migration & Pandas Optimization
import pandas as pd
from sqlalchemy import text

def process_batch_transactions(db_engine, batch_id: int):
    """
    MODERNIZATION REFACTOR:
    Replaced legacy Oracle PL/SQL package: PKG_SCHREIBER_HIVE.PROCESS_DATA
    - Converted row-by-row cursor loops into vectorized Pandas operations
    - Reduced processing time by 25-30% across 250,000+ transaction rows
    """
    sql_query = text("""
        SELECT transaction_id, asset_id, amount, status 
        FROM transactions 
        WHERE batch_id = :b
    """)
    df = pd.read_sql(sql_query, con=db_engine, params={"b": batch_id})
    
    # Vectorized data transformation & aggregate summary
    df['clean_amount'] = df['amount'].fillna(0.0).astype(float)
    summary = df.groupby('status')['clean_amount'].agg(['sum', 'count']).reset_index()
    return summary.to_dict(orient="records")`,
  },
  aws: {
    filename: 'aws_lambda_pipeline.py',
    badge: 'AWS Serverless Cloud',
    icon: Cloud,
    color: 'var(--accent-purple)',
    language: 'Python 3.11 • AWS Lambda, S3 & RDS PostgreSQL',
    title: 'Event-Driven Serverless Pipeline (AWS SAA-C03 Architecture)',
    description:
      'Automated serverless AWS Lambda function triggered upon Amazon S3 document uploads. Validates IAM roles and securely streams structured records into an AWS RDS PostgreSQL instance.',
    testOutput: 'PASSED tests/test_aws_pipeline.py::test_s3_to_rds [100%] • Event processed & RDS committed',
    code: `# 3. AWS SAA-C03 Architecture: Serverless S3 Ingestion to RDS
import json
import boto3
import os

s3_client = boto3.client('s3')
RDS_ENDPOINT = os.environ.get('RDS_POSTGRES_HOST')

def lambda_handler(event, context):
    """
    Event-driven AWS serverless pipeline:
    Triggered when new documents are uploaded to an Amazon S3 bucket.
    Validates IAM role credentials and streams records into AWS RDS PostgreSQL.
    """
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        
        # Stream payload directly from S3 bucket
        response = s3_client.get_object(Bucket=bucket, Key=key)
        data = json.loads(response['Body'].read().decode('utf-8'))
        
        # Persist to AWS RDS PostgreSQL connection pool
        insert_to_rds(data)
        
    return {"statusCode": 200, "message": "RDS ingestion complete"}`,
  },
};

// Refined, Minimalist GitHub Dark Syntax Palette
const highlightPythonLine = (line: string): React.ReactNode => {
  const trimmed = line.trimStart();

  // Comments & Docstrings (calm, understated slate)
  if (trimmed.startsWith('#')) {
    return <span style={{ color: '#64748b', fontStyle: 'italic' }}>{line}</span>;
  }
  if (trimmed.startsWith('"""') || trimmed.endsWith('"""') || trimmed.startsWith('*') || trimmed.startsWith('-')) {
    return <span style={{ color: '#64748b', fontStyle: 'italic' }}>{line}</span>;
  }

  // Tokenize line with regex
  const tokenRegex = /(".*?"|'.*?'|@\w+(?:\.\w+)*(?:\(.*?\))?|\b(?:async|def|from|import|class|return|with|for|in|as|if|else|lambda)\b|\b(?:FastAPI|Depends|HTTPException|status|Session|BaseModel|EmailStr|List|text|boto3|json|os|pd|MaintenanceModel)\b|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*(?=\()|[^\s]+|\s+)/g;

  const tokens: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = tokenRegex.exec(line)) !== null) {
    const token = match[0];
    const key = `tok-${idx++}`;

    if (token.startsWith('"') || token.startsWith("'")) {
      // Clean, soft warm tint for strings
      tokens.push(<span key={key} style={{ color: '#fef3c7' }}>{token}</span>);
    } else if (/^@/.test(token)) {
      // Cyan accent for decorators
      tokens.push(<span key={key} style={{ color: '#38bdf8', fontWeight: 600 }}>{token}</span>);
    } else if (/^(async|def|from|import|class|return|with|for|in|as|if|else|lambda)$/.test(token)) {
      // Soft modern indigo for language keywords
      tokens.push(<span key={key} style={{ color: '#818cf8', fontWeight: 600 }}>{token}</span>);
    } else if (/^(FastAPI|Depends|HTTPException|status|Session|BaseModel|EmailStr|List|text|boto3|json|os|pd|MaintenanceModel)$/.test(token)) {
      // Crisp white with subtle bolding for key types
      tokens.push(<span key={key} style={{ color: '#ffffff', fontWeight: 600 }}>{token}</span>);
    } else if (/^\d+(\.\d+)?$/.test(token)) {
      // Subtle cyan-ice for numbers
      tokens.push(<span key={key} style={{ color: '#7dd3fc' }}>{token}</span>);
    } else {
      // Neutral crisp slate for standard variables & symbols
      tokens.push(<span key={key} style={{ color: '#cbd5e1' }}>{token}</span>);
    }
  }

  return tokens.length > 0 ? tokens : line;
};

export const TerminalSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fastapi' | 'plsql' | 'aws'>('fastapi');
  const [copied, setCopied] = useState(false);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const currentSnippet = CODE_SNIPPETS[activeTab];
  const lines = currentSnippet.code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsRunningTest(true);
    setTestResult(null);

    setTimeout(() => {
      setIsRunningTest(false);
      setTestResult(currentSnippet.testOutput);
    }, 600);
  };

  return (
    <div className="terminal-wrapper" style={{ boxShadow: '0 20px 50px -10px rgba(0,0,0,0.8), 0 0 30px rgba(99, 102, 241, 0.15)' }}>
      {/* 1. Title Bar */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="terminal-title">
            <Terminal size={14} color="var(--accent-indigo-light)" />
            <span>niket@backend-server: ~/production-code</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleRunCode}
            disabled={isRunningTest}
            className="btn-secondary btn-sm"
            style={{
              padding: '5px 12px',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: isRunningTest ? 'wait' : 'pointer',
            }}
            title="Simulate running Pytest validation suite"
          >
            <Play size={12} color="var(--accent-emerald)" fill="var(--accent-emerald)" />
            <span>{isRunningTest ? 'Running...' : 'Run Pytest'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="btn-secondary btn-sm"
            style={{ padding: '5px 12px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            title="Copy code snippet to clipboard"
          >
            {copied ? <Check size={12} color="var(--accent-emerald)" /> : <Copy size={12} />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* 2. File Tabs with Clear Category Badges */}
      <div className="terminal-tabs">
        {(Object.keys(CODE_SNIPPETS) as Array<keyof typeof CODE_SNIPPETS>).map((key) => {
          const tab = CODE_SNIPPETS[key];
          const Icon = tab.icon;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setTestResult(null);
              }}
              className={`terminal-tab-btn ${isActive ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
              }}
            >
              <Icon size={15} color={tab.color} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : '#94a3b8' }}>{tab.filename}</span>
                <span style={{ fontSize: '0.68rem', color: tab.color, opacity: isActive ? 1 : 0.7 }}>{tab.badge}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Executive Explanation Banner (Understandable at a glance) */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          padding: '12px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <div
          style={{
            padding: '6px',
            borderRadius: '6px',
            background: 'rgba(99, 102, 241, 0.15)',
            color: 'var(--accent-indigo-light)',
            marginTop: '2px',
          }}
        >
          <Info size={16} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <strong style={{ color: 'white', fontSize: '0.88rem' }}>{currentSnippet.title}</strong>
            <span
              style={{
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(56, 189, 248, 0.15)',
                color: 'var(--accent-cyan-light)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {currentSnippet.language}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: '4px 0 0 0', lineHeight: '1.5' }}>
            {currentSnippet.description}
          </p>
        </div>
      </div>

      {/* 4. Code Body with Line Numbers & Syntax Highlighting */}
      <div className="terminal-body" style={{ padding: '20px', overflowX: 'auto', background: '#070b16' }}>
        <div style={{ display: 'table', width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.86rem', lineHeight: '1.65' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: 'table-row' }}>
              <span
                style={{
                  display: 'table-cell',
                  paddingRight: '18px',
                  color: 'rgba(148, 163, 184, 0.35)',
                  textAlign: 'right',
                  userSelect: 'none',
                  fontSize: '0.78rem',
                  verticalAlign: 'top',
                  width: '32px',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ display: 'table-cell', whiteSpace: 'pre', verticalAlign: 'top' }}>
                {highlightPythonLine(line)}
              </span>
            </div>
          ))}
        </div>

        {/* 5. Interactive Pytest Console Drawer */}
        <AnimatePresence>
          {testResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                marginTop: '16px',
                padding: '14px 18px',
                borderRadius: '8px',
                background: 'rgba(6, 78, 59, 0.25)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                  <CheckCircle2 size={16} /> Pytest Suite Verified
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Auto-closing in a few seconds</span>
              </div>
              <div style={{ color: 'var(--accent-emerald-light)', fontSize: '0.8rem' }}>
                <code>$ pytest -v --tb=short</code>
                <div style={{ marginTop: '4px', color: '#a7f3d0' }}>{testResult}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Footer Status Bar */}
      <div className="terminal-footer" style={{ padding: '10px 18px', fontSize: '0.78rem', background: '#0a0e1c' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
            <span style={{ color: 'white', fontFamily: 'var(--font-mono)' }}>Production Ready</span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan-light)' }}>UTF-8 • LF • Python 3</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          <Sparkles size={12} color="var(--accent-amber)" />
          <span>Click "Run Pytest" or switch tabs above</span>
        </div>
      </div>
    </div>
  );
};
