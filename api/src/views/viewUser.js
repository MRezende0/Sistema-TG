export default {
	render(user) {
		return {
			id: user.id,
			token: user.token,
			name: user.name,
			email: user.email,
			phone: user.phone,
			ra: user.RA,
			type: user.type,
			course: user.course,
		};
	},
	renderMany(users) {
		return users.map((user) => this.render(user));
	},
};
