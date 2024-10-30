
const fs = require('fs');
const Categories = require('../models/Categories');
const elenenler = require('../models/elenenler');
const Phase1 = require('../models/phase1');
const Applications = require('../models/applications');
const showHomePage = async (req, res, next) => {

    try {
        const Categori = await Categories.find({active: "1"})
        const Kategori = Categori[0]
        const yenilist = []
        for(let i = 0;i<Kategori.Categories.length;i++){
            yenilist[i] = Kategori.Categories[i]+':'+await Applications.count({category: Kategori.Categories[i]})
        }
        res.render('admin/homePage', { layout: '../layouts/adminHome_Layout', title: `Admin | IG Priv`, description: ``, keywords: ``,yenilist })


    } catch (err) {
        console.log(err);
    }
};
const showCategoryPage = async (req, res, next) => {

    try {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        const sayi = await Applications.count({category: req.params.category})
        const basvurular = await Applications.find({category: req.params.category}).skip(getRandomInt(sayi)).limit(10);

        res.render('admin/category', { layout: '../layouts/free', title: `Admin | IG Priv`, description: ``, keywords: ``,basvurular })


    } catch (err) {
        console.log(err);
    }
};
const ele = async (req,res,next) => {
    try{
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        const basvuraninadi = req.query.isim;
        const basvuranibul = await Applications.find({name: basvuraninadi}).limit(1);
        if (basvuranibul.length > 0) {
            const bilgiler = {
                name: basvuranibul[0].name,
                discord_name: basvuranibul[0].discord_name,
                age: basvuranibul[0].age,
                email: basvuranibul[0].email,
                category: basvuranibul[0].category,
                information: basvuranibul[0].information,
                links: basvuranibul[0].links,
                usertoken: basvuranibul[0].usertoken,
                User_IP: basvuranibul[0].userIp
            };
            if(basvuranibul[0].email){
                bilgiler.email = basvuranibul[0].email
            }
            const new_Bot = new elenenler(bilgiler);
            await new_Bot.save()
                .then(() => {
                    Applications.deleteOne({_id: basvuranibul[0]._id})
                        .catch(error => {
                            console.error(`Error deleting document with _id "${basvuranibul[0]._id}" from Applications collection: ${error}`);
                        });
                })
                .catch(error => {
                    console.error(`Error saving document to elenenler collection: ${error}`);
                });
        } else {
            console.error(`No document found with name "${basvuraninadi}" in the Applications collection.`);
        }
        const sayi = await Applications.count({category: req.params.category})
        const next = await Applications.find({category: req.query.category}).skip(getRandomInt(sayi)).limit(1);
        res.json(next);

    }
    catch (err){
        console.log(err)
    }
}
const sonrakiasama = async (req,res,next) => {
    try{
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        const basvuraninadi = req.query.isim;
        const basvuranibul = await Applications.find({name: basvuraninadi}).limit(1);
        if (basvuranibul.length > 0) {
            const bilgiler = {
                name: basvuranibul[0].name,
                discord_name: basvuranibul[0].discord_name,
                age: basvuranibul[0].age,
                email: basvuranibul[0].email,
                category: basvuranibul[0].category,
                information: basvuranibul[0].information,
                links: basvuranibul[0].links,
                usertoken: basvuranibul[0].usertoken,
                User_IP: basvuranibul[0].userIp
            };
            if(basvuranibul[0].email){
                bilgiler.email = basvuranibul[0].email
            }
            const new_Bot = new Phase1(bilgiler);
            await new_Bot.save()
                .then(() => {
                    Applications.deleteOne({_id: basvuranibul[0]._id})
                        .catch(error => {
                            console.error(`Error deleting document with _id "${basvuranibul[0]._id}" from Applications collection: ${error}`);
                        });
                })
                .catch(error => {
                    console.error(`Error saving document to elenenler collection: ${error}`);
                });
        } else {
            console.error(`No document found with name "${basvuraninadi}" in the Applications collection.`);
        }
        const sayi = await Applications.count({category: req.query.category})
        const next = await Applications.find({category: req.query.category}).skip(getRandomInt(sayi)).limit(1);
        res.json(next);
    }
    catch (err){
        console.log(err)
    }
}
const atla = async (req,res,next) => {
    try{
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        const sayi = await Applications.count({category: req.query.category})
        const basvurular = await Applications.find({category: req.query.category}).skip(getRandomInt(sayi)).limit(10);
        res.json(basvurular)
    }
    catch(err){

    }
}
module.exports = {
    showHomePage,
    showCategoryPage,
    ele,
    sonrakiasama,
    atla

}