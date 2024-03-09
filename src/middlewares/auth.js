import jwt from "jsonwebtoken"

export const auth = async (req, res, next) => {
    try {

        
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json(
                {
                    success: false,
                    message: "UNAUTHORIZED"
                })
        }

        jwt.verify(
            token,
            process.env.JWT_SECRET );
        
        const decoder = jwt.decode(token);
       
       req.tokenData = decoder;
        next();
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Something went wrong",
                error: error
            })
    }

}