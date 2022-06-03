const Category = require('../models/category');
const Link = require('../models/link')
const slugify = require('slugify');
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4')


// AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

/**
 * create a new category
 * @param req
 * @param res
 */
exports.create = (req, res) => {
  const {name, image, content} = req.body
  //image data
  const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type = image.split(';')[0].split('/')[1];

  const slug = slugify(name);
  let category = new Category({name, content, slug});

  const params = {
    Bucket: 'react-node-aws-storage',
    Key: `category/${uuidv4()}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err)
      res.status(400).json({error: 'Upload to s3 failed'});
    }
    console.log("AWS UPLOAD RES DATA", data);
    category.image.url = data.Location;
    category.image.key = data.Key;
    category.postedBy = req.user._id;

    // save to db
    category.save((err, success) => {
      if (err) {
        console.log(err)
        res.status(400).json({error: 'Duplicate category'});
      }
      return res.json(success)
    })
  })
}

/**
 * List all categories
 * @param req
 * @param res
 */
exports.list = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: `Categories could not load.`
      });
    }
    res.json(data);
  })
};

/**
 * Read all links in one category
 * @param req
 * @param res
 */
exports.read = (req, res) => {
  const {slug} = req.body
  let limit = req.body.limit ? parseInt(req.body.limit) : 10
  let skip = req.body.skip ? parseInt(req.body.skip) : 0

  Category.findOne({slug})
    .populate('postedBy', '_id name username')
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({
          error: 'Could not load category'
        })
      }
      // res.json(category)
      Link.find({categories: category})
        .populate('postedBy', '_id name username')
        .populate('categories', 'name')
        .sort({createdAt: -1})
        .limit(limit)
        .skip(skip)
        .exec((err, links) => {
          if (err) {
            return res.status(400).json({
              error: 'Could not load links of a category'
            })
          }
          res.json({category, links})
        })
    })
};

/**
 * Update category information
 * @param req
 * @param res
 */
exports.update = (req, res) => {
  const {slug} = req.params
  const {name, image, content} = req.body

  // image data
  const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type = image.split(';')[0].split('/')[1];

  Category.findOneAndUpdate({slug}, {name, content}, {new: true}).exec((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: 'Could not find category to update'
      })
    }
    if (image) {
      // remove the existing image from s3 before updating a new one
      const deleteParams = {
        Bucket: 'react-node-aws-storage',
        Key: `${updatedCategory.image.key}`,
      }

      s3.deleteObject(deleteParams, function (err, data) {
        if (err) console.log('S3 DELETE ERROR DURING UPDATE', err)
        else console.log('S3 DELETED DURING UPDATE', data) //deleted
      })

      // uploading new image
      const params = {
        Bucket: 'react-node-aws-storage',
        Key: `category/${uuidv4()}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err)
          res.status(400).json({error: 'Upload to s3 failed'});
        }
        console.log("AWS UPLOAD RES DATA", data);
        updatedCategory.image.url = data.Location;
        updatedCategory.image.key = data.Key;

        // save to db
        updatedCategory.save((err, success) => {
          if (err) {
            console.log(err)
            res.status(400).json({error: 'Duplicate category'});
          }
          res.json(success)
        });
      });
    } else {
      res.json(updatedCategory);
    }
  })
};

/**
 * Delete a category
 * @param req
 * @param res
 */
exports.remove = (req, res) => {
  const {slug} = req.params

  Category.findOneAndRemove({slug}).exec((err, data) => {
    if (err) {
      res.status(400).json({error: 'Could not delete category'});
    }

    // remove the existing image from s3 before updating a new one
    const deleteParams = {
      Bucket: 'react-node-aws-storage',
      Key: `${data.image.key}`,
    }

    s3.deleteObject(deleteParams, function (err, data) {
      if (err) console.log('S3 DELETE ERROR', err)
      else console.log('S3 DELETED', data) //deleted
    })

    res.json({
      message: 'Category deleted successfully'
    });
  })
};