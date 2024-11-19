const { Movie } = require('../models/Movie');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}


async function viewResources(req, res) {

    const id = req.params.search;

    const owner = req.body.owner;
    if (id.length == 0) {
      return res.status(500).json({ message: "Search field required" });
    }

    if (id.length < 2) {
        return res.status(500).json({ message: "Search field should be at least 2 characters" });
      }

    try {
      const allResources = await readJSON("utils/movies.json");
      const search = allResources.filter(item => item.movieTitle === id);

      return res.status(201).json(search);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  module.exports = {
    readJSON, viewResources
};