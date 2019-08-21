import File from '../models/File';

class FileController {
  async store(req, res) {
    const { type } = req.body;

    switch (type) {
      case 'avatar':
      case 'banner':
        break;
      default:
        return res.status(400).json({ error: 'Invalid file type' });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
      type,
    });

    return res.status(201).json(file);
  }
}

export default new FileController();
