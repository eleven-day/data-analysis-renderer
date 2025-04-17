// src/components/ApiIntegration.tsx

import React, { useState } from 'react';
import { fetchAnalysisFromApi } from '../services/api';

interface ApiIntegrationProps {
  onTextReceived: (text: string) => void;
}

function ApiIntegration({ onTextReceived }: ApiIntegrationProps) {
  const [apiUrl, setApiUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!apiUrl) {
      setError('Please enter an API URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const text = await fetchAnalysisFromApi(apiUrl);
      onTextReceived(text);
    } catch (err) {
      setError('Failed to fetch data from API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-integration">
      <input
        type="text"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        placeholder="Enter API URL (e.g., http://localhost:8000/api/test-md)"
        style={{ width: '360px', marginRight: '8px' }}
      />
      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Analysis'}
      </button>
      {error && <div className="error" style={{ color: 'red', marginTop: '6px' }}>{error}</div>}
    </div>
  );
}

export default ApiIntegration;