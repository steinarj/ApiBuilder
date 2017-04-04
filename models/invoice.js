"use strict";

module.exports = function(sequelize, DataTypes) {

    return sequelize.define("Invoice", {

        clientId: { primaryKey: true, type: DataTypes.BIGINT, allowNull: false },
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
        number:{
          type: DataTypes.INTEGER, primaryKey: true , allowNull: false
        },

        customerId: {
            type: DataTypes.INTEGER
        },
        customerName:{
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true

            }
        }
    },{

        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true

    });

};
