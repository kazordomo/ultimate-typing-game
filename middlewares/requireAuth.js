module.exports = (req, res, next) => {
    //req.user is setup by passport.
    if(!req.user) {
        return res.sendStatus(401).send({ error: 'You must log in!' });
    }

    next();
}