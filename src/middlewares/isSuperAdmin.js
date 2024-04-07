
export const isSuperAdmin =(req,res,next)=>{
    try {
       if (req.tokenData.roleName !=="admin"){
          return res.status(401).json(
               {
                   success: false,
                   message: "Unauthorized",
                   
               })
       }
       next()
    } 
   
    catch (error) {
       res.status(500).json(
           {
               success: false,
               message: "You dont have credentials",
               error: error
           })
    }
   }