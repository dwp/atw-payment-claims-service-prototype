const { indexOf, forEach } = require("lodash")

module.exports = function (folderForViews, urlPrefix, router) {

  router.post('/additional-costs/grant-information-answer', function (req, res) {
    res.redirect(`/${urlPrefix}/additional-costs/before-you-continue`)
  })

  router.post('/additional-costs/before-you-continue-answer', function (req, res) {
    res.redirect(`/${urlPrefix}/additional-costs/additional-cost-types`)
  })

  router.post('/additional-costs/additional-cost-types', function (req, res) {
    const additionalCostTypes = req.session.data['additional-cost-types']

    if (additionalCostTypes == 'none'){
      res.redirect(`/${urlPrefix}/additional-costs/providing-evidence`)
    }
    else {
      res.redirect(`/${urlPrefix}/additional-costs/claim-additional-costs`)
    }

  })

  router.post('/additional-costs/claim-additional-costs', function (req, res) {
    const change = req.session.data['change-cost']

    res.redirect(`/${urlPrefix}/additional-costs/providing-evidence`)
  })

  // post - Add more receipts
  router.post('/additional-costs/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/additional-costs/receipt-upload`)
    } else if (journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (journeytype === 'claimadditionalcosts' && checked) {
      res.redirect(`/${urlPrefix}/additional-costs/check-your-answers`)
    } else if (journeytype === 'claimadditionalcosts') {
      res.redirect(`/${urlPrefix}/additional-costs/existing-payee-details`)
    }
  })

  // workplace conact answer

  router.post('/additional-costs/contact-answers', function (req, res) {
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['sw-declaration']

    if (journeytype === 'claimadditionalcosts' && checked === 'true') {
      res.redirect(`/${urlPrefix}/portal-screens/citizen-new-declaration-pre-confirm`)
    } else if (journeytype === 'claimadditionalcosts') {
      res.redirect(`/${urlPrefix}/additional-costs/check-your-answers`)
    } else if (journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    }
  })

  router.post('/additional-costs/existing-payee-answers', function (req, res) {
    const payee = req.session.data['existing-payee']
    const journey = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (payee === 'New') {
      res.redirect(`/${urlPrefix}/additional-costs/new-payee-name`)
    } else if (journey === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/additional-costs/check-your-answers`)
    } else {
      res.redirect(`/${urlPrefix}/additional-costs/existing-account-details`)
    }
  })

  router.post('/additional-costs/existing-account-answers', function (req, res) {
    const payee = req.session.data['existing-payee']
    const account = req.session.data['existing-account']
    const journey = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (payee === 'New') {
      res.redirect(`/${urlPrefix}/additional-costs/new-payee-name`)
    } else if (journey === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/additional-costs/check-your-answers`)
    } else {
      res.redirect(`/${urlPrefix}/additional-costs/counter-signatory-name`)
    }
  })

  router.get('/additional-costs/check-your-answers', function (req, res) {

    res.render(`./${folderForViews}/additional-costs/check-your-answers`)
  })


  // post - Submit for upload
  router.post('/additional-costs/receipt-upload-add', function (req, res) {
    let allUploads = req.session.data.uploads // This is the running list of files

    const fileToUpload = req.session.data['file-upload'] // User submitted file

    // Stop null pointer
    if (allUploads == null) {
      allUploads = []
    }

    allUploads.push({
      file: fileToUpload
    })

    req.session.data.uploads = allUploads
    res.redirect(`/${urlPrefix}/additional-costs/upload-summary`)
  })

  // Get
  router.get('/additional-costs/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/additional-costs/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/additional-costs/remove-receipt-upload', function (req, res) {
    const allUploads = req.session.data.uploads
    const fileToDelete = req.session.data['file-receipt-to-remove']
    const removeFile = req.session.data['file-upload-remove']

    if (removeFile === 'Yes') {
      allUploads.splice(fileToDelete, 1)
    }
    req.session.data.uploads = allUploads
    req.session.data['file-receipt-to-remove'] = null
    req.session.data['confirm-file-upload-remove'] = null
    res.redirect(`/${urlPrefix}/additional-costs/upload-summary`)
  })


}
