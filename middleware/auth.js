import jwt from 'jsonwebtoken'

export const authenticationToken = async (req, res, next)=> {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Veuillez préciser le token d'autorisation"});
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log(err)
        return res.status(403).json({ 
            errorCode: "JWT_INVALID",
            message: 'Votre session a expiré, veuillez vous reconnecter' 
        });
    }

    next();
}