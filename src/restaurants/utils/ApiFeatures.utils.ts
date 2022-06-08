const nodeGeocoder = require('node-geocoder');

export default class APIRestaurantFeatures {
    static async getRestaurantLocation(address) {
        try {

            const options = {
                provider: process.env.GEOCODER_PROVIDER,
                httpAdapter: 'https',
                apiKey: process.env.GEOCODER_API_KEY,
                formatter: null
            };

            const geocoder = nodeGeocoder(options);
            const loc = await geocoder.geocode(address);

        } catch (e) {
            console.log(e);
        }
    }
}