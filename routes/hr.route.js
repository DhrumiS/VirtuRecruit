const path = require("path");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const upload = require("../helpers/multer");
const Recruiter = require("../db/hr.schema");
const Job = require("../db/job.schema");
const { builtinModules } = require("module");
const files = upload.fields([
    { name: "image", maxCount: 1 },
]);

//router.get("/", (req, res) => {
//if (!req.session.user) {
//    return res.redirect("/user/login")
//    }
//res.render("user-dashboard.hbs", {
//        layout: false,
//    user: req.session.user.fullName,
//        resume: req.session.user.resume,
//        cv: req.session.user.cv,
//    });
//});

router.get("/register", (req, res) => {
    res.render("hr/register.hbs", {
        layout: false,
    });
});

router.post("/register", files, async (req, res) => {
    try {

        const { name, email, phone, company, location, position, experience, website, password } = req.body;

        if (!name || !email || !phone || !company || !location || !position || !experience || !website || !password || !req.files.image) {
            return res.json({
                type: 'error',
                message: 'Provide all fields',
            });
        }

        const image = req.files.image[0].filename;

        const recruiter = await Recruiter.findOne({ email });

        if (recruiter) {
            return res.json({
                type: 'error',
                message: 'Recruiter already exists',
            });
        }

        await Recruiter.create({
            name,
            email,
            phone,
            company,
            location,
            position,
            experience,
            website,
            password: bcrypt.hashSync(password, 10),
            image,
        });

        return res.json({
            type: 'success',
            message: '/hr/login',
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            type: 'error',
            message: 'Internal server error',
        });
    }
});

router.get("/login", (req, res) => {
    res.render("hr/login.hbs", {
        layout: false,
    });
});


router.post("/login", async (req, res) => {
    console.log('in post login');
    try {
        const { email = "", password = "" } = req.body;

        console.log(req.body);
        if (!password || !email)
            return res.json({
                type: 'error',
                message: 'Provide all fields'
            });

        const user = await Recruiter.findOne({ email });
        console.log('user', user);

        if (!user)
            return res.json({
                type: 'error',
                message: 'No such user'
            });

        if (bcrypt.compareSync(password, user.password)) {
            console.log(user);

            const currentTime = new Date();
            const formattedTime = currentTime.toLocaleTimeString();
            req.session.user = user;
            req.session.loginTime = formattedTime
            return res.json({
                type: 'success',
                message: '/hr/dashboard'
            })
        }
        else {
            return res.json({
                type: 'error',
                message: 'Invalid credentials'
            })
        }

    } catch (e) {
        console.log(e);
    }
});


router.get("/dashboard", async (req, res) => {
    
    if (!req.session.user)
        return res.redirect('/hr/login')
    return res.render("hr/recruiter-dashboard.hbs", {
        layout: false,
        hrName: req.session.user.name,
        hrPosition: req.session.user.position,
        hrCompany: req.session.user.company,
        loginTime: req.session.loginTime,
        totalJobsPosting: await Job.countDocuments({ email: req.session.user.email })
    });
});
// builtinModules, aa if block je je route access karva mate user logged in hovo neccesary hoy ne tya muki deje, etle login na karyu hy to pehla login page par jay
// ok?
// comment this. agar code fata to kr dungi
// abhi battery nai hai isme ftft linking ptau


router.get("/postjob", (req, res) => {
    return res.render("hr/postjob.hbs", {
        layout: false,
    });
});

router.post("/postjob", async (req, res) => {
    try {
        const {
            jobTitle,
            jobDescription,
            jobRequirements,
            jobLocation,
            salary,
            deadline
        } = req.body;

        if (!jobTitle || !jobDescription || !jobRequirements || !jobLocation || !deadline) {
            return res.json({
                type: 'error',
                message: 'Provide all required fields',
            });
        }

        if (!req.session.user) {
            return res.json({
                type: 'error',
                message: 'Login Required',
            });
        }

        const job = await Job.create({
            jobTitle,
            jobDescription,
            jobRequirements,
            jobLocation,
            salary,
            deadline,
            email: req.session.user.email
        });

        return res.json({
            type: 'success',
            message: 'Job created successfully',
            job
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            type: 'error',
            message: 'Internal server error',
        });
    }
});

router.get("/totaljobs", async (req, res) => {
    if (!req.session.user) return res.redirect("/hr/login")
    try {
        const jobs = await Job.find({ email: req.session.user.email })
        //  const jobs = await Job.find({ email:"js@gmail.com" })
        console.log(jobs);
        return res.render("hr/postedjobs.hbs", {
            layout: false,
            jobs: jobs.map(job => job.toObject())
        });
    } catch (error) {
        res.send("Server Error")
    }

});

router.get("/scheduleinterview", (req, res) => {
    res.render("hr/scheduleinterview.hbs", {
        layout: false,
    });
});

router.get("/hiresmade", (req, res) => {
    res.render("hr/hiresmade.hbs", {
        layout: false,
    });
});
router.get("/applicationreceived", (req, res) => {
    res.render("hr/applicationreceived.hbs", {
        layout: false,
    });
});

router.get("/scheduleinterview", (req, res) => {
    res.render("hr/scheduleinterview.hbs", {
        layout: false,
    });
});

router.get("/interviewdetails", (req, res) => {
    res.render("hr/interview-view.hbs", {
        layout: false,
    });
});

router.get("/candidatedetails", (req, res) => {
    res.render("hr/candidate-detail.hbs", {
        layout: false,
    });
});

router.get("/candidatelist", (req, res) => {
    res.render("hr/list-candidates.hbs", {
        layout: false,
    });
});
router.get("/interview", (req, res) => {
    res.render("hr/recruiter-interview.hbs", {
        layout: false,
    });
});
router.get("/job", (req, res) => {
    res.render("hr/recruiter-job.hbs", {
        layout: false,
    });
});

router.get("/reviewtest", (req, res) => {
    res.render("hr/review-test.hbs", {
        layout: false,
    });
});

router.get("/editprofile", (req, res) => {
    res.render("hr/edit-profile.hbs", {
        layout: false,
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
            res.redirect('/hr/login');
        }
    });
});

module.exports = router;
