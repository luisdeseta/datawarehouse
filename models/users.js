
//creacion del modelo de usuario (sequelize)
module.exports = (sequelize, DataTypes) => {
        return sequelize.define("users", {
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
            validate:{
                isEmail:{msg: "Revise el formato del email"},
                notNull:{msg: "el email no puede ser null"}
                    }},
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notNull: {msg: "password no puede ser null"}
        }
    },
    profile:{
        type: DataTypes.TEXT,
        allowNull: true,
    }
},
{ timestamps: false,}
)
}