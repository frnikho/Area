export const buildAuthorizationHeaders = (token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}
