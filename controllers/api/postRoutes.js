const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll();
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        // console.log(req.params.id,);
        // const postData = await Post.findOne({
        //     where: {
        //         // user_id: req.session.user_id
        //         id: req.params.id
        //     },
        //     include: [User]
        // });
        // const post = postData.map(post => post.get({
        //     plain: true
        // }))
        console.log(postData);
        res.render('post', {
            postData
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            }
        })
        if (affectedRows > 0) {
            res.status(200).end();
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
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

router.post('/addpost', withAuth, async (req, res) => {
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
