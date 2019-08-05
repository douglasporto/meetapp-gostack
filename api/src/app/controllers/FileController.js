import File from '../models/File';
// import User from '../models/User';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });
    res.json(file);
  }
}

export default new FileController();
