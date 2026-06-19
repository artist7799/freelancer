import apiClient from '../api/axios';

export interface PredictorInput {
  exam: string;
  score: number;
  category: string;
  stream: string;
  preferredState?: string | string[];
  budget?: number;
}

export const predictorService = {
  async predict(data: PredictorInput) {
    const response = await apiClient.post('/predictor/predict', data);
    return response.data;
  },
};

export default predictorService;
