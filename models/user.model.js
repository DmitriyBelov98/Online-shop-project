const { getDb } = require('../data/database');
const db = require('../data/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(email, password, fullName, street, postalCode, city) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.address = {
            street: street,
            postalCode: postalCode,
            city: city
        };

    }

     getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({email: this.email});

    }

    async existsAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if(existingUser) {
            return true;
        } 
        return false;

    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        await getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.fullName,
            address: this.address
        })
        
    }

    comparePassword(hashedPassword) {
       return  bcrypt.compare(this.password, hashedPassword);
    }
}

module.exports = User;