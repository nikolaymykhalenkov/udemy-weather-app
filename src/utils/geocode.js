const request = require("request");



const geocode = (address, callback) => {
    const accessKey = process.env.MAPBOX_ACCESS_KEY;
    if (!accessKey) throw new Error("Missing Mapbox Access Key");
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessKey}&limit=1`;

    request({url, json: true}, (error, response, body) => {
        if (error) {
            callback(error);
        } else if (!body.features?.length) {
            callback(`No places found for ${address}`);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;