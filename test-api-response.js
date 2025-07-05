// Test script to verify API response structure matches our component expectations

const sampleApiResponse = [
  {
    createdAt: "2025-07-05T13:19:12.688Z",
    id: 17,
    originalUrl: "https://ananya.studio",
    shortId: "9KPOu80F",
    totalClicks: 2,
    uniqueClicks: 2,
    updatedAt: "2025-07-05T13:20:09.607Z"
  },
  {
    id: 16,
    shortId: '0frT57RK',
    originalUrl: 'https://www.pickandpartner.com/',
    totalClicks: 0,
    uniqueClicks: 0,
    createdAt: "2025-07-05T13:19:12.688Z",
    updatedAt: "2025-07-05T13:20:09.607Z"
  }
];

// Validation function similar to what's in the component
function validateApiResponse(data) {
  if (!Array.isArray(data)) {
    console.error('❌ API response is not an array');
    return false;
  }

  const isValid = data.every((item, index) => {
    const checks = {
      hasId: typeof item.id !== 'undefined',
      hasShortId: typeof item.shortId === 'string',
      hasOriginalUrl: typeof item.originalUrl === 'string',
      hasTotalClicks: typeof item.totalClicks === 'number',
      hasUniqueClicks: typeof item.uniqueClicks === 'number',
      hasCreatedAt: typeof item.createdAt === 'string'
    };

    const allValid = Object.values(checks).every(check => check);
    
    if (!allValid) {
      console.error(`❌ Item ${index} validation failed:`, checks);
      console.error('Item data:', item);
    }

    return allValid;
  });

  if (isValid) {
    console.log('✅ API response structure is valid!');
    console.log(`✅ Found ${data.length} valid items`);
  }

  return isValid;
}

// Test with your sample data
console.log('Testing API response validation...');
validateApiResponse(sampleApiResponse);
