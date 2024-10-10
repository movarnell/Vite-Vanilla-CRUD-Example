const BASE_URL = 'https://66db3bfbf47a05d55be77645.mockapi.io/'; // Address of the API
const endpoint = 'todo'; // Endpoint for the todo app

// NOTE: GET request
async function getData() {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// NOTE: POST request
async function postData(data) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}

// NOTE: PUT request
async function putData(id, data) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

// NOTE: DELETE request
async function deleteData(id) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}

export { getData, postData, putData, deleteData };