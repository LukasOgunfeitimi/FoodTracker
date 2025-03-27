const keys = [0x7F, 0xE3, 0xA9, 0x1C, 0xD4, 0x56, 0x92, 0xAC, 0xF0, 0xB8, 0x4D, 0x75, 0x6A, 0x3E, 0x01, 0xFC];

const encrypt = (str) =>
	Array.from(str)
		.map((char, index) => 
			String.fromCharCode(
				char.charCodeAt(0) ^ keys[index % keys.length]
		)).join('');

const decrypt = (str) => encrypt(str);

const headers = {
	'Content-Type': 'application/json', // Make sure the Content-Type is application/json
}

function request(url, method = 'GET', payload) {
    const options = {
        method,
		    headers,
        body: payload ? JSON.stringify({
			data: encrypt(payload)
		 }) : null,
    }
    return fetch(url, options)
        .then(res => res.json())
		.then(body => Promise.resolve(JSON.parse(decrypt(body.data))));
}

export default {
    getAllFoods: async () =>
      await request(`getAllFoods`),

    addFoodToDatabase: async (food) =>
      await request(`addFoodToDB`, 'POST', food),

    getActiveFoods: async () =>
      await request(`getActiveFoods`),

    addFoodsToActive: async (food) =>
      await request(`setActiveFoods`, 'POST', food),
    
    getAllMeals: async () =>
      await request(`getAllMeals`),

    addMealToDatabase: async(meal) =>
      await request(`addMealToDB`, 'POST', meal),

};