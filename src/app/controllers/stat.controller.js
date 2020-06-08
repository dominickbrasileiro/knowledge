import Stat from '../models/stat.model';

class StatController {
  async index(req, res) {
    const stats = await Stat.findOne({}, {}, { sort: { createdAt: -1 } });

    if (!stats) {
      return res.json({
        users: 0,
        categories: 0,
        articles: 0,
      });
    }

    return res.json(stats);
  }
}

export default new StatController();
