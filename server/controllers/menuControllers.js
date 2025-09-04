const express = require('express');
 const connection = require('../config/db')


exports.showitems = (req, res) =>{
   const menuData = "select * from menu";

   connection.query(menuData, (err, result)=>{
    if(err){
        console.error("error fetching menu:", err);
      return  res.status(500).json({error: "Database error"})
    }
    res.status(200).json(result);
   })

}

exports.itemsId = (req, res) =>{
    const {id} = req.params;

    const menuDataId = "select * from menu where id = ?";

    connection.query(menuDataId, [id], (err, result) =>{
        if(err){
            console.error("error fetching menu item:", err);
           return res.status(500).json({error: "Database error"});
        }
        if(result.length === 0){
            return res.status(400).json({error: "Data not found"});
        }
        res.status(200).json(result[0]);
    })
}


