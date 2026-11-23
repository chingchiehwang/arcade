import { redirect } from '@sveltejs/kit';
import { api } from '#lib/server/api.js';

export const actions = {
	default: async ({ locals, cookies }) => {
		await api('/api/auth/logout', locals.token, 'POST');
		cookies.delete('session');
		redirect(303, '/');
	}
};
