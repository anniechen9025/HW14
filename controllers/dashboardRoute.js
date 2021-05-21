const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

//get / is not getting the right html
router.get('/', withAuth, async (req, res) => {
    // console.log(`${req.session.user_id} dashboardRoute.js line 7`);
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            }
        })
        const posts = postData.map(post => post.get({ plain: true }))
        res.render('post', {
            layout: 'dashboard',
            posts,
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

module.exports = router;