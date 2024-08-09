const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const folderWithinViews = 'alpha'
const urlPrefix = 'alpha'

require(`../views/${folderWithinViews}/routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/equipment-and-adaptations/_equipment-and-adaptations-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/employer-countersign/_employer-countersign-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/support-worker/_support-worker-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/travel-to-work/_travel-to-work-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/travel-in-work/_travel-in-work-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/adaptation-to-vehicle/_adaptation-to-vehicle-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/multiple-award-elements/_multiple-award-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/multiple-employers/_multiple-employer-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/multiple-awards-and-employers/_multiple-awards-and-employers-routes`)(folderWithinViews, urlPrefix, router)



module.exports = router
