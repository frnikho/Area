export const RouteNotFoundMiddleware = (req, res) => {
    return res.status(404).json({error: 'Invalid route !'});
}
