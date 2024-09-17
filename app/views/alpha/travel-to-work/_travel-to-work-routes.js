module.exports = function (folderForViews, urlPrefix, router) {

//////Information pages

  router.get('/travel-to-work/start-a-claim', function (req, res) {
    res.render(`./${folderForViews}/travel-to-work/start-a-claim`)
  })

  router.get('/travel-to-work/travel-to-work', function (req, res) {
    if (req.session.data['multiple-ttw']){
      res.redirect(`/${urlPrefix}/travel-to-work/start-a-claim-multiple`)
    }
    else{
      res.render(`./${folderForViews}/travel-to-work/travel-to-work`)
    }
  })

  router.post('/travel-to-work/travel-to-work-answers', function (req, res) {
    const aids = req.session.data['travel-to-work']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/grant-information`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/travel-to-work/contact-dwp`)
    }
  })

  router.post('/travel-to-work/start-a-claim-multiple', function (req, res) {
    const claim = req.session.data['journey-type']

    res.redirect(`/${urlPrefix}/travel-to-work/grant-information`)
  })

  router.post('/travel-to-work/transport-option-answer-preview', function (req, res) {
    const transport = req.session.data['transport-option']

      res.redirect(`/${urlPrefix}/travel-to-work/claiming-instructions`)
  })

  router.post('/travel-to-work/claiming-instructions', function (req, res) {
    const transport = req.session.data['transport-option']

    if (transport === 'taxi') {
      res.redirect(`/${urlPrefix}/travel-to-work/claiming-for-month`)
    } else if (transport === 'lift') {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-or-journey`)
    }
  })

  router.post('/travel-to-work/mileage-or-journey', function (req, res) {
    const transport = req.session.data['transport-option']
    const claiming = req.session.data['way-of-claiming']

    if (transport === 'taxi') {
      res.redirect(`/${urlPrefix}/travel-to-work/claiming-for-month`)
    } else if (transport === 'lift' && claiming === 'journeys') {
      res.redirect(`/${urlPrefix}/travel-to-work/claiming-for-month`)
    } else if (transport === 'lift' && claiming === 'mileage') {
      res.redirect(`/${urlPrefix}/travel-to-work/claiming-for-month`)
    }
  })

  //////Data entry pages

  router.post('/travel-to-work/claiming-for-month', function (req, res) {
    var days = new Array(7);
    days[0] = "Sunday";
    days[1] = "Monday";
    days[2] = "Tuesday";
    days[3] = "Wednesday";
    days[4] = "Thursday";
    days[5] = "Friday";
    days[6] = "Saturday";

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    var month = req.session.data["travel-to-work-date-month"]
    var year = req.session.data["travel-to-work-date-year"]

    const getDays = (year, month) => {
      return new Date(year, month, 0).getDate();
    };

    var monthLength = getDays(year, month);
    var monthDayList = []
    var dayList = []

    for (let i = 1; i <= monthLength; i++) {
      dayList.push({ day: i, journeys: '' })
      var a = new Date(year, month - 1, i);
      var r = days[a.getDay()];
      var monthDay = { value: i, text: r + " " + i + " " + monthNames[a.getMonth()], input: '' }
      monthDayList.push(monthDay)
    }

    req.session.data['tiw-days'] = dayList

    var i = 0
    var weeksList = []
    var currentWeek = { weekNumber: 1, days: [] }

    while (i < monthDayList.length) {
      var currentDay = monthDayList[i]

      currentWeek.days.push(currentDay)

      if ((currentDay.text.includes('Sunday')) || (i == monthDayList.length - 1)) {
        weeksList.push(currentWeek)
        var newWeekNumber = currentWeek.weekNumber + 1
        currentWeek = { weekNumber: newWeekNumber, days: [] }
      }

      i++
    }

    req.session.data.dataList = weeksList

    if (req.session.data['month-list']){
      req.session.data['month-list'].forEach(existingMonth => {
        if (existingMonth.month == month && existingMonth.year == year){
          res.redirect(`/${urlPrefix}/travel-to-work/days-for-month-change?month=`+month+`&year=`+year)
        }
       });
    }

    const aids = req.session.data['transport-option']
    const claiming = req.session.data['way-of-claiming']

    if (aids === 'taxi' || aids === 'taxi-during-work') {
      res.redirect(`/${urlPrefix}/travel-to-work/days-for-month`)
      //  res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
    } else if (aids === 'lift' && claiming === 'mileage') {
      res.redirect(`/${urlPrefix}/travel-to-work/days-for-month`)
    } else if (aids === 'lift' && claiming === 'journeys') {
      res.redirect(`/${urlPrefix}/travel-to-work/days-for-month`)
    } else if (aids === 'lift-during-work') {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day`)
    }

  })

  router.post('/travel-to-work/days-for-month', function (req, res) {
    var allDays = req.session.data['ttw-days']
    var dataList = req.session.data['dataList']
    var month = req.session.data['travel-to-work-date-month']
    var year = req.session.data['travel-to-work-date-year']
    var monthList = req.session.data['month-list']

    req.session.data["ttw-days"] = []

    var selectedDays = []

    for (let i = 0; i < allDays.length; i++) {
      if (allDays[i] != '') {
        selectedDays.push({ day: i + 1, journeys: parseInt(allDays[i]) })
      }
    }

    if (!(req.session.data['month-list'])) {
      req.session.data['month-list'] = []
    }

    var monthData = {
      month: month,
      year: year,
      days: selectedDays
    }

    req.session.data['month-list'].forEach(existingMonth => {
     if (existingMonth.month == month && existingMonth.year == year){
      const index = req.session.data['month-list'].indexOf(existingMonth);
      req.session.data['month-list'].splice(index, 1);
     }
    });

    req.session.data['month-list'].push(monthData)

    var totalJourneys = 0

    req.session.data['month-list'].forEach(month => {
      var monthlyTotal = 0
      month.days.forEach(day => {
        totalJourneys = totalJourneys + parseInt(day.journeys)
        monthlyTotal = monthlyTotal + parseInt(day.journeys)

        const monthIndex = req.session.data['month-list'].indexOf(month);
        req.session.data['month-list'][monthIndex].monthTotal = monthlyTotal
      });
    });

    req.session.data["total-journeys"] = totalJourneys

    req.session.data["travel-to-work-errors"] = []

    res.redirect(`/${urlPrefix}/travel-to-work/journey-summary`)
  })

  router.post('/travel-to-work/journey-summary', function (req, res) {
    console.log(req.session.data.support)
    const addmonth = req.session.data['new-month']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']
    const aids = req.session.data['transport-option']
    const lift = req.session.data['way-of-claiming']

    if (req.session.data['month-list'].length < 1 && addmonth === 'no') {
      res.redirect(`/${urlPrefix}/portal`)
    }

    if (addmonth === 'no' && journeytype === 'traveltowork-ammendment' && aids === 'taxi') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork-ammendment' && aids === 'lift') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork-ammendment' && aids === 'taxi-during-work') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked && addmonth === 'no') {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork' && aids === 'lift') {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-amount-paid`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork') {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-cost`)
    } else if (addmonth === 'yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/claiming-for-month`)
    }
  })

  router.get('/travel-to-work/remove-month', function (req, res) {
    req.session.data["travel-to-work-date-month"] = req.query.month
    req.session.data["travel-to-work-date-year"] = req.query.year
    res.redirect(`/${urlPrefix}/travel-to-work/remove-month-confirmation`)
  })

  router.post('/travel-to-work/remove-month-confirmation', function (req, res) {

    if (req.session.data['remove-month'] == 'No'){
      res.redirect(`/${urlPrefix}/travel-to-work/journey-summary`)
    }

    if (req.session.data['month-list']) {
      var month_to_delete = req.session.data['month-list'].find((month) => month.month === req.session.data["travel-to-work-date-month"] && month.year === req.session.data["travel-to-work-date-year"]);

      if (month_to_delete) {
        const index = req.session.data['month-list'].indexOf(month_to_delete);
        req.session.data['month-list'].splice(index, 1);
      }
    }

    var totalJourneys = 0

    req.session.data['month-list'].forEach(month => {
      var monthlyTotal = 0
      month.days.forEach(day => {
        totalJourneys = totalJourneys + parseInt(day.journeys)
        monthlyTotal = monthlyTotal + parseInt(day.journeys)

        const monthIndex = req.session.data['month-list'].indexOf(month);
        req.session.data['month-list'][monthIndex].monthTotal = monthlyTotal
      });
    });

    req.session.data["total-journeys"] = totalJourneys

    res.redirect(`/${urlPrefix}/travel-to-work/journey-summary`)
  })

  router.get('/travel-to-work/days-for-month-change', function (req, res) {
    if (req.query.month) {
      var days = new Array(7);
      days[0] = "Sunday";
      days[1] = "Monday";
      days[2] = "Tuesday";
      days[3] = "Wednesday";
      days[4] = "Thursday";
      days[5] = "Friday";
      days[6] = "Saturday";

      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      var month = req.query.month
      var year = req.query.year

      const getDays = (year, month) => {
        return new Date(year, month, 0).getDate();
      };

      var monthLength = getDays(year, month);
      var monthDayList = []

      for (let i = 1; i <= monthLength; i++) {
        var a = new Date(year, month - 1, i);
        var r = days[a.getDay()];
        var monthDay = { value: i, text: r + " " + i + " " + monthNames[a.getMonth()] }
        monthDayList.push(monthDay)
      }

      var i = 0
      var weeksList = []
      var currentWeek = { weekNumber: 1, days: [] }

      while (i < monthDayList.length) {
        var currentDay = monthDayList[i]

        currentWeek.days.push(currentDay)

        if ((currentDay.text.includes('Sunday')) || (i == monthDayList.length - 1)) {
          weeksList.push(currentWeek)
          var newWeekNumber = currentWeek.weekNumber + 1
          currentWeek = { weekNumber: newWeekNumber, days: [] }
        }

        i++
      }

      req.session.data.dataList = weeksList
      var month_list = req.session.data['month-list']
      var month_data = month_list.find((month) => month.month === req.query.month && month.year === req.query.year);

      req.session.data.checked = []

      req.session.data["travel-to-work-date-month"] = req.query.month
      req.session.data["travel-to-work-date-year"] = req.query.year
      req.session.data["ttw-days"] = Array(31)

      month_data.days.forEach(day => {
        req.session.data["ttw-days"][(day.day-1)] = day.journeys.toString()
      });
      res.redirect(`/${urlPrefix}/travel-to-work/days-for-month`)
    }
    else {
      res.redirect(`/${urlPrefix}/travel-to-work/days-for-month`)
    }
  })

  ///////Further data pages

  router.post('/travel-to-work/taxi-cost-answer', function (req, res) {
    const cost = req.session.data['cost-of-taxi']
    const journeytype = req.session.data['journey-type']
    const alreadyupload = req.session.data['new-payee-full-name']
    const checked = req.session.data['contact-confirmed']


    if (journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else if (alreadyupload) {
      res.redirect(`/${urlPrefix}/portal-screens/upload-summary`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/providing-evidence`)
    }
  })

  router.post('/travel-to-work/change-cost-answer', function (req, res) {
    const change = req.session.data['change-cost']

    if (change === 'yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-cost`)
    } else if (change === 'no') {
      res.redirect(`/${urlPrefix}/travel-to-work/upload-summary`)
    }
  })

  router.post('/travel-to-work/receipt-upload-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/travel-to-work/upload-summary`)
  })

  // Get
  router.get('/travel-to-work/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-to-work/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-to-work/remove-receipt-upload', function (req, res) {
    const allUploads = req.session.data.uploads
    const fileToDelete = req.session.data['file-receipt-to-remove']
    const removeFile = req.session.data['file-upload-remove']

    if (removeFile === 'Yes') {
      allUploads.splice(fileToDelete, 1)
    }
    req.session.data.uploads = allUploads
    req.session.data['file-receipt-to-remove'] = null
    req.session.data['confirm-file-upload-remove'] = null
    res.redirect(`/${urlPrefix}/travel-to-work/upload-summary`)
  })

  // post - Add more receipts
  router.post('/travel-to-work/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']


    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/travel-to-work/receipt-upload`)
    } else if (anotherReceipt === 'No' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else if (anotherReceipt === 'No' && (journeytype === 'traveltowork' || journeytype === 'travel-to-work')) {
      res.redirect(`/${urlPrefix}/travel-to-work/existing-payee-details`)
    }
  })

  router.post('/travel-to-work/existing-payee-answers', function (req, res) {
    const payee = req.session.data['existing-payee']
    const journey = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (payee == "one"){
      req.session.data["new-payee-full-name"] = 'John Doe'
      req.session.data["payee-email"] = 'john.doe@deafactioncharity.com'

      req.session.data["new-payee-address-line-1"] = '100 Gorgie Park Rd'
      req.session.data["new-payee-address-line-2"] = ''
      req.session.data["new-payee-address-town"] = 'Edinburgh'
      req.session.data["new-payee-address-county"] = 'Midlothian'
      req.session.data["new-payee-address-postcode"] = 'EH11 2QL'
    }
    else if (payee == "two"){
      req.session.data["new-payee-full-name"] = 'Jane Green'
      req.session.data["payee-email"] = 'jane.green@bsl-interpreters.com'

      req.session.data["new-payee-address-line-1"] = '25 N Devon Rd'
      req.session.data["new-payee-address-line-2"] = ''
      req.session.data["new-payee-address-town"] = 'Bristol'
      req.session.data["new-payee-address-county"] = 'Avon'
      req.session.data["new-payee-address-postcode"] = 'BS16 2EX'
    }
    else if (payee == "three"){
      req.session.data["new-payee-full-name"] = 'Sanjid Kelly'
      req.session.data["payee-email"] = 'sanjid.kelly@deafactioncharity.com'

      req.session.data["new-payee-address-line-1"] = '5 Crane St'
      req.session.data["new-payee-address-line-2"] = ''
      req.session.data["new-payee-address-town"] = 'Pontypool'
      req.session.data["new-payee-address-county"] = 'Gwent'
      req.session.data["new-payee-address-postcode"] = 'NP4 6LY'
    }

    
    req.session.data["roll-number"] = ''

    if (payee === 'New') {
      res.redirect(`/${urlPrefix}/travel-to-work/new-payee-name`)
    } else if (journey === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/existing-account-details`)
    }
  })

  router.post('/travel-to-work/existing-account-answers', function (req, res) {
    const payee = req.session.data['existing-payee']
    const account = req.session.data['existing-account']
    const journey = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (payee == "one"){
      req.session.data["new-payee-full-name"] = 'John Doe'
      req.session.data["payee-email"] = 'john.doe@deafactioncharity.com'

      req.session.data["new-payee-address-line-1"] = '100 Gorgie Park Rd'
      req.session.data["new-payee-address-line-2"] = ''
      req.session.data["new-payee-address-town"] = 'Edinburgh'
      req.session.data["new-payee-address-county"] = 'Midlothian'
      req.session.data["new-payee-address-postcode"] = 'EH11 2QL'
    }
    else if (payee == "two"){
      req.session.data["new-payee-full-name"] = 'Jane Green'
      req.session.data["payee-email"] = 'jane.green@bsl-interpreters.com'

      req.session.data["new-payee-address-line-1"] = '25 N Devon Rd'
      req.session.data["new-payee-address-line-2"] = ''
      req.session.data["new-payee-address-town"] = 'Bristol'
      req.session.data["new-payee-address-county"] = 'Avon'
      req.session.data["new-payee-address-postcode"] = 'BS16 2EX'
    }
    else if (payee == "three"){
      req.session.data["new-payee-full-name"] = 'Sanjid Kelly'
      req.session.data["payee-email"] = 'sanjid.kelly@deafactioncharity.com'

      req.session.data["new-payee-address-line-1"] = '5 Crane St'
      req.session.data["new-payee-address-line-2"] = ''
      req.session.data["new-payee-address-town"] = 'Pontypool'
      req.session.data["new-payee-address-county"] = 'Gwent'
      req.session.data["new-payee-address-postcode"] = 'NP4 6LY'
    }

    if (account == "one"){
      req.session.data["name-on-the-account"] = 'Doe and Brothers LLP'
      req.session.data["sort-code"] = '123456'
      req.session.data["account-number"] = '12345678'
    }
    else if (account == "two"){
      req.session.data["name-on-the-account"] = 'Doe and Brothers LLP'
      req.session.data["sort-code"] = '123656'
      req.session.data["account-number"] = '12555678'
    }
    else if (account == "three"){
      req.session.data["name-on-the-account"] = 'Doe and Brothers LLP'
      req.session.data["sort-code"] = '654321'
      req.session.data["account-number"] = '00456789'
    }
    else if (account == "four"){
      req.session.data["name-on-the-account"] = 'Sanjid Burns Kelly'
      req.session.data["sort-code"] = '112233'
      req.session.data["account-number"] = '54532222'
    }

    
    req.session.data["roll-number"] = ''

    if (payee === 'New') {
      res.redirect(`/${urlPrefix}/travel-to-work/new-payee-name`)
    } else if (journey === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/counter-signatory-name`)
    }
  })

  // post - Submit for mileage
  router.post('/travel-to-work/mileage-for-day-add', function (req, res) {
    let allDays = req.session.data.mileages // This is the running list of days with mileage

    const submittedDay = req.session.data['mileage-of-day-date-day']
    const submittedMileage = req.session.data['mileage-of-day-distance']

    // Stop null pointer
    if (allDays == null) {
      allDays = []
    }

    allDays.push({
      day: submittedDay,
      mileage: submittedMileage
    })

    req.session.data.mileages = allDays
    res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-summary`)
  })

  // post - Add more hours
  router.post('/travel-to-work/mileage-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-more-mileage']
    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['mileage-of-day-date-day'] = null
      req.session.data['mileage-of-day-distance'] = null

      res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-confirmation`)
    }
  })

  // Get
  router.get('/travel-to-work/remove-day-mileage', function (req, res) {
    req.session.data['mileage-hours-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-to-work/remove-day-mileage`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-to-work/remove-day-mileage', function (req, res) {
    const allUploads = req.session.data.mileages
    const mileageToRemove = req.session.data['day-mileage-to-remove']
    const confirmationToRemove = req.session.data['day-mileage-remove-confirmation']

    if (confirmationToRemove === 'Yes') {
      allUploads.splice(mileageToRemove, 1)
    }
    req.session.data.mileages = allUploads
    req.session.data['mileage-hours-to-remove'] = null
    req.session.data['day-mileage-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-summary`)
  })

  // post - Submit for taxi
  router.post('/travel-to-work/taxi-journeys-for-day-add', function (req, res) {
    let allDays = req.session.data.journeys // This is the running list of days with mileage

    const submittedDay = req.session.data['taxi-journeys-for-day-date-day']
    const submittedCost = req.session.data['taxi-journeys-for-day-journeys']

    // Stop null pointer
    if (allDays == null) {
      allDays = []
    }

    allDays.push({
      day: submittedDay,
      journeys: submittedCost
    })

    req.session.data.journeys = allDays
    res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-summary`)
  })

  // post - Add more hours
  router.post('/travel-to-work/taxi-journeys-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-more-taxi-journeys']

    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['taxi-journeys-for-day-date-day'] = null
      req.session.data['taxi-journeys-for-day-journeys'] = null

      res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
    } else if (addAnotherDay === 'No' && (req.session.data.journeys === undefined || req.session.data.journeys.length == 0)) {
      res.redirect(`/${urlPrefix}/travel-to-work/no-hours-entered`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-confirmation`)
    }
  })

  // Get
  router.get('/travel-to-work/remove-day-journeys', function (req, res) {
    req.session.data['day-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-to-work/remove-day-journeys`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-to-work/remove-day-journeys', function (req, res) {
    const all = req.session.data.journeys
    const toRemove = req.session.data['day-to-remove']
    const confirmationToRemove = req.session.data['day-to-remove-confirmation']

    if (confirmationToRemove === 'Yes') {
      all.splice(toRemove, 1)
    }
    req.session.data.journeys = all
    req.session.data['day-to-remove'] = null
    req.session.data['day-to-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-summary`)
  })

  router.post('/travel-to-work/taxi-confirmation-answers', function (req, res) {
    const confirm = req.session.data['taxi-confirmation']
    if (confirm === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-cost`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-summary`)
    }
  })

  router.post('/travel-to-work/mileage-confirmation-answers', function (req, res) {
    const confirm = req.session.data['mileage-confirmation']
    if (confirm === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/new-payee-name`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-summary`)
    }
  })



  // new journey stuff - taxis

  // Get
  router.get('/travel-to-work/taxi-journeys-for-day-change', function (req, res) {
    if (req.query.month){
      var month_list = req.session.data['month-list']
      var month_data = month_list.find((month) => month.month === req.query.month && month.year === req.query.year);
      if (month_data.travel[0]["repeattravel_journeys"]){
        req.session.data["travel-to-work-date-month-repeat"] = req.query.month
        req.session.data["travel-to-work-date-year-repeat"] = req.query.year
        req.session.data["repeattravel"] = month_data.travel
        res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-repeat`)
      }
      else {
        req.session.data["travel-to-work-date-month"] = req.query.month
        req.session.data["travel-to-work-date-year"] = req.query.year
        req.session.data["travel"] = month_data.travel
        res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
      }
    }
    else{
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
    }
  })

  // Get
  router.get('/travel-to-work/mileage-for-day-change', function (req, res) {
    if (req.query.month){
      var month_list = req.session.data['month-list']
      var month_data = month_list.find((month) => month.month === req.query.month && month.year === req.query.year);
      if (month_data.milage[0]["repeatmilage_total"]){
        req.session.data["travel-to-work-date-month-repeat"] = req.query.month
        req.session.data["travel-to-work-date-year-repeat"] = req.query.year
        req.session.data["repeatmilage"] = month_data.milage
        res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-repeat`)
      }
      else {
        req.session.data["travel-to-work-date-month"] = req.query.month
        req.session.data["travel-to-work-date-year"] = req.query.year
        req.session.data["milage"] = month_data.milage
        res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day`)
      }
    }
    else{
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day`)
    }
  })

  router.post('/travel-to-work/taxi-journeys-for-day', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
    } else {
      if (req.session.data.action === 'add') {
        console.log('Add')
        console.log(req.session.data)
        req.session.data.support = [...req.session.data.support, {
          support_hours: '',
          day: '',
          month: '',
          year: ''
        }]
        res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
      } else {
        console.log('Continue')
        var month = req.session.data['travel-to-work-date-month']
        var year = req.session.data['travel-to-work-date-year']
        var month_travel = req.session.data.travel
        console.log(month)
        console.log(year)
        console.log(month_travel)
        var list = [
          { month: month, year: year, travel: month_travel }
        ];
        if (req.session.data['month-list']){
          var month_index = req.session.data['month-list'].findIndex((el) => el.month === month && el.year === year);
          if (month_index != -1){
            req.session.data['month-list'][month_index] = list[0]
          }
          else{
            req.session.data['month-list'].push(list[0]);
          }
        }
        else{
          req.session.data['month-list'] = list
        }
        console.log(req.session.data['month-list'])
        res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-summary`)
      }
    }
  })

  router.post('/travel-to-work/taxi-journeys-for-day-repeat', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-repeat`)
    } else {
      if (req.session.data.action === 'add') {
        console.log('Add')
        console.log(req.session.data)
        req.session.data.support = [...req.session.data.support, {
          support_hours: '',
          day: '',
          month: '',
          year: ''
        }]
        res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
      } else {
        console.log('Continue')
        var month = req.session.data['travel-to-work-date-month-repeat']
        var year = req.session.data['travel-to-work-date-year-repeat']
        var month_travel = req.session.data.repeattravel
        req.session.data.repeattravel = null
        console.log(month)
        console.log(year)
        console.log(month_travel)
        var list = [
          { month: month, year: year, travel: month_travel }
        ];
        if (req.session.data['month-list']){
          var month_index = req.session.data['month-list'].findIndex((el) => el.month === month && el.year === year);
          if (month_index != -1){
            req.session.data['month-list'][month_index] = list[0]
          }
          else{
            req.session.data['month-list'].push(list[0]);
          }
        }
        else{
          req.session.data['month-list'] = list
        }
        console.log(req.session.data['month-list'])
        res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-summary`)
      }
    }
  })

  // post - for next screen
  router.post('/travel-to-work/taxi-journeys-for-day-summary', function (req, res) {
    console.log(req.session.data.support)
    const addmonth = req.session.data['new-month']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']
    const aids = req.session.data['transport-option']
    const lift = req.session.data['way-of-claiming']




    if (req.session.data.travel === undefined || req.session.data.travel.length == 0) {
      res.redirect(`/${urlPrefix}/travel-to-work/no-hours-entered`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork-ammendment' && aids === 'taxi') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork-ammendment' && aids === 'lift') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork-ammendment' && aids === 'taxi-during-work') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked && addmonth === 'no') {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else if (addmonth === 'no' && (journeytype === 'traveltowork' || journeytype === 'travel-to-work') && lift === 'journeys') {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-amount-paid`)
    } else if (addmonth === 'no' && (journeytype === 'traveltowork' || journeytype === 'travel-to-work')) {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-cost`)
    } else if (addmonth === 'yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/claiming-for-month-repeat`)
    }
  })


  // new journey stuff - milage
  router.post('/travel-to-work/mileage-for-day', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day`)
    } else {
      if (req.session.data.action === 'add') {
        console.log('Add')
        console.log(req.session.data)
        req.session.data.support = [...req.session.data.support, {
          support_hours: '',
          day: '',
          month: '',
          year: ''
        }]
        res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day`)
      } else {
        console.log('Continue')
        var month = req.session.data['travel-to-work-date-month']
        var year = req.session.data['travel-to-work-date-year']
        var month_milage = req.session.data.milage
        console.log(month)
        console.log(year)
        console.log(month_milage)
        var list = [
          { month: month, year: year, milage: month_milage }
        ];
        if (req.session.data['month-list']){
          var month_index = req.session.data['month-list'].findIndex((el) => el.month === month && el.year === year);
          if (month_index != -1){
            req.session.data['month-list'][month_index] = list[0]
          }
          else{
            req.session.data['month-list'].push(list[0]);
          }
        }
        else{
          req.session.data['month-list'] = list
        }
        console.log(req.session.data['month-list'])
        res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-summary`)
      }
    }
  })

  router.post('/travel-to-work/mileage-for-day-repeat', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-repeat`)
    } else {
      if (req.session.data.action === 'add') {
        console.log('Add')
        console.log(req.session.data)
        req.session.data.support = [...req.session.data.support, {
          support_hours: '',
          day: '',
          month: '',
          year: ''
        }]
        res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-repeat`)
      } else {
        console.log('Continue')
        var month = req.session.data['travel-to-work-date-month-repeat']
        var year = req.session.data['travel-to-work-date-year-repeat']
        var month_milage = req.session.data.repeatmilage
        req.session.data.repeatmilage = null
        console.log(month)
        console.log(year)
        console.log(month_milage)
        var list = [
          { month: month, year: year, milage: month_milage }
        ];
        if (req.session.data['month-list']){
          var month_index = req.session.data['month-list'].findIndex((el) => el.month === month && el.year === year);
          if (month_index != -1){
            req.session.data['month-list'][month_index] = list[0]
          }
          else{
            req.session.data['month-list'].push(list[0]);
          }
        }
        else{
          req.session.data['month-list'] = list
        }
        console.log(req.session.data['month-list'])
        res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-summary`)
      }
    }
  })

  // post - Add more support hours
  router.post('/travel-to-work/mileage-for-day-summary', function (req, res) {
    const addmonth = req.session.data['new-month']



    if (addmonth === "yes") {
      res.redirect(`/${urlPrefix}/travel-to-work/claiming-for-month-repeat`)
    } else if (addmonth === "no") {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-amount-paid`)
    }
  })

  // employer contribution answer

  router.post('/travel-to-work/employer-contribution-answer', function (req, res) {
    const transport = req.session.data['transport-option']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (transport === 'taxi' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (transport === 'taxi-during-work' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else if (transport === 'taxi' && checked) {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else if (transport === 'taxi-during-work' && checked) {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else if (transport === 'taxi' && (journeytype === 'traveltowork' || journeytype === 'travel-to-work')) {
      res.redirect(`/${urlPrefix}/travel-to-work/providing-evidence`)
    } else if (transport === 'taxi-during-work' && (journeytype === 'traveltowork' || journeytype === 'travel-to-work')) {
      res.redirect(`/${urlPrefix}/travel-to-work/providing-evidence`)
    } else if (transport === 'lift' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (transport === 'lift-during-work' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (transport === 'lift' && checked) {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else if (transport === 'lift-during-work' && checked) {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    } else if (transport === 'lift' && (journeytype === 'traveltowork' || journeytype === 'travel-to-work')) {
      res.redirect(`/${urlPrefix}/travel-to-work/new-payee-name`)
    } else if (transport === 'lift-during-work' && (journeytype === 'traveltowork' || journeytype === 'travel-to-work')) {
      res.redirect(`/${urlPrefix}/travel-to-work/new-payee-name`)
    }
  })

  // workplace conact answer

  router.post('/travel-to-work/workplace-contact-answer', function (req, res) {
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['ttw-declaration']

    if (journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked === 'true') {
      res.redirect(`/${urlPrefix}/portal-screens/citizen-new-declaration-pre-confirm`)
    } else if ((journeytype === 'traveltowork' || journeytype === 'travel-to-work')) {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    }
  })

  router.post('/travel-to-work/employment-status-answer', function (req, res) {
    const status = req.session.data['employment-status']
    const checked = req.session.data['ttw-declaration']

    if (status === 'Employed') {
      res.redirect(`/${urlPrefix}/travel-to-work/counter-signatory-name`)
    } else if (status === 'Self-employed' && checked === 'true') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (status === 'Self-employed') {
      res.redirect(`/${urlPrefix}/travel-to-work/check-your-answers`)
    }
  })



    

  

}