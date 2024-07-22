module.exports = function (folderForViews, urlPrefix, router) {

  router.post('/start-journey', function (req, res) {
    if (req.session.data['journey-type'] == "traveltoworkmultiple") {
      req.session.data['journey-type'] = "traveltowork"
      req.session.data['multiple-ttw'] = true
    }
    else {
      req.session.data['multiple-ttw'] = false
    }
    if (req.session.data['journey-type'] == "multipleawards") {
      req.session.data['multiple-awards'] = true
      req.session.data['multiple-employers'] = false
    }
    else if (req.session.data['journey-type'] == "multipleemployers") {
      req.session.data['multiple-employers'] = true
      req.session.data['multiple-awards'] = false
    }
    else if (req.session.data['journey-type'] == "multipleawardsandemployers") {
      req.session.data['multiple-awards'] = true
      req.session.data['multiple-employers'] = true
    }
    else {
      req.session.data['multiple-employers'] = false
      req.session.data['multiple-awards'] = false
    }

    res.redirect(`/${urlPrefix}/portal`)
  })

  router.post('/populate-answers', function (req, res) {
    const journeytype = req.session.data['journeytype']

    if (journeytype === 'equipment-and-adaptations') {
      req.session.data['aids-and-equipment'] = "Yes"
      req.session.data['equipment-name'] = "A wheelchair"
      req.session.data['purchase-date-day'] = "12"
      req.session.data['purchase-date-month'] = "06"
      req.session.data['purchase-date-year'] = "21"
      req.session.data['equipment-cost'] = "13500"
      req.session.data['purchase-equipment'] = "My-employer"
      req.session.data['cost-sharing'] = "No"
      req.session.data['name-on-the-account'] = "Joe Bloggs"
      req.session.data['sort-code'] = "01-02-99"
      req.session.data['account-number'] = "12453288"
      req.session.data['digital-upload'] = "Yes"
      req.session.data['file-upload'] = "invoice12-12-21.PDF"
    } else if (journeytype === 'Support-worker') {
      req.session.data['support-for-workplace'] = "Yes"
      req.session.data['support-date-month'] = "May"
      req.session.data['support-date-year'] = "2021"
      // req.session.data['hours'] = "7.5"
      // req.session.data['day.day'] = "04"
      // req.session.data['day.hours'] = "7"
      req.session.data['hourTotal'] = "12"
      req.session.data['cost-of-support'] = "9350"
      req.session.data['name-on-the-account'] = "Mark Stephenson"
      req.session.data['sort-code'] = "01-02-99"
      req.session.data['account-number'] = "12453288"
      // req.session.data['file'] = "invoice12-12-21.PDF"
      req.session.data['counter-signatory-full-name'] = "Mark Stephenson"
      req.session.data['counter-signatory-email'] = "mark.stephenson@deaf-action.co.uk"
    } else if (journeytype === 'travel-to-work') {
      req.session.data['travel-to-work'] = "Yes"
      req.session.data['travel-to-work-date-month'] = "June"
      req.session.data['travel-to-work-date-year'] = "2021"
      req.session.data['transport-option'] = "taxi"
      // req.session.data['mileageTotal'] = "24"
      // req.session.data['mileages'] = "122"
      req.session.data['cost-of-taxi'] = "54"
      req.session.data['name-on-the-account'] = "Mark Stephenson"
      req.session.data['sort-code'] = "01-02-99"
      req.session.data['account-number'] = "12453288"
      req.session.data['counter-signatory-full-name'] = "Mark Stephenson"
      req.session.data['counter-signatory-email'] = "mark.stephenson@deaf-action.co.uk"
    }
    res.redirect(`/index`)
  })

  router.post('/multiple-employer-history-answer', function (req, res) {
    const employer = req.session.data['journey-type']

    if (employer === 'multipleawards') {
      res.redirect(`/${urlPrefix}/portal-screens/multiple-claims-history`)
    } else if (employer === 'supportworker') {
      res.redirect(`/${urlPrefix}/portal-screens/claims-history`)
    } else {
      res.redirect(`/${urlPrefix}/portal-screens/claims-history`)
    }
  })

  router.post('/multiple-claims-history', function (req, res) {
    const employer = req.session.data['journey-type']

    req.session.data.page = 1
    

    if (employer === 'supportworker') {
      req.session.data['claimshistory'] = [
        {
          date: '1 November',
          paid: '13 November',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Created',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 November',
          paid: '12 November',
          type: 'Support worker',
          person: 'John Doe',
          cost: '£50',
          status: 'Created',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 October',
          paid: '14 October',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£155',
          status: 'Approved',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 October',
          paid: '14 October',
          type: 'Support worker',
          person: 'John Doe',
          cost: '£50',
          status: 'Not approved',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '2 September',
          paid: '8 September',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 September',
          paid: '10 September',
          type: 'Support worker',
          person: 'John Doe',
          cost: '£50',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 August',
          paid: '21 August',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 August',
          paid: '11 August',
          type: 'Support worker',
          person: 'John Doe',
          cost: '£50',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 July',
          paid: '9 July',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 July',
          paid: '14 July',
          type: 'Support worker',
          person: 'John Doe',
          cost: '£50',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 June',
          paid: '14 June',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 May',
          paid: '30 May',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 April',
          paid: '2 May',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 March',
          paid: '10 March',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 February',
          paid: '10 February',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'RM Rejected',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 January',
          paid: '10 January',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 December',
          paid: '7 December',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£80',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 November',
          paid: '11 November',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 October',
          paid: '10 October',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 September',
          paid: '13 September',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 April',
          paid: '11 April',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 March',
          paid: '11 March',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '3 February',
          paid: '12 February',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '12 January',
          paid: '22 January',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 December',
          paid: '12 December',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£85',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 November',
          paid: '12 November',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 October',
          paid: '10 October',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 September',
          paid: '6 September',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'RM Rejected',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 August',
          paid: '12 August',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 July',
          paid: '11 July',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 June',
          paid: '11 June',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 May',
          paid: '11 May',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 April',
          paid: '11 April',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 March',
          paid: '23 March',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 February',
          paid: '13 February',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '3 January',
          paid: '30 January',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 December',
          paid: '12 December',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£65',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 November',
          paid: '12 November',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 October',
          paid: '11 October',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 September',
          paid: '11 September',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 August',
          paid: '11 August',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 July',
          paid: '12 July',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 June',
          paid: '12 June',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 May',
          paid: '28 May',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 April',
          paid: '10 April',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        }
      ]
    }

    if (employer === 'traveltowork') {
      req.session.data['claimshistory'] = [
        {
          date: '1 November',
          paid: '18 November',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£150',
          status: 'Created',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 October',
          paid: '16 October',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£155',
          status: 'Approved',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '2 September',
          paid: '14 September',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£150',
          status: 'Approved',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 August',
          paid: '16 August',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£150',
          status: 'Approved',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 July',
          paid: '2 August',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£150',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 June',
          paid: '28 June',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£150',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 May',
          paid: '28 May',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£150',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 April',
          paid: '21 April',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£150',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 March',
          paid: '5 March',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'RM Rejected',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 February',
          paid: '10 February',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Not approved',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 January',
          paid: '10 January',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 December',
          paid: '11 December',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£80',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 November',
          paid: '10 November',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 October',
          paid: '25 October',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 September',
          paid: '21 September',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 August',
          paid: '27 August',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 July',
          paid: '10 August',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£120',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 June',
          paid: '11 August',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 May',
          paid: '2 August',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£120',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 April',
          paid: '1 July',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 March',
          paid: '1 June',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '3 February',
          paid: '1 March',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '12 January',
          paid: '1 February',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 December',
          paid: '8 December',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£85',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 November',
          paid: '19 November',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 October',
          paid: '11 October',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 September',
          paid: '7 September',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 August',
          paid: '12 August',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 July',
          paid: '12 July',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 June',
          paid: '12 June',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 May',
          paid: '12 May',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 April',
          paid: '14 April',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 March',
          paid: '12 March',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 February',
          paid: '23 February',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '3 January',
          paid: '15 January',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 December',
          paid: '12 December',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£65',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 November',
          paid: '12 November',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 October',
          paid: '12 October',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 September',
          paid: '11 September',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 August',
          paid: '12 August',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 July',
          paid: '11 July',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 June',
          paid: '11 June',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 May',
          paid: '11 May',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        },
        {
          date: '1 April',
          paid: '17 April',
          type: 'Taxi',
          person: 'ABC Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2020,
          yearpaid: 2020
        }
      ]
    }

    if (employer === 'specialaidsandequipment') {
      req.session.data['claimshistory'] = [
        {
          date: '1 November',
          paid: '15 November',
          type: 'Ergonomic keyboard, Ergonomic mouse, Mouse pad',
          person: 'EmployerCo',
          cost: '£60',
          year: 2023
        },
        {
          date: '20 October',
          paid: '1 November',
          type: 'Large monitor',
          person: 'EmployerCo',
          cost: '£30',
          year: 2023
        },
        {
          date: '19 January',
          paid: '23 January',
          type: 'Monitor',
          person: 'EmployerCo',
          cost: '£150',
          year: 2021
        }
      ]
    }
    if (employer === 'specialaidsandequipment') {
      res.redirect(`/${urlPrefix}/portal-screens/claims-history`)
    }
    else if (employer === 'traveltowork') {
      res.redirect(`/${urlPrefix}/portal-screens/claims-history`)
    }
    else if (employer === 'supportworker') {
      res.redirect(`/${urlPrefix}/portal-screens/claims-history-1`)
    }

  })


  // Get
  router.get('/post-login-routing', function (req, res) {
    const useremail = req.query.email
    if (useremail === 'supportworker@email.com') {
      req.session.data['journey-type'] = "supportworker"
      res.redirect(`/${urlPrefix}/portal`)
    } else if (useremail === 'equipment@email.com') {
      req.session.data['journey-type'] = "specialaidsandequipment"
      res.redirect(`/${urlPrefix}/portal`)
    } else if (useremail === 'mobile@email.com') {
      req.session.data['journey-type'] = "mobilenumber"
      res.redirect(`/${urlPrefix}/portal`)
    } else if (useremail === 'travel@email.com') {
      req.session.data['journey-type'] = "traveltowork"
      res.redirect(`/${urlPrefix}/portal`)
    } else if (useremail === 'travelinwork@email.com') {
      req.session.data['journey-type'] = "travelinwork"
      res.redirect(`/${urlPrefix}/portal`)
    } else {
      res.redirect(`/index`)
    }


  })

  // Get
  router.get('/portal-screens/remove-phone-number', function (req, res) {
    res.render(`./${folderForViews}/portal-screens/remove-phone-number`)
  })

  router.get('/portal-screens/personal-information', function (req, res) {
    if (!(req.session.data['new-phone']) && !(req.session.data['new-mobile'])) {
    }
    currentPersonalInfo = {
      mobile: req.session.data['new-mobile'],
      home: req.session.data['new-phone']
    }
    req.session.data['currentPersonalInfo'] = currentPersonalInfo
    res.render(`./${folderForViews}/portal-screens/personal-information`)
  })

  // post - Remove phone number confirmation
  router.post('/portal-screens/remove-phone-number', function (req, res) {
    const phoneNumber = req.session.data['new-phone']
    const removeNumber = req.session.data['phone-number-remove']

    if (removeNumber === 'Yes') {
      req.session.data['new-phone'] = null
    }
    res.redirect(`/${urlPrefix}/portal-screens/telephone-number-change`)
  })

  // Get
  router.get('/portal-screens/remove-mobile-number', function (req, res) {
    res.render(`./${folderForViews}/portal-screens/remove-mobile-number`)
  })

  // post - Remove phone number confirmation
  router.post('/portal-screens/remove-mobile-number', function (req, res) {
    const mobileNumber = req.session.data['new-mobile']
    const removeNumber = req.session.data['mobile-number-remove']

    if (removeNumber === 'Yes') {
      req.session.data['new-mobile'] = null
    }
    res.redirect(`/${urlPrefix}/portal-screens/telephone-number-change`)
  })

  router.post('/portal-screens/cookies', function (req, res) {
    const analyticsCookies = req.session.data['analytics-cookies']

    if (analyticsCookies) {
      res.redirect(`/${urlPrefix}/portal-screens/yes`)

    }

    res.redirect(`/${urlPrefix}/portal-screens/no`)
  })


  router.get('/portal-screens/view-claim', function (req, res) {
    const type = req.query.type
    const journeytype = req.session.data['journey-type']
    const multiple = req.session.data['multiple-awards']
    const claim = req.query.claim

    if (type === 'adaptations') {

      if (claim == 1) {
        req.session.data =
        {
          "journey-type": journeytype,
          "multiple-awards": multiple,
          "adaptation-to-vehicle": "Yes",
          adaptation_name: "",
          key: null,
          adaptation_day: null,
          adaptation_month: null,
          adaptation_year: null,
          action: "Continue",
          adaptation: [
            {
              key: 0,
              adaptation_name: "Wheelchair lift",
              day: "5",
              month: "6",
              year: "2023",
            },
            {
              key: 1,
              adaptation_name: "Hand controls",
              day: "5",
              month: "6",
              year: "2023",
            },
            {
              key: 2,
              adaptation_name: "Steering wheel handle",
              day: "8",
              month: "6",
              year: "2023",
            },
          ],
          "add-vehicle-adaptation": "No",
          "adaptation-cost": "850",
          "file-upload": "",
          uploads: [
            {
              file: "",
            },
          ],
          "add-another-receipt": "No",
          "existing-payee": "one",
          "existing-account": "two",
          "new-payee-full-name": "John Doe",
          "payee-email": "john.doe@deafactioncharity.com",
          "new-payee-address-line-1": "100 Gorgie Park Rd",
          "new-payee-address-line-2": "",
          "new-payee-address-town": "Edinburgh",
          "new-payee-address-county": "Midlothian",
          "new-payee-address-postcode": "EH11 2QL",
          "sort-code": "123656",
          "account-number": "12555678",
          "roll-number": "",
        }
        req.session.data['view-claim'] = 'open'

      }
      else if (claim == 2) {
        req.session.data =
        {
          "journey-type": journeytype,
          "multiple-awards": multiple,
          "adaptation-to-vehicle": "Yes",
          adaptation_name: "",
          key: null,
          adaptation_day: null,
          adaptation_month: null,
          adaptation_year: null,
          action: "Continue",
          adaptation: [
            {
              key: 0,
              adaptation_name: "Manual to automatic conversion",
              day: "30",
              month: "4",
              year: "2023",
            },
          ],
          "add-vehicle-adaptation": "No",
          "adaptation-cost": "1010",
          "file-upload": "",
          uploads: [
            {
              file: "",
            },
          ],
          "add-another-receipt": "No",
          "existing-payee": "one",
          "existing-account": "one",
          "new-payee-full-name": "John Doe",
          "payee-email": "john.doe@deafactioncharity.com",
          "new-payee-address-line-1": "100 Gorgie Park Rd",
          "new-payee-address-line-2": "",
          "new-payee-address-town": "Edinburgh",
          "new-payee-address-county": "Midlothian",
          "new-payee-address-postcode": "EH11 2QL",
          "sort-code": "123456",
          "account-number": "12345678",
          "roll-number": "",
        }
        req.session.data['view-claim'] = 'open'

      }
      else if (claim == 3) {
        req.session.data =
        {
          "journey-type": journeytype,
          "multiple-awards": multiple,
          "adaptation-to-vehicle": "Yes",
          adaptation_name: "Manual to automatic conversion",
          key: 0,
          adaptation_day: "30",
          adaptation_month: "4",
          adaptation_year: "2023",
          action: "Continue",
          adaptation: [
            {
              key: 0,
              adaptation_name: "Access adjustments",
              day: "20",
              month: "12",
              year: "2022",
            },
          ],
          "add-vehicle-adaptation": "No",
          "adaptation-cost": "550",
          "file-upload": "",
          uploads: [
            {
              file: "",
            },
          ],
          "add-another-receipt": "No",
          "existing-payee": "one",
          "existing-account": "one",
          "new-payee-full-name": "John Doe",
          "payee-email": "john.doe@deafactioncharity.com",
          "new-payee-address-line-1": "100 Gorgie Park Rd",
          "new-payee-address-line-2": "",
          "new-payee-address-town": "Edinburgh",
          "new-payee-address-county": "Midlothian",
          "new-payee-address-postcode": "EH11 2QL",
          "sort-code": "123456",
          "account-number": "12345678",
          "roll-number": "",
          "view-claim": true,
          delete: "Yes",
          removeId: "1",
          "file-receipt-to-remove": null,
          "file-upload-remove": "Yes",
          "confirm-file-upload-remove": null,
        }
        req.session.data['view-claim'] = 'paid'

      }
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/check-your-answers`)
    }

    if (type === 'supportworker') {

      if (claim == 1) {
        req.session.data =
        {
          claim: "1",
          "view-claim": true,
          "journey-type": journeytype,
          "multiple-awards": multiple,
          "answers-checked-sw": "true",
          "support-for-workplace": "Yes",
          providor: "John Doe",
          "support-month": "6",
          "support-year": "2023",
          dataList: [
            {
              weekNumber: 1,
              days: [
                {
                  value: 1,
                  text: "Thursday 1 June",
                },
                {
                  value: 2,
                  text: "Friday 2 June",
                },
                {
                  value: 3,
                  text: "Saturday 3 June",
                },
                {
                  value: 4,
                  text: "Sunday 4 June",
                },
              ],
            },
            {
              weekNumber: 2,
              days: [
                {
                  value: 5,
                  text: "Monday 5 June",
                },
                {
                  value: 6,
                  text: "Tuesday 6 June",
                },
                {
                  value: 7,
                  text: "Wednesday 7 June",
                },
                {
                  value: 8,
                  text: "Thursday 8 June",
                },
                {
                  value: 9,
                  text: "Friday 9 June",
                },
                {
                  value: 10,
                  text: "Saturday 10 June",
                },
                {
                  value: 11,
                  text: "Sunday 11 June",
                },
              ],
            },
            {
              weekNumber: 3,
              days: [
                {
                  value: 12,
                  text: "Monday 12 June",
                },
                {
                  value: 13,
                  text: "Tuesday 13 June",
                },
                {
                  value: 14,
                  text: "Wednesday 14 June",
                },
                {
                  value: 15,
                  text: "Thursday 15 June",
                },
                {
                  value: 16,
                  text: "Friday 16 June",
                },
                {
                  value: 17,
                  text: "Saturday 17 June",
                },
                {
                  value: 18,
                  text: "Sunday 18 June",
                },
              ],
            },
            {
              weekNumber: 4,
              days: [
                {
                  value: 19,
                  text: "Monday 19 June",
                },
                {
                  value: 20,
                  text: "Tuesday 20 June",
                },
                {
                  value: 21,
                  text: "Wednesday 21 June",
                },
                {
                  value: 22,
                  text: "Thursday 22 June",
                },
                {
                  value: 23,
                  text: "Friday 23 June",
                },
                {
                  value: 24,
                  text: "Saturday 24 June",
                },
                {
                  value: 25,
                  text: "Sunday 25 June",
                },
              ],
            },
            {
              weekNumber: 5,
              days: [
                {
                  value: 26,
                  text: "Monday 26 June",
                },
                {
                  value: 27,
                  text: "Tuesday 27 June",
                },
                {
                  value: 28,
                  text: "Wednesday 28 June",
                },
                {
                  value: 29,
                  text: "Thursday 29 June",
                },
                {
                  value: 30,
                  text: "Friday 30 June",
                },
              ],
            },
          ],
          "support-days": [
            "1",
            "2",
            "8",
            "9",
            "15",
            "16",
            "22",
            "23",
            "29",
            "30",
          ],
          action: "continue",
          support: [
            {
              day: "1",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "2",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "8",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "9",
              support_hours: "3",
              support_minutes: "",
            },
            {
              day: "15",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "16",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "22",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "23",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "29",
              support_hours: "4",
              support_minutes: "30",
            },
            {
              day: "30",
              support_hours: "4",
              support_minutes: "",
            },
          ],
          "support-worker-errors": [
          ],
          "month-list": [
            {
              month: "6",
              year: "2023",
              support: [
                {
                  day: "1",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "2",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "8",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "9",
                  support_hours: "3",
                  support_minutes: "",
                },
                {
                  day: "15",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "16",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "22",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "23",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "29",
                  support_hours: "4",
                  support_minutes: "30",
                },
                {
                  day: "30",
                  support_hours: "4",
                  support_minutes: "",
                },
              ],
              totalhours: 39,
              totalminutes: 30,
            },
          ],
          "hour-total": 39,
          "minute-total": 30,
          "new-month": "no",
          "cost-of-support": "1450",
          "file-upload": "",
          uploads: [
            {
              file: "",
            },
          ],
          "add-another-receipt": "No",
          "existing-payee": "one",
          "counter-signatory-full-name": "John Smith",
          "counter-signatory-email": "john.smith@abc.com",
          "contact-confirmed": "true",
        }
      }
      else if (claim == 2) {
        req.session.data =
        {
          "journey-type": journeytype,
          "multiple-awards": multiple,
          "support-for-workplace": "Yes",
          providor: "Jane Green",
          "support-month": "5",
          "support-year": "2023",
          dataList: [
            {
              weekNumber: 1,
              days: [
                {
                  value: 1,
                  text: "Thursday 1 June",
                },
                {
                  value: 2,
                  text: "Friday 2 June",
                },
                {
                  value: 3,
                  text: "Saturday 3 June",
                },
                {
                  value: 4,
                  text: "Sunday 4 June",
                },
              ],
            },
            {
              weekNumber: 2,
              days: [
                {
                  value: 5,
                  text: "Monday 5 June",
                },
                {
                  value: 6,
                  text: "Tuesday 6 June",
                },
                {
                  value: 7,
                  text: "Wednesday 7 June",
                },
                {
                  value: 8,
                  text: "Thursday 8 June",
                },
                {
                  value: 9,
                  text: "Friday 9 June",
                },
                {
                  value: 10,
                  text: "Saturday 10 June",
                },
                {
                  value: 11,
                  text: "Sunday 11 June",
                },
              ],
            },
            {
              weekNumber: 3,
              days: [
                {
                  value: 12,
                  text: "Monday 12 June",
                },
                {
                  value: 13,
                  text: "Tuesday 13 June",
                },
                {
                  value: 14,
                  text: "Wednesday 14 June",
                },
                {
                  value: 15,
                  text: "Thursday 15 June",
                },
                {
                  value: 16,
                  text: "Friday 16 June",
                },
                {
                  value: 17,
                  text: "Saturday 17 June",
                },
                {
                  value: 18,
                  text: "Sunday 18 June",
                },
              ],
            },
            {
              weekNumber: 4,
              days: [
                {
                  value: 19,
                  text: "Monday 19 June",
                },
                {
                  value: 20,
                  text: "Tuesday 20 June",
                },
                {
                  value: 21,
                  text: "Wednesday 21 June",
                },
                {
                  value: 22,
                  text: "Thursday 22 June",
                },
                {
                  value: 23,
                  text: "Friday 23 June",
                },
                {
                  value: 24,
                  text: "Saturday 24 June",
                },
                {
                  value: 25,
                  text: "Sunday 25 June",
                },
              ],
            },
            {
              weekNumber: 5,
              days: [
                {
                  value: 26,
                  text: "Monday 26 June",
                },
                {
                  value: 27,
                  text: "Tuesday 27 June",
                },
                {
                  value: 28,
                  text: "Wednesday 28 June",
                },
                {
                  value: 29,
                  text: "Thursday 29 June",
                },
                {
                  value: 30,
                  text: "Friday 30 June",
                },
              ],
            },
          ],
          "support-days": [
            "29",
          ],
          action: "continue",
          support: [
            {
              day: "29",
              support_hours: "1",
              support_minutes: "50",
            },
          ],
          "support-worker-errors": [
          ],
          "month-list": [
            {
              month: "5",
              year: "2023",
              support: [
                {
                  day: "29",
                  support_hours: "1",
                  support_minutes: "50",
                },
              ],
              totalhours: 1,
              totalminutes: 50,
            },
            {
              month: "6",
              year: "2023",
              support: [
                {
                  day: "5",
                  repeatsupport_hours: "1",
                  repeatsupport_minutes: "10",
                },
                {
                  day: "12",
                  repeatsupport_hours: "1",
                  repeatsupport_minutes: "",
                },
                {
                  day: "19",
                  repeatsupport_hours: "1",
                  repeatsupport_minutes: "",
                },
                {
                  day: "20",
                  repeatsupport_hours: "1",
                  repeatsupport_minutes: "55",
                },
                {
                  day: "26",
                  repeatsupport_hours: "2",
                  repeatsupport_minutes: "",
                },
                {
                  day: "27",
                  repeatsupport_hours: "1",
                  repeatsupport_minutes: "",
                },
              ],
              totalhours: 8,
              totalminutes: 5,
            },
          ],
          "hour-total": 9,
          "minute-total": 55,
          "new-month": "no",
          "repeatsupport-month": "6",
          "repeatsupport-year": "2023",
          "repeatsupport-days": [
            "5",
            "12",
            "19",
            "20",
            "26",
            "27",
          ],
          repeatsupport: null,
          "cost-of-support": "980",
          "file-upload": "",
          uploads: [
            {
              file: "",
            },
          ],
          "add-another-receipt": "No",
          "existing-payee": "two",
          "counter-signatory-full-name": "John Smith",
          "counter-signatory-email": "john.smith@abc.com",
          "contact-confirmed": "true",
        }


      }
      else if (claim == 3) {
        req.session.data =
        {
          "journey-type": journeytype,
          "multiple-awards": multiple,
          "support-for-workplace": "Yes",
          providor: "John Smith",
          "support-month": "5",
          "support-year": "2023",
          dataList: [
            {
              weekNumber: 1,
              days: [
                {
                  value: 1,
                  text: "Monday 1 May",
                },
                {
                  value: 2,
                  text: "Tuesday 2 May",
                },
                {
                  value: 3,
                  text: "Wednesday 3 May",
                },
                {
                  value: 4,
                  text: "Thursday 4 May",
                },
                {
                  value: 5,
                  text: "Friday 5 May",
                },
                {
                  value: 6,
                  text: "Saturday 6 May",
                },
                {
                  value: 7,
                  text: "Sunday 7 May",
                },
              ],
            },
            {
              weekNumber: 2,
              days: [
                {
                  value: 8,
                  text: "Monday 8 May",
                },
                {
                  value: 9,
                  text: "Tuesday 9 May",
                },
                {
                  value: 10,
                  text: "Wednesday 10 May",
                },
                {
                  value: 11,
                  text: "Thursday 11 May",
                },
                {
                  value: 12,
                  text: "Friday 12 May",
                },
                {
                  value: 13,
                  text: "Saturday 13 May",
                },
                {
                  value: 14,
                  text: "Sunday 14 May",
                },
              ],
            },
            {
              weekNumber: 3,
              days: [
                {
                  value: 15,
                  text: "Monday 15 May",
                },
                {
                  value: 16,
                  text: "Tuesday 16 May",
                },
                {
                  value: 17,
                  text: "Wednesday 17 May",
                },
                {
                  value: 18,
                  text: "Thursday 18 May",
                },
                {
                  value: 19,
                  text: "Friday 19 May",
                },
                {
                  value: 20,
                  text: "Saturday 20 May",
                },
                {
                  value: 21,
                  text: "Sunday 21 May",
                },
              ],
            },
            {
              weekNumber: 4,
              days: [
                {
                  value: 22,
                  text: "Monday 22 May",
                },
                {
                  value: 23,
                  text: "Tuesday 23 May",
                },
                {
                  value: 24,
                  text: "Wednesday 24 May",
                },
                {
                  value: 25,
                  text: "Thursday 25 May",
                },
                {
                  value: 26,
                  text: "Friday 26 May",
                },
                {
                  value: 27,
                  text: "Saturday 27 May",
                },
                {
                  value: 28,
                  text: "Sunday 28 May",
                },
              ],
            },
            {
              weekNumber: 5,
              days: [
                {
                  value: 29,
                  text: "Monday 29 May",
                },
                {
                  value: 30,
                  text: "Tuesday 30 May",
                },
                {
                  value: 31,
                  text: "Wednesday 31 May",
                },
              ],
            },
          ],
          "support-days": [
            "4",
            "5",
            "11",
            "12",
            "18",
            "19",
            "25",
            "26",
          ],
          action: "continue",
          support: [
            {
              day: "4",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "5",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "11",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "12",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "18",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "19",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "25",
              support_hours: "4",
              support_minutes: "20",
            },
            {
              day: "26",
              support_hours: "4",
              support_minutes: "",
            },
          ],
          "support-worker-errors": [
          ],
          "month-list": [
            {
              month: "5",
              year: "2023",
              support: [
                {
                  day: "4",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "5",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "11",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "12",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "18",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "19",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "25",
                  support_hours: "4",
                  support_minutes: "20",
                },
                {
                  day: "26",
                  support_hours: "4",
                  support_minutes: "",
                },
              ],
              totalhours: 32,
              totalminutes: 20,
            },
          ],
          "hour-total": 32,
          "minute-total": 20,
          "new-month": "no",
          "cost-of-support": "1600",
          "file-upload": "",
          uploads: [
            {
              file: "",
            },
          ],
          "add-another-receipt": "No",
          "existing-payee": "one",
          "counter-signatory-full-name": "John Smith",
          "counter-signatory-email": "john.smith@abc.com",
          "contact-confirmed": "true",
        }


      }
      req.session.data['view-claim'] = true
      res.redirect(`/${urlPrefix}/support-worker/check-your-answers`)

    }
  })
}
