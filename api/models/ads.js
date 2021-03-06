var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var adSchema = new mongoose.Schema({
    userId: String,
    invId: String,
    area: String,
    areaType: String,
    biz_comm: Object,
    demand: String,
    purpose: { type: String, default: 'buy' },
    comment: { type: String, default: '' },
    title: String,
    description: String,
    healthcare: Object,
    vidUrl: String,
    imagesData: Object,
    locationData: Object,
    nearby_loc: Object,
    other: Object,
    plot_features: Object,
    propNumber: String,
    rooms: Object,
    street: String,
    type: String,
    subtype: String,
    created:  {type: Date, default: Date.now}
});

adSchema.plugin(autoIncrement.plugin, 'Ad');
mongoose.model('Ad', adSchema);