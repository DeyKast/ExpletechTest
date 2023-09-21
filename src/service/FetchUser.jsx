import axios from 'axios';

export const FetchUser = async userId => {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}/`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Request error');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default FetchUser;
