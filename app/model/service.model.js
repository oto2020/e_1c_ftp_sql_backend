module.exports = (sequelize, Sequelize, DataTypes) => {
    const Service = sequelize.define("service", {
        id: {
            type: DataTypes.STRING(100),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
        },
        division: {
            type: DataTypes.STRING(100),
        },
        trainer: {
            type: DataTypes.STRING(100),
        },
        client: {
            type: DataTypes.STRING(100),
        },
        basis: {
            type: DataTypes.STRING(100),
        },
        datetime: {
            type: DataTypes.DATE,
        },
        price: {
            type: DataTypes.REAL,
        },
        clients_number: {
            type: DataTypes.SMALLINT,
        },
        clients_number_by_trainer: {
            type: DataTypes.SMALLINT,
        }
    }, {
        timestamps: false
    });

    return Service;
};
