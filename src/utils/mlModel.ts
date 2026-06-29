import { Passenger } from '../data/titanicDataset';

export interface ModelWeights {
  bias: number;
  sexWeight: number;
  pclassWeight: number;
  ageWeight: number;
  fareWeight: number;
}

// Sigmoid activation function
export function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

// Normalize features to [0, 1] range
export function getFeatures(p: { sex: 'male' | 'female'; pclass: number; age?: number; fare: number }) {
  const sexNum = p.sex === 'female' ? 1 : 0;
  // Ordinal: Class 1 = 1.0, Class 2 = 0.5, Class 3 = 0.0
  const pclassNum = p.pclass === 1 ? 1.0 : p.pclass === 2 ? 0.5 : 0.0;
  // Age: use 28 as default if missing, normalized relative to 80 (approx max age)
  const ageNum = (p.age !== undefined ? p.age : 28) / 80;
  // Fare: log-scaled to avoid extreme outlier impact
  const fareNum = Math.min(Math.log((p.fare || 0) + 1) / 6, 1);
  
  return { sexNum, pclassNum, ageNum, fareNum };
}

// Trains a local logistic regression model on the dataset and returns training history for visualization
export interface TrainResult {
  weights: ModelWeights;
  history: { epoch: number; loss: number; accuracy: number }[];
  accuracy: number;
}

export function trainModel(passengers: Passenger[], learningRate: number = 0.1, epochs: number = 500): TrainResult {
  let bias = 0;
  let sexWeight = 0;
  let pclassWeight = 0;
  let ageWeight = 0;
  let fareWeight = 0;
  
  const dataset = passengers.map(p => {
    const { sexNum, pclassNum, ageNum, fareNum } = getFeatures(p);
    return {
      x: [sexNum, pclassNum, ageNum, fareNum],
      y: p.survived ? 1 : 0
    };
  });
  
  const m = dataset.length;
  const history: { epoch: number; loss: number; accuracy: number }[] = [];
  
  for (let epoch = 1; epoch <= epochs; epoch++) {
    let db = 0;
    let dw0 = 0;
    let dw1 = 0;
    let dw2 = 0;
    let dw3 = 0;
    let totalLoss = 0;
    let correctCount = 0;
    
    for (const item of dataset) {
      const [x0, x1, x2, x3] = item.x;
      const z = bias + sexWeight * x0 + pclassWeight * x1 + ageWeight * x2 + fareWeight * x3;
      const pred = sigmoid(z);
      const error = pred - item.y;
      
      // Binary Cross-Entropy Loss
      const lossVal = - (item.y * Math.log(Math.max(pred, 1e-15)) + (1 - item.y) * Math.log(Math.max(1 - pred, 1e-15)));
      totalLoss += lossVal;
      
      // Calculate accuracy
      const predictedClass = pred >= 0.5 ? 1 : 0;
      if (predictedClass === item.y) {
        correctCount++;
      }
      
      db += error;
      dw0 += error * x0;
      dw1 += error * x1;
      dw2 += error * x2;
      dw3 += error * x3;
    }
    
    // Gradient step
    bias -= (learningRate * db) / m;
    sexWeight -= (learningRate * dw0) / m;
    pclassWeight -= (learningRate * dw1) / m;
    ageWeight -= (learningRate * dw2) / m;
    fareWeight -= (learningRate * dw3) / m;
    
    // Save history periodically
    if (epoch === 1 || epoch === 5 || epoch === 10 || epoch % 50 === 0 || epoch === epochs) {
      history.push({
        epoch,
        loss: totalLoss / m,
        accuracy: correctCount / m
      });
    }
  }
  
  // Calculate final accuracy
  let finalCorrect = 0;
  for (const item of dataset) {
    const [x0, x1, x2, x3] = item.x;
    const z = bias + sexWeight * x0 + pclassWeight * x1 + ageWeight * x2 + fareWeight * x3;
    const pred = sigmoid(z);
    const predictedClass = pred >= 0.5 ? 1 : 0;
    if (predictedClass === item.y) {
      finalCorrect++;
    }
  }
  const accuracy = finalCorrect / m;
  
  return {
    weights: { bias, sexWeight, pclassWeight, ageWeight, fareWeight },
    history,
    accuracy
  };
}

export function predictSurvival(
  weights: ModelWeights,
  passenger: { sex: 'male' | 'female'; pclass: number; age?: number; fare: number }
): number {
  const { sexNum, pclassNum, ageNum, fareNum } = getFeatures(passenger);
  const z = weights.bias + 
    weights.sexWeight * sexNum + 
    weights.pclassWeight * pclassNum + 
    weights.ageWeight * ageNum + 
    weights.fareWeight * fareNum;
  return sigmoid(z);
}
