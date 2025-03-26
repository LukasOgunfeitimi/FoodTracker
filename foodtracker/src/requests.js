const keys = [47, 64, 87, 65];

const encrypt = (str) =>
	Array.from(str)
		.map((char, index) => 
			String.fromCharCode(
				char.charCodeAt(0) ^ keys[index % keys.length]
		)).join('');

const decrypt = (str) => encrypt(str);

const headers ={
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

const host = 'http://localhost:2000/';

export default {
    login: async () => {
        const res = await request(`${host}exerciser/login`, 'POST', querystring.stringify(creds));
        profileUUID = res.uuid;
        return res;
    },

    profile: async () => 
        await request(`${host}exerciser/${profileUUID}/profile`, 'GET'),

    membership: async () => 
        await request(`${host}exerciser/${profileUUID}/membership`, 'GET'),

    history: async () => {
        const currentYear = new Date().getFullYear();
        const endDate = `${currentYear}-12-31T23%3A59%3A59`;
        const startDate = `2010-01-01T00%3A00%3A00`;
        return await request(`${host}exercisers/${profileUUID}/check-ins/history?endDate=${endDate}&startDate=${startDate}`, 'GET');
    },

    deleteFood: async (id) =>
        await request(`${host}food`, 'DELETE', id),

    gyms: async () => 
        await request(`${host}thegymgroup/v1.0/exercisers/${profileUUID}/gym-locations`, 'GET')
};