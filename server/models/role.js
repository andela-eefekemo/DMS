const roleModel = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'roles',
        });
      }
    }
  });
  return Role;
};

export default roleModel;
