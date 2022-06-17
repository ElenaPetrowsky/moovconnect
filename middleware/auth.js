function authenticationToken(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: "Veuillez préciser le token d'autorisation"});
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(403).json({ message: 'Le token que vous avez rensieigné est invalide' });
    }

    next();
}