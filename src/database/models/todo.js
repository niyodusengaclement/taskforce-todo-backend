module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      as: "owner",
      foreignKey: "createdBy",
      hooks: true,
    });
  };

  return Todo;
};
