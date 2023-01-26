const express = require('express');
const pool = require('../modules/pool');
const giphy_api_key = process.env.GIPHY_API_KEY;
const router = express.Router();


// GET - return all favorite images
router.get('/', (req, res) => {
  pool.query('SELECT * FROM "favorites";')
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.error('Error GET /api/favorite', error);
      res.sendStatus(500);  
    });
});

// POST - add a new favorite
router.post('/', (req, res) => {
  const sqlText = `
    INSERT INTO "favorites" ("url", "category_id")
    VALUES ($1, $2)
  `;
  const sqlValues = [req.body.url, req.body.category_id];

  pool.query(sqlText, sqlValues)
    .then((result) => {
      console.log(`Added image into favorites`);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error POST /api/favorites', error);
      res.sendStatus(500); 
    })
});

// update given favorite with a category id
// req.body should contain a category_id to add to this favorite image
router.put('/:favId', (req, res) => {
  let idToUpdate = req.params.id
  let newCategory = req.body.category_id
  let sqlValues = [newCategory, idToUpdate]

  let sqlQuery = `
  UPDATE "favorites"
    SET "category_id" = $1
    WHERE "id" = $2;
  `;

  pool.query(sqlQuery, sqlValues)
    .then((dbRes)=>{
      console.log('successful update from PUT /api/favorites', dbRes);
      res.sendStatus(201)
    }).catch(( dbErr)=>{
      console.error('Error PUT /api/favorites', dbErr);
      res.sendStatus(500)
    })
});

// DELETE - delete a favorite
router.delete('/', (req, res) => {
  pool.query(`DELETE FROM "favorites" WHERE id=$1`, [req.params.id] )
    .then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('Error DELETE /api/favorites', error);
    res.sendStatus(500);
  })
});


module.exports = router;