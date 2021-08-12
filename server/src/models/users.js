const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.findByLogin = async login => {
        let user = await User.findOne({where: { email: login },});
        return user;
    };

    return User;
};

export default user;