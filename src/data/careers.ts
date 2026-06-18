import type { CareerRoadmap } from '../types';

export const careers: CareerRoadmap[] = [
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    salary: '₹8 LPA - ₹35 LPA',
    demand: 'High (18% YoY growth)',
    skills: ['JavaScript/TypeScript', 'React/Next.js', 'Node.js', 'System Design', 'Databases (SQL/NoSQL)', 'Data Structures & Algorithms'],
    description: 'Build robust, scalable software applications. Software Engineers work across the stack to build web, mobile, and system-level applications that drive businesses.',
    steps: [
      {
        title: 'Phase 1: Programming Fundamentals',
        description: 'Master core languages, algorithms, and git version control basics.',
        skills: ['Python/JS/C++', 'DS & Algos', 'Git & GitHub']
      },
      {
        title: 'Phase 2: Frontend & Client Apps',
        description: 'Create responsive web apps, styling systems, and client-side logic.',
        skills: ['HTML/CSS/Tailwind', 'React.js', 'TypeScript']
      },
      {
        title: 'Phase 3: Backend & Data Management',
        description: 'Build scalable APIs, configure database schemes, and set up authentications.',
        skills: ['Node.js/Express', 'PostgreSQL/MongoDB', 'REST & GraphQL']
      },
      {
        title: 'Phase 4: Cloud & Deployment',
        description: 'Learn cloud services, container configurations, and CI/CD pipelines.',
        skills: ['Docker', 'AWS basics', 'Vercel/Render']
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    salary: '₹10 LPA - ₹40 LPA',
    demand: 'Very High (22% YoY growth)',
    skills: ['Python', 'SQL', 'Pandas/NumPy', 'Statistics & Probability', 'Machine Learning Algorithms', 'Tableau/PowerBI'],
    description: 'Transform raw data into meaningful business insights. Data scientists build models, perform mathematical research, and present strategic metrics.',
    steps: [
      {
        title: 'Phase 1: Math & SQL Basics',
        description: 'Understand probability, linear algebra, and data retrieval systems.',
        skills: ['Descriptive Stats', 'Linear Algebra', 'SQL Queries']
      },
      {
        title: 'Phase 2: Programming & Wrangling',
        description: 'Clean, format, and visualize structured and unstructured datasets.',
        skills: ['Python (Pandas)', 'Matplotlib', 'Jupyter Notebooks']
      },
      {
        title: 'Phase 3: Machine Learning Models',
        description: 'Train classification, regression, and clustering algorithms.',
        skills: ['Scikit-Learn', 'Supervised Learning', 'Feature Engineering']
      },
      {
        title: 'Phase 4: Analytics in Production',
        description: 'Deploy dashboards, track live inference, and write big-data queries.',
        skills: ['Tableau', 'MLFlow', 'Apache Spark']
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    salary: '₹12 LPA - ₹50 LPA',
    demand: 'Exponential (35% YoY growth)',
    skills: ['PyTorch/TensorFlow', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'MLOps', 'Advanced Math'],
    description: 'Create neural networks and intelligent agents capable of learning, generating content, and making decisions under uncertainty.',
    steps: [
      {
        title: 'Phase 1: Deep Learning Foundations',
        description: 'Learn neural network basics, activation functions, and backpropagation.',
        skills: ['Matrix Calculus', 'Neural Nets', 'Gradient Descent']
      },
      {
        title: 'Phase 2: Frameworks & Tuning',
        description: 'Build and optimize large networks using production-grade libraries.',
        skills: ['PyTorch', 'TensorFlow', 'Hyperparameter Tuning']
      },
      {
        title: 'Phase 3: Specialized Modalities',
        description: 'Explore Transformers, Large Language Models, and Convolutional Nets.',
        skills: ['NLP', 'Computer Vision', 'Hugging Face']
      },
      {
        title: 'Phase 4: MLOps & Scalability',
        description: 'Serve models via endpoints, optimize inference speed, and manage pipelines.',
        skills: ['FastAPI', 'ONNX', 'AWS SageMaker']
      }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    salary: '₹7 LPA - ₹30 LPA',
    demand: 'High (15% YoY growth)',
    skills: ['Network Security', 'Penetration Testing', 'Linux Administration', 'Cryptography', 'SIEM Tools', 'Incident Response'],
    description: 'Defend organizational networks, sensitive user data, and system configurations from malicious exploits and structural vulnerabilities.',
    steps: [
      {
        title: 'Phase 1: Networking & Systems',
        description: 'Understand TCP/IP, operating systems internals, and security policies.',
        skills: ['CCNA Prep', 'Linux Command Line', 'Bash Scripting']
      },
      {
        title: 'Phase 2: Threat Analysis',
        description: 'Monitor active packets, recognize threat signatures, and scan configurations.',
        skills: ['Wireshark', 'Nmap', 'Vulnerability Assessment']
      },
      {
        title: 'Phase 3: Offensive Security',
        description: 'Conduct legal ethical hacking to locate system bugs and report loops.',
        skills: ['Metasploit', 'Burp Suite', 'Penetration Testing']
      },
      {
        title: 'Phase 4: Compliance & Auditing',
        description: 'Implement identity access controls and ensure ISO/SOC2 framework standards.',
        skills: ['IAM', 'SIEM Splunk', 'Compliance Audits']
      }
    ]
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    salary: '₹8 LPA - ₹32 LPA',
    demand: 'High (17% YoY growth)',
    skills: ['AWS/Azure/GCP', 'Terraform (IaC)', 'Kubernetes', 'Networking & CDN', 'IAM Security', 'Cost Optimization'],
    description: 'Provision and maintain virtualization structures, database clusters, and delivery systems across global public clouds.',
    steps: [
      {
        title: 'Phase 1: Core Virtualization',
        description: 'Understand virtual machines, cloud storage buckets, and subnets.',
        skills: ['EC2 & S3', 'VPCs', 'Load Balancers']
      },
      {
        title: 'Phase 2: Infrastructure as Code (IaC)',
        description: 'Automate resource provisioning using stateful configuration files.',
        skills: ['Terraform', 'Ansible', 'CloudFormation']
      },
      {
        title: 'Phase 3: Container Orchestration',
        description: 'Manage clusters, scale replication pods, and configure ingress points.',
        skills: ['Docker Compose', 'Kubernetes (K8s)', 'Helm']
      },
      {
        title: 'Phase 4: Enterprise Solutions',
        description: 'Secure multi-tenant clouds and design high-availability global setups.',
        skills: ['IAM Policies', 'CloudWatch/Prometheus', 'Cost Optimization']
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    salary: '₹9 LPA - ₹36 LPA',
    demand: 'Very High (20% YoY growth)',
    skills: ['CI/CD Pipelines', 'Docker', 'Kubernetes', 'Linux/Shell', 'Monitoring (Prometheus/Grafana)', 'GitOps'],
    description: 'Bridge the gap between developers and system operators. DevOps engineers build automated pipelines for fast, stable deployments.',
    steps: [
      {
        title: 'Phase 1: Continuous Integration (CI)',
        description: 'Build automation scripts, run tests, and check syntaxes on git commits.',
        skills: ['GitHub Actions', 'Jenkins', 'Unit Test Suites']
      },
      {
        title: 'Phase 2: Package & Distribute',
        description: 'Wrap runtime code, dependencies, and parameters into immutable containers.',
        skills: ['Docker Images', 'Container Registries', 'Linux scripting']
      },
      {
        title: 'Phase 3: Continuous Deployment (CD)',
        description: 'Trigger zero-downtime rolling upgrades to target staging and production.',
        skills: ['ArgoCD', 'Kubernetes Deployments', 'Canary Releases']
      },
      {
        title: 'Phase 4: Observability & Alerting',
        description: 'Track server loads, application logs, and latency triggers dynamically.',
        skills: ['Grafana', 'Prometheus', 'ELK Stack']
      }
    ]
  }
];
