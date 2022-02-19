export function generateAuthError(message) {
	switch (message) {
	case "INVALID_PASSWORD":
		return "Вы ввели неверный пароль."
	case "EMAIL_EXISTS":
		return "Пользователь с таким email уже существует."
	case "EMAIL_NOT_FOUND":
		return "Учетная запись с такой почтой не зарегистрирована."
	default:
		return "Слишком много попыток входа. Попробуйте позже."
	}
}
