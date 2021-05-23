const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//route to get the post that will be edit
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const posts = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [User]
        });
        res.render('editpost', {
            posts,
        });
        // res.status(200).json(posts)
    } catch (err) {
        res.status(400).json(err);
    }
});

//get a # post
router.get('/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [User]
        });
        console.log(post);
        const commentData = await Comment.findAll({
            where:{
                post_id: req.params.id
            },
            include:[User]
        });
        console.log(commentData);
        const comments = commentData.map(comment => comment.get({plain:true}))

        res.render('post', {post, comments});
        // res.status(200).json(posts)
    } catch (err) {
        res.status(400).json(err);
    }
});

//route to update the post that will be edit
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        if (updatedPost > 0) {
            // res.status(200).end();
            res.status(200).json(updatedPost);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

//route to add comment to corsponding post
router.post('/:id', withAuth, async (req, res) => {
    try {
        console.log(req.session.user_id);
        const newComment = await Comment.create({
            ...req.body,
            post_id: req.params.id,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//route to create post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log(newPost);

        res.status(200).json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

//to delete the post created before
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
