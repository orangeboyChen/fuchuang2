function login(username, password) {
    return this.$axios.post({
        url: '/admin/login',
        data: {
            username,
            password
        }
    })
}

export default login
