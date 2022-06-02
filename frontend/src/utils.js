export const avatarSlice = (login) => {
    return login.slice(0, 2).toUpperCase()
}

export const statusSubscribe = (is) => {
    return is ? 'активна' : 'отсутствует'
}

export const ratingRound = (rating) => {
    return Number(rating).toFixed(1)
}