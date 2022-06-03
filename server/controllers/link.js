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

/**
 * Read the info of a link
 * @param req
 * @param res
 */
exports.read = (req, res) => {
  const {id} = req.params;
  Link.findOne({_id: id}).exec((err, data) => {
    if (err) {
      res.status(400).json({error: 'Could finding link'});
    }
    res.json(data);
  })
};

/**
 * Update link info
 * @param req
 * @param res
 */
exports.update = (req, res) => {
  const {id} = req.params;
  const {title, url, categories, type, medium} = req.body
  const updatedLink = {title, url, categories, type, medium}

  Link.findOneAndUpdate({_id: id}, updatedLink, {new: true}).exec((err, updated) => {
    if (err) {
      res.status(400).json({error: 'Could not update link'});
    }
    res.json(updated);
  })

};

/**
 * Remove a link
 * @param req
 * @param res
 */
exports.remove = (req, res) => {
  const {id} = req.params
  Link.findOneAndRemove({_id: id}).exec((err, data) => {
    if (err) {
      res.status(400).json({error: 'Could not delete link'});
    }
    res.json({
      message: 'Link deleted successfully'
    });
  })
};

/**
 * Update clicks of links
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
