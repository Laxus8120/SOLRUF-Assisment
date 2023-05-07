const {User} = require('../models/index')


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
                const result = await User.destroy({
                    id : userId
                });
                console.log(userId)
                return true;
            } catch (error) {
                console.log(result)
                console.log("Something went wrong in repo layer of destroy function ");
                throw error;
            }
        }

        async update(data){

            try {
                const result = await User.create(data);
                return result;
            } catch (error) {
                console.log("Something went wrong in rep layer of update function ");
                throw error;
            }
        }

        async getById(userId){
            try {
                const user = await User.findByPk(userId,{
                    attributes : ['email', 'id']
                });
                console.log(user)
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

        async getByEmail(userId){
            try {
                const result = await User.findOne({
                    where : {
                        Email : userId.Email
                    }
                });
                return result;
            } catch (error) {
                console.log("Something went wrong in rep layer of getByEmail ");
                console.log(userId);
                throw error;
            }
        }

}

module.exports = UserRepository;