const fs = require('fs');
const axios = require('axios');

const apiUrl = 'def86.php';

const fetchData = async (id) => {
  const url = `${apiUrl}${id}&quality=0&type=0`;

  try {
    const response = await axios.get(url);
    const { data } = response.data;

    const { name, ua, ref, link, token } = data;

    const responseData = {
      id,
      name,
      ua,
      ref,
      link,
      token
    };

    return responseData;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}:`, error.message);
    return null;
  }
};

const startFetching = async () => {
  let allResponses = [];
  const filePath = 'responses.json';
  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath, 'utf8');
    allResponses = JSON.parse(existingData);
  }

  const newResponses = [];

  for (let id = 1501; id < 2001; id++) {
    const response = await fetchData(id);
    if (response) {
      newResponses.push(response);
    }
  }

  allResponses = allResponses.concat(newResponses);

  fs.writeFileSync(filePath, JSON.stringify(allResponses, null, 2));
  console.log(`All responses saved successfully in ${filePath}.`);
};

startFetching();