
const documentModel = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: {
        isIn: {
          args: [['public', 'private', 'role']],
          msg: 'Use a valid access type'
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Document.belongsTo(models.User, {
          foreignKey: 'authorId',
          onDelete: 'SET NULL',
        });
      }
    }
  });
  return Document;
};

export default documentModel;
