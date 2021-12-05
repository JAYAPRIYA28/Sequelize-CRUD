module.exports = (sequelize, DataTypes) =>{
    const todo = sequelize.define("todo", {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return todo;
}