const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();
const port = 3300;

app.use(bodyParser.json());

app.get("/product/:barCode", async (req, res, next) => {
    try {
        const result = await axios.get('https://api.upcitemdb.com/prod/trial/lookup?upc=' + req.params.barCode);
        const data = result.data;
        console.log(data);
        if (data.items.length === 0) {
            res.status(404).json({ error: "No product found" });
        }
        res.status(500).json(data.items[0]);
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
