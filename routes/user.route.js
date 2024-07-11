const path = require("path");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const upload = require("../helpers/multer");
const User = require("../db/user.schema");

const files = upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "cv", maxCount: 1 },
]);

router.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/user/login")
    }
    res.render("user/user-dashboard.hbs", {
        layout: false,
        user: req.session.user.fullName,
        resume: req.session.user.resume,
        cv: req.session.user.cv,
    });
});

router.get("/register", (req, res) => {
    res.render("user/register.hbs", {
        layout: false,
    });
});

router.post("/register", files, async (req, res) => {
    try {
        const { email, fullName, phoneNo, education, intro, profession, password } = req.body;

        if (!email || !fullName || !phoneNo || !education || !intro || !profession || !password || !req.files.resume || !req.files.cv) {
            return res.json({
                type: 'error',
                message: 'provide all feilds',
            })
        }

        const resume = req.files.resume[0].filename;
        const cv = req.files.cv[0].filename;

        const user = await User.findOne({ email });

        if (user)
            return res.json({
                type: 'error',
                message: 'User already exists'
            })


        await User.create({
            email,
            fullName,
            phoneNo,
            education,
            intro,
            profession,
            password: bcrypt.hashSync(password, 10),
            resume,
            cv,
        });
        return res.json({
            type: 'success',
            message: '/user/login'
        })
    } catch (e) {
        console.log(e);
    }
});

router.get("/login", (req, res) => {
    res.render("user/login.hbs", {
        layout: false,
    });
});

router.post("/login", async (req, res) => {
    try {
        const { email = "", password = "" } = req.body;

        console.log(req.body);
        if (!password || !email)
            return res.json({
                type: 'error',
                message: 'Provide all fields'
            })

        const user = await User.findOne({ email });

        if (!user)
            return res.json({
                type: 'error',
                message: 'No such user'
            })

        if (bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            return res.json({
                type: 'success',
                message: '/user/dashboard'
            })
        } else {
            return res.json({
                type: 'error',
                message: 'Invalid credentials'
            })
        }

    } catch (e) {
        console.log(e);
    }
});
router.get("/trendingjob", (req, res) => {
    return res.render("user/user_trending-jobs.hbs", {
        layout: false,
    });
});
router.get("/appliedjobs", (req, res) => {
    return res.render("user/user-applied_jobs.hbs", {
        layout: false,
    });
});

router.get("/interview", (req, res) => {
    return res.render("user/user-interview.hbs", {
        layout: false,
        user: req.session.user.fullName
    });
});

router.get("/job", (req, res) => {
    return res.render("user/user-job.hbs", {
        layout: false,
        user: req.session.user.fullName
    });
});

router.get("/apply", (req, res) => {
    return res.render("user/user-apply.hbs", {
        layout: false,
    });
});

router.get("/applybyquiz", (req, res) => {
    return res.render("user/quiz.hbs", {
        layout: false,
    });
});
router.get("/applyquiz", (req, res) => {
    return res.render("user/user-quizes.hbs", {
        layout: false,
    });
});
router.get("/quizsubmitted", (req, res) => {
    return res.render("user/quiz_submitted.hbs", {
        layout: false,
    });
});

router.get("/profile", (req, res) => {
    return res.render("user/user-profile.hbs", {
        layout: false,
        user: req.session.user.fullName
    });
});

router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.send('Error logging out');
        } else {
            // Redirect the user to the login page or any other page
            res.redirect('/user/login');
        }
    });
});


module.exports = router;
