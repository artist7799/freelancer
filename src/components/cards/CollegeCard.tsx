import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Send, Heart, GitCompare, Download } from 'lucide-react';
import type { College } from '../../types';
import type { MouseEvent } from 'react';
import { useGlobalStore } from '../../store/useGlobalStore';
import { useSavedCollegesStore } from '../../store/useSavedCollegesStore';
import { useCompareStore } from '../../store/useCompareStore';

// SVGs FOR CRISP VECTOR LOGOS
const IITBLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#0F2C59" />
    <path d="M50 18 L78 35 L78 65 L50 82 L22 65 L22 35 Z" fill="white" opacity="0.15" />
    <circle cx="50" cy="50" r="24" fill="none" stroke="white" strokeWidth="4" />
    <path d="M50 35 L50 65 M35 50 L65 50" stroke="white" strokeWidth="4" />
    <text x="50" y="80" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">IIT BOMBAY</text>
  </svg>
);

const IIMBLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="15" width="70" height="70" rx="8" fill="#800000" />
    <rect x="22" y="22" width="56" height="56" rx="4" fill="white" />
    <text x="50" y="55" fill="#800000" fontSize="20" fontWeight="black" textAnchor="middle" fontFamily="serif">IIMB</text>
    <text x="50" y="70" fill="#FFD700" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BANGALORE</text>
  </svg>
);

const AIIMSLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#0A369D" />
    <path d="M35 30 H65 V45 C65 58 50 72 50 72 C50 72 35 58 35 45 Z" fill="white" />
    <rect x="46" y="38" width="8" height="20" fill="#E74C3C" />
    <rect x="40" y="44" width="20" height="8" fill="#E74C3C" />
    <text x="50" y="88" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AIIMS DELHI</text>
  </svg>
);

const KRMULogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M25 20 L50 10 L75 20 L75 55 C75 75 50 90 50 90 C50 90 25 75 25 55 Z" fill="#005B94" />
    <path d="M30 24 L50 15 L70 24 L70 53 C70 70 50 83 50 83 C50 83 30 70 30 53 Z" fill="white" />
    <text x="50" y="65" fill="#005B94" fontSize="13" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">KRMU</text>
  </svg>
);

const GreatLakesLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#1B4D3E" />
    <path d="M25 50 C25 35 50 25 50 25 C50 25 75 35 75 50 C75 65 50 75 50 75 C50 75 25 65 25 50 Z" fill="white" opacity="0.2" />
    <circle cx="50" cy="50" r="16" fill="white" />
    <text x="50" y="55" fill="#1B4D3E" fontSize="14" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">GL</text>
    <text x="50" y="86" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GREAT LAKES</text>
  </svg>
);

const VydehiLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#E67E22" />
    <circle cx="50" cy="50" r="35" fill="white" />
    <path d="M50 28 L68 42 L60 68 L40 68 L32 42 Z" fill="#E67E22" opacity="0.3" />
    <text x="50" y="56" fill="#E67E22" fontSize="16" fontWeight="black" textAnchor="middle" fontFamily="serif">V</text>
    <text x="50" y="85" fill="#2C3E50" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">VYDEHI</text>
  </svg>
);

const JIMSLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="12" y="12" width="76" height="76" rx="6" fill="#0A2540" />
    <text x="50" y="54" fill="white" fontSize="24" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">JIMS</text>
    <text x="50" y="74" fill="#00D4B2" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ESTD 1993</text>
  </svg>
);

const AccurateLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="15" width="70" height="70" rx="10" fill="#2980B9" />
    <polygon points="50,25 65,40 55,40 55,65 45,65 45,40 35,40" fill="white" />
    <text x="50" y="80" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ACCURATE</text>
  </svg>
);

const AmityLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#F1C40F" />
    <circle cx="50" cy="50" r="35" fill="white" />
    <path d="M50 25 C65 25 65 45 50 45 C35 45 35 25 50 25 Z" fill="#F1C40F" opacity="0.5" />
    <text x="50" y="62" fill="#2C3E50" fontSize="16" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">AMITY</text>
  </svg>
);

const GLBajajLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M20 20 L50 5 L80 20 L80 60 C80 80 50 95 50 95 C50 95 20 80 20 60 Z" fill="#003566" />
    <path d="M25 24 L50 11 L75 24 L75 58 C75 75 50 88 50 88 C50 88 25 75 25 58 Z" fill="#FFD166" />
    <path d="M30 28 L50 17 L70 28 L70 56 C70 70 50 81 50 81 C50 81 30 70 30 56 Z" fill="#003566" />
    <text x="50" y="52" fill="#FFD166" fontSize="14" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">GLB</text>
  </svg>
);

const BennettLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="10" y="10" width="80" height="80" rx="8" fill="#A8201A" />
    <rect x="15" y="15" width="70" height="70" rx="5" fill="white" />
    <path d="M35 30 H55 C65 30 65 42 55 42 H35 Z" fill="#A8201A" />
    <path d="M35 42 H58 C68 42 68 55 58 55 H35 Z" fill="#A8201A" />
    <rect x="35" y="30" width="10" height="40" fill="#A8201A" />
    <circle cx="70" cy="30" r="4" fill="#FFC107" />
  </svg>
);

const LloydLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#2C3E50" />
    <circle cx="50" cy="50" r="35" fill="white" />
    <text x="50" y="58" fill="#2C3E50" fontSize="18" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">L</text>
    <text x="50" y="80" fill="#2980B9" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">LLOYD</text>
  </svg>
);

const MangalmayLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="12" y="12" width="76" height="76" rx="6" fill="#8E44AD" />
    <text x="50" y="54" fill="white" fontSize="24" fontWeight="black" textAnchor="middle" fontFamily="serif">M</text>
    <text x="50" y="74" fill="#F1C40F" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MIMT</text>
  </svg>
);

const ShardaLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M50 20 C60 40 85 45 50 85 C15 45 40 40 50 20 Z" fill="#0072CE" opacity="0.8" />
    <path d="M50 35 C65 50 90 55 50 85 C10 55 35 50 50 35 Z" fill="#EAAA00" opacity="0.8" />
    <path d="M50 50 C70 60 85 70 50 85 C15 70 30 60 50 50 Z" fill="#E31B23" opacity="0.8" />
    <text x="50" y="96" fill="#0072CE" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">SHARDA</text>
  </svg>
);

const renderLogo = (logoId: string, name: string) => {
  const container = (child: React.ReactNode) => (
    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
      {child}
    </div>
  );
  
  if (logoId.includes('kr-mangalam')) {
    return container(<KRMULogo />);
  }
  if (logoId.includes('amity')) {
    return container(<AmityLogo />);
  }

  const clean = name.replace(/,/g, '').replace(/University/gi, 'U').replace(/Greater Noida/gi, 'GN').replace(/Gurugram/gi, 'G').replace(/Bareilly/gi, 'B').replace(/Mathura/gi, 'M').replace(/Indore/gi, 'I').replace(/Bhopal/gi, 'B').replace(/Ujjain/gi, 'U').replace(/Durg/gi, 'D').replace(/Sikkim/gi, 'S').replace(/Tirupati/gi, 'T').replace(/Hyderabad/gi, 'H').replace(/Shimla/gi, 'S').replace(/Mohali/gi, 'M').replace(/Jaipur/gi, 'J').replace(/Guwahati/gi, 'G').replace(/Dehradun/gi, 'D').replace(/Uttarakhand/gi, 'U');
  const initials = clean
    .split(/\s+/)
    .map(w => w[0])
    .join('')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .substring(0, 4) || 'COL';

  return container(
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="12" y="12" width="76" height="76" rx="12" fill="#0A369D" />
      <text x="50" y="58" fill="white" fontSize="22" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">{initials}</text>
    </svg>
  );
};

interface CollegeCardProps {
  college: College;
}

export const CollegeCard = ({ college }: CollegeCardProps) => {
  const navigate = useNavigate();
  const addToast = useGlobalStore().addToast;
  const { saveCollege, unsaveCollege, isSaved } = useSavedCollegesStore();
  const { addToCompare, removeFromCompare, isComparing } = useCompareStore();

  const handleApplyClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(`/common-application?collegeId=${college.id}`);
  };

  const handleSaveToggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved(college.id)) {
      unsaveCollege(college.id);
    } else {
      saveCollege(college.id);
    }
  };

  const handleCompareToggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isComparing(college.id)) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college.id);
    }
  };

  const handleDownloadDetails = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Map courses safely
    const courseRows = (college.courses || []).map(c => `
      <tr>
        <td style="font-weight: 700; color: #1e293b; border-bottom: 1px solid #e5e7eb; padding: 0.75rem 1rem;">${c.name}</td>
        <td style="font-weight: 850; color: #ff5e14; border-bottom: 1px solid #e5e7eb; padding: 0.75rem 1rem;">${c.fees}</td>
        <td style="border-bottom: 1px solid #e5e7eb; padding: 0.75rem 1rem;">Pass in entrance/merit exams</td>
      </tr>
    `).join('');

    // Facilities listing
    const facilities = college.infrastructure || ['AC Classrooms', 'Central Library', 'Hostels', 'Sports Complex', 'Cafeteria', 'Wi-Fi Campus', 'Computer Lab', 'Seminar Hall'];
    const facilityItems = facilities.map(f => `
      <div class="facility-item" style="background-color: #f9fafb; padding: 0.75rem 1rem; border-radius: 10px; font-size: 0.85rem; font-weight: 700; border: 1px solid #f3f4f6; display: flex; align-items: center; gap: 8px;">
        <span style="color: #ff5e14;">✔</span> ${f}
      </div>
    `).join('');

    // Ratings category listing
    const ratingsSummary = `
      <div class="rating-card" style="background-color: #f9fafb; padding: 1rem; border-radius: 10px; border: 1px solid #f3f4f6; text-align: center;">
        <div class="rating-card-label" style="font-size: 0.75rem; font-weight: 700; color: #4b5563;">Academics</div>
        <div class="rating-card-value" style="font-size: 1.25rem; font-weight: 900; color: #ff5e14; margin-top: 0.25rem;">8.9/10</div>
      </div>
      <div class="rating-card" style="background-color: #f9fafb; padding: 1rem; border-radius: 10px; border: 1px solid #f3f4f6; text-align: center;">
        <div class="rating-card-label" style="font-size: 0.75rem; font-weight: 700; color: #4b5563;">Faculty</div>
        <div class="rating-card-value" style="font-size: 1.25rem; font-weight: 900; color: #ff5e14; margin-top: 0.25rem;">9.2/10</div>
      </div>
      <div class="rating-card" style="background-color: #f9fafb; padding: 1rem; border-radius: 10px; border: 1px solid #f3f4f6; text-align: center;">
        <div class="rating-card-label" style="font-size: 0.75rem; font-weight: 700; color: #4b5563;">Infrastructure</div>
        <div class="rating-card-value" style="font-size: 1.25rem; font-weight: 900; color: #ff5e14; margin-top: 0.25rem;">8.8/10</div>
      </div>
      <div class="rating-card" style="background-color: #f9fafb; padding: 1rem; border-radius: 10px; border: 1px solid #f3f4f6; text-align: center;">
        <div class="rating-card-label" style="font-size: 0.75rem; font-weight: 700; color: #4b5563;">Placements</div>
        <div class="rating-card-value" style="font-size: 1.25rem; font-weight: 900; color: #ff5e14; margin-top: 0.25rem;">9.0/10</div>
      </div>
    `;

    // Sidebar: Visited colleges list
    const visitedColleges = [
      { name: "DIT University, Dehradun", location: "Dehradun, Uttarakhand", rating: "8.1/10", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Avantika University, Ujjain", location: "Ujjain, Madhya Pradesh", rating: "8.4/10", img: "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Sushant University, Gurugram", location: "Gurugram, Haryana", rating: "8.0/10", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=100&h=100&q=80" }
    ];
    const visitedItems = visitedColleges.map(vc => `
      <a href="#" class="college-item" style="display: flex; align-items: center; gap: 10px; padding: 0.5rem; border-radius: 8px; text-decoration: none; color: inherit; transition: background-color 0.2s;">
        <img class="college-item-img" style="width: 45px; height: 45px; border-radius: 8px; object-fit: cover;" src="${vc.img}" alt="${vc.name}">
        <div style="text-align: left;">
          <h5 class="college-item-name" style="font-size: 0.8rem; font-weight: 800; color: #111827; margin: 0;">${vc.name}</h5>
          <p class="college-item-meta" style="font-size: 0.7rem; color: #6b7280; margin: 2px 0 0 0;">${vc.location} • ⭐ ${vc.rating}</p>
        </div>
      </a>
    `).join('');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${college.name} - Detailed Profile</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      color: #1f2937;
    }
    header {
      background-color: #001D3D;
      color: white;
      padding: 1.25rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .brand {
      font-size: 1.25rem;
      font-weight: 900;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .hero-banner {
      background-color: #ffffff;
      padding: 2.5rem 2rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .hero-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 2.5rem;
      align-items: center;
    }
    @media (max-width: 768px) {
      .hero-wrapper { flex-direction: column; align-items: flex-start; }
    }
    .hero-text {
      flex: 1;
      text-align: left;
    }
    .badge-rating {
      display: inline-flex;
      align-items: center;
      background-color: #ff5e141a;
      color: #ff5e14;
      padding: 0.35rem 0.85rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 800;
      margin-bottom: 0.75rem;
    }
    .hero-title {
      font-size: 1.75rem;
      font-weight: 850;
      margin: 0 0 0.5rem 0;
      color: #001D3D;
      line-height: 1.2;
    }
    .hero-location {
      color: #4b5563;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    .btn-apply {
      background-color: #ff5e14;
      color: white;
      border: none;
      padding: 0.75rem 2.25rem;
      border-radius: 10px;
      font-weight: 800;
      font-size: 0.9rem;
      cursor: pointer;
      text-transform: uppercase;
      box-shadow: 0 4px 10px #ff5e1433;
      transition: background-color 0.2s;
    }
    .btn-apply:hover {
      background-color: #d14b00;
    }
    .hero-img-box {
      width: 400px;
      height: 220px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }
    @media (max-width: 768px) {
      .hero-img-box { width: 100%; }
    }
    .hero-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .tabs {
      background-color: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .tabs-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 1.5rem;
      padding: 0 2rem;
      overflow-x: auto;
    }
    .tab-link {
      padding: 1.25rem 0.5rem;
      color: #4b5563;
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      border-bottom: 3px solid transparent;
      white-space: nowrap;
    }
    .tab-link.active {
      color: #ff5e14;
      border-bottom-color: #ff5e14;
    }
    .main-grid {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 2.2fr 1fr;
      gap: 2rem;
    }
    @media (max-width: 1024px) {
      .main-grid { grid-template-columns: 1fr; }
    }
    .content-area {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      text-align: left;
    }
    .card-panel {
      background-color: #ffffff;
      border-radius: 16px;
      padding: 2rem;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
    }
    .panel-title {
      font-size: 1.15rem;
      font-weight: 850;
      color: #001D3D;
      margin: 0 0 1.25rem 0;
      border-bottom: 2px solid #f3f4f6;
      padding-bottom: 0.5rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
      font-size: 0.9rem;
    }
    th {
      background-color: #f9fafb;
      font-weight: 800;
      color: #374151;
    }
    .facility-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 0.85rem;
    }
    .ratings-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 1rem;
    }
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      text-align: left;
    }
    .sidebar-widget {
      background-color: #ffffff;
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid #e5e7eb;
    }
    .widget-title {
      font-size: 1rem;
      font-weight: 850;
      color: #001D3D;
      margin: 0 0 1rem 0;
    }
    .college-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">Aruna-Nand EdTech</div>
    <div style="font-size: 0.75rem; font-weight: bold; opacity: 0.8;">OFFLINE PROFILE SHEET</div>
  </header>

  <div class="hero-banner">
    <div class="hero-wrapper">
      <div class="hero-text">
        <div class="badge-rating">★ ${college.rating} CM Rating</div>
        <h1 class="hero-title">${college.name}</h1>
        <div class="hero-location">📍 ${college.location} • Private Institution</div>
        <button class="btn-apply" onclick="alert('Offline Application Logged! counselor will contact you.')">Apply Now</button>
      </div>
      <div class="hero-img-box">
        <img src="${college.image}" alt="${college.name} Campus">
      </div>
    </div>
  </div>

  <div class="tabs">
    <div class="tabs-wrapper">
      <a href="#" class="tab-link active">Info</a>
      <a href="#" class="tab-link">Courses & Fees</a>
      <a href="#" class="tab-link">Admission 2026</a>
      <a href="#" class="tab-link">Placements</a>
      <a href="#" class="tab-link">Review</a>
      <a href="#" class="tab-link">Gallery</a>
      <a href="#" class="tab-link">Scholarship</a>
      <a href="#" class="tab-link">Hostel</a>
    </div>
  </div>

  <div class="main-grid">
    <div class="content-area">
      <div class="card-panel">
        <h3 class="panel-title">About College</h3>
        <p style="font-size: 0.9rem; line-height: 1.6; color: #4b5563; margin: 0;">
          ${college.about || (college.name + ' is a premier college known for academic excellence, state-of-the-art facilities, and stellar placements.')}
        </p>
      </div>

      <div class="card-panel">
        <h3 class="panel-title">Courses & Fees</h3>
        <table>
          <thead>
            <tr>
              <th style="border-bottom: 2px solid #e5e7eb; padding: 0.75rem 1rem;">Course</th>
              <th style="border-bottom: 2px solid #e5e7eb; padding: 0.75rem 1rem;">1st Year Fees</th>
              <th style="border-bottom: 2px solid #e5e7eb; padding: 0.75rem 1rem;">Eligibility</th>
            </tr>
          </thead>
          <tbody>
            ${courseRows}
          </tbody>
        </table>
      </div>

      <div class="card-panel">
        <h3 class="panel-title">Facilities</h3>
        <div class="facility-grid">
          ${facilityItems}
        </div>
      </div>

      <div class="card-panel">
        <h3 class="panel-title">Ratings & Reviews</h3>
        <div class="ratings-summary">
          ${ratingsSummary}
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-widget">
        <h4 class="widget-title">Apply Offline</h4>
        <p style="font-size: 0.8rem; color: #6b7280; margin: 0 0 1rem 0;">Request a counselor to call you back for this university.</p>
        <button class="btn-apply" style="width: 100%;" onclick="alert('Offline callback registered!')">Request counselor</button>
      </div>

      <div class="sidebar-widget">
        <h4 class="widget-title">Students Also Visited</h4>
        <div class="college-list">
          ${visitedItems}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Trigger local HTML file download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const slugName = college.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    link.href = url;
    link.download = `${slugName}.html`;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast(`Downloaded college details: ${college.name}`, 'success');
  };

  // Extract numeric packages for display dynamically
  const getHighestPackage = () => {
    if (college.placementDetails && college.placementDetails.length > 0) {
      const pkgs = college.placementDetails.map(p => p.package);
      let maxPkgStr = '';
      let maxVal = 0;
      pkgs.forEach(pkgStr => {
        const num = parseFloat(pkgStr.replace(/[^0-9.]/g, ''));
        if (num > maxVal) {
          maxVal = num;
          maxPkgStr = pkgStr;
        }
      });
      if (maxPkgStr) return maxPkgStr;
    }
    if (college.id === 'mohan-babu-university-tirupati') return '44.0 LPA';
    if (college.id === 'dit-university-dehradun') return '38.0 LPA';
    if (college.id === 'amity-university-mohali') return '38.0 LPA';
    if (college.id === 'iilm-university-greater-noida') return '36.0 LPA';
    if (college.id === 'kr-mangalam-university') return '36.0 LPA';
    return '12.0 LPA';
  };
  const highestPkg = getHighestPackage();
  const averagePkg = college.placements.split(' ')[0] || '10.0 LPA';

  return (
    <div className="bg-white dark:bg-app-card border border-slate-150 dark:border-app-border rounded-2xl overflow-hidden flex flex-col group h-full hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative text-left">
      
      {/* Yellow Admission open banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-slate-900 text-[10px] font-black py-1.5 px-3 flex flex-wrap items-center justify-between gap-1 leading-none shadow-inner select-none">
        <span className="uppercase tracking-wider">MBA Admission Open</span>
        <span className="bg-app-bg/10 px-1.5 py-0.5 rounded font-bold text-[9px]">Batch 2026</span>
        <div className="flex items-center gap-1.5 font-bold">
          <span>{highestPkg} <span className="font-normal opacity-90">Highest</span></span>
          <span className="opacity-40">|</span>
          <span>600+ <span className="font-normal opacity-90">Recruiters</span></span>
          <span className="opacity-40">|</span>
          <span>{averagePkg} <span className="font-normal opacity-90">Avg</span></span>
        </div>
      </div>

      {/* Cover Image & Rating Badge */}
      <div className="relative h-48 overflow-hidden">
        {/* Save Toggle Overlay */}
        <button
          onClick={handleSaveToggle}
          className={`absolute top-3 left-3 z-30 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isSaved(college.id)
              ? 'bg-rose-500/90 border-rose-400 text-white shadow-lg shadow-rose-500/30'
              : 'bg-slate-900/60 border-app-border text-white/90 hover:bg-slate-900/80 hover:text-white'
          } cursor-pointer`}
          title={isSaved(college.id) ? "Unsave College" : "Save College"}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved(college.id) ? 'fill-current text-white' : ''}`} />
        </button>

        {/* Compare Toggle Overlay */}
        <button
          onClick={handleCompareToggle}
          className={`absolute top-3 left-12 z-30 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isComparing(college.id)
              ? 'bg-primary border-primary-hover text-white shadow-lg shadow-primary/30'
              : 'bg-slate-900/60 border-app-border text-white/90 hover:bg-slate-900/80 hover:text-white'
          } cursor-pointer`}
          title={isComparing(college.id) ? "Remove from Compare" : "Add to Compare"}
        >
          <GitCompare className="w-3.5 h-3.5" />
        </button>

        <Link to={`/colleges/${college.id}`} className="block h-full w-full">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </Link>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-app-border text-xs font-semibold text-white">
          <Star className="w-3.5 h-3.5 text-warning fill-warning" />
          <span>{college.rating} CM Rating</span>
        </div>
        
        {/* Overlapping logo container */}
        <div className="absolute -bottom-7 left-5 z-20">
          {renderLogo(college.logo || college.id, college.name)}
        </div>
      </div>
 
      {/* Info & Metrics */}
      <div className="p-5 pt-9 flex-1 flex flex-col gap-4">
        <div>
          <Link to={`/colleges/${college.id}`} className="block hover:no-underline text-left">
            <div className="flex items-center gap-1 text-[10px] font-black text-[#FF5E14] uppercase tracking-wider mb-1">
              <span className="bg-[#FF5E14]/10 px-2 py-0.5 rounded">
                {college.ranking.split(' in ')[0] || '#1 in India'}
              </span>
            </div>
            
            <h3 className="font-display font-extrabold text-base text-slate-850 dark:text-white leading-tight group-hover:text-[#FF5E14] transition-colors duration-300 line-clamp-1" title={college.name}>
              {college.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-1 text-left">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{college.location}</span>
          </div>
        </div>

        {/* High vs Avg Placement Stat box */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 dark:bg-app-card rounded-xl border border-slate-100 dark:border-app-border text-xs">
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Highest Package</span>
            <span className="text-[#FF5E14] font-black text-xs sm:text-sm mt-0.5">{highestPkg}</span>
          </div>
          <div className="flex flex-col text-left border-l border-slate-200 dark:border-app-border pl-3">
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Average Package</span>
            <span className="text-slate-800 dark:text-slate-200 font-extrabold text-xs sm:text-sm mt-0.5">{averagePkg}</span>
          </div>
        </div>

        {/* Detailed Course fee list rows */}
        <ul className="flex flex-col gap-1.5 border-t border-slate-100 dark:border-app-border pt-3 mb-2 text-[11px] text-slate-500 dark:text-slate-400">
          {college.courses.slice(0, 2).map((course, i) => (
            <li key={i} className="flex justify-between items-center text-left">
              <span className="font-semibold truncate max-w-[140px]" title={course.name}>
                {course.name.split(' in ')[1] || course.name.split(' (')[0] || course.name}
              </span>
              <span className="font-extrabold text-slate-850 dark:text-slate-200 whitespace-nowrap">
                {course.fees} <span className="font-normal text-slate-400 dark:text-slate-500">(1st Yr Fees)</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Button Actions */}
        <div className="mt-auto pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={handleApplyClick}
            className="py-2.5 rounded-lg bg-[#FF5E14] hover:bg-[#D14B00] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-[#FF5E14]/15 active:scale-95 transition-all border-none cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Apply Now</span>
          </button>
          
          <button
            onClick={handleDownloadDetails}
            className="py-2.5 rounded-lg border border-slate-250 dark:border-app-border hover:border-slate-350 hover:bg-slate-50 dark:hover:bg-app-card text-center text-xs font-bold text-slate-700 dark:text-slate-200 transition-all active:scale-95 bg-transparent flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>College Details</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default CollegeCard;
