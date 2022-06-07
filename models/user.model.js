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

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        await getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.fullName,
            address: this.address
        })
        
    }
}

module.exports = User;