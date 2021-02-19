module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Todo, {
      as: "owner",
      foreignKey: "createdBy",
      onDelete: "cascade",
      hooks: true,
    });
  };

  return User;
};
