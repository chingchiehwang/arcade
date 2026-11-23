const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function api(path, token, method = 'GET', body) {
	const headers = { 'Content-Type': 'application/json' };
	if (token) headers.Authorization = 'Bearer ' + token;

	try {
		const res = await fetch(API_URL + path, {
			method: method,
			headers: headers,
			body: body ? JSON.stringify(body) : undefined
		});
		const data = await res.json();
		return { status: res.status, data: data };
	} catch {
		return { status: 503, data: { error: 'Could not reach the API' } };
	}
}
