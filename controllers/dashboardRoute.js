const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

//get / is not getting the right html
router.get('/', async (req, res) => {
    console.log(`${req.session.user_id} dashboardRoute.js line 7`);
    try {
        const postData = await Post.findAll({
            where:{
                user_id:req.session.user_id,
            }
        })
        const allPost = postData.map(post=>post.get({plain:true}))
        res.render('homepage', {
            layout: "dashboard",
            allPost,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;