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

        async getById(id){
            try {
                const user = await User.findByPk(id,{
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