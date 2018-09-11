var mongoose = require('mongoose');

var adSchema = new mongoose.Schema({
    area: String,
    areaType: String,
    biz_comm: Object,
    demand: String,
    title: String,
    description: String,
    healthcare: Object,
    imgCount: String,
    imgUID: String,
    imgUrl: String,
    vidUrl: String,
    locationData: Object,
    nearby_loc: Object,
    other: Object,
    plot_features: Object,
    propNumber: String,
    rooms: Object,
    street: String,
    type: String,
    subtype: String
});

mongoose.model('Ad', adSchema);