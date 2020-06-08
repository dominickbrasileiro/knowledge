import schedule from 'node-schedule';

import db from '../database';

import Stat from '../app/models/stat.model';

class StatsJob {
  async init() {
    schedule.scheduleJob('*/1 * * * *', async () => {
      const { count: usersCount } = await db('users').count('id').first();
      const { count: categoriesCount } = await db('categories').count('id').first();
      const { count: articlesCount } = await db('articles').count('id').first();

      const lastStats = await Stat.findOne({}, {}, { sort: { createdAt: -1 } });

      let statsChanged = false;

      if (lastStats) {
        const usersChanged = parseInt(usersCount, 10) !== lastStats.users;
        const categoriesChanged = parseInt(categoriesCount, 10) !== lastStats.categories;
        const articlesChanged = parseInt(articlesCount, 10) !== lastStats.articles;

        statsChanged = usersChanged || categoriesChanged || articlesChanged;
      }

      if (!lastStats || statsChanged) {
        const stat = new Stat({
          users: usersCount,
          categories: categoriesCount,
          articles: articlesCount,
        });

        await stat.save();

        console.log('[Stats] Stats updated');
      }
    });
  }
}

export default new StatsJob();
