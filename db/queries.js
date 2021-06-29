const knex = require("./client");

module.exports = {
    index() {
        return knex.select().table('clucks');
    },

    create(cluck) {
        console.log("new cluck's object: ", cluck);
        return knex("clucks").insert(cluck, "*");
    },

    show(id) {
        return knex("clucks").where("id", id).first();
    },
    
    delete(id) {
        return knex("clucks").where("id", id).del();
    },

   
}
