import React, { useState } from 'react';

function App() {
  const [responseData, setResponseData] = useState(null);
  const [postData, setPostData] = useState('');
  const [postResponse, setPostResponse] = useState(null);

  const handleGetTest = async () => {
    const response = await fetch('/test');
    const data = await response.json();
    setResponseData(data);
    setPostResponse(null); // Clear post response when making a new GET request
  };

  const handlePostTest = async () => {
    try {
      const response = await fetch('/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: postData }),
      });
      const data = await response.json();
      setPostResponse(data);
      setResponseData(null); // Clear GET response when making a new POST request
    } catch (error) {
      console.error('Error posting data:', error);
      setPostResponse({ error: 'Failed to post data' });
    }
  };

  const handleInputChange = (event) => {
    setPostData(event.target.value);
  };

  return (
    <div className="App">
      <h1>TestApp</h1>

      <h2>GET /test</h2>
      <button onClick={handleGetTest}>Run GET Request</button>
      {responseData && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}

      <hr />

      <h2>POST /test</h2>
      <input
        type="text"
        value={postData}
        onChange={handleInputChange}
        placeholder="Enter data to post"
      />
      <button onClick={handlePostTest} disabled={!postData}>Run POST Request</button>
      {postResponse && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(postResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
