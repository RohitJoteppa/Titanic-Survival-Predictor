import React, { useState, useEffect, useMemo } from 'react';
import { ModelWeights, predictSurvival } from '../utils/mlModel';
import { Passenger } from '../data/titanicDataset';
import { Sparkles, Ship, User, HelpCircle, Compass, Anchor, Users, DollarSign, Activity, X } from 'lucide-react';

interface PredictorFormProps {
  weights: ModelWeights;
  selectedTemplatePassenger: Passenger | null;
  onClearTemplate: () => void;
}

interface GeminiResult {
  survivalLikelihood: 'High' | 'Medium' | 'Low';
  survivalPercentage: number;
  historicalReasoning: string;
  fictionalNarrative: string;
  actionableTips: string;
}

export default function PredictorForm({
  weights,
  selectedTemplatePassenger,
  onClearTemplate
}: PredictorFormProps) {
  // Form State
  const [name, setName] = useState('Unnamed Passenger');
  const [sex, setSex] = useState<'male' | 'female'>('female');
  const [pclass, setPclass] = useState<number>(1);
  const [age, setAge] = useState<number>(25);
  const [fare, setFare] = useState<number>(50);
  const [sibsp, setSibsp] = useState<number>(0);
  const [parch, setParch] = useState<number>(0);
  const [cabin, setCabin] = useState('');

  // AI results state
  const [geminiResult, setGeminiResult] = useState<GeminiResult | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Load selected template when updated
  useEffect(() => {
    if (selectedTemplatePassenger) {
      setName(selectedTemplatePassenger.name);
      setSex(selectedTemplatePassenger.sex);
      setPclass(selectedTemplatePassenger.pclass);
      setAge(selectedTemplatePassenger.age !== undefined ? selectedTemplatePassenger.age : 28);
      setFare(selectedTemplatePassenger.fare);
      setCabin(selectedTemplatePassenger.cabin || '');
      // Estimate companions if missing
      setSibsp(0);
      setParch(0);
      setGeminiResult(null); // clear previous AI analysis
      setAiError(null);
    }
  }, [selectedTemplatePassenger]);

  // Loading sequence text
  const loadingSteps = [
    'Verifying ticket on passenger manifest...',
    'Analyzing cabin location & deck depth...',
    'Evaluating "Women and Children First" boat allocation...',
    'Generating historical timeline & story narrative...',
    'Completing AI survival prediction...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAiLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isAiLoading]);

  // Real-time client survival score
  const localSurvivalProbability = useMemo(() => {
    return predictSurvival(weights, { sex, pclass, age, fare });
  }, [weights, sex, pclass, age, fare]);

  const handleQuickTemplate = (type: string) => {
    onClearTemplate();
    setGeminiResult(null);
    setAiError(null);
    
    if (type === 'rose') {
      setName('Rose DeWitt Bukater');
      setSex('female');
      setPclass(1);
      setAge(17);
      setFare(150);
      setCabin('B52');
      setSibsp(0);
      setParch(1);
    } else if (type === 'jack') {
      setName('Jack Dawson');
      setSex('male');
      setPclass(3);
      setAge(20);
      setFare(7.25);
      setCabin('');
      setSibsp(0);
      setParch(0);
    } else if (type === 'captain') {
      setName('Captain Edward John Smith');
      setSex('male');
      setPclass(1);
      setAge(62);
      setFare(0);
      setCabin('A1');
      setSibsp(0);
      setParch(0);
    } else if (type === 'baby') {
      setName('Millvina Dean (Infant)');
      setSex('female');
      setPclass(3);
      setAge(0.16); // 2 months old
      setFare(20.5);
      setCabin('');
      setSibsp(1);
      setParch(1);
    }
  };

  const handleAskGemini = async () => {
    setIsAiLoading(true);
    setAiError(null);
    setGeminiResult(null);
    setLoadingStep(0);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          sex,
          pclass,
          age,
          fare,
          cabin,
          sibsp,
          parch
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server responded with an error');
      }

      const data = await response.json();
      setGeminiResult(data);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Failed to analyze with Gemini AI. Is your internet active or API Key defined?');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 fade-in">
      
      {/* Left Column: Form & Profile Builder (7 cols) */}
      <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-xs space-y-6">
        
        {/* Header with Quick Templates */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-50 pb-4">
          <div>
            <h4 className="font-display font-semibold text-slate-800 text-lg">Passenger Profiler</h4>
            <p className="text-xs text-slate-400">Design your own passenger or choose a legendary profile below.</p>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleQuickTemplate('rose')}
              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold rounded-lg border border-rose-100 transition-colors"
            >
              Rose
            </button>
            <button
              onClick={() => handleQuickTemplate('jack')}
              className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200 transition-colors"
            >
              Jack
            </button>
            <button
              onClick={() => handleQuickTemplate('captain')}
              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-100 transition-colors"
            >
              Captain
            </button>
            <button
              onClick={() => handleQuickTemplate('baby')}
              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg border border-emerald-100 transition-colors"
            >
              Millvina
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          
          {/* Passenger Name */}
          <div className="grid grid-cols-1 gap-1">
            <label className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" /> Passenger Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                onClearTemplate();
                setName(e.target.value);
              }}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-sm"
              placeholder="e.g. John Jacob Astor"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-500 font-medium">Gender</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClearTemplate();
                    setSex('male');
                  }}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    sex === 'male'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClearTemplate();
                    setSex('female');
                  }}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    sex === 'female'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Ticket Cabin Class */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Ship className="w-3.5 h-3.5 text-slate-400" /> Ticket Class
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      onClearTemplate();
                      setPclass(cls);
                      // Adjust default fare based on class to match historical averages
                      if (cls === 1 && fare < 30) setFare(84);
                      else if (cls === 2 && (fare < 10 || fare > 50)) setFare(21);
                      else if (cls === 3 && fare > 20) setFare(8);
                    }}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      pclass === cls
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cls === 1 ? '1st' : cls === 2 ? '2nd' : '3rd'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Age Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Age</span>
              <span className="font-mono text-slate-800 bg-slate-50 px-2 py-0.5 rounded font-bold">
                {age === 0 ? 'Infant' : `${age} years old`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="1"
              value={age}
              onChange={(e) => {
                onClearTemplate();
                setAge(parseInt(e.target.value, 10));
              }}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Fare Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Ticket Fare Paid</span>
              <span className="font-mono text-slate-800 bg-slate-50 px-2 py-0.5 rounded font-bold">
                £{fare.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="250"
              step="0.5"
              value={fare}
              onChange={(e) => {
                onClearTemplate();
                setFare(parseFloat(e.target.value));
              }}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sibsp */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Siblings/Spouses
              </label>
              <select
                value={sibsp}
                onChange={(e) => {
                  onClearTemplate();
                  setSibsp(parseInt(e.target.value, 10));
                }}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs text-slate-600 bg-white"
              >
                {[0, 1, 2, 3, 4, 5, 8].map(n => (
                  <option key={n} value={n}>{n} aboard</option>
                ))}
              </select>
            </div>

            {/* Parch */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Parents/Children
              </label>
              <select
                value={parch}
                onChange={(e) => {
                  onClearTemplate();
                  setParch(parseInt(e.target.value, 10));
                }}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs text-slate-600 bg-white"
              >
                {[0, 1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n} aboard</option>
                ))}
              </select>
            </div>

            {/* Cabin */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-slate-400" /> Cabin Number
              </label>
              <input
                type="text"
                value={cabin}
                onChange={(e) => {
                  onClearTemplate();
                  setCabin(e.target.value.toUpperCase());
                }}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs text-slate-700 bg-white uppercase placeholder:text-slate-300"
                placeholder="e.g. C123"
              />
            </div>
          </div>

        </div>

        {/* Gemini AI Trigger Button */}
        <div className="pt-4 border-t border-slate-50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAskGemini}
            disabled={isAiLoading}
            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            {isAiLoading ? 'Analysing with Gemini AI...' : 'Ask Gemini AI Expert Analysis'}
          </button>
        </div>

      </div>

      {/* Right Column: Predictive Results & Story Cards (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Real-time client-side ML gauge */}
        <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl shadow-md flex flex-col items-center text-center space-y-5 relative overflow-hidden">
          {/* Subtle background ship vector */}
          <div className="absolute right-0 bottom-0 opacity-5 -translate-x-2 translate-y-2 select-none pointer-events-none">
            <Anchor className="w-48 h-48" />
          </div>

          <div className="w-full flex justify-between items-center text-xs border-b border-slate-800 pb-2">
            <span className="font-mono text-slate-400 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-blue-400" /> CLIENT ML PREDICTOR</span>
            <span className="font-mono text-emerald-400 font-bold">LOGISTIC REGRESSION</span>
          </div>

          {/* Survival Gauge Meter */}
          <div className="relative flex items-center justify-center">
            {/* Circular track */}
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="64"
                className={`${
                  localSurvivalProbability >= 0.7
                    ? 'stroke-emerald-500'
                    : localSurvivalProbability >= 0.4
                    ? 'stroke-amber-500'
                    : 'stroke-rose-500'
                } transition-all duration-300 ease-out`}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 64}
                strokeDashoffset={2 * Math.PI * 64 * (1 - localSurvivalProbability)}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold font-display tracking-tight text-white font-mono">
                {(localSurvivalProbability * 100).toFixed(0)}%
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Chance</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 text-xs">Calculated Survival Probability:</span>
            <h5 className="font-display font-bold text-sm">
              {localSurvivalProbability >= 0.7 ? (
                <span className="text-emerald-400">Survival Highly Probable</span>
              ) : localSurvivalProbability >= 0.4 ? (
                <span className="text-amber-400">Uncertain / Intermediate</span>
              ) : (
                <span className="text-rose-400">Perilous / Survival Unlikely</span>
              )}
            </h5>
          </div>

          <p className="text-[11px] text-slate-400 px-2 leading-relaxed">
            As you tweak details on the left, this model recalculates live using optimized dataset coefficients.
          </p>
        </div>

        {/* Gemini AI Results panel */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs space-y-4">
          <div className="flex items-center gap-1.5 border-b border-slate-50 pb-3">
            <Sparkles className="w-4.5 h-4.5 text-indigo-600" />
            <h4 className="font-display font-semibold text-slate-800 text-sm">Gemini Historical AI Response</h4>
          </div>

          {/* Loading State */}
          {isAiLoading && (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-10 h-10 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="space-y-1">
                <h5 className="font-display font-semibold text-xs text-slate-700 animate-pulse">Running AI Simulation...</h5>
                <p className="text-[10px] text-slate-400 font-mono px-4 max-w-xs">{loadingSteps[loadingStep]}</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {aiError && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-800 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <X className="w-4 h-4 text-rose-600" /> Analysis Failed
              </div>
              <p className="leading-relaxed">{aiError}</p>
            </div>
          )}

          {/* Success Result */}
          {geminiResult && !isAiLoading && (
            <div className="space-y-5 fade-in">
              
              {/* Likelihood & percentage side by side */}
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono uppercase">AI Likelihood</span>
                  <span className={`text-base font-bold font-display ${
                    geminiResult.survivalLikelihood === 'High'
                      ? 'text-emerald-600'
                      : geminiResult.survivalLikelihood === 'Medium'
                      ? 'text-amber-600'
                      : 'text-rose-600'
                  }`}>
                    {geminiResult.survivalLikelihood}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono uppercase">AI Ratio</span>
                  <span className="text-xl font-extrabold font-mono text-slate-800">
                    {geminiResult.survivalPercentage}%
                  </span>
                </div>
              </div>

              {/* Story Narrative Box */}
              <div className="p-4 bg-blue-50/50 border border-blue-50 rounded-2xl space-y-1">
                <span className="text-[10px] text-blue-600 font-semibold font-mono uppercase block tracking-wider">A Night of April 14, 1912</span>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{geminiResult.fictionalNarrative}"
                </p>
              </div>

              {/* Historical Context reasoning */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold font-mono uppercase block">Historical Context</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {geminiResult.historicalReasoning}
                </p>
              </div>

              {/* Actionable maritime safety tips */}
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-1">
                <span className="text-[10px] text-emerald-700 font-semibold font-mono uppercase block tracking-wider">Historical Escape Tip</span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {geminiResult.actionableTips}
                </p>
              </div>

            </div>
          )}

          {/* Idle State */}
          {!geminiResult && !isAiLoading && !aiError && (
            <div className="py-12 flex flex-col items-center text-center text-slate-400 space-y-3">
              <Compass className="w-8 h-8 text-slate-300 animate-float" />
              <div className="space-y-1 px-4">
                <h5 className="font-display font-medium text-xs text-slate-500">No AI analysis requested yet</h5>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Click 'Ask Gemini AI Expert Analysis' above to get a complete, customized historical simulation and narrative!
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
