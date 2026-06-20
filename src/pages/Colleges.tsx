import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RefreshCw, ChevronDown, Award, DollarSign, Briefcase, Search, Sparkles } from 'lucide-react';
import { CollegeCard } from '../components/cards/CollegeCard';
import { useColleges } from '../hooks/useColleges';
import { ScrollReveal } from '../components/animations/ScrollReveal';

// ── Comprehensive Static Fallback Colleges ────────────────────────────────────
// Used when the API / backend returns no data, ensuring Popular Searches always show results.
export const STATIC_COLLEGES: any[] = [
  // ── MANAGEMENT / MBA ──────────────────────────────────────────────────────
  { id: 'symbiosis-pune', name: 'Symbiosis Institute of Business Management (SIBM), Pune', location: 'Pune, Maharashtra', rating: 8.8, fees: '₹23.5 Lakhs / Year', placements: '26.77 LPA Average', ranking: '#8 in India (NIRF MBA)', logo: 'symbiosis-pune', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'SIBM Pune is a premier B-school of India.', courses: [{ name: 'MBA', fees: '₹11.75 Lakhs', seats: 180 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'iim-bangalore', name: 'Indian Institute of Management, Bangalore', location: 'Bangalore, Karnataka', rating: 9.2, fees: '₹23.0 Lakhs / Year', placements: '34 LPA Average', ranking: '#2 in India (NIRF MBA)', logo: 'iim-bangalore', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'IIM Bangalore is a top management school.', courses: [{ name: 'MBA (PGP)', fees: '₹11.5 Lakhs', seats: 480 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'mdi-gurgaon', name: 'Management Development Institute (MDI), Gurgaon', location: 'Gurgaon, Haryana', rating: 8.7, fees: '₹24.9 Lakhs / Year', placements: '26.6 LPA Average', ranking: '#10 in India (NIRF MBA)', logo: 'mdi-gurgaon', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'MDI is a leading B-School in Delhi NCR.', courses: [{ name: 'PGPM', fees: '₹12.45 Lakhs', seats: 240 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'xlri-jamshedpur', name: 'Xavier School of Management (XLRI), Jamshedpur', location: 'Jamshedpur, Jharkhand', rating: 8.9, fees: '₹25.0 Lakhs / Year', placements: '32.7 LPA Average', ranking: '#5 in India (NIRF MBA)', logo: 'xlri-jamshedpur', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'XLRI is among the oldest B-Schools in India.', courses: [{ name: 'PGDM (BM)', fees: '₹12.5 Lakhs', seats: 180 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'fms-delhi', name: 'Faculty of Management Studies (FMS), Delhi University', location: 'Delhi, Delhi', rating: 8.9, fees: '₹2.0 Lakhs / Year', placements: '32.4 LPA Average', ranking: '#6 in India (NIRF MBA)', logo: 'fms-delhi', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'FMS Delhi offers one of the most affordable MBA programs.', courses: [{ name: 'MBA', fees: '₹1.0 Lakhs', seats: 220 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'iim-ahmedabad', name: 'Indian Institute of Management (IIM), Ahmedabad', location: 'Ahmedabad, Gujarat', rating: 9.1, fees: '₹25.0 Lakhs / Year', placements: '34.8 LPA Average', ranking: '#1 in India (NIRF MBA)', logo: 'iim-ahmedabad', image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'IIM Ahmedabad is the top management school in India.', courses: [{ name: 'PGP', fees: '₹12.5 Lakhs', seats: 400 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'dms-iit-delhi', name: 'Department of Management Studies (DMS), IIT Delhi', location: 'Delhi, Delhi', rating: 8.7, fees: '₹10.4 Lakhs / Year', placements: '25.8 LPA Average', ranking: '#4 in India (NIRF MBA)', logo: 'dms-iit-delhi', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'DMS IIT Delhi blends technology with management.', courses: [{ name: 'MBA', fees: '₹5.2 Lakhs', seats: 150 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'jlu-bhopal', name: 'Jagran Lakecity University (JLU), Bhopal', location: 'Bhopal, Madhya Pradesh', rating: 8.0, fees: '₹1.6 Lakhs / Year', placements: '4.5 LPA Average', ranking: '#45 in India (NIRF MBA)', logo: 'jlu-bhopal', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'JLU Bhopal is a progressive university in Madhya Pradesh.', courses: [{ name: 'MBA', fees: '₹1.6 Lakhs', seats: 120 }, { name: 'BBA', fees: '₹1.2 Lakhs', seats: 90 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'amity-university-noida', name: 'Amity University, Noida', location: 'Noida, Uttar Pradesh', rating: 8.5, fees: '₹4.8 Lakhs / Year', placements: '8.5 LPA Average', ranking: '#18 in India', logo: 'amity-university', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Amity University is a leading private university in India.', courses: [{ name: 'MBA', fees: '₹4.8 Lakhs', seats: 240 }, { name: 'BBA', fees: '₹3.2 Lakhs', seats: 180 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'chandigarh-university', name: 'Chandigarh University (CU), Mohali', location: 'Mohali, Punjab', rating: 8.1, fees: '₹1.8 Lakhs / Year', placements: '8.0 LPA Average', ranking: '#25 in India', logo: 'chandigarh-university', image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Chandigarh University is a NAAC A+ accredited institution.', courses: [{ name: 'MBA', fees: '₹1.8 Lakhs', seats: 300 }, { name: 'BBA', fees: '₹1.2 Lakhs', seats: 240 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'sharda-university', name: 'Sharda University, Greater Noida', location: 'Noida, Uttar Pradesh', rating: 8.7, fees: '₹2.2 Lakhs / Year', placements: '7.0 LPA Average', ranking: '#30 in India', logo: 'sharda-university', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Sharda University is a prominent university in NCR.', courses: [{ name: 'MBA', fees: '₹2.2 Lakhs', seats: 200 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'lpu-punjab', name: 'Lovely Professional University', location: 'Jalandhar, Punjab', rating: 8.2, fees: '₹2.4 Lakhs / Year', placements: '8.2 LPA Average', ranking: '#35 in India', logo: 'lpu-punjab', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'LPU is one of the largest private universities in India.', courses: [{ name: 'MBA', fees: '₹2.4 Lakhs', seats: 400 }, { name: 'BBA', fees: '₹1.5 Lakhs', seats: 300 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'vidyashilp-university', name: 'Vidyashilp University (VU), Bangalore', location: 'Bangalore, Karnataka', rating: 8.8, fees: '₹5.13 Lakhs / Year', placements: '8.5 LPA Average', ranking: '#22 in India', logo: 'vidyashilp-university', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Vidyashilp University is a new-age university in Bangalore.', courses: [{ name: 'MBA', fees: '₹5.13 Lakhs', seats: 120 }, { name: 'BBA', fees: '₹3.5 Lakhs', seats: 90 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'alliance-university', name: 'Alliance University Bangalore', location: 'Bangalore, Karnataka', rating: 8.0, fees: '₹15.0 Lakhs / Year', placements: '8.5 LPA Average', ranking: '#28 in India', logo: 'alliance-university', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Alliance University offers world-class management education.', courses: [{ name: 'MBA', fees: '₹7.5 Lakhs', seats: 180 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'bennett-university', name: 'Bennett University, Greater Noida', location: 'Greater Noida, Uttar Pradesh', rating: 8.7, fees: '₹3.8 Lakhs / Year', placements: '9.5 LPA Average', ranking: '#20 in India', logo: 'bennett-university', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Bennett University backed by The Times of India Group.', courses: [{ name: 'MBA', fees: '₹3.8 Lakhs', seats: 150 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'sage-university', name: 'SAGE University Indore', location: 'Indore, Madhya Pradesh', rating: 9.0, fees: '₹1.5 Lakhs / Year', placements: '5.1 LPA Average', ranking: '#48 in India', logo: 'sage-university', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'SAGE University is a top private university in Indore.', courses: [{ name: 'MBA', fees: '₹1.5 Lakhs', seats: 120 }, { name: 'BBA', fees: '₹1.0 Lakhs', seats: 90 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'pimpri-chinchwad-university', name: 'Pimpri Chinchwad University (PCU)', location: 'Pune, Maharashtra', rating: 9.1, fees: '₹2.6 Lakhs / Year', placements: '8.0 LPA Average', ranking: '#40 in India', logo: 'pimpri-chinchwad-university', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'PCU offers industry-integrated management programs.', courses: [{ name: 'MBA', fees: '₹2.6 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Mumbai
  { id: 'amity-university-mumbai', name: 'Amity University Mumbai', location: 'Mumbai, Maharashtra', rating: 8.9, fees: '₹3.5 Lakhs / Year', placements: '7.8 LPA Average', ranking: '#19 in India', logo: 'amity-university', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Amity University Mumbai provides quality management education.', courses: [{ name: 'MBA', fees: '₹3.5 Lakhs', seats: 180 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Bhopal
  { id: 'rkdf-university', name: 'RKDF University, Bhopal', location: 'Bhopal, Madhya Pradesh', rating: 7.8, fees: '₹1.2 Lakhs / Year', placements: '4.0 LPA Average', ranking: '#65 in India', logo: 'rkdf-university', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'RKDF University is a leading institution in Bhopal.', courses: [{ name: 'MBA', fees: '₹1.2 Lakhs', seats: 90 }, { name: 'BBA', fees: '₹0.8 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'mandsaur-university', name: 'Mandsaur University, Mandsaur', location: 'Bhopal, Madhya Pradesh', rating: 7.6, fees: '₹0.9 Lakhs / Year', placements: '3.5 LPA Average', ranking: '#80 in India', logo: 'mandsaur-university', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Mandsaur University offers affordable management programs.', courses: [{ name: 'MBA', fees: '₹0.9 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Jaipur
  { id: 'poddar-college', name: 'Poddar International College, Jaipur', location: 'Jaipur, Rajasthan', rating: 9.2, fees: '₹1.2 Lakhs / Year', placements: '5.8 LPA Average', ranking: '#42 in India', logo: 'poddar-college', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Poddar College is a top management institution in Jaipur.', courses: [{ name: 'BBA', fees: '₹1.2 Lakhs', seats: 120 }, { name: 'MBA', fees: '₹1.5 Lakhs', seats: 80 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Hyderabad
  { id: 'icfai-hyderabad', name: 'ICFAI Business School (IBS), Hyderabad', location: 'Hyderabad, Telangana', rating: 8.5, fees: '₹5.5 Lakhs / Year', placements: '8.0 LPA Average', ranking: '#15 in India', logo: 'icfai-hyderabad', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'IBS Hyderabad is a top private business school.', courses: [{ name: 'MBA', fees: '₹5.5 Lakhs', seats: 200 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Chennai
  { id: 'great-lakes-chennai', name: 'Great Lakes Institute of Management, Chennai', location: 'Chennai, Tamil Nadu', rating: 8.6, fees: '₹12.5 Lakhs / Year', placements: '14.2 LPA Average', ranking: '#16 in India', logo: 'great-lakes', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Great Lakes Chennai offers PGPM for working professionals.', courses: [{ name: 'PGPM', fees: '₹12.5 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Lucknow
  { id: 'iim-lucknow', name: 'Indian Institute of Management (IIM), Lucknow', location: 'Lucknow, Uttar Pradesh', rating: 9.0, fees: '₹19.25 Lakhs / Year', placements: '30.8 LPA Average', ranking: '#3 in India (NIRF MBA)', logo: 'iim-lucknow', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'IIM Lucknow is among the top IIMs in India.', courses: [{ name: 'PGP', fees: '₹9.625 Lakhs', seats: 370 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Kolkata
  { id: 'iim-calcutta', name: 'Indian Institute of Management (IIM), Calcutta', location: 'Kolkata, West Bengal', rating: 9.0, fees: '₹27.0 Lakhs / Year', placements: '35.1 LPA Average', ranking: '#2 in India (NIRF MBA)', logo: 'iim-calcutta', image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'IIM Calcutta is one of the oldest IIMs in India.', courses: [{ name: 'PGDM', fees: '₹13.5 Lakhs', seats: 460 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },

  // ── ENGINEERING / B.TECH ──────────────────────────────────────────────────
  { id: 'gl-bajaj', name: 'GL Bajaj Institute of Technology and Management', location: 'Greater Noida, Uttar Pradesh', rating: 7.8, fees: '₹6.6 Lakhs / Year', placements: '28.83 LPA Average', ranking: '#55 in India (NIRF Engineering)', logo: 'gl-bajaj', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'GL Bajaj is a top private engineering college in NCR.', courses: [{ name: 'B.Tech in Computer Science', fees: '₹6.6 Lakhs', seats: 240 }, { name: 'B.Tech in Electronics', fees: '₹6.6 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'graphic-era', name: 'Graphic Era (Deemed To Be University)', location: 'Dehradun, Uttarakhand', rating: 8.4, fees: '₹2.5 Lakhs / Year', placements: '7.2 LPA Average', ranking: '#38 in India', logo: 'graphic-era', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'Graphic Era University is NAAC A+ accredited.', courses: [{ name: 'B.Tech in CSE', fees: '₹2.5 Lakhs', seats: 300 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'mit-pune', name: 'MIT World Peace University (MIT-WPU), Pune', location: 'Pune, Maharashtra', rating: 8.5, fees: '₹2.2 Lakhs / Year', placements: '6.5 LPA Average', ranking: '#42 in India (Engineering)', logo: 'mit-wpu', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'MIT-WPU Pune is a leading tech university in Maharashtra.', courses: [{ name: 'B.Tech in CSE', fees: '₹2.2 Lakhs', seats: 360 }, { name: 'B.Tech in AI & ML', fees: '₹2.4 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'vit-vellore', name: 'VIT University, Vellore', location: 'Vellore, Tamil Nadu', rating: 8.8, fees: '₹2.0 Lakhs / Year', placements: '9.5 LPA Average', ranking: '#12 in India (Engineering)', logo: 'vit-vellore', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'VIT Vellore is consistently ranked among the top engineering universities.', courses: [{ name: 'B.Tech in CSE', fees: '₹2.0 Lakhs', seats: 800 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'manipal-university', name: 'Manipal Institute of Technology (MIT), Manipal', location: 'Manipal, Karnataka', rating: 8.5, fees: '₹2.7 Lakhs / Year', placements: '8.5 LPA Average', ranking: '#20 in India (Engineering)', logo: 'manipal-university', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'MIT Manipal is a top private engineering institution.', courses: [{ name: 'B.Tech in CSE', fees: '₹2.7 Lakhs', seats: 600 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'srm-chennai', name: 'SRM Institute of Science and Technology, Chennai', location: 'Chennai, Tamil Nadu', rating: 8.3, fees: '₹2.5 Lakhs / Year', placements: '7.2 LPA Average', ranking: '#28 in India (Engineering)', logo: 'srm-chennai', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'SRM Chennai is a top private engineering university.', courses: [{ name: 'B.Tech in CSE', fees: '₹2.5 Lakhs', seats: 600 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'thapar-patiala', name: 'Thapar Institute of Engineering & Technology, Patiala', location: 'Patiala, Punjab', rating: 8.6, fees: '₹2.2 Lakhs / Year', placements: '9.0 LPA Average', ranking: '#18 in India (Engineering)', logo: 'thapar-patiala', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'Thapar University is a top private engineering institute.', courses: [{ name: 'B.Tech in CSE', fees: '₹2.2 Lakhs', seats: 300 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'dtu-delhi', name: 'Delhi Technological University (DTU)', location: 'Delhi, Delhi', rating: 8.7, fees: '₹1.6 Lakhs / Year', placements: '12.0 LPA Average', ranking: '#30 in India (Engineering)', logo: 'dtu-delhi', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'DTU is one of the top state engineering universities in Delhi.', courses: [{ name: 'B.Tech in CSE', fees: '₹1.6 Lakhs', seats: 240 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'iiit-hyderabad', name: 'International Institute of Information Technology, Hyderabad', location: 'Hyderabad, Telangana', rating: 9.0, fees: '₹3.0 Lakhs / Year', placements: '18.5 LPA Average', ranking: '#15 in India (Engineering)', logo: 'iiit-hyderabad', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'IIIT Hyderabad is a top research university in India.', courses: [{ name: 'B.Tech in CSE', fees: '₹3.0 Lakhs', seats: 200 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'pune-institute', name: 'Pune Institute of Computer Technology (PICT)', location: 'Pune, Maharashtra', rating: 8.4, fees: '₹1.5 Lakhs / Year', placements: '7.5 LPA Average', ranking: '#50 in India (Engineering)', logo: 'pune-institute', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'PICT Pune is a leading autonomous engineering college.', courses: [{ name: 'B.Tech in CSE', fees: '₹1.5 Lakhs', seats: 240 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'kiet-university', name: 'KIET Deemed University', location: 'Ghaziabad, Uttar Pradesh', rating: 8.9, fees: '₹1.4 Lakhs / Year', placements: '7.2 LPA Average', ranking: '#45 in India (Engineering)', logo: 'kiet-university', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'KIET is an NAAC A+ accredited engineering institute.', courses: [{ name: 'B.Tech in CSE', fees: '₹1.4 Lakhs', seats: 300 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'nmims-mumbai', name: 'NMIMS University, Mumbai', location: 'Mumbai, Maharashtra', rating: 8.9, fees: '₹4.5 Lakhs / Year', placements: '9.5 LPA Average', ranking: '#10 in India (Engineering)', logo: 'nmims-mumbai', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'NMIMS Mumbai offers premier technology programs.', courses: [{ name: 'B.Tech in CSE', fees: '₹4.5 Lakhs', seats: 180 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'iiit-bangalore', name: 'International Institute of Information Technology, Bangalore', location: 'Bangalore, Karnataka', rating: 8.8, fees: '₹2.6 Lakhs / Year', placements: '14.0 LPA Average', ranking: '#22 in India (Engineering)', logo: 'iiit-bangalore', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'IIIT Bangalore is a premier tech institute.', courses: [{ name: 'B.Tech in CSE', fees: '₹2.6 Lakhs', seats: 200 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Rajkot
  { id: 'marwadi-university', name: 'Marwadi University, Rajkot', location: 'Rajkot, Gujarat', rating: 8.2, fees: '₹1.3 Lakhs / Year', placements: '4.5 LPA Average', ranking: '#58 in India', logo: 'marwadi-university', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'Marwadi University is a top private university in Gujarat.', courses: [{ name: 'B.Tech in CSE', fees: '₹1.3 Lakhs', seats: 200 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Surat
  { id: 'svnit-surat', name: 'Sardar Vallabhbhai National Institute of Technology, Surat', location: 'Surat, Gujarat', rating: 8.6, fees: '₹0.7 Lakhs / Year', placements: '10.5 LPA Average', ranking: '#35 in India (Engineering)', logo: 'svnit-surat', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'SVNIT Surat is an NIT with excellent placements.', courses: [{ name: 'B.Tech in CSE', fees: '₹0.7 Lakhs', seats: 150 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Nagpur
  { id: 'vnit-nagpur', name: 'Visvesvaraya National Institute of Technology, Nagpur', location: 'Nagpur, Maharashtra', rating: 8.5, fees: '₹0.6 Lakhs / Year', placements: '9.5 LPA Average', ranking: '#36 in India (Engineering)', logo: 'vnit-nagpur', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'VNIT Nagpur is an NIT in Maharashtra.', courses: [{ name: 'B.Tech in CSE', fees: '₹0.6 Lakhs', seats: 150 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Indore
  { id: 'iit-indore', name: 'Indian Institute of Technology (IIT), Indore', location: 'Indore, Madhya Pradesh', rating: 9.0, fees: '₹1.0 Lakhs / Year', placements: '18.0 LPA Average', ranking: '#13 in India (Engineering)', logo: 'iit-indore', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'IIT Indore is a premier engineering institution.', courses: [{ name: 'B.Tech in CSE', fees: '₹1.0 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'iet-davv', name: 'IET-DAVV, Indore', location: 'Indore, Madhya Pradesh', rating: 8.2, fees: '₹0.8 Lakhs / Year', placements: '5.5 LPA Average', ranking: '#52 in India (Engineering)', logo: 'iet-davv', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'IET DAVV is a reputed public engineering college in Indore.', courses: [{ name: 'B.Tech in CSE', fees: '₹0.8 Lakhs', seats: 180 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },

  // ── LAW ────────────────────────────────────────────────────────────────────
  { id: 'nlsiu-bangalore', name: 'National Law School of India University (NLSIU)', location: 'Bangalore, Karnataka', rating: 9.5, fees: '₹2.4 Lakhs / Year', placements: '18.0 LPA Average', ranking: '#1 in India (Law)', logo: 'nlsiu-bangalore', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'NLSIU is the top National Law University in India.', courses: [{ name: 'B.A. LL.B (Hons)', fees: '₹2.4 Lakhs', seats: 80 }, { name: 'LL.M', fees: '₹1.5 Lakhs', seats: 40 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'nalsar-hyderabad', name: 'NALSAR University of Law, Hyderabad', location: 'Hyderabad, Telangana', rating: 9.2, fees: '₹2.5 Lakhs / Year', placements: '16.0 LPA Average', ranking: '#2 in India (Law)', logo: 'nalsar-hyderabad', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'NALSAR Hyderabad is the second top NLU in India.', courses: [{ name: 'B.A. LL.B (Hons)', fees: '₹2.5 Lakhs', seats: 80 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'iit-law-mumbai', name: 'Government Law College, Mumbai', location: 'Mumbai, Maharashtra', rating: 8.8, fees: '₹0.15 Lakhs / Year', placements: '12.0 LPA Average', ranking: '#6 in India (Law)', logo: 'glc-mumbai', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'GLC Mumbai is one of the oldest and most prestigious law colleges.', courses: [{ name: 'LL.B', fees: '₹0.15 Lakhs', seats: 240 }, { name: 'LL.M', fees: '₹0.25 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'nlu-delhi', name: 'National Law University, Delhi', location: 'Delhi, Delhi', rating: 9.3, fees: '₹2.0 Lakhs / Year', placements: '20.0 LPA Average', ranking: '#3 in India (Law)', logo: 'nlu-delhi', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'NLU Delhi is one of the top NLUs with excellent placement.', courses: [{ name: 'B.A. LL.B (Hons)', fees: '₹2.0 Lakhs', seats: 70 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'nlu-jodhpur', name: 'National Law University, Jodhpur', location: 'Jaipur, Rajasthan', rating: 9.0, fees: '₹2.2 Lakhs / Year', placements: '14.0 LPA Average', ranking: '#5 in India (Law)', logo: 'nlu-jodhpur', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'NLU Jodhpur is a top NLU in Rajasthan.', courses: [{ name: 'B.A. LL.B (Hons)', fees: '₹2.2 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'symbiosis-law-pune', name: 'Symbiosis Law School (SLS), Pune', location: 'Pune, Maharashtra', rating: 8.7, fees: '₹3.5 Lakhs / Year', placements: '10.0 LPA Average', ranking: '#8 in India (Law)', logo: 'symbiosis-law-pune', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'SLS Pune is a top private law school in India.', courses: [{ name: 'B.A. LL.B (Hons)', fees: '₹3.5 Lakhs', seats: 120 }, { name: 'LL.M', fees: '₹2.0 Lakhs', seats: 40 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'iil-indore', name: 'Indore Institute of Law (IIL)', location: 'Indore, Madhya Pradesh', rating: 8.1, fees: '₹0.61 Lakhs / Year', placements: '4.0 LPA Average', ranking: '#20 in India (Law)', logo: 'iil-indore', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'IIL Indore offers quality legal education in Madhya Pradesh.', courses: [{ name: 'B.A. LL.B', fees: '₹0.61 Lakhs', seats: 240 }, { name: 'LL.B (Hons)', fees: '₹0.61 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'renaissance-law', name: 'Renaissance University (RU), Indore', location: 'Indore, Madhya Pradesh', rating: 8.8, fees: '₹0.40 Lakhs / Year', placements: '9.0 LPA Average', ranking: '#18 in India (Law)', logo: 'renaissance-law', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'RU Indore offers law and management programs in MP.', courses: [{ name: 'B.A. LL.B', fees: '₹0.40 Lakhs', seats: 180 }, { name: 'BBA', fees: '₹1.0 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'chanakya-law-pune', name: 'Chanakya National Law University, Pune', location: 'Pune, Maharashtra', rating: 8.3, fees: '₹1.2 Lakhs / Year', placements: '6.5 LPA Average', ranking: '#12 in India (Law)', logo: 'chanakya-law-pune', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'CNLU Pune offers integrated and standalone law programs.', courses: [{ name: 'B.A. LL.B (Hons)', fees: '₹1.2 Lakhs', seats: 80 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Kolkata
  { id: 'nujs-kolkata', name: 'National University of Juridical Sciences (NUJS), Kolkata', location: 'Kolkata, West Bengal', rating: 9.1, fees: '₹2.0 Lakhs / Year', placements: '15.0 LPA Average', ranking: '#4 in India (Law)', logo: 'nujs-kolkata', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'NUJS Kolkata is a top NLU in eastern India.', courses: [{ name: 'B.A. LL.B (Hons)', fees: '₹2.0 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Lucknow
  { id: 'rmlnlu-lucknow', name: 'Ram Manohar Lohiya National Law University, Lucknow', location: 'Lucknow, Uttar Pradesh', rating: 8.9, fees: '₹1.8 Lakhs / Year', placements: '12.0 LPA Average', ranking: '#7 in India (Law)', logo: 'rmlnlu-lucknow', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'RMLNLU Lucknow is a top NLU in northern India.', courses: [{ name: 'B.A. LL.B (Hons)', fees: '₹1.8 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Chandigarh
  { id: 'puchd-law', name: 'Panjab University Law Faculty, Chandigarh', location: 'Chandigarh, Chandigarh', rating: 8.4, fees: '₹0.30 Lakhs / Year', placements: '5.0 LPA Average', ranking: '#15 in India (Law)', logo: 'puchd-law', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'Panjab University Law Faculty is one of the oldest law schools.', courses: [{ name: 'LL.B', fees: '₹0.30 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Chennai  
  { id: 'tnnlu-chennai', name: 'Tamil Nadu National Law University, Chennai', location: 'Chennai, Tamil Nadu', rating: 8.6, fees: '₹1.9 Lakhs / Year', placements: '10.0 LPA Average', ranking: '#10 in India (Law)', logo: 'tnnlu-chennai', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'TNNLU offers quality legal education in Tamil Nadu.', courses: [{ name: 'B.A. LL.B (Hons)', fees: '₹1.9 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  // Bengaluru extra
  { id: 'alliance-law', name: 'Alliance School of Law, Bangalore', location: 'Bangalore, Karnataka', rating: 8.0, fees: '₹2.5 Lakhs / Year', placements: '6.0 LPA Average', ranking: '#22 in India (Law)', logo: 'alliance-law', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'Alliance Law Bangalore offers BBA LL.B and BA LL.B programs.', courses: [{ name: 'BA LL.B (Hons)', fees: '₹2.5 Lakhs', seats: 80 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },

  // ── DESIGN ─────────────────────────────────────────────────────────────────
  { id: 'nid-ahmedabad', name: 'National Institute of Design (NID), Ahmedabad', location: 'Ahmedabad, Gujarat', rating: 9.5, fees: '₹2.5 Lakhs / Year', placements: '12.0 LPA Average', ranking: '#1 in India (Design)', logo: 'nid-ahmedabad', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'NID Ahmedabad is the premier design school in India.', courses: [{ name: 'B.Des', fees: '₹2.5 Lakhs', seats: 60 }, { name: 'M.Des', fees: '₹2.5 Lakhs', seats: 30 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'nift-delhi', name: 'National Institute of Fashion Technology (NIFT), Delhi', location: 'Delhi, Delhi', rating: 9.2, fees: '₹1.8 Lakhs / Year', placements: '8.0 LPA Average', ranking: '#1 in India (Fashion)', logo: 'nift-delhi', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'NIFT Delhi is the top fashion institute in India.', courses: [{ name: 'B.Des (Fashion)', fees: '₹1.8 Lakhs', seats: 90 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'nift-mumbai', name: 'National Institute of Fashion Technology (NIFT), Mumbai', location: 'Mumbai, Maharashtra', rating: 9.0, fees: '₹1.8 Lakhs / Year', placements: '7.5 LPA Average', ranking: '#2 in India (Fashion)', logo: 'nift-mumbai', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'NIFT Mumbai offers premium fashion design programs.', courses: [{ name: 'B.Des (Fashion)', fees: '₹1.8 Lakhs', seats: 90 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'mit-adi', name: 'MIT Art, Design and Technology University, Pune', location: 'Pune, Maharashtra', rating: 8.5, fees: '₹2.2 Lakhs / Year', placements: '6.0 LPA Average', ranking: '#5 in India (Design)', logo: 'mit-adi', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'MIT ADT University offers cutting-edge design and technology programs.', courses: [{ name: 'B.Des (Industrial Design)', fees: '₹2.2 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'srishti-bangalore', name: 'Srishti Manipal Institute of Art, Design and Technology, Bangalore', location: 'Bangalore, Karnataka', rating: 8.8, fees: '₹3.5 Lakhs / Year', placements: '7.5 LPA Average', ranking: '#4 in India (Design)', logo: 'srishti-bangalore', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'Srishti Bangalore is a top design school in South India.', courses: [{ name: 'B.Des', fees: '₹3.5 Lakhs', seats: 80 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'iid-mumbai', name: 'Industrial Design Centre (IDC), IIT Bombay, Mumbai', location: 'Mumbai, Maharashtra', rating: 9.3, fees: '₹0.8 Lakhs / Year', placements: '14.0 LPA Average', ranking: '#2 in India (Design)', logo: 'iid-mumbai', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'IDC at IIT Bombay is the top design school in India.', courses: [{ name: 'M.Des', fees: '₹0.8 Lakhs', seats: 25 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'nift-indore', name: 'National Institute of Fashion Technology (NIFT), Indore', location: 'Indore, Madhya Pradesh', rating: 8.3, fees: '₹1.5 Lakhs / Year', placements: '5.5 LPA Average', ranking: '#8 in India (Fashion)', logo: 'nift-indore', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'NIFT Indore offers fashion and design programs in Madhya Pradesh.', courses: [{ name: 'B.Des (Fashion)', fees: '₹1.5 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'nift-kolkata', name: 'National Institute of Fashion Technology (NIFT), Kolkata', location: 'Kolkata, West Bengal', rating: 8.4, fees: '₹1.8 Lakhs / Year', placements: '6.0 LPA Average', ranking: '#6 in India (Fashion)', logo: 'nift-kolkata', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'NIFT Kolkata offers world-class design education.', courses: [{ name: 'B.Des (Fashion)', fees: '₹1.8 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },

  // ── Missing popular searches fallback colleges ──────────────────────────────
  { id: 'ksom-bhubaneswar', name: 'KIIT School of Management (KSOM), Bhubaneswar', location: 'Bhubaneswar, Odisha', rating: 8.6, fees: '₹14.5 Lakhs / Year', placements: '8.5 LPA Average', ranking: '#32 in India (NIRF MBA)', logo: 'ksom-bhubaneswar', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'KSOM is a premier business school in Odisha.', courses: [{ name: 'MBA', fees: '₹7.25 Lakhs', seats: 360 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'psgim-coimbatore', name: 'PSG Institute of Management (PSGIM), Coimbatore', location: 'Coimbatore, Tamil Nadu', rating: 8.7, fees: '₹8.0 Lakhs / Year', placements: '7.8 LPA Average', ranking: '#40 in India (NIRF MBA)', logo: 'psgim-coimbatore', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'PSGIM is a well-known management institute in Tamil Nadu.', courses: [{ name: 'MBA', fees: '₹4.0 Lakhs', seats: 180 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'christ-institute-rajkot', name: 'Christ Institute of Management, Rajkot', location: 'Rajkot, Gujarat', rating: 8.2, fees: '₹2.5 Lakhs / Year', placements: '4.8 LPA Average', ranking: '#75 in India', logo: 'christ-institute-rajkot', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'CIM Rajkot offers specialized management courses.', courses: [{ name: 'MBA', fees: '₹1.25 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'klu-management-guntur', name: 'KL University School of Management, Guntur', location: 'Guntur, Andhra Pradesh', rating: 8.4, fees: '₹5.0 Lakhs / Year', placements: '6.2 LPA Average', ranking: '#48 in India', logo: 'klu-management-guntur', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'KLU School of Management provides quality business education in AP.', courses: [{ name: 'MBA', fees: '₹2.5 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'auro-university-surat', name: 'Auro University, Surat', location: 'Surat, Gujarat', rating: 8.3, fees: '₹6.8 Lakhs / Year', placements: '5.5 LPA Average', ranking: '#60 in India', logo: 'auro-university-surat', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'Auro University is a premier private university in Surat.', courses: [{ name: 'MBA', fees: '₹3.4 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'ggits-jabalpur', name: 'Gyan Ganga Institute of Technology and Sciences (GGITS) MBA, Jabalpur', location: 'Jabalpur, Madhya Pradesh', rating: 8.0, fees: '₹1.4 Lakhs / Year', placements: '4.2 LPA Average', ranking: '#85 in India', logo: 'ggits-jabalpur', image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80', category: 'Management', about: 'GGITS offers highly-rated management courses in Jabalpur.', courses: [{ name: 'MBA', fees: '₹0.7 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  
  { id: 'manit-bhopal', name: 'Maulana Azad National Institute of Technology (MANIT), Bhopal', location: 'Bhopal, Madhya Pradesh', rating: 8.6, fees: '₹1.5 Lakhs / Year', placements: '9.6 LPA Average', ranking: '#24 in India (NIRF Engineering)', logo: 'manit-bhopal', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'MANIT Bhopal is an institute of national importance.', courses: [{ name: 'B.Tech in CSE', fees: '₹1.5 Lakhs', seats: 180 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'kiit-bhubaneswar', name: 'Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar', location: 'Bhubaneswar, Odisha', rating: 8.5, fees: '₹3.5 Lakhs / Year', placements: '8.2 LPA Average', ranking: '#30 in India (NIRF Engineering)', logo: 'kiit-bhubaneswar', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'KIIT is a highly acclaimed multi-disciplinary university.', courses: [{ name: 'B.Tech in CSE', fees: '₹3.5 Lakhs', seats: 360 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'vnit-nagpur', name: 'Visvesvaraya National Institute of Technology (VNIT), Nagpur', location: 'Nagpur, Maharashtra', rating: 8.6, fees: '₹1.25 Lakhs / Year', placements: '10.4 LPA Average', ranking: '#32 in India (NIRF Engineering)', logo: 'vnit-nagpur', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'VNIT Nagpur is a premier NIT in Maharashtra.', courses: [{ name: 'B.Tech in CSE', fees: '₹1.25 Lakhs', seats: 150 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'apsit-thane', name: 'A. P. Shah Institute of Technology (APSIT), Thane', location: 'Thane, Maharashtra', rating: 8.0, fees: '₹1.2 Lakhs / Year', placements: '5.0 LPA Average', ranking: '#88 in India', logo: 'apsit-thane', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'APSIT Thane is a leading engineering institute in Mumbai region.', courses: [{ name: 'B.Tech in CSE', fees: '₹1.2 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'ju-kolkata', name: 'Jadavpur University Department of Engineering, Kolkata', location: 'Kolkata, West Bengal', rating: 8.9, fees: '₹0.1 Lakhs / Year', placements: '11.8 LPA Average', ranking: '#10 in India (NIRF Engineering)', logo: 'ju-kolkata', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'Jadavpur University is legendary for top-tier education at nominal cost.', courses: [{ name: 'B.Tech in CSE', fees: '₹0.1 Lakhs', seats: 90 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'iet-lucknow', name: 'Institute of Engineering and Technology (IET), Lucknow', location: 'Lucknow, Uttar Pradesh', rating: 8.1, fees: '₹0.9 Lakhs / Year', placements: '5.8 LPA Average', ranking: '#65 in India (NIRF Engineering)', logo: 'iet-lucknow', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'IET Lucknow is the premier state-government technical college in UP.', courses: [{ name: 'B.Tech in CSE', fees: '₹0.9 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'pec-chandigarh', name: 'Punjab Engineering College (PEC), Chandigarh', location: 'Chandigarh, Chandigarh', rating: 8.4, fees: '₹1.8 Lakhs / Year', placements: '9.0 LPA Average', ranking: '#38 in India (NIRF Engineering)', logo: 'pec-chandigarh', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80', category: 'Engineering', about: 'PEC is a historical engineering college in Chandigarh.', courses: [{ name: 'B.Tech in CSE', fees: '₹1.8 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  
  { id: 'su-law-rajkot', name: 'Saurashtra University Department of Law, Rajkot', location: 'Rajkot, Gujarat', rating: 8.0, fees: '₹0.2 Lakhs / Year', placements: '4.2 LPA Average', ranking: '#45 in India', logo: 'su-law-rajkot', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'Saurashtra University provides excellent law curricula in Gujarat.', courses: [{ name: 'LL.B', fees: '₹0.2 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'siddharth-law-surat', name: 'Siddharth Law College, Surat', location: 'Surat, Gujarat', rating: 8.1, fees: '₹0.3 Lakhs / Year', placements: '4.5 LPA Average', ranking: '#50 in India', logo: 'siddharth-law-surat', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80', category: 'Law', about: 'Siddharth Law College is a prominent law institution in Surat.', courses: [{ name: 'LL.B', fees: '₹0.3 Lakhs', seats: 180 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  
  { id: 'ipsa-design-rajkot', name: 'Indubhai Parekh School of Design (IPSA), Rajkot', location: 'Rajkot, Gujarat', rating: 8.2, fees: '₹1.2 Lakhs / Year', placements: '4.0 LPA Average', ranking: '#28 in India', logo: 'ipsa-design-rajkot', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'IPSA is a reputed architecture and design school in Rajkot.', courses: [{ name: 'B.Des', fees: '₹1.2 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'ppsuni-design-surat', name: 'PP Savani University Department of Design, Surat', location: 'Surat, Gujarat', rating: 8.1, fees: '₹1.5 Lakhs / Year', placements: '4.5 LPA Average', ranking: '#30 in India', logo: 'ppsuni-design-surat', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'PP Savani University offers highly-integrated design courses in Surat.', courses: [{ name: 'B.Des', fees: '₹1.5 Lakhs', seats: 60 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'chitkara-design-chandigarh', name: 'Chitkara School of Art & Design, Chandigarh', location: 'Chandigarh, Chandigarh', rating: 8.4, fees: '₹1.8 Lakhs / Year', placements: '5.8 LPA Average', ranking: '#15 in India', logo: 'chitkara-design-chandigarh', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'Chitkara offers cutting-edge design programs near Chandigarh.', courses: [{ name: 'B.Des', fees: '₹1.8 Lakhs', seats: 120 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
  { id: 'amity-design-lucknow', name: 'Amity School of Design, Lucknow', location: 'Lucknow, Uttar Pradesh', rating: 8.2, fees: '₹2.2 Lakhs / Year', placements: '5.2 LPA Average', ranking: '#22 in India', logo: 'amity-design-lucknow', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80', category: 'Design', about: 'Amity Lucknow offers creative design environments for aspirants.', courses: [{ name: 'B.Des', fees: '₹2.2 Lakhs', seats: 90 }], placementDetails: [], scholarships: [], hostels: [], gallery: [], reviews: [], faq: [], infrastructure: [] },
];

// Parser Helpers
const parseFees = (feeStr: string): number => {
  if (!feeStr || typeof feeStr !== 'string') return 0;
  // Strip currency symbols including ?, ₹, Rs, etc.
  const cleaned = feeStr.replace(/[^\d.]/g, '');
  const val = parseFloat(cleaned);
  if (isNaN(val)) return 0;
  // Handle Lakhs, Lakh, L
  if (/lakh/i.test(feeStr)) return val * 100000;
  if (/cr|crore/i.test(feeStr)) return val * 10000000;
  // If number is small (< 1000) assume it's in Lakhs
  if (val < 1000) return val * 100000;
  return val;
};

const parsePlacement = (placeStr: string): number => {
  const val = parseFloat(placeStr.replace(/[^\d.]/g, ''));
  if (isNaN(val)) return 0;
  if (placeStr.includes('CPA') || placeStr.includes('CR') || placeStr.includes('Cr')) return val * 100;
  return val;
};

const parseRank = (rankStr: string): number => {
  const match = rankStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 999;
};

// Premium Animated Skeleton
const CollegeSkeleton = () => (
  <div className="bg-app-card border border-app-border rounded-2xl overflow-hidden flex flex-col h-full animate-pulse">
    <div className="h-48 bg-app-card relative">
      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/10" />
      <div className="absolute top-3 left-12 w-8 h-8 rounded-full bg-white/10" />
      <div className="absolute top-3 right-3 w-20 h-6 rounded-full bg-white/10" />
    </div>
    <div className="p-5 flex-1 flex flex-col gap-4">
      <div className="h-4 bg-white/10 rounded w-1/4" />
      <div className="h-6 bg-white/10 rounded w-3/4" />
      <div className="h-4 bg-white/10 rounded w-1/2" />
      <div className="grid grid-cols-2 gap-2 h-12 bg-app-card rounded-xl p-2.5" />
      <div className="h-8 bg-white/10 rounded-lg mt-auto" />
    </div>
  </div>
);

// ── Dynamic Location & Course Descriptions ─────────────────────────────────────
const CITY_DESCRIPTIONS: Record<string, Record<string, string>> = {
  'bengaluru': {
    'management': "Bengaluru is usually termed as the \"Silicon Valley of India\" or as an education hub and, more curiously, a hub for management studies. With the growing IT sector, the rich cultural diversity, and sound academic infrastructure, this city has been attracting students from all over India and all across the globe. The top MBA colleges of Bengaluru not only provide education but also prepare students for the ever-changing business world.",
    'engineering': "Bengaluru, the Silicon Valley of India, is the leading hub for technology and engineering studies. With the presence of top tech giants, R&D centers, and startups, the city provides unmatched internship and placement opportunities. Top engineering colleges in Bengaluru offer state-of-the-art labs and industry-aligned curricula.",
    'law': "Bengaluru is home to some of the country's most prestigious legal institutions, including NLSIU. The city provides a vibrant environment for legal studies, with opportunities in corporate law, litigation, and public policy, supported by high-court proximity and thriving corporate headquarters.",
    'design': "Bengaluru's creative ecosystem is powered by its design studios, tech startups, and premium fashion institutes. The city's top design colleges offer cutting-edge learning in UI/UX, product design, and fashion, providing students with direct access to industry leaders and creative showcases."
  },
  'bangalore': {
    'management': "Bengaluru is usually termed as the \"Silicon Valley of India\" or as an education hub and, more curiously, a hub for management studies. With the growing IT sector, the rich cultural diversity, and sound academic infrastructure, this city has been attracting students from all over India and all across the globe. The top MBA colleges of Bengaluru not only provide education but also prepare students for the ever-changing business world.",
    'engineering': "Bengaluru, the Silicon Valley of India, is the leading hub for technology and engineering studies. With the presence of top tech giants, R&D centers, and startups, the city provides unmatched internship and placement opportunities. Top engineering colleges in Bengaluru offer state-of-the-art labs and industry-aligned curricula.",
    'law': "Bengaluru is home to some of the country's most prestigious legal institutions, including NLSIU. The city provides a vibrant environment for legal studies, with opportunities in corporate law, litigation, and public policy, supported by high-court proximity and thriving corporate headquarters.",
    'design': "Bengaluru's creative ecosystem is powered by its design studios, tech startups, and premium fashion institutes. The city's top design colleges offer cutting-edge learning in UI/UX, product design, and fashion, providing students with direct access to industry leaders and creative showcases."
  },
  'pune': {
    'management': "Pune, known as the 'Oxford of the East', is a highly popular hub for MBA studies in India. With a blend of prominent B-schools and a massive industrial/IT hub (Hinjewadi), Pune offers management students excellent corporate exposure and placement opportunities.",
    'engineering': "Pune has long been a premier destination for engineering aspirants. The city boasts some of India's oldest and most prestigious tech institutes, surrounded by automotive, manufacturing, and software industries that recruit fresh talent directly from college campuses.",
    'law': "Pune provides a highly favorable educational environment for law studies. Its top law colleges are renowned for producing legal luminaries, offering students rich experiences through moot courts, legal aid clinics, and internships with top law firms.",
    'design': "Pune's rich cultural heritage combined with its modern startup culture makes it an ideal spot for design education. Students at Pune's top design institutes benefit from a collaborative ecosystem, modern design labs, and frequent cultural events."
  },
  'delhi': {
    'management': "Delhi-NCR is a massive corporate hub offering management students unparalleled exposure to corporate headquarters, government institutions, and consultancies. Top MBA colleges in the capital region focus on strategic leadership, policy alignment, and global networking.",
    'engineering': "Delhi-NCR hosts premier engineering institutions that attract top national talent. The region's vast industrial corridors, IT parks, and tech hubs provide students with extensive research opportunities, projects, and high-paying career options.",
    'law': "As the seat of the Supreme Court, Delhi-NCR is the ultimate destination for legal education. Law students in the capital gain direct exposure to national courts, prominent lawyers, think tanks, and policy-making bodies, making it a hotbed for legal careers.",
    'design': "Delhi-NCR is a center of fashion, media, and creative industries. Top design institutes here offer students exposure to national design exhibitions, fashion weeks, and corporate branding agencies, nurturing their creative potential to the fullest."
  },
  'delhi-ncr': {
    'management': "Delhi-NCR is a massive corporate hub offering management students unparalleled exposure to corporate headquarters, government institutions, and consultancies. Top MBA colleges in the capital region focus on strategic leadership, policy alignment, and global networking.",
    'engineering': "Delhi-NCR hosts premier engineering institutions that attract top national talent. The region's vast industrial corridors, IT parks, and tech hubs provide students with extensive research opportunities, projects, and high-paying career options.",
    'law': "As the seat of the Supreme Court, Delhi-NCR is the ultimate destination for legal education. Law students in the capital gain direct exposure to national courts, prominent lawyers, think tanks, and policy-making bodies, making it a hotbed for legal careers.",
    'design': "Delhi-NCR is a center of fashion, media, and creative industries. Top design institutes here offer students exposure to national design exhibitions, fashion weeks, and corporate branding agencies, nurturing their creative potential to the fullest."
  },
  'mumbai': {
    'management': "Mumbai, the financial capital of India, offers MBA and management students a unique advantage. Studying in Mumbai provides immediate access to major financial institutions, investment banks, corporate headquarters, and stock exchanges, facilitating premier placements.",
    'engineering': "Mumbai's engineering institutions are known for academic excellence and strong industry links. The city's maritime, financial, and tech industries recruit actively, offering tech graduates diverse career pathways.",
    'law': "Mumbai's legal landscape is fast-paced and corporate-heavy. Top law colleges in the city offer students premium exposure to corporate litigation, maritime law, and intellectual property, with internships at India's leading law firms.",
    'design': "Mumbai, the center of Bollywood, media, and high fashion, is a dream destination for design students. The city's design institutes offer unmatched exposure to creative directions, media production, and luxury brand design."
  }
};

const COURSE_DESCRIPTIONS: Record<string, string> = {
  'management': "Management education in India has evolved rapidly to meet the demands of a globalized economy. Top MBA and PGDM colleges across the country offer rigorous academic training, international exposure, and industry internships to groom future leaders and entrepreneurs.",
  'engineering': "Engineering continues to be one of the most sought-after careers in India. Premier technical institutes offer advanced learning in Computer Science, Artificial Intelligence, and core engineering streams, backed by robust research facilities and global placement partnerships.",
  'law': "Legal education in India has been modernized through the establishment of National Law Universities and elite private law schools. These colleges offer integrated LLB and LLM programs focusing on corporate law, human rights, and constitutional studies.",
  'design': "Design education in India is flourishing, with institutions offering specialized courses in fashion, product design, UI/UX, and communication. Students gain hands-on experience through studio workshops, industrial collaborations, and creative portfolios."
};

const CITY_ONLY_DESCRIPTIONS: Record<string, string> = {
  'bengaluru': "Bengaluru, the Silicon Valley of India, is one of the nation's premier educational hubs. The city hosts top-tier institutions across management, engineering, design, and law, drawing students globally to its innovative ecosystem and massive job market.",
  'bangalore': "Bengaluru, the Silicon Valley of India, is one of the nation's premier educational hubs. The city hosts top-tier institutions across management, engineering, design, and law, drawing students globally to its innovative ecosystem and massive job market.",
  'pune': "Pune, known as the 'Oxford of the East', is home to historical and prestigious educational institutions. Its pleasant climate, safe environment, and robust industrial base make it a highly favored destination for students nationwide.",
  'delhi': "Delhi-NCR is a major educational center of India, boasting premium central universities, IITs, NIFT, and leading business schools. The national capital region offers students an unparalleled network of professionals, government institutions, and corporates.",
  'mumbai': "Mumbai, the commercial capital of India, provides students with unique opportunities in corporate engagement, media, finance, and technology. Its colleges are recognized globally for their academic rigor and exceptional career networks."
};

const formatCityDisplayName = (cityKey: string): string => {
  if (cityKey === 'delhi-ncr') return 'Delhi-NCR';
  if (cityKey === 'bangalore' || cityKey === 'bengaluru') return 'Bengaluru';
  return cityKey.charAt(0).toUpperCase() + cityKey.slice(1);
};

const getGenericDescription = (courseKey: string, cityKey: string) => {
  const courseDisplay = courseKey === 'management' ? 'MBA/PGDM' :
                        courseKey === 'engineering' ? 'B-Tech' :
                        courseKey === 'law' ? 'Law' :
                        courseKey === 'design' ? 'Design' : courseKey;
  const cityDisplay = formatCityDisplayName(cityKey);
  return `${cityDisplay} is rapidly emerging as a preferred destination for high-quality higher education, especially for ${courseDisplay} aspirants. The city's top institutions combine excellent academic infrastructure, experienced faculty, and active industry engagement to ensure students are well-prepared for placement opportunities and corporate roles.`;
};

export const Colleges = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useCollegesQuery } = useColleges();
  const { data: collegesResponse, isLoading } = useCollegesQuery({ limit: 1000 });
  // Handle both direct array and nested { data: { colleges: [] } } response shapes
  const apiColleges: any[] = 
    Array.isArray(collegesResponse) ? collegesResponse :
    Array.isArray(collegesResponse?.colleges) ? collegesResponse.colleges :
    Array.isArray(collegesResponse?.data?.colleges) ? collegesResponse.data.colleges : [];

  // Merge: API-provided colleges take precedence; static fill the gaps
  const apiIds = new Set(apiColleges.map((c: any) => c.id));
  const collegesList: any[] = apiColleges.length > 0
    ? [...apiColleges, ...STATIC_COLLEGES.filter((c) => !apiIds.has(c.id))]
    : STATIC_COLLEGES;


  // Search/Filter states
  const [nameQuery, setNameQuery] = useState('');
  const [activeSearchName, setActiveSearchName] = useState('');

  const [stateSearch, setStateSearch] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const [citySearch, setCitySearch] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const [specSearch, setSpecSearch] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);

  // Advanced filters
  const [maxFees, setMaxFees] = useState<number>(1500000); // Max 15 Lakhs (slider max)
  const [minRank, setMinRank] = useState<string>('all');
  const [minPlacement, setMinPlacement] = useState<string>('all');

  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const itemsPerPage = 9;

  // Synchronization with URL queries
  useEffect(() => {
    const urlQuery = searchParams.get('search');
    const courseParam = searchParams.get('course');
    const locationParam = searchParams.get('location');

    setIsDescExpanded(false); // Reset expansion on search param change

    if (urlQuery) {
      setNameQuery(urlQuery);
      setActiveSearchName(urlQuery);
    } else {
      setNameQuery('');
      setActiveSearchName('');
    }

    if (courseParam) {
      setSelectedCourses([courseParam]);
    } else {
      setSelectedCourses([]);
    }

    if (locationParam) {
      setSelectedCities([locationParam]);
    } else {
      setSelectedCities([]);
    }

    setCurrentPage(1);
  }, [searchParams]);

  // Trigger loading state on filter change to give premium desktop feedback
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [
    activeSearchName,
    selectedStates,
    selectedCities,
    selectedCourses,
    selectedSpecs,
    maxFees,
    minRank,
    minPlacement,
    sortBy
  ]);

  // Option lists derived from college data
  const allStates: string[] = Array.from(
    new Set(collegesList.map((c: any) => c.location.split(', ')[1]).filter(Boolean))
  ).sort() as string[];

  const allCities: string[] = Array.from(
    new Set(collegesList.map((c: any) => c.location.split(', ')[0]).filter(Boolean))
  ).sort() as string[];

  const allCourses: string[] = Array.from(
    new Set(collegesList.map((c: any) => c.category).filter(Boolean))
  ).sort() as string[];

  const allSpecs = [
    'Computer Science',
    'General Management',
    'General Medicine',
    'Business Analytics',
    'Business Administration',
    'Pediatrics',
    'Artificial Intelligence'
  ];

  // Toggle handlers
  const handleToggleState = (state: string) => {
    setSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
    setCurrentPage(1);
  };

  const handleToggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
    setCurrentPage(1);
  };

  const handleToggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
    setCurrentPage(1);
  };

  const handleToggleSpec = (spec: string) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearchName(nameQuery);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setNameQuery('');
    setActiveSearchName('');
    setStateSearch('');
    setSelectedStates([]);
    setCitySearch('');
    setSelectedCities([]);
    setCourseSearch('');
    setSelectedCourses([]);
    setSpecSearch('');
    setSelectedSpecs([]);
    setMaxFees(1500000);
    setMinRank('all');
    setMinPlacement('all');
    setSortBy('rating');
    setSearchParams({});
    setCurrentPage(1);
  };

  // Main Filter Logic
  const filteredColleges = collegesList.filter((college: any) => {
    // 1. Search Name/Query
    if (activeSearchName.trim()) {
      const q = activeSearchName.toLowerCase().trim();
      const nameMatch = college.name.toLowerCase().includes(q);
      const locMatch = college.location.toLowerCase().includes(q);
      const categoryMatch = college.category.toLowerCase().includes(q);
      if (!nameMatch && !locMatch && !categoryMatch) return false;
    }

    // 2. State selection
    if (selectedStates.length > 0) {
      const stateOfCollege = college.location.split(', ')[1];
      if (!selectedStates.includes(stateOfCollege)) return false;
    }

    // 3. City selection
    if (selectedCities.length > 0) {
      const match = selectedCities.some(city => 
        college.location.toLowerCase().includes(city.toLowerCase())
      );
      if (!match) return false;
    }

    // 4. Course selection
    if (selectedCourses.length > 0) {
      const match = selectedCourses.some(selCourse => {
        // Direct category match
        if (college.category.toLowerCase() === selCourse.toLowerCase()) return true;
        
        // Category mapping fallback
        const selLower = selCourse.toLowerCase();
        if (selLower.includes('b.tech') && college.category.toLowerCase().includes('engineering')) return true;
        if ((selLower.includes('mba') || selLower.includes('pgdm') || selLower.includes('bba')) && college.category.toLowerCase().includes('management')) return true;
        if (selLower.includes('mbbs') && college.category.toLowerCase().includes('medicine')) return true;

        // Individual courses list match
        const coursesArr = Array.isArray(college.courses)
          ? college.courses
          : (typeof college.courses === 'string' && college.courses.trim()
            ? college.courses.split(/,|\n/).map((s: string) => ({ name: s.trim() }))
            : []);
        
        return coursesArr.some((c: any) => 
          (c.name || '').toLowerCase().includes(selLower)
        );
      });
      
      if (!match) return false;
    }

    // 5. Specialization selection — safely handle string or array courses
    if (selectedSpecs.length > 0) {
      const coursesArr = Array.isArray(college.courses)
        ? college.courses
        : (typeof college.courses === 'string' && college.courses.trim()
          ? college.courses.split(/,|\n/).map((s: string) => ({ name: s.trim() }))
          : []);
      const hasSpec = coursesArr.some((course: any) =>
        selectedSpecs.some((spec) => (course.name || '').toLowerCase().includes(spec.toLowerCase()))
      );
      if (!hasSpec) return false;
    }

    // 6. Max Fees Slider Filter — skip if fees is 0 (missing data)
    const collegeFee = parseFees(college.fees);
    if (collegeFee > 0 && collegeFee > maxFees) return false;

    // 7. Min Rank Radio Filter
    if (minRank !== 'all') {
      const collegeRank = parseRank(college.ranking);
      const targetRank = parseInt(minRank, 10);
      if (collegeRank > targetRank) return false;
    }

    // 8. Min Average Placement Filter
    if (minPlacement !== 'all') {
      const avgPlacementLPA = parsePlacement(college.placements);
      const targetPlacement = parseInt(minPlacement, 10);
      if (avgPlacementLPA > 0 && avgPlacementLPA < targetPlacement) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'fees_low') {
      return parseFees(a.fees) - parseFees(b.fees);
    }
    if (sortBy === 'fees_high') {
      return parseFees(b.fees) - parseFees(a.fees);
    }
    if (sortBy === 'placement_high') {
      // Use parsed placement averages for comparison
      const aPl = parsePlacement(a.placements);
      const bPl = parsePlacement(b.placements);
      return bPl - aPl;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedColleges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedColleges = sortedColleges.slice(startIndex, startIndex + itemsPerPage);

  const formatLakhs = (val: number) => {
    if (val >= 100000) {
      return `${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${val.toLocaleString()}`;
  };

  // Get dynamic header and description content
  const getBannerContent = () => {
    const course = selectedCourses.length === 1 ? selectedCourses[0] : null;
    const city = selectedCities.length === 1 ? selectedCities[0] : null;

    if (course && city) {
      const courseKey = course.toLowerCase();
      const cityKey = city.toLowerCase();
      const courseDisplay = courseKey === 'management' ? 'MBA/PGDM' :
                            courseKey === 'engineering' ? 'B-Tech' :
                            courseKey === 'law' ? 'Law' :
                            courseKey === 'design' ? 'Design' : course;
      const cityDisplay = formatCityDisplayName(cityKey);
      
      const title = `Top ${courseDisplay} Colleges in ${cityDisplay}`;
      
      let description = '';
      if (CITY_DESCRIPTIONS[cityKey] && CITY_DESCRIPTIONS[cityKey][courseKey]) {
        description = CITY_DESCRIPTIONS[cityKey][courseKey];
      } else {
        description = getGenericDescription(courseKey, cityKey);
      }
      return { title, description };
    }
    
    if (course) {
      const courseKey = course.toLowerCase();
      const courseDisplay = courseKey === 'management' ? 'MBA/PGDM' :
                            courseKey === 'engineering' ? 'B-Tech' :
                            courseKey === 'law' ? 'Law' :
                            courseKey === 'design' ? 'Design' : course;
      const title = `Top ${courseDisplay} Colleges in India`;
      const description = COURSE_DESCRIPTIONS[courseKey] || `Explore the best colleges and universities offering ${courseDisplay} programs in India. Compare rankings, fees, placements, and eligibility criteria.`;
      return { title, description };
    }

    if (city) {
      const cityKey = city.toLowerCase();
      const cityDisplay = formatCityDisplayName(cityKey);
      const title = `Top Colleges in ${cityDisplay}`;
      const description = CITY_ONLY_DESCRIPTIONS[cityKey] || `Discover top-rated colleges and institutions located in ${cityDisplay}. Filter by streams, fees, average packages, and university affiliations to find your perfect fit.`;
      return { title, description };
    }

    return {
      title: "Explore & Filter Colleges",
      description: "Match courses, budgets, exams, and placement packages across India's top-tier institutions. Use the filters to customize your career alignment."
    };
  };

  const { title: bannerTitle, description: bannerDescription } = getBannerContent();
  const isLongDescription = bannerDescription.length > 180;
  const displayedDescription = (isLongDescription && !isDescExpanded)
    ? `${bannerDescription.slice(0, 180)}...`
    : bannerDescription;

  return (
    <div className="relative pt-28 pb-20 min-h-screen bg-app-bg text-app-text">
      {/* Background Gradients */}
      <div className="gradient-mesh opacity-100 absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-8 rounded-3xl glass relative overflow-hidden border border-app-border text-left">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/10 to-transparent pointer-events-none" />
          <div className="relative z-10 text-left flex-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF7A00]/10 text-[#FF7A00] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Programs & Campuses
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-tight">
              {bannerTitle.split('Colleges').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="gradient-text-primary">Colleges</span>}
                </span>
              ))}
            </h1>
            <p className="text-sm text-app-muted mt-2 max-w-3xl leading-relaxed">
              {displayedDescription}
            </p>
            {isLongDescription && (
              <div className="mt-4">
                <button
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="px-5 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#FF7A00]/90 text-white font-bold text-xs transition-all shadow-[0_4px_12px_rgba(255,122,0,0.2)] active:scale-95 cursor-pointer border-none"
                >
                  {isDescExpanded ? 'Read Less' : 'Read More'}
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white font-bold text-sm transition-all shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Sidebar Filters */}
          <aside className={`lg:col-span-3 flex flex-col gap-6 p-6 glass rounded-2xl border border-app-border ${mobileFiltersOpen ? 'block' : 'hidden lg:flex'}`}>
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-app-border pb-4">
              <span className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-wider">
                <Filter className="w-4 h-4 text-[#FF7A00]" />
                Filters
              </span>
              
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-bold text-app-muted hover:text-[#FF7A00] flex items-center gap-1 transition-colors cursor-pointer border-none bg-transparent"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Sort Selection */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Sort Options
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-app-card border border-app-border text-xs font-semibold text-white py-2.5 pl-3 pr-8 rounded-xl outline-none focus:border-[#FF7A00] cursor-pointer"
                >
                  <option value="rating">Sort: Best Rating</option>
                  <option value="placement_high">Sort: Placements (High)</option>
                  <option value="fees_low">Sort: Fees (Low to High)</option>
                  <option value="fees_high">Sort: Fees (High to Low)</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-app-muted pointer-events-none" />
              </div>
            </div>

            {/* Search Input */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Search College
              </label>
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search name, city..."
                  value={nameQuery}
                  onChange={(e) => setNameQuery(e.target.value)}
                  className="w-full text-xs pl-3 pr-10 py-2.5 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] transition-all font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-1.5 rounded-lg text-app-muted hover:text-white transition-colors cursor-pointer border-none bg-transparent"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* MAX FEES SLIDER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-app-muted uppercase tracking-wider flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#FF7A00]" />
                  Max Annual Fees
                </label>
                <span className="text-xs font-bold text-[#FF7A00]">
                  {formatLakhs(maxFees)}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={1500000}
                step={10000}
                value={maxFees}
                onChange={(e) => setMaxFees(Number(e.target.value))}
                className="w-full accent-[#FF7A00] bg-white/10 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-app-muted font-bold">
                <span>Min: ₹2K</span>
                <span>Max: 15 Lakhs</span>
              </div>
            </div>

            {/* MIN RANK RADIOS */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#FF7A00]" />
                National Ranking
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'all', label: 'Any NIRF Rank' },
                  { value: '10', label: 'Top 10 Institutions' },
                  { value: '25', label: 'Top 25 Institutions' },
                  { value: '50', label: 'Top 50 Institutions' },
                  { value: '100', label: 'Top 100 Institutions' },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2.5 text-xs text-app-muted cursor-pointer hover:text-white transition-colors">
                    <input
                      type="radio"
                      name="minRank"
                      checked={minRank === item.value}
                      onChange={() => setMinRank(item.value)}
                      className="accent-[#FF7A00] w-4 h-4 cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* MIN AVERAGE PLACEMENT RADIOS */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#FF7A00]" />
                Min Placement package
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'all', label: 'Any Average Package' },
                  { value: '30', label: '30+ LPA Average' },
                  { value: '15', label: '15+ LPA Average' },
                  { value: '10', label: '10+ LPA Average' },
                  { value: '5', label: '5+ LPA Average' },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2.5 text-xs text-app-muted cursor-pointer hover:text-white transition-colors">
                    <input
                      type="radio"
                      name="minPlacement"
                      checked={minPlacement === item.value}
                      onChange={() => setMinPlacement(item.value)}
                      className="accent-[#FF7A00] w-4 h-4 cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* STATE FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                State
              </label>
              <input
                type="text"
                placeholder="Filter states..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {allStates
                  .filter((state) => state.toLowerCase().includes(stateSearch.toLowerCase()))
                  .map((state) => (
                    <label key={state} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedStates.includes(state)}
                        onChange={() => handleToggleState(state)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{state}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* CITY FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                City
              </label>
              <input
                type="text"
                placeholder="Filter cities..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {allCities
                  .filter((city) => city.toLowerCase().includes(citySearch.toLowerCase()))
                  .map((city) => (
                    <label key={city} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(city)}
                        onChange={() => handleToggleCity(city)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{city}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* COURSES FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Course Category
              </label>
              <input
                type="text"
                placeholder="Filter courses..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {allCourses
                  .filter((course) => course.toLowerCase().includes(courseSearch.toLowerCase()))
                  .map((course) => (
                    <label key={course} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleToggleCourse(course)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{course}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* SPECIALIZATION FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Specialization
              </label>
              <input
                type="text"
                placeholder="Filter specialization..."
                value={specSearch}
                onChange={(e) => setSpecSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin font-medium">
                {allSpecs
                  .filter((spec) => spec.toLowerCase().includes(specSearch.toLowerCase()))
                  .map((spec) => (
                    <label key={spec} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedSpecs.includes(spec)}
                        onChange={() => handleToggleSpec(spec)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{spec}</span>
                    </label>
                  ))}
              </div>
            </div>

          </aside>

          {/* RIGHT: Results Catalog */}
          <main className="lg:col-span-9 flex flex-col gap-6 w-full text-left">
            
            {/* Header Result Badge */}
            <div className="flex items-center justify-between p-4 rounded-2xl glass border border-app-border w-full">
              <span className="text-xs text-app-muted font-bold">
                Showing <b className="text-white">{sortedColleges.length}</b> premium institutions matching criteria
              </span>
            </div>

            {/* Loading / Results Grid */}
            {loading || isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CollegeSkeleton key={idx} />
                ))}
              </div>
            ) : paginatedColleges.length === 0 ? (
              <div className="py-20 text-center glass border border-app-border rounded-2xl flex flex-col items-center justify-center">
                <SlidersHorizontal className="w-12 h-12 text-app-muted/30 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Matching Colleges</h3>
                <p className="text-app-muted text-sm max-w-sm mb-6">
                  Try adjusting your budget, ranking tier, or package expectations to discover other matches.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-white bg-[#FF7A00] hover:bg-[#D14B00] px-5 py-3 rounded-xl cursor-pointer shadow-lg shadow-[#FF7A00]/20 border-none transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              // 3-Column Catalog Grid
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {paginatedColleges.map((college) => (
                  <ScrollReveal key={college.id} delay={0} duration={0.4}>
                    <CollegeCard college={college} />
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && !loading && !isLoading && (
              <div className="flex items-center justify-between border-t border-app-border pt-6 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                  className="px-4 py-2.5 rounded-xl glass border border-app-border hover:bg-app-card text-xs font-bold text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-9 h-9 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        currentPage === idx + 1
                          ? 'bg-[#FF7A00] border-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/20'
                          : 'border-app-border bg-app-card text-app-muted hover:text-white hover:border-app-border'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                  className="px-4 py-2.5 rounded-xl glass border border-app-border hover:bg-app-card text-xs font-bold text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};

export default Colleges;
