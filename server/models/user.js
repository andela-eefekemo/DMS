const bcrypt = require('bcrypt');

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 2,
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
          foreignKey: 'authorId'
        });
      }
    },
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      },

      filterUserDetails() {
        const { password, createdAt, updatedAt, ...rest } = this.get();
        return rest;
      },
      filterUserList() {
        const { password, updatedAt, ...rest } = this.get();
        return rest;
      }
    },

    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },

      beforeUpdate(user) {
        /* eslint-disable no-underscore-dangle*/
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return User;
};

export default userModel;
