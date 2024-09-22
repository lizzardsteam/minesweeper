export function isEmailValid(email: string): boolean {
    let re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(email.toLowerCase())
}

export function isUsernameValid(username: string): boolean {
    if (username.length < 4) {
        return false
    }

    return true
}

export function isPasswordValid(password: string): boolean {
    if (password.length < 4) {
        return false
    }

    return true
}
