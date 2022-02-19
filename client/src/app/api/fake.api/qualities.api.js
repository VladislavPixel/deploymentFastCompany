const qualities = {
	tedious: {
		_id: "67rdca3eeb7f6fgeed471198",
		name: "Нудила",
		color: "primary"
	},
	strange: {
		_id: "67rdca3eeb7f6fgeed471100",
		name: "Странный",
		color: "secondary"
	},
	buller: {
		_id: "67rdca3eeb7f6fgeed4711012",
		name: "Троль",
		color: "success"
	},
	alcoholic: {
		_id: "67rdca3eeb7f6fgeed471101",
		name: "Алкоголик",
		color: "danger"
	},
	handsome: {
		_id: "67rdca3eeb7f6fgeed471102impot",
		name: "Красавчик",
		color: "info"
	},
	uncertain: {
		_id: "67rdca3eeb7f6fgeed471102",
		name: "Неуверенный",
		color: "dark"
	}
}

export { qualities }

export default function getQualities() {
	return new Promise((resolve) => {
		window.setTimeout(() => {
			resolve(qualities)
		}, 1000)
	})
}
