//Solution code for the bug. Uses try...catch to handle errors properly
async function fetchDataFromAPI(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; //Re-throw to be handled by parent function
  }
}

async function processData(data) {
  // Simulate an operation that might throw an error
  try {
    if (!data || data.length === 0) {
      throw new Error('Data is empty');
    }
    // ... process data ...
    return data.toUpperCase();
  } catch (error) {
    console.error('Error processing data:', error);
    throw error; //Re-throw
  }
}

export default async function MyServerComponent() {
  try {
    const apiData = await fetchDataFromAPI('/api/data');
    const processedData = await processData(apiData);
    return <div>Processed data: {processedData}</div>;
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
} 