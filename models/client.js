"use strict";

module.exports = function(sequelize, DataTypes) {

    return sequelize.define("Client", {

        id: { primaryKey: true, type: DataTypes.BIGINT, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false,
            validate:{
                len: [2,100]
            }
        },
        organizationNumber: {
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