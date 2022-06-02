const Link = require('../models/link');
const slugify = require('slugify')

/**
 * Create a new link
 * @param req
 * @param res
 */
exports.create = (req, res) => {
  const {title, url, categories, type, medium} = req.body;
  // console.table({title, url, categories, type, medium})
  const slug = url;
  let link = new Link({title, url, slug, categories, type, medium});
  // posted by user
  link.postedBy = req.user._id; // only with 'let' can you change the properties
  // categories


  link.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Link already exists'
      })
    }
    res.json(data);
  });

};

/**
 * List all links
 * @param req
 * @param res
 */
exports.list = (req, res) => {
  Link.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Could not list links'
      })
    }
    res.json(data);
  })
};

exports.read = (req, res) => {
  //
};


exports.update = (req, res) => {
  //
};


exports.remove = (req, res) => {
  //
};

/**
 * Calculate the most popular links
 * @param req
 * @param res
 */
exports.clickCount = (req, res) => {
  const {linkId} = req.body;
  Link.findByIdAndUpdate(linkId, {$inc: {clicks: 1}}, {upsert: true, new: true}).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: 'Could not update view count'
      })
    }
    res.json(result)
  })
};
