const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const { subdivisions } = require('./subdivision.json')

app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}))

function filterSubdivisions(start, limit, filter, sortorder, sortby) {
    const filtered = subdivisions
        .filter((sd) => filter ? sd.subdivisionStatusCode === filter : true)
        .sort((a, b) => (sortorder && sortby === "nearmapimagedate") ? (sortorder === 'dsc' ? (new Date(a.nearMapImageDate) < new Date(b.nearMapImageDate) ? 1 : -1) : (new Date(a.nearMapImageDate) > new Date(b.nearMapImageDate) ? 1 : -1)) : true)
        .sort((a, b) => (sortorder && sortby === "name") ? (sortorder === 'dsc' ? (a.name < b.name ? 1 : -1) : (a.name > b.name ? 1 : -1)) : true);
    return {
        totalRecords: filtered.length,
        subdivisions: filtered.splice(start, limit)
    }
}

app.get('/', (req, res) => res.send('Hello World!'));


// filter= Future/Active/Builtout
// sortby= nearmapimagedate/name
// sortorder= asc/dsc
// start= 0...n
// limit= 0...n
// http://localhost:3000/v1/subdivisions?start=0&limit=5&sortorder=asc&sortby=nearmapimagedate&filter=Future
// http://localhost:3000/v1/subdivisions?start=0&limit=5&sortorder=asc&sortby=name&filter=Future 

app.get('/v1/subdivisions', (req, res) => {
    let filterSubdivisionsArray = [];
    if (!req.query.start && !req.query.limit && !req.query.filter && !req.query.sortorder && !req.query.sortby) {
        filterSubdivisionsArray = subdivisions;
    } else {
        filterSubdivisionsArray = filterSubdivisions(req.query.start, req.query.limit, req.query.filter, req.query.sortorder, req.query.sortby);
    }
    res.send(filterSubdivisionsArray);
})

app.listen(port, () => {
    console.log('Example app listening on port 3000!')
});

