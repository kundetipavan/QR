const express = require('express');
 const connection = require('../config/db')


 // Get All Categories

exports.showCategories = (req, res) =>{
    const query = "SELECT * FROM allcategorie ";
    connection.query(query, (err, results)=>{
        if(err) return res.status(500).json({error: err.message});
        res.json(results);
    })
}


// Get Selected Category

exports.categoriesitem = (req, res) =>{
    const {category} = req.params;

    const categoriesitem = "select * from menu where category = ?";

    connection.query(categoriesitem, [category], (err, results)=>{
        if(err) return res.status(500).json({error: err.message});
        if(results.length === 0) return res.status(400).json({err: "No Item found"})
        res.json(results)
    })
}



exports.filterby = (req, res) =>{
    const { type } = req.params;

    const isVeg = type.toLowerCase() === "veg" ? true : false;

    const vegornot = "select * from menu where isVeg = ?";

    connection.query(vegornot, [isVeg], (err, results)=>{
        if(err) return res.status(500).json({error : err.message});
        if(results.length === 0) return res.status(400).json({error: "item not found"});
        res.json(results);
    })
}

