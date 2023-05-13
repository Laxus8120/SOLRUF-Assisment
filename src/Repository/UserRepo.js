const {User} = require('../models/index')
const bcrypt = require('bcrypt');
const {SALT} = require('../config/serverConfig')

class UserRepository {

        async create(data){
            try {
                const result = await User.create(data);
                return result;
            } catch (error) {
                console.log("Something went wrong in repo layer of create function ");
                throw error;
            }
        }

        async destroy(userId){
            try {
                await User.destroy({
                    where : {
                        id : userId
                    }
                });
                return true;
            } catch (error) {
                console.log(result)
                console.log("Something went wrong in repo layer of destroy function ");
                throw error;
            }
        }

        async update(data){

            try {
                console.log(data.newPassword);
                const  encryptedPassword  = bcrypt.hashSync(data.newPassword, SALT);
                console.log(encryptedPassword);
                const result = await User.update({Password : encryptedPassword},{
                    where :{
                        id : data.id
                    }
                });
                return result;
            } catch (error) {
                console.log("Something went wrong in rep layer of update function ");
                throw error;
            }
        }

        async getById(id){
            try {
                const user = await User.findByPk(id,{
                    attributes : ['email', 'id']
                });
                return user;
            } catch (error) {
                console.log("Something went wrong in rep layer of get function ");
                throw error;
            }

        }

        async getAll(){

            try {
                const result = await User.findAll();
                return result;
            } catch (error) {
                console.log("Something went wrong in rep layer of finding All function ");
                throw error;
            }
        }

        async getByEmail(Email){
            try {
                const result = await User.findOne({
                    where : {
                        Email : Email
                    }
                });
                return result;
            } catch (error) {
                console.log("Something went wrong in rep layer of getByEmail, whether wrong Email or no user with email ");
                throw error;
            }
        }

        async getUser(id){
            try {
                const result = await User.findByPk(id);
                return result;
            } catch (error) {
                console.log("Something went wrong in rep layer of getByEmail ");
                console.log(result);
                throw error;
            }
        }

}

module.exports = UserRepository;