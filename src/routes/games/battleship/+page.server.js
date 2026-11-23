import { error, fail, redirect } from '@sveltejs/kit';
import { api } from '#lib/server/api.js';

export async function load({ locals }) {
	if (!locals.user) {
		redirect(303, '/login');
	}
	const res = await api('/api/games', locals.token);
	if (res.status !== 200) {
		error(res.status, res.data.error);
	}
	return { waiting: res.data.waiting, mine: res.data.mine };
}

export const actions = {
	create: async ({ locals }) => {
		const res = await api('/api/games', locals.token, 'POST');
		if (res.status !== 201) {
			return fail(res.status, { error: res.data.error });
		}
		redirect(303, '/games/battleship/' + res.data.game.id);
	},

	join: async ({ request, locals }) => {
		const form = await request.formData();
		const id = form.get('id');
		const res = await api('/api/games/' + id + '/players', locals.token, 'POST');
		if (res.status !== 201) {
			return fail(res.status, { error: res.data.error });
		}
		redirect(303, '/games/battleship/' + id);
	}
};
