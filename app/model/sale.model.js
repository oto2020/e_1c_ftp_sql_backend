module.exports = (sequelize, Sequelize, DataTypes) => {
    const Sale = sequelize.define("sale", {
        id: {
            type: DataTypes.STRING(255),
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
        author: {
            type: DataTypes.STRING(100),
        },
        datetime: {
            type: DataTypes.DATE,
        },
        order_count: {
            type: DataTypes.SMALLINT,
        },
        order_price: {
            type: DataTypes.REAL,
        },
        refund_count: {
            type: DataTypes.SMALLINT,
        },
        refund_price: {
            type: DataTypes.REAL,
        },
        final_price: {
            type: DataTypes.REAL,
        },
    }, {
        timestamps: false
    });

    return Sale;
};
