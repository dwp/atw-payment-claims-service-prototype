module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/travel-in-work/start-a-claim', function (req, res) {
    res.render(`./${folderForViews}/travel-in-work/start-a-claim`)
  })

  router.post('/travel-in-work/travel-to-work-answers', function (req, res) {
    const aids = req.session.data['travel-to-work']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-in-work/grant-information`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/travel-in-work/contact-dwp`)
    }
  })

  router.post('/travel-in-work/select-month', function (req, res) {
    res.redirect(`/${urlPrefix}/travel-in-work/claiming-for-month`)

  })


  router.post('/travel-in-work/claiming-for-month', function (req, res) {
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

    var month = req.session.data["travel-in-work-date-month"]
    var year = req.session.data["travel-in-work-date-year"]

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

    res.redirect(`/${urlPrefix}/travel-in-work/days-for-month`)
  })

  router.post('/travel-in-work/days-for-month', function (req, res) {
    var allDays = req.session.data['tiw-days']
    var existingData = req.session.data['travel-in-work']
    var selectedDays = []
    var dayIndex = 0



    for (let i = 0; i < allDays.length; i++) {
      if (allDays[i] != '' && allDays[i] != '0') {
        var journeyArray = Array.apply(null, Array(parseInt(allDays[i]))).map(function (x, i) {
          return {
            index: i,
            postcodeFrom: '',
            postcodeTo: '',
            cost: ''
          };
        })

        selectedDays.push({
          index: dayIndex,
          day: i + 1,
          journeys: journeyArray
        })
        dayIndex++
      }
    }

    if (existingData) {
      selectedDays.forEach(newDay => {
        var existingDay = existingData.find((day) => day.day == newDay.day.toString());
        if (existingDay){
          if (newDay.journeys.length > existingDay.journeys.length){
            var diff = newDay.journeys.length - existingDay.journeys.length
            var length = existingDay.journeys.length
            for (let i = 0; i < diff; i++){
              existingDay.journeys.push({
                index: i+length,
                postcodeFrom: '',
                postcodeTo: '',
                cost: ''
              })
            }
          }
          else if (newDay.journeys.length < existingDay.journeys.length){
            existingData[existingDay.index] = newDay
          }
        }
        else{
          req.session.data['travel-in-work'].push(newDay)
        }
      });

      existingData.forEach(existingDay => {
        var newDay = selectedDays.find((day) => day.day.toString() == existingDay.day.toString());
        if (!newDay){
          existingData.splice(existingDay.index, 1);
        }
      });

      req.session.data['travel-in-work'] = existingData
    }
    else{
      req.session.data['travel-in-work'] = selectedDays
    }

    req.session.data["travel-in-work-errors"] = []

    res.redirect(`/${urlPrefix}/travel-in-work/taxi-journeys-for-day`)
  })

  router.post('/travel-in-work/taxi-cost-answer', function (req, res) {
    const cost = req.session.data['cost-of-taxi']
    const journeytype = req.session.data['journey-type']
    const alreadyupload = req.session.data['new-payee-full-name']
    const checked = req.session.data['contact-confirmed']


    if (cost === '100') {
      res.redirect(`/${urlPrefix}/travel-in-work/employer-contribution`)
    } else if (journeytype === 'traveltowork-ammendment' || alreadyupload) {
      res.redirect(`/${urlPrefix}/travel-in-work/upload-summary`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/travel-in-work/check-your-answers`)
    } else {
      res.redirect(`/${urlPrefix}/travel-in-work/providing-evidence`)
    }
  })

  router.post('/travel-in-work/change-cost-answer', function (req, res) {
    const change = req.session.data['change-cost']

    if (change === 'yes') {
      res.redirect(`/${urlPrefix}/travel-in-work/taxi-cost`)
    } else if (change === 'no') {
      res.redirect(`/${urlPrefix}/travel-in-work/upload-summary`)
    }
  })

  // router.post('/travel-in-work/agreed-monthly-taxi-answers', function (req, res) {
  //   const aids = req.session.data['agreed-monthly-taxi']
  //
  //   if (aids === 'Yes') {
  //     res.redirect(`/${urlPrefix}/travel-in-work/exceed-agreed-monthly-taxi`)
  //   } else if (aids === 'No') {
  //     res.redirect(`/${urlPrefix}/travel-in-work/taxi-journeys-for-day`)
  //   }
  // })
  // router.post('/travel-in-work/exceed-agreed-monthly-taxi-answers', function (req, res) {
  //   const aids = req.session.data['exceed-agreed-monthly-taxi']
  //
  //   if (aids === 'Yes') {
  //     res.redirect(`/${urlPrefix}/travel-in-work/taxi-journeys-for-day`)
  //   } else if (aids === 'No') {
  //     res.redirect(`/${urlPrefix}/travel-in-work/agreed-monthly-taxi-cost`)
  //   }
  // })

  // post - Submit for upload
  router.post('/travel-in-work/receipt-upload-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/travel-in-work/upload-summary`)
  })

  // Get
  router.get('/travel-in-work/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-in-work/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-in-work/remove-receipt-upload', function (req, res) {
    const allUploads = req.session.data.uploads
    const fileToDelete = req.session.data['file-receipt-to-remove']
    const removeFile = req.session.data['file-upload-remove']

    if (removeFile === 'Yes') {
      allUploads.splice(fileToDelete, 1)
    }
    req.session.data.uploads = allUploads
    req.session.data['file-receipt-to-remove'] = null
    req.session.data['confirm-file-upload-remove'] = null
    res.redirect(`/${urlPrefix}/travel-in-work/upload-summary`)
  })

  // post - Add more receipts
  router.post('/travel-in-work/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']


    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/travel-in-work/receipt-upload`)
    } else if (anotherReceipt === 'No' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/travel-in-work/check-your-answers`)
    } else if (anotherReceipt === 'No' && journeytype === 'travelinwork') {
      res.redirect(`/${urlPrefix}/travel-in-work/new-payee-name`)
    }
  })

  // post - Submit for mileage
  router.post('/travel-in-work/mileage-for-day-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/travel-in-work/mileage-for-day-summary`)
  })

  // post - Add more hours
  router.post('/travel-in-work/mileage-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-more-mileage']
    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['mileage-of-day-date-day'] = null
      req.session.data['mileage-of-day-distance'] = null

      res.redirect(`/${urlPrefix}/travel-in-work/mileage-for-day`)
    } else {
      res.redirect(`/${urlPrefix}/travel-in-work/mileage-confirmation`)
    }
  })

  // Get
  router.get('/travel-in-work/remove-day-mileage', function (req, res) {
    req.session.data['mileage-hours-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-in-work/remove-day-mileage`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-in-work/remove-day-mileage', function (req, res) {
    const allUploads = req.session.data.mileages
    const mileageToRemove = req.session.data['day-mileage-to-remove']
    const confirmationToRemove = req.session.data['day-mileage-remove-confirmation']

    if (confirmationToRemove === 'Yes') {
      allUploads.splice(mileageToRemove, 1)
    }
    req.session.data.mileages = allUploads
    req.session.data['mileage-hours-to-remove'] = null
    req.session.data['day-mileage-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/travel-in-work/mileage-for-day-summary`)
  })

  // post - Submit for taxi
  router.post('/travel-in-work/taxi-journeys-for-day-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/travel-in-work/taxi-journeys-for-day-summary`)
  })

  // Get
  router.get('/travel-in-work/remove-day-journeys', function (req, res) {
    req.session.data['day-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-in-work/remove-day-journeys`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-in-work/remove-day-journeys', function (req, res) {
    const all = req.session.data.journeys
    const toRemove = req.session.data['day-to-remove']
    const confirmationToRemove = req.session.data['day-to-remove-confirmation']

    if (confirmationToRemove === 'Yes') {
      all.splice(toRemove, 1)
    }
    req.session.data.journeys = all
    req.session.data['day-to-remove'] = null
    req.session.data['day-to-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/travel-in-work/taxi-journeys-for-day-summary`)
  })

  router.post('/travel-in-work/taxi-confirmation-answers', function (req, res) {
    const confirm = req.session.data['taxi-confirmation']
    if (confirm === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-in-work/providing-evidence`)
    } else {
      res.redirect(`/${urlPrefix}/travel-in-work/taxi-journeys-for-day-summary`)
    }
  })

  router.post('/travel-in-work/mileage-confirmation-answers', function (req, res) {
    const confirm = req.session.data['mileage-confirmation']
    if (confirm === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-in-work/new-payee-name`)
    } else {
      res.redirect(`/${urlPrefix}/travel-in-work/mileage-for-day-summary`)
    }
  })



  // new journey stuff - taxis


  router.post('/travel-in-work/taxi-journeys-for-day', function (req, res) {
    id = 0

    journeys = req.session.data['travel-in-work']
    month = req.session.data['travel-in-work-date-month']
    year = req.session.data['travel-in-work-date-year']

    existingData = req.session.data['travelinwork']

    month_data = {
      month: month,
      year: year,
      days: journeys
    }

    if (!req.session.data.travelinwork) {
      req.session.data.travelinwork = []
      req.session.data.travelinwork.push(month_data)
    }
    else{
      var existingMonth = existingData.find((foundMonth) => foundMonth.month.toString() == month_data.month.toString());
      if (existingMonth){
        req.session.data.travelinwork[existingData.indexOf(existingMonth)] = month_data
      }
      else{
        req.session.data.travelinwork.push(month_data)
      }
    }

    total_cost = 0
    total_journeys = 0

    req.session.data['travelinwork'].forEach(month => {
      var monthTotalCost = 0
      var monthTotalJourneys = 0

      month.days.forEach(day => {
        monthTotalJourneys = monthTotalJourneys + day.journeys.length

        day.journeys.forEach(journey => {
          total_cost = total_cost + parseInt(journey.cost)
          monthTotalCost = monthTotalCost + parseInt(journey.cost)
        });
      });
      month.totalMonthCost = monthTotalCost
      month.totalMonthJourneys = monthTotalJourneys
      total_journeys = total_journeys + monthTotalJourneys

    });

    req.session.data['total-cost'] = total_cost
    req.session.data['total-journeys'] = total_journeys

    res.redirect(`/${urlPrefix}/travel-in-work/taxi-journeys-for-day-summary`)
  })


  // post - for next screen
  router.post('/travel-in-work/taxi-journeys-for-day-summary', function (req, res) {
    console.log(req.session.data.support)
    const addmonth = req.session.data['new-month']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']
    const incorrect = req.session.data['claim-incorrect']

    if (req.session.data['travelinwork'].length < 1 && addmonth === 'no') {
      res.redirect(`/${urlPrefix}/portal`)
    }

    if (req.session.data['travel-in-work'] === undefined || req.session.data['travel-in-work'].length == 0) {
      res.redirect(`/${urlPrefix}/travel-in-work/no-hours-entered`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork-ammendment' && incorrect) {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked && addmonth === 'no') {
      res.redirect(`/${urlPrefix}/travel-in-work/check-your-answers`)
    } else if (addmonth === 'no' && journeytype === 'travelinwork') {
      res.redirect(`/${urlPrefix}/travel-in-work/providing-evidence`)
    } else if (addmonth === 'yes') {
      req.session.data['travel-in-work'] = ''

      res.redirect(`/${urlPrefix}/travel-in-work/claiming-for-month`)
    }
  })

  // new journey stuff - milage
  router.post('/travel-in-work/mileage-for-day', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-in-work/mileage-for-day`)
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
        res.redirect(`/${urlPrefix}/travel-in-work/mileage-for-day`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/travel-in-work/mileage-for-day-summary`)
      }
    }
  })

  router.post('/travel-in-work/mileage-for-day-repeat', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-in-work/mileage-for-day-repeat`)
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
        res.redirect(`/${urlPrefix}/travel-in-work/mileage-for-day-repeat`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/travel-in-work/mileage-for-day-summary`)
      }
    }
  })


  // employer contribution answer

  router.post('/travel-in-work/employer-contribution-answer', function (req, res) {
    const transport = req.session.data['transport-option']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (transport === 'taxi' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (transport === 'taxi-during-work' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/travel-in-work/check-your-answers`)
    } else if (transport === 'taxi' && checked) {
      res.redirect(`/${urlPrefix}/travel-in-work/check-your-answers`)
    } else if (transport === 'taxi-during-work' && checked) {
      res.redirect(`/${urlPrefix}/travel-in-work/check-your-answers`)
    } else if (transport === 'taxi' && journeytype === 'traveltowork') {
      res.redirect(`/${urlPrefix}/travel-in-work/providing-evidence`)
    } else if (transport === 'taxi-during-work' && journeytype === 'traveltowork') {
      res.redirect(`/${urlPrefix}/travel-in-work/providing-evidence`)
    } else if (transport === 'lift' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (transport === 'lift-during-work' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (transport === 'lift' && checked) {
      res.redirect(`/${urlPrefix}/travel-in-work/check-your-answers`)
    } else if (transport === 'lift-during-work' && checked) {
      res.redirect(`/${urlPrefix}/travel-in-work/check-your-answers`)
    } else if (transport === 'lift' && journeytype === 'traveltowork') {
      res.redirect(`/${urlPrefix}/travel-in-work/new-payee-name`)
    } else if (transport === 'lift-during-work' && journeytype === 'traveltowork') {
      res.redirect(`/${urlPrefix}/travel-in-work/new-payee-name`)
    }
  })

  // workplace conact answer

  router.post('/travel-in-work/workplace-contact-answer', function (req, res) {
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['tiw-declaration']

    if (journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked === 'true') {
      res.redirect(`/${urlPrefix}/portal-screens/citizen-new-declaration-pre-confirm`)
    } else if (journeytype === 'travelinwork') {
      res.redirect(`/${urlPrefix}/travel-in-work/check-your-answers`)
    }
  })

  router.post('/travel-in-work/employment-status-answer', function (req, res) {
    const status = req.session.data['employment-status']

    if (status === 'Employed') {
      res.redirect(`/${urlPrefix}/travel-in-work/counter-signatory-name`)
    } else if (status === 'Self-employed') {
      res.redirect(`/${urlPrefix}/travel-in-work/check-your-answers`)
    }
  })

  router.get('/travel-in-work/days-for-month-change', function (req, res) {
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
      var month_list = req.session.data['travelinwork']
      var month_data = month_list.find((month) => month.month === req.query.month && month.year === req.query.year);

      req.session.data.checked = []

      req.session.data["travel-in-work-date-month"] = req.query.month
      req.session.data["travel-in-work-date-year"] = req.query.year
      req.session.data["travel-in-work"] = month_data.days
      req.session.data["tiw-days"] = Array(31)

      month_data.days.forEach(journeyDay => {
        req.session.data["tiw-days"][(journeyDay.day - 1)] = journeyDay.journeys.length.toString()
      });
      res.redirect(`/${urlPrefix}/travel-in-work/days-for-month`)
    }
    else {
      res.redirect(`/${urlPrefix}/travel-in-work/days-for-month`)
    }
  })

  router.get('/travel-in-work/remove-month', function (req, res) {
    req.session.data["travel-in-work-date-month"] = req.query.month
    req.session.data["travel-in-work-date-year"] = req.query.year
    res.redirect(`/${urlPrefix}/travel-in-work/remove-month-confirmation`)
  })

  router.post('/travel-in-work/remove-month-confirmation', function (req, res) {

    if (req.session.data['remove-month'] == 'No'){
      res.redirect(`/${urlPrefix}/travel-in-work/taxi-journeys-for-day-summary`)
    }

    if (req.session.data['travelinwork']) {
      var month_to_delete = req.session.data['travelinwork'].find((month) => month.month === req.session.data["travel-in-work-date-month"] && month.year === req.session.data["travel-in-work-date-year"]);

      if (month_to_delete) {
        const index = req.session.data['travelinwork'].indexOf(month_to_delete);
        req.session.data['travelinwork'].splice(index, 1);
      }
    }

    var totalJourneys = 0

    req.session.data['travelinwork'].forEach(month => {
      var monthTotalCost = 0
      var monthTotalJourneys = 0

      month.days.forEach(day => {
        monthTotalJourneys = monthTotalJourneys + day.journeys.length
        day.journeys.forEach(journey => {
          total_cost = total_cost + parseInt(journey.cost)
          monthTotalCost = monthTotalCost + parseInt(journey.cost)
        });
      });
      month.totalMonthCost = monthTotalCost
      month.totalMonthJourneys = monthTotalJourneys
    });

    req.session.data['total-cost'] = total_cost

    res.redirect(`/${urlPrefix}/travel-in-work/taxi-journeys-for-day-summary`)
  })

}
