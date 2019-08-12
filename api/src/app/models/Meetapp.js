import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Meetapp extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
        owner_id: Sequelize.INTEGER,
        banner_id: Sequelize.INTEGER,
        canceled_at: Sequelize.DATE,
        subscribers: Sequelize.ARRAY(Sequelize.INTEGER),
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
  }
}

export default Meetapp;
