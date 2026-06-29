import React, { useState, useMemo } from 'react';
import { Passenger } from '../data/titanicDataset';
import { trainModel, TrainResult, ModelWeights } from '../utils/mlModel';
import { Play, RotateCcw, AlertCircle, Info, Settings, Code, Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface ModelPlaygroundProps {
  passengers: Passenger[];
  weights: ModelWeights;
  onUpdateWeights: (newWeights: ModelWeights) => void;
}

export default function ModelPlayground({
  passengers,
  weights,
  onUpdateWeights
}: ModelPlaygroundProps) {
  const [learningRate, setLearningRate] = useState(0.1);
  const [epochs, setEpochs] = useState(500);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingHistory, setTrainingHistory] = useState<TrainResult['history']>([]);
  const [modelAccuracy, setModelAccuracy] = useState<number | null>(null);

  // Initial trigger for training so we have history
  React.useEffect(() => {
    handleTrain();
  }, []);

  const handleTrain = () => {
    setIsTraining(true);
    // Add small delay to simulate dynamic updates if needed, but synchronous is very fast
    setTimeout(() => {
      const result = trainModel(passengers, learningRate, epochs);
      onUpdateWeights(result.weights);
      setTrainingHistory(result.history);
      setModelAccuracy(result.accuracy);
      setIsTraining(false);
    }, 300);
  };

  const handleReset = () => {
    setLearningRate(0.1);
    setEpochs(500);
    // Retrain with default
    setTimeout(() => {
      const result = trainModel(passengers, 0.1, 500);
      onUpdateWeights(result.weights);
      setTrainingHistory(result.history);
      setModelAccuracy(result.accuracy);
    }, 50);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 space-y-1">
          <span className="font-semibold text-slate-800 block text-sm">Interactive Client-Side Machine Learning</span>
          <p>
            This application trains a <strong>Logistic Regression model</strong> right in your browser!
            It uses gradient descent on the actual Titanic dataset. It evaluates features like sex, ticket class, age, and fare to predict a passenger's survival probability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hyperparameter controls */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
            <Settings className="w-4.5 h-4.5 text-blue-600" />
            <h4 className="font-display font-semibold text-slate-800">Hyperparameters</h4>
          </div>

          <div className="space-y-4">
            {/* Learning Rate Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Learning Rate (α)</span>
                <span className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold">{learningRate}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[10px] text-slate-400">Controls how large of a step the optimizer takes during model updates.</p>
            </div>

            {/* Epochs Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Training Epochs (Cycles)</span>
                <span className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold">{epochs}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={epochs}
                onChange={(e) => setEpochs(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[10px] text-slate-400">Number of passes the algorithm makes over the entire dataset.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={handleTrain}
              disabled={isTraining}
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5" /> {isTraining ? 'Training Model...' : 'Train ML Model'}
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
          </div>
        </div>

        {/* Training Diagnostics Line Charts */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-50 pb-3">
            <div>
              <h4 className="font-display font-semibold text-slate-800">Training Loss & Convergence</h4>
              <p className="text-[10px] text-slate-400">Watch the error rate decrease over epochs as weights optimize.</p>
            </div>
            {modelAccuracy !== null && (
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Overall Accuracy</span>
                <span className="text-lg font-bold text-emerald-600 font-mono">{(modelAccuracy * 100).toFixed(1)}%</span>
              </div>
            )}
          </div>

          {trainingHistory.length > 0 ? (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingHistory} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="epoch" stroke="#94a3b8" fontSize={10} label={{ value: 'Epoch', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                  />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={2.5} name="Error Rate (Loss)" dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={1.5} name="Accuracy Rate" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-60 flex items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <span className="text-xs text-slate-400">Ready to train... click 'Train ML Model'</span>
            </div>
          )}
        </div>

      </div>

      {/* Model Weights Summary & Math */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Weights Dashboard */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4">
          <div>
            <h4 className="font-display font-semibold text-slate-800">Optimized Feature Weights</h4>
            <p className="text-xs text-slate-400">Coefficients mapped by gradient descent. Positive increases survival likelihood.</p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Female Weight */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-semibold text-slate-800 block font-sans">Gender Influence (Sex = Female)</span>
                <span className="text-[10px] text-slate-400 block font-mono">Weight parameter w1</span>
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded ${weights.sexWeight >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {weights.sexWeight >= 0 ? '+' : ''}{weights.sexWeight.toFixed(4)}
              </span>
            </div>

            {/* Pclass Weight */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-semibold text-slate-800 block font-sans">Ticket Cabin Priority (Class = 1st)</span>
                <span className="text-[10px] text-slate-400 block font-mono">Weight parameter w2</span>
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded ${weights.pclassWeight >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {weights.pclassWeight >= 0 ? '+' : ''}{weights.pclassWeight.toFixed(4)}
              </span>
            </div>

            {/* Age Weight */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-semibold text-slate-800 block font-sans">Youth/Age Influence (Younger Age)</span>
                <span className="text-[10px] text-slate-400 block font-mono">Weight parameter w3</span>
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded ${weights.ageWeight >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {weights.ageWeight >= 0 ? '+' : ''}{weights.ageWeight.toFixed(4)}
              </span>
            </div>

            {/* Fare Weight */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-semibold text-slate-800 block font-sans">Wealth Factor (Log-Fare Paid)</span>
                <span className="text-[10px] text-slate-400 block font-mono">Weight parameter w4</span>
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded ${weights.fareWeight >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {weights.fareWeight >= 0 ? '+' : ''}{weights.fareWeight.toFixed(4)}
              </span>
            </div>

            {/* Bias */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-semibold text-slate-800 block font-sans">Model Baseline (Bias / Intercept)</span>
                <span className="text-[10px] text-slate-400 block font-mono">Parameter θ0</span>
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded ${weights.bias >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {weights.bias >= 0 ? '+' : ''}{weights.bias.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Theoretical Equation and explanation */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" />
            <h4 className="font-display font-semibold text-slate-800">Mathematical Model Equation</h4>
          </div>

          <div className="space-y-4 text-xs text-slate-600">
            <p>
              The survival probability is calculated using the standard Logistic (Sigmoid) function:
            </p>

            <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] overflow-x-auto space-y-2">
              <div className="text-slate-400">// Logistic Function formula</div>
              <div className="text-amber-300">P(Survival) = 1 / (1 + e^(-z))</div>
              <div className="text-slate-400">// where z is the linear combination:</div>
              <div>
                z = <span className="text-sky-300">{weights.bias.toFixed(3)}</span> 
                {weights.sexWeight >= 0 ? ' + ' : ' - '}<span className="text-emerald-300">{Math.abs(weights.sexWeight).toFixed(3)}</span> * (Sex)
                {weights.pclassWeight >= 0 ? ' + ' : ' - '}<span className="text-emerald-300">{Math.abs(weights.pclassWeight).toFixed(3)}</span> * (Class)
                {weights.ageWeight >= 0 ? ' + ' : ' - '}<span className="text-emerald-300">{Math.abs(weights.ageWeight).toFixed(3)}</span> * (Age)
                {weights.fareWeight >= 0 ? ' + ' : ' - '}<span className="text-emerald-300">{Math.abs(weights.fareWeight).toFixed(3)}</span> * (Fare)
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-slate-800 block text-xs">Feature Mappings Explanation:</span>
              <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                <li><strong>Sex</strong>: Female mapped as <code className="bg-slate-50 px-1 py-0.5 rounded border">1</code>, Male as <code className="bg-slate-50 px-1 py-0.5 rounded border">0</code>.</li>
                <li><strong>Class</strong>: 1st Class mapped as <code className="bg-slate-50 px-1 py-0.5 rounded border">1.0</code>, 2nd as <code className="bg-slate-50 px-1 py-0.5 rounded border">0.5</code>, 3rd as <code className="bg-slate-50 px-1 py-0.5 rounded border">0.0</code>.</li>
                <li><strong>Age</strong>: Normalized value <code className="bg-slate-50 px-1 py-0.5 rounded border">Age / 80</code>.</li>
                <li><strong>Fare</strong>: Log-scaled value <code className="bg-slate-50 px-1 py-0.5 rounded border">log(Fare + 1) / 6</code> (capped at 1.0).</li>
              </ul>
            </div>
            
            <div className="border-t border-slate-50 pt-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="text-[10px] text-slate-400">
                Notice how the <strong>Sex</strong> weight is strongly positive. This is because the historical data shows women were given high lifeboat loading priority.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
