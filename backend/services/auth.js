class Authentication {
    constructor(){
        this.sessionIdUserMap = new Map();
    }
    setUser(id, user){
        this.sessionIdUserMap.set(id,user);
    }
    getUser(id){
        return this.sessionIdUserMap.get(id);
    }
}
const instance = new Authentication();
Object.freeze(instance);

module.exports = instance;