// Test script to validate the API response structure
const mockApiResponse = {
  data: [
    {
      id: 17,
      shortId: '9KPOu80F',
      originalUrl: 'https://ananya.studio',
      totalClicks: 2,
      uniqueClicks: 2,
      createdAt: '2025-07-05T13:19:12.688Z',
      updatedAt: '2025-07-05T13:20:09.607Z'
    },
    {
      id: 16,
      shortId: '0frT57RK',
      originalUrl: 'https://www.pickandpartner.com/',
      totalClicks: 0,
      uniqueClicks: 0,
      createdAt: '2025-07-05T13:19:12.688Z',
      updatedAt: '2025-07-05T13:20:09.607Z'
    }
  ],
  pagination: {
    totalCount: 17,
    totalPages: 2,
    currentPage: 1,
    limit: 10
  }
};

// Test data validation
function validateData(response) {
  if (!response.data || !Array.isArray(response.data)) {
    console.error('❌ Invalid structure: missing data array');
    return false;
  }

  const isValidData = response.data.every((item) => 
    item && 
    typeof item.id === 'number' && 
    typeof item.shortId === 'string' && 
    typeof item.originalUrl === 'string' &&
    typeof item.totalClicks === 'number' &&
    typeof item.uniqueClicks === 'number' &&
    typeof item.createdAt === 'string'
  );

  if (!isValidData) {
    console.error('❌ Invalid data structure in array items');
    return false;
  }

  console.log('✅ Data structure validation passed');
  console.log('✅ Found', response.data.length, 'URL entries');
  console.log('✅ Pagination info:', response.pagination);
  return true;
}

// Run validation
validateData(mockApiResponse);
