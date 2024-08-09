const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


var alphaRoutes = require('./routes/alpha');
// var betaRoutes = require('./routes/beta');


router.use('/alpha', alphaRoutes);
// router.use('/beta', betaRoutes);


module.exports = router
