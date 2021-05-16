const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//get / is not getting the right html
router.get('/', async (req, res) => {
    // console.log(`${req.session.user_id} dashboardRoute.js line 7`);
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            }
        })
        const allPost = postData.map(post => post.get({ plain: true }))
        res.render('homepage', {
            layout: 'dashboard',
            allPost,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('newpost', {
            layout: 'dashboard'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/addpost', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/editpost', async (req, res) => {
    try {
      const newPost = await User.update(
        req.body.description,
      {
        where: {
          id: req.body.id,
        },
      })
      console.log(newPost);
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;