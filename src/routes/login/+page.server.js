import { fail, redirect } from '@sveltejs/kit';
import { api } from '#lib/server/api.js';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		const res = await api('/api/auth/login', null, 'POST', { email: email, password: password });
		if (res.status !== 200) {
			return fail(res.status, { error: res.data.error });
		}

		cookies.set('session', res.data.token);
		redirect(303, '/');
	}
};
