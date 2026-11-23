import { error, fail } from '@sveltejs/kit';
import { api } from '#lib/server/api.js';

export async function load({ params, locals }) {
	const res = await api('/api/games/' + params.id, locals.token);
	if (res.status !== 200) {
		error(res.status, res.data.error);
	}
	return { game: res.data.game };
}

export const actions = {
	fire: async ({ request, params, locals }) => {
		const form = await request.formData();
		const [x, y] = form.get('block').split(',').map(Number);

		const res = await api('/api/games/' + params.id + '/shots', locals.token, 'POST', { x: x, y: y });
		if (res.status !== 201) {
			return fail(res.status, { error: res.data.error });
		}
		return { success: true };
	}
};
