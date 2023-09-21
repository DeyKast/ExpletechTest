import axios from 'axios';

export const FetchComments = async postId => {
  const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default FetchComments;
