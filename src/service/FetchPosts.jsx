import axios from 'axios';

export const FetchPosts = async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Request Error');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default FetchPosts;
