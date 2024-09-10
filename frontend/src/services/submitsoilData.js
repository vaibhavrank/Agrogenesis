const API_URL = 'http://localhost:5000';

const submitSoilData = async (soilData) => {
  try {
    const { pH, nitrogen, phosphorus, potassium, organicMatter, texture } = soilData;
    const user = localStorage.getItem('email');

    const response = await fetch(`${API_URL}/api/soil-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        pH, nitrogen, phosphorus, potassium, organicMatter, texture, user
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      alert(`Error: ${errorText || response.statusText}`);
      return;
    }
    console.log("submission sompleterd");
    return await response.json();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

export default submitSoilData;
