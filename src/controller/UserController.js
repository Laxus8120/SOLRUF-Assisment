const UserService = require('../services/UserService');

const userService = new UserService();

const create = async (req,res) => {
    try {
        const response = await userService.create({
            Email : req.body.Email,
            Password : req.body.Password
        });
        return res.status(201).json({
            success : true,
            message : 'Successfully created a new user',
            data : response,
            error : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : error,
            data : {},
            success : false ,
            error : 'not able to create user'
        })
    }
}

const signIn = async (req,res) =>{

    try {
        
        const response = await userService.signIn(req.body.Email , req.body.Password);
        return res.status(200).json({
            success : true,
            message : 'Successfully SignIn ',
            data : response,
            error : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'Not able to sign In soemthing went wrong',
            data : {},
            success : false ,
            err : error
        })
    }
}

const isAuthenticated = async (req,res) => {
    try {
        
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success : "true",
            error : {},
            data : response,
            message : "user is authenticated and token is valid"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong",
            data : {},
            success : false ,
            err : error,
            token : console.log(req.headers)
        })
    }
}

const getAll = async (req,res) => {
    
    try {
        const response = await userService.getAll();
        return res.status(200).json({
            success : "true",
            error : {},
            data : response,
            message : "All the users we have"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong",
            data : {},
            success : false ,
            err : error,
            data : {}
        })
    }
}

const getByEmail = async (req,res) => {
    
    try {
        const response = await userService.getByEmail(req.body);
        return res.status(200).json({
            success : "true",
            error : {},
            data : response,
            message : "Succesfully get the details"
        });

    } catch (error) {
        console.log(error);
        console.log(req.Email)
        return res.status(500).json({
            message : "Something went wrong",
            data : {},
            success : false ,
            err : error,
            data : {}
        })
    }
}


module.exports = {
    create,
    signIn,
    isAuthenticated,
    getAll,
    getByEmail
}