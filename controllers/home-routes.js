const router = require('express').Router();
const sequelize = require('../config/connection');
const { Role, Show, User, Genre, Comment, Band } = require('../models');

// The below, as uncommented, when logged in, can no longer to to main page, only /show. Commented out, you can visit homepage or show page just fine
router.get('/', (req, res) => {
    // if(req.session.loggedIn) {
    //     res.redirect('/')
    // }
    res.render('signup')
});

router.get('/login', (req, res) => {
    // if(req.session.loggedIn) {
    //     res.redirect('/')
    // }
    res.render('login')
});

router.get('/show', (req, res) => {
    Show.findAll({
            include: {
                model: User,
                attributes: ['id']
            } 
    })

    .then(dbShowData => {
        const shows = dbShowData.map(show => show.get({ plain: true }));

        res.render('show', {
            shows,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/create-show', (req, res) => {
    res.render('create-show');
});

module.exports = router;