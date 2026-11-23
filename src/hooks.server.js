import { api } from '#lib/server/api.js';

export async function handle({ event, resolve }) {
	const token = event.cookies.get('session');
	event.locals.token = token;
	event.locals.user = null;

	if (token) {
		const res = await api('/api/auth/me', token);
		if (res.status === 200) {
			event.locals.user = res.data.user;
		}
	}

	return resolve(event);
}
