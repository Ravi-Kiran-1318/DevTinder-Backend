const adminAuth=(req, res, next) => {
    const token="xyz";
    const authHeader=token==="xyz";
    if(!authHeader){
        return res.status(401).json({message:"Unauthorized access"});
    }
    next();
}

const userAuth=(req, res, next) => {
    const token="xyz";
    const authHeader=token==="xyz";
    if(!authHeader){
        return res.status(401).json({message:"Unauthorized user"});
    }
    next();
}

module.exports={adminAuth,userAuth};