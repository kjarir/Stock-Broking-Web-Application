// Inside the dashboardController, pass only the initial data
import axios from 'axios';

// Create an axios instance with custom config
const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000
});

// Add response interceptor to handle rate limiting
api.interceptors.response.use(null, async (error) => {
  if (error.response?.status === 429) {
    const retryAfter = error.response.headers['retry-after'] || 60;
    console.log(`Rate limited. Waiting ${retryAfter} seconds before retrying...`);
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    return api.request(error.config);
  }
  return Promise.reject(error);
});

const fetchWithRetry = async (url, params, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      if (error.response?.status !== 429) throw error;
      
      const retryAfter = error.response.headers['retry-after'] || 60;
      console.log(`Attempt ${i + 1} failed. Retrying in ${retryAfter} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    }
  }
};

const dashboardController = async (req, res) => {
  try {
    const cryptoData = await fetchWithRetry('/coins/markets', {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 30,
      page: 1,
      sparkline: false
    });

    res.render('dashboard', { cryptoData });
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error.message);
    res.status(500).render('error', { 
      message: 'Unable to fetch cryptocurrency data. Please try again later.',
      error: { status: 500, stack: process.env.NODE_ENV === 'development' ? error.stack : '' }
    });
  }
};

export { dashboardController };