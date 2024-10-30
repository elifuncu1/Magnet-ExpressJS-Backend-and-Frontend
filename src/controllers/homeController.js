const jwt = require('jsonwebtoken');
const User = require('../models/igUserModel');
const fs = require('fs');
const Applications = require('../models/applications');
const crypto = require('crypto');


// GET

const homeShow = async (req, res, next) => {
    try {   
        if(req.cookies.usertoken == undefined){
            var usertoken = 'sadas'
        }
        else{
            var usertoken = req.cookies.usertoken
        }
        const kullaniciVarmi = await Applications.count({usertoken: usertoken})
        if(kullaniciVarmi == 0){
            function createUniqueId() {
                return crypto.randomBytes(16).toString('hex');
            }
            const id = createUniqueId();
            res.clearCookie('usertoken');
            res.cookie('usertoken', id);
            res.render('user/bitti', { layout: '../layouts/mainSecond_Layout', title: `Magnet Başvuru Formu`, description: ``, keywords: `` });
        }
        else{
            res.render('user/bitti', { layout: '../layouts/mainSecond_Layout', title: `Magnet Başvuru Formu`, description: ``, keywords: `` })
        }
    } catch (err) {
        console.log(err);
    }
};

// POST
const bilgiler = async (req,res,next) => {
    try{
        const userIp = req.connection.remoteAddress.split(':').pop();;
        const usertoken = req.cookies.usertoken
        const kullaniciVarmi = await Applications.count({usertoken: usertoken})
        if(kullaniciVarmi == 0){
            const bilgiler = {
                name: req.body.name,
                discord_name: req.body.discord_name,
                age: req.body.age,
                email: req.body.email,
                category: req.body.category,
                information: req.body.information,
                links: req.body.links,
                usertoken: usertoken,
                User_IP: userIp
            }
            if(req.body.diger){
                bilgiler.diger = req.body.diger
            }
            const new_Bot = new Applications(
                bilgiler
            );
            await new_Bot.save();
            res.render('user/onaylandi', { layout: '../layouts/mainSecond_Layout', title: `Magnet Başvuru Formu`, description: ``, keywords: `` })
        }
        else{
            res.redirect('/anaSayfa')
        }
    }
    catch (err){
        console.log(err)
    }
};
module.exports = {
    homeShow,
    bilgiler
}