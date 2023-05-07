const UserRepository = require('../Repository/UserRepo');
const {JWT_KEY}  = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class UserService {

    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){

        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in service layer of create");
            console.log(error)
            throw error;
        }        
    }

    async signIn(Email,plainPassword){
        try {
            
            // step 1 --> fetch the user using the email
            const user = await this.userRepository.getByEmail(Email); 
            // step 2--> compare incoming plain password with store encrypted password
            const passwordMatch =  this.checkPassword(plainPassword, user.Password);// --> user.password, it provide encrypted password sotred in db
            if(!passwordMatch){
                console.log("Password does't match");
                throw { error : " Incorrect Password"};
            }
            // step 3 --> if password match then create a token and send it to the user 
            const newJWT = this.createToken({email: user.Email, id : user.id});
            return newJWT;
            
        } catch (error) {
            console.log("Something went wrong in signIn process");
            throw error;
        }
    }
    
    async isAuthenticated(token){

        try {
            
            const response = this.verifyToken(token);
            if(!response){
                throw { error : 'Invalid Token '};
            }

            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error : "No user with the corresponding token exist"}
            }
            return user.id;
        } catch (error) {
            console.log("something went wrong in authentication process");
            throw error;
        }
    }

    async getAll(){
        try {
            const user  = await this.userRepository.getAll();
            return user
        } catch (error) {
            console.log("Not able to fetch all details");
            throw error;
        }
    }

    async getByEmail(Email){
        try {
            const user = await this.userRepository.getByEmail(Email);
            return user;
        } catch (error) {
            console.log("Not able to fetch all detail");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;

        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }


    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn : '1d'});
            return result;

        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }
    
    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);

        } catch (error) {
            console.log("Something went wrong in password comparission");
            throw error;
        }
    }
}    

module.exports = UserService;