export function isOutDated(date) {
	if (Date.now() - date > (1000 * 60 * 10)) {
		return true
	}
	return false
}
