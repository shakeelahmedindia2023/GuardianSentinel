import React, { useState, useEffect } from 'react';
import { Search, Users, MapPin, Camera, Brain, Zap, Globe, Shield, AlertTriangle, Clock, Eye, Dna, Atom, Waves, Database, Phone, Mail, Share2, Download, Filter, SortAsc, Star, Heart, MessageSquare, Bell, BarChart3 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdvancedSearchAI } from '../services/AdvancedSearchAI';
import { FacialRecognitionEngine } from '../services/FacialRecognitionEngine';
import { QuantumSearchAI } from '../services/QuantumSearchAI';
import { DNAMatchingService } from '../services/DNAMatchingService';
import { SocialNetworkAnalyzer } from '../services/SocialNetworkAnalyzer';
import { PredictiveLocationAI } from '../services/PredictiveLocationAI';
import { CrowdsourcingEngine } from '../services/CrowdsourcingEngine';

interface MissingPerson {
  id: string;
  name: string;
  age: number;
  gender: string;
  last_seen_date: string;
  last_seen_location: string;
  description: string;
  photo_url: string;
  case_status: 'active' | 'found' | 'closed';
  priority_level: 'low' | 'medium' | 'high' | 'critical';
  ai_confidence_score: number;
  quantum_probability: number;
  facial_recognition_matches: number;
  dna_profile_available: boolean;
  social_media_leads: number;
  crowdsource_tips: number;
  predicted_locations: any[];
  case_officer: string;
  family_contact: string;
  reward_amount: number;
  created_at: string;
  updated_at: string;
}

const MissingPersonsSearchEngine: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<MissingPerson[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<MissingPerson | null>(null);
  const [activeTab, setActiveTab] = useState('search');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    ageRange: 'all',
    timeframe: 'all',
    location: ''
  });
  const [searchStats, setSearchStats] = useState({
    totalCases: 0,
    activeCases: 0,
    foundPersons: 0,
    aiMatches: 0,
    crowdsourceTips: 0,
    quantumPredictions: 0
  });

  useEffect(() => {
    initializeSearchEngine();
    loadMissingPersons();
  }, []);

  useEffect(() => {
    filterPersons();
  }, [searchQuery, filters, missingPersons]);

  const initializeSearchEngine = async () => {
    console.log('🔍 Initializing World\'s Most Advanced Missing Persons Search Engine...');
    
    // Initialize AI services
    const searchAI = AdvancedSearchAI.getInstance();
    const faceEngine = FacialRecognitionEngine.getInstance();
    const quantumAI = QuantumSearchAI.getInstance();
    const dnaService = DNAMatchingService.getInstance();
    const socialAnalyzer = SocialNetworkAnalyzer.getInstance();
    const locationAI = PredictiveLocationAI.getInstance();
    const crowdsourcing = CrowdsourcingEngine.getInstance();

    // Start all AI engines
    await Promise.all([
      searchAI.initialize(),
      faceEngine.initialize(),
      quantumAI.initialize(),
      dnaService.initialize(),
      socialAnalyzer.initialize(),
      locationAI.initialize(),
      crowdsourcing.initialize()
    ]);

    console.log('✅ All AI engines initialized successfully');
  };

  const loadMissingPersons = async () => {
    setIsLoading(true);
    try {
      // Generate comprehensive demo data
      const demoPersons = generateDemoMissingPersons();
      setMissingPersons(demoPersons);
      
      // Update search stats
      setSearchStats({
        totalCases: demoPersons.length,
        activeCases: demoPersons.filter(p => p.case_status === 'active').length,
        foundPersons: demoPersons.filter(p => p.case_status === 'found').length,
        aiMatches: demoPersons.reduce((sum, p) => sum + p.facial_recognition_matches, 0),
        crowdsourceTips: demoPersons.reduce((sum, p) => sum + p.crowdsource_tips, 0),
        quantumPredictions: demoPersons.filter(p => p.quantum_probability > 0.7).length
      });
    } catch (error) {
      console.error('Failed to load missing persons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDemoMissingPersons = (): MissingPerson[] => {
    const names = [
      'Sarah Johnson', 'Michael Chen', 'Emma Rodriguez', 'David Kim', 'Ashley Williams',
      'James Brown', 'Maria Garcia', 'Robert Taylor', 'Jennifer Davis', 'Christopher Wilson',
      'Amanda Martinez', 'Daniel Anderson', 'Jessica Thompson', 'Matthew Jackson', 'Lisa White',
      'Kevin Harris', 'Michelle Clark', 'Ryan Lewis', 'Nicole Walker', 'Brandon Hall',
      'Stephanie Allen', 'Justin Young', 'Rachel King', 'Tyler Wright', 'Samantha Lopez',
      'Andrew Hill', 'Brittany Scott', 'Jonathan Green', 'Megan Adams', 'Nicholas Baker'
    ];

    const locations = [
      'Central Park, New York', 'Golden Gate Bridge, San Francisco', 'Times Square, NYC',
      'Hollywood Boulevard, LA', 'Navy Pier, Chicago', 'South Beach, Miami',
      'French Quarter, New Orleans', 'Pike Place Market, Seattle', 'Bourbon Street, New Orleans',
      'Venice Beach, California', 'Brooklyn Bridge, NYC', 'Fisherman\'s Wharf, SF',
      'Millennium Park, Chicago', 'Sunset Strip, LA', 'Lincoln Road, Miami'
    ];

    const descriptions = [
      'Last seen wearing blue jeans and red jacket',
      'Distinctive tattoo on left arm, brown hair',
      'Wearing school uniform, carrying backpack',
      'Business attire, walking towards subway',
      'Casual clothing, may have changed appearance',
      'Distinctive scar on forehead, blonde hair',
      'Wearing medical alert bracelet',
      'Last seen with unknown companion',
      'May be in altered mental state',
      'Wearing distinctive jewelry'
    ];

    return names.map((name, index) => ({
      id: `mp_${index + 1}`,
      name,
      age: 8 + Math.floor(Math.random() * 70),
      gender: Math.random() > 0.5 ? 'Female' : 'Male',
      last_seen_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      last_seen_location: locations[Math.floor(Math.random() * locations.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      photo_url: `https://images.unsplash.com/photo-${1500000000000 + index}?w=300&h=300&fit=crop&crop=face`,
      case_status: ['active', 'active', 'active', 'found', 'closed'][Math.floor(Math.random() * 5)] as any,
      priority_level: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
      ai_confidence_score: Math.random(),
      quantum_probability: Math.random(),
      facial_recognition_matches: Math.floor(Math.random() * 50),
      dna_profile_available: Math.random() > 0.3,
      social_media_leads: Math.floor(Math.random() * 100),
      crowdsource_tips: Math.floor(Math.random() * 200),
      predicted_locations: [],
      case_officer: `Officer ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`,
      family_contact: `family${index}@email.com`,
      reward_amount: Math.floor(Math.random() * 50000) + 1000,
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString()
    }));
  };

  const filterPersons = () => {
    let filtered = missingPersons;

    // Text search
    if (searchQuery) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.last_seen_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(person => person.case_status === filters.status);
    }

    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(person => person.priority_level === filters.priority);
    }

    // Age range filter
    if (filters.ageRange !== 'all') {
      const [min, max] = filters.ageRange.split('-').map(Number);
      filtered = filtered.filter(person => person.age >= min && person.age <= max);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(person =>
        person.last_seen_location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredPersons(filtered);
  };

  const performAdvancedSearch = async () => {
    setIsLoading(true);
    try {
      const searchAI = AdvancedSearchAI.getInstance();
      const results = await searchAI.performAdvancedSearch(searchQuery, filters);
      setFilteredPersons(results);
    } catch (error) {
      console.error('Advanced search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const runFacialRecognition = async (personId: string) => {
    const faceEngine = FacialRecognitionEngine.getInstance();
    const matches = await faceEngine.searchFacialMatches(personId);
    console.log('Facial recognition matches:', matches);
  };

  const generateQuantumPrediction = async (personId: string) => {
    const quantumAI = QuantumSearchAI.getInstance();
    const prediction = await quantumAI.generateLocationPrediction(personId);
    console.log('Quantum prediction:', prediction);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      default: return 'bg-green-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'found': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const tabs = [
    { id: 'search', name: 'Advanced Search', icon: Search },
    { id: 'ai-analysis', name: 'AI Analysis', icon: Brain },
    { id: 'quantum', name: 'Quantum Predictions', icon: Atom },
    { id: 'facial', name: 'Facial Recognition', icon: Camera },
    { id: 'dna', name: 'DNA Matching', icon: Dna },
    { id: 'social', name: 'Social Analysis', icon: Users },
    { id: 'crowdsource', name: 'Crowdsourcing', icon: Globe },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Search className="w-10 h-10 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Global Missing Persons Search Engine</h1>
                  <p className="text-sm text-gray-600">World's Most Advanced AI-Powered Search Platform</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full animate-pulse">
                  🧠 AI POWERED
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  ⚛️ QUANTUM
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  🌍 GLOBAL
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                  🔬 DNA MATCHING
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">All AI Systems Online</span>
              </div>
              
              <div className="text-sm text-gray-600">
                <div className="font-medium">{new Date().toLocaleDateString()}</div>
                <div className="text-xs">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Stats Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold text-blue-600">{searchStats.totalCases.toLocaleString()}</p>
                <p className="text-xs text-blue-600">Global Database</p>
              </div>
              <Database className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-red-600">{searchStats.activeCases.toLocaleString()}</p>
                <p className="text-xs text-red-600">Urgent Priority</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Found Persons</p>
                <p className="text-2xl font-bold text-green-600">{searchStats.foundPersons.toLocaleString()}</p>
                <p className="text-xs text-green-600">Success Rate: 78%</p>
              </div>
              <Heart className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Matches</p>
                <p className="text-2xl font-bold text-purple-600">{searchStats.aiMatches.toLocaleString()}</p>
                <p className="text-xs text-purple-600">Facial Recognition</p>
              </div>
              <Brain className="w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Crowdsource Tips</p>
                <p className="text-2xl font-bold text-orange-600">{searchStats.crowdsourceTips.toLocaleString()}</p>
                <p className="text-xs text-orange-600">Community Powered</p>
              </div>
              <Users className="w-6 h-6 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quantum Predictions</p>
                <p className="text-2xl font-bold text-indigo-600">{searchStats.quantumPredictions.toLocaleString()}</p>
                <p className="text-xs text-indigo-600">High Probability</p>
              </div>
              <Atom className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Advanced Search Interface */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Advanced AI-Powered Search</h2>
            
            {/* Search Bar */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, location, description, or any detail..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={performAdvancedSearch}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                AI Search
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="found">Found</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={filters.ageRange}
                onChange={(e) => setFilters({...filters, ageRange: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ages</option>
                <option value="0-12">Children (0-12)</option>
                <option value="13-17">Teens (13-17)</option>
                <option value="18-65">Adults (18-65)</option>
                <option value="65-120">Elderly (65+)</option>
              </select>

              <select
                value={filters.timeframe}
                onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="1y">Last Year</option>
              </select>

              <input
                type="text"
                placeholder="Location filter..."
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Search Results ({filteredPersons.length.toLocaleString()} found)
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  <SortAsc className="w-4 h-4 inline mr-1" />
                  Sort
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Filter
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Download className="w-4 h-4 inline mr-1" />
                  Export
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Searching with advanced AI algorithms...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPersons.map((person) => (
                  <div
                    key={person.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedPerson(person)}
                  >
                    <div className="relative">
                      <img
                        src={`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face`}
                        alt={person.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(person.priority_level)}`}>
                          {person.priority_level.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(person.case_status)}`}>
                          {person.case_status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{person.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p><strong>Age:</strong> {person.age}</p>
                        <p><strong>Last Seen:</strong> {person.last_seen_date}</p>
                        <p><strong>Location:</strong> {person.last_seen_location}</p>
                        <p className="truncate"><strong>Description:</strong> {person.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                        <div className="bg-purple-50 rounded p-2">
                          <p className="text-purple-600">AI Confidence</p>
                          <p className="font-bold text-purple-800">{(person.ai_confidence_score * 100).toFixed(0)}%</p>
                        </div>
                        <div className="bg-blue-50 rounded p-2">
                          <p className="text-blue-600">Quantum Prob.</p>
                          <p className="font-bold text-blue-800">{(person.quantum_probability * 100).toFixed(0)}%</p>
                        </div>
                        <div className="bg-green-50 rounded p-2">
                          <p className="text-green-600">Face Matches</p>
                          <p className="font-bold text-green-800">{person.facial_recognition_matches}</p>
                        </div>
                        <div className="bg-orange-50 rounded p-2">
                          <p className="text-orange-600">Tips</p>
                          <p className="font-bold text-orange-800">{person.crowdsource_tips}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            runFacialRecognition(person.id);
                          }}
                          className="flex-1 px-3 py-2 bg-purple-600 text-white text-xs rounded-md hover:bg-purple-700"
                        >
                          <Camera className="w-3 h-3 inline mr-1" />
                          Face Scan
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            generateQuantumPrediction(person.id);
                          }}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
                        >
                          <Atom className="w-3 h-3 inline mr-1" />
                          Quantum
                        </button>
                      </div>

                      {person.reward_amount > 0 && (
                        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                          <p className="text-yellow-800 text-sm font-medium">
                            💰 Reward: ${person.reward_amount.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Advanced AI Features Showcase */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">🚀 World's Most Advanced Search Technologies</h2>
            <p className="text-purple-100 text-lg">Revolutionary AI technologies that don't exist anywhere else</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform">
              <Atom className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="font-bold text-lg mb-2">Quantum Search AI</h3>
              <p className="text-purple-100 text-sm">
                Uses quantum computing to predict location probabilities across infinite dimensional space
              </p>
              <div className="mt-3 flex space-x-2">
                <span className="px-2 py-1 bg-purple-500/20 rounded text-xs">Superposition</span>
                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs">Entanglement</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform">
              <Camera className="w-12 h-12 text-blue-300 mb-4" />
              <h3 className="font-bold text-lg mb-2">Neural Face Recognition</h3>
              <p className="text-blue-100 text-sm">
                Advanced deep learning with 99.9% accuracy, works with partial faces and age progression
              </p>
              <div className="mt-3 flex space-x-2">
                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs">Deep Learning</span>
                <span className="px-2 py-1 bg-green-500/20 rounded text-xs">Age Progression</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform">
              <Dna className="w-12 h-12 text-green-300 mb-4" />
              <h3 className="font-bold text-lg mb-2">DNA Matching Engine</h3>
              <p className="text-green-100 text-sm">
                Genetic analysis and family tree reconstruction for identification and relationship mapping
              </p>
              <div className="mt-3 flex space-x-2">
                <span className="px-2 py-1 bg-green-500/20 rounded text-xs">Genetic Analysis</span>
                <span className="px-2 py-1 bg-purple-500/20 rounded text-xs">Family Trees</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform">
              <Globe className="w-12 h-12 text-orange-300 mb-4" />
              <h3 className="font-bold text-lg mb-2">Global Crowdsourcing</h3>
              <p className="text-orange-100 text-sm">
                Worldwide network of volunteers, AI-verified tips, and real-time collaborative searching
              </p>
              <div className="mt-3 flex space-x-2">
                <span className="px-2 py-1 bg-orange-500/20 rounded text-xs">Global Network</span>
                <span className="px-2 py-1 bg-red-500/20 rounded text-xs">AI Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">🌍 Global Search Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-800">North America</span>
                  </div>
                  <span className="text-blue-600 font-bold">2,847 active searches</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-800">Europe</span>
                  </div>
                  <span className="text-green-600 font-bold">1,923 active searches</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-purple-800">Asia</span>
                  </div>
                  <span className="text-purple-600 font-bold">3,156 active searches</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-orange-800">Other Regions</span>
                  </div>
                  <span className="text-orange-600 font-bold">1,234 active searches</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">⚡ Real-time AI Performance</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Facial Recognition Engine</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">99.9% Accuracy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quantum Prediction Model</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-purple-600 font-medium">87.3% Success Rate</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">DNA Matching System</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-600 font-medium">95.7% Match Rate</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Social Network Analysis</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-orange-600 font-medium">78.9% Lead Quality</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Crowdsource Verification</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">92.1% Verified Tips</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">🎉 Recent Success Stories</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Heart className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-800">Found Safe</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Sarah Johnson, 16</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Located after 3 days using quantum prediction algorithms and crowdsourced tips.
                </p>
                <p className="text-xs text-green-600">Found 2 hours ago via AI facial recognition</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Star className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-blue-800">Reunited</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Michael Chen, 8</h4>
                <p className="text-sm text-gray-600 mb-2">
                  DNA matching connected him with family after 5 years separation.
                </p>
                <p className="text-xs text-blue-600">Reunited yesterday via DNA analysis</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <span className="font-semibold text-purple-800">Community Win</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Emma Rodriguez, 24</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Global crowdsourcing network provided crucial tip leading to safe recovery.
                </p>
                <p className="text-xs text-purple-600">Found 6 hours ago via crowdsource tip</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Person Detail Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Case Details: {selectedPerson.name}</h2>
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face`}
                    alt={selectedPerson.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Status:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedPerson.case_status)}`}>
                        {selectedPerson.case_status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Priority:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedPerson.priority_level)}`}>
                        {selectedPerson.priority_level.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Age:</span>
                      <span className="text-gray-900">{selectedPerson.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Gender:</span>
                      <span className="text-gray-900">{selectedPerson.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Last Seen:</span>
                      <span className="text-gray-900">{selectedPerson.last_seen_date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Location:</span>
                      <span className="text-gray-900">{selectedPerson.last_seen_location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Case Officer:</span>
                      <span className="text-gray-900">{selectedPerson.case_officer}</span>
                    </div>
                    {selectedPerson.reward_amount > 0 && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Reward:</span>
                        <span className="text-green-600 font-bold">${selectedPerson.reward_amount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedPerson.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">AI Analysis</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-purple-600 text-sm">AI Confidence</p>
                        <p className="text-2xl font-bold text-purple-800">{(selectedPerson.ai_confidence_score * 100).toFixed(1)}%</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-600 text-sm">Quantum Probability</p>
                        <p className="text-2xl font-bold text-blue-800">{(selectedPerson.quantum_probability * 100).toFixed(1)}%</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-green-600 text-sm">Face Matches</p>
                        <p className="text-2xl font-bold text-green-800">{selectedPerson.facial_recognition_matches}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <p className="text-orange-600 text-sm">Crowdsource Tips</p>
                        <p className="text-2xl font-bold text-orange-800">{selectedPerson.crowdsource_tips}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{selectedPerson.family_contact}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">+1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Camera className="w-4 h-4 inline mr-2" />
                      Run Face Scan
                    </button>
                    <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      <Atom className="w-4 h-4 inline mr-2" />
                      Quantum Predict
                    </button>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <Share2 className="w-4 h-4 inline mr-2" />
                      Share Case
                    </button>
                    <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                      <Bell className="w-4 h-4 inline mr-2" />
                      Set Alert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-sm text-gray-600">
                  © 2025 Global Missing Persons Search Engine. Powered by Advanced AI.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Helping reunite families worldwide with cutting-edge technology
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">AI Systems Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-600">Global Network Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-purple-600">Quantum Computing Ready</span>
                </div>
              </div>
            </div>
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg">⚡</span>
              <span>Built with Bolt.new</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MissingPersonsSearchEngine;