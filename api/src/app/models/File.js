import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        type: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
            // return `http://192.168.15.16:3333/files/${this.path}`; /* FOR TESTING WITH IPHONE */
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
