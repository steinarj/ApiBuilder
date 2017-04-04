"use strict";

module.exports = function(sequelize, DataTypes) {

    return sequelize.define("Module", {

        id: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },

        name: { type: DataTypes.STRING, allowNull: false,
            validate:{
                len: [2,100]
            }
        },
        viewType:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [2,100]
            }
        },
        routeId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        iconCls: {
            type: DataTypes.STRING
        },

        rowCls: {
            type: DataTypes.STRING
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull:  true
        }
    },{

        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: false

    });

};