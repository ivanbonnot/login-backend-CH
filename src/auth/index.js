function webAuth(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.redirect('/login')
    }
}

function apiAuth(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.status(401).json({ error: 'no autorizado!' })
    }
}

module.exports = { webAuth, apiAuth }