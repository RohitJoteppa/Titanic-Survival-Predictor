import React, { useState, useEffect } from 'react';
import { getPassengers, Passenger } from './data/titanicDataset';
import { ModelWeights, trainModel } from './utils/mlModel';
import PredictorForm from './components/PredictorForm';
import DatasetExplorer from './components/DatasetExplorer';
import DashboardCharts from './components/DashboardCharts';
import ModelPlayground from './components/ModelPlayground';
import { Ship, Database, BarChart3, Binary, Compass, Info } from 'lucide-react';

export default function App() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [activeTab, setActiveTab] = useState<'predictor' | 'dataset' | 'charts' | 'playground'>('predictor');
  
  // Model weights shared across predictor form and machine learning playground
  const [weights, setWeights] = useState<ModelWeights>({
    bias: -0.5,
    sexWeight: 2.5,
    pclassWeight: 1.2,
    ageWeight: -0.4,
    fareWeight: 0.6
  });

  const [selectedTemplate, setSelectedTemplate] = useState<Passenger | null>(null);

  // Load passengers and do an initial fast-training on mount
  useEffect(() => {
    const list = getPassengers();
    setPassengers(list);
    
    // Train initial model with default learning rate & epochs to get high-accuracy baseline
    const trained = trainModel(list, 0.1, 500);
    setWeights(trained.weights);
  }, []);

  const handleSelectPassengerFromExplorer = (p: Passenger) => {
    setSelectedTemplate(p);
    setActiveTab('predictor');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Top Navigation Banner */}
      <header className="bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-inner animate-pulse">
              <Ship className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight sm:text-2xl">Titanic Survival Predictor</h1>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Machine Learning & Historical Analysis Playground</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              Dataset Seed: {passengers.length} Active Records
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Tab Selection Navigation */}
        <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('predictor')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 font-display transition-all whitespace-nowrap ${
              activeTab === 'predictor'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Compass className="w-4.5 h-4.5" /> Predictor Form
          </button>
          
          <button
            onClick={() => setActiveTab('dataset')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 font-display transition-all whitespace-nowrap ${
              activeTab === 'dataset'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Database className="w-4.5 h-4.5" /> Dataset Explorer
          </button>
          
          <button
            onClick={() => setActiveTab('charts')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 font-display transition-all whitespace-nowrap ${
              activeTab === 'charts'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <BarChart3 className="w-4.5 h-4.5" /> Visual Insights
          </button>
          
          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 font-display transition-all whitespace-nowrap ${
              activeTab === 'playground'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Binary className="w-4.5 h-4.5" /> ML Playground
          </button>
        </div>

        {/* Tab Content Rendering */}
        <div className="py-2">
          {activeTab === 'predictor' && (
            <PredictorForm
              weights={weights}
              selectedTemplatePassenger={selectedTemplate}
              onClearTemplate={() => setSelectedTemplate(null)}
            />
          )}

          {activeTab === 'dataset' && (
            <DatasetExplorer
              passengers={passengers}
              onSelectPassenger={handleSelectPassengerFromExplorer}
              selectedPassengerId={selectedTemplate?.id}
            />
          )}

          {activeTab === 'charts' && (
            <DashboardCharts passengers={passengers} />
          )}

          {activeTab === 'playground' && (
            <ModelPlayground
              passengers={passengers}
              weights={weights}
              onUpdateWeights={(newWeights) => setWeights(newWeights)}
            />
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 1912 - 2026 Titanic Dataset Survival Prediction Hub. Educational Research Resource.</p>
        </div>
      </footer>

    </div>
  );
}
