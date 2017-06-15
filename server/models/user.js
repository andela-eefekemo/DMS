
const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
          // associations can be defined here
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'SET NULL',
        });

        User.hasMany(models.Document, {
          foreignKey: 'authorId',
          as: 'author'
        });
      }
    }
  });
  return User;
};

export default userModel;
