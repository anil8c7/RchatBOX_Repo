const authentication =  require('../services/auth');
 const restrictedUserOnly = (req, resp, next) =>{
    const uid = req.headers['x-uid'] ? req.headers['x-uid']:"";
   console.log(uid)
    if(!uid) {
        const data = {
            status: 403,
            message: "User is not logged in"
        }
        return resp.status(403).json(data);
    }
        const isUser = authentication.getUser(uid)
        if(!isUser) {
           const data = {
                status: 403,
                message: "User is not logged in"
            }
            return resp.status(403).json(data);
        }
            
    next();
 }

 module.exports = restrictedUserOnly;