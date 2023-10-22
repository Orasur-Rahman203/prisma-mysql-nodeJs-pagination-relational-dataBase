const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();


// async function handleSignUP(req, res){
//     //Existing User check
//     //Hashed password
//     //User creation
//     //Token generate
//     const {fullName, email, password}=req.query;
//     try{
//     const existingUser=await user_info.findOne({email:email})
//     if(existingUser){
//       return res.status(400).json({message:"User already exists"})
//     }
//       const hashedPassword=await bcrypt.hash(password, 10);
    
//       const result=await user_info.create({
//         email:email,
//         password:hashedPassword,
//         fullName:fullName,
//       })
    
//       const token=jwt.sign({email:result.email, id:result.uid}, SECRET_KEY)
//       return res.status(201).json({message:"User Created", result, token:token})
    
//     }catch (error){
//       return res.status(500).json({message: "something went wrong"});
//     }
//     }
    
    
//     async function handleSignIn(req, res){
//       const {fullName, email, password}=req.query;
//       try{
//     const existingUser=await user_info.findOne({email:email});
//     if(!existingUser){
//       return res.status(404).json({message: "User not found!"});
//     }
//     const matchPassword=await bcrypt.compare(password, existingUser.password);
//     if(!matchPassword){
//       return res.status(400).json({message: "Invalid Credentials"});
//     }
//     const token=jwt.sign({email:existingUser.email, id: existingUser.uid}, SECRET_KEY);
//     return res.status(201).json({user:existingUser, token:token});
    
//       }catch(error){
//         return res.status(500).json({message: "something went wrong"});
//       }
//     }


async function handleGet(req, res){
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const data = await prisma.user_info.findMany({
            skip,
            take: limit,
        });
        res.json({ "UserList": data });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handlePost(req, res){
    const {fullName, email, password}=req.query
    let data=await prisma.user_info.create({
        data:{
            fullName:fullName,
            email:email,
            password:password,
        }
    })
    res.json({"message":"successfully created", data})
}

async function handleGetById(req, res){
     const uid=req.params.id;
    let data=await prisma.user_info.findUnique({
        where:{
            uid:parseInt(uid)
        }
    })
    res.json({"user data": data})
}

async function handlePatchById(req, res){
        const uid=req.params.id;
    const {fullName, email}=req.query;
    console.log(fullName, email);
    const result=await prisma.user_info.update({
        where:{uid:parseInt(uid)},
        data:{
            fullName:fullName,
            email:email,
        }
    })
    res.json({"message":"successfully updated",result})
}
async function handleDeleteById(req, res){
    const uid=req.params.id;
    let data=await prisma.user_info.delete({
        where:{
            uid:parseInt(uid)
        }
    })
    res.json({"message":"successfully deleted",data})
}



module.exports={
    // handleSignUP,
    // handleSignIn,
    handleGet,
    handlePost,
    handleGetById,
    handlePatchById,
    handleDeleteById
}