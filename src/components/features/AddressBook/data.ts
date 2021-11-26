
export const data = {
  "postcode": "NN1 3ER",
  "latitude": 52.2458053,
  "longitude": -0.8924692,
  "addresses": [
      {
          "formatted_address": [
              "Flat 1",
              "2 Watkin Terrace",
              "",
              "Northampton",
              "Northamptonshire"
          ],
          "thoroughfare": "Watkin Terrace",
          "building_name": "",
          "sub_building_name": "Flat 1",
          "sub_building_number": "1",
          "building_number": "2",
          "line_1": "Flat 1",
          "line_2": "2 Watkin Terrace",
          "line_3": "",
          "line_4": "",
          "locality": "",
          "town_or_city": "Northampton",
          "county": "Northamptonshire",
          "district": "Northampton",
          "country": "England"
      },
      {
          "formatted_address": [
              "Flat 1",
              "20 Watkin Terrace",
              "",
              "Northampton",
              "Northamptonshire"
          ],
          "thoroughfare": "Watkin Terrace",
          "building_name": "",
          "sub_building_name": "Flat 1",
          "sub_building_number": "1",
          "building_number": "20",
          "line_1": "Flat 1",
          "line_2": "20 Watkin Terrace",
          "line_3": "",
          "line_4": "",
          "locality": "",
          "town_or_city": "Northampton",
          "county": "Northamptonshire",
          "district": "Northampton",
          "country": "England"
      },
      {
          "formatted_address": [
              "Flat 8",
              "Watkin Court",
              "Watkin Terrace",
              "Northampton",
              "Northamptonshire"
          ],
          "thoroughfare": "Watkin Terrace",
          "building_name": "Watkin Court",
          "sub_building_name": "Flat 8",
          "sub_building_number": "8",
          "building_number": "",
          "line_1": "Flat 8",
          "line_2": "Watkin Court",
          "line_3": "Watkin Terrace",
          "line_4": "",
          "locality": "",
          "town_or_city": "Northampton",
          "county": "Northamptonshire",
          "district": "Northampton",
          "country": "England"
      },
      {
          "formatted_address": [
              "Flat 9",
              "Watkin Court",
              "Watkin Terrace",
              "Northampton",
              "Northamptonshire"
          ],
          "thoroughfare": "Watkin Terrace",
          "building_name": "Watkin Court",
          "sub_building_name": "Flat 9",
          "sub_building_number": "9",
          "building_number": "",
          "line_1": "Flat 9",
          "line_2": "Watkin Court",
          "line_3": "Watkin Terrace",
          "line_4": "",
          "locality": "",
          "town_or_city": "Northampton",
          "county": "Northamptonshire",
          "district": "Northampton",
          "country": "England"
      },
      {
          "formatted_address": [
              "Gaston Transport Inc Ltd",
              "14 Watkin Terrace",
              "",
              "Northampton",
              "Northamptonshire"
          ],
          "thoroughfare": "Watkin Terrace",
          "building_name": "",
          "sub_building_name": "Gaston Transport Inc Ltd",
          "sub_building_number": "",
          "building_number": "14",
          "line_1": "Gaston Transport Inc Ltd",
          "line_2": "14 Watkin Terrace",
          "line_3": "",
          "line_4": "",
          "locality": "",
          "town_or_city": "Northampton",
          "county": "Northamptonshire",
          "district": "Northampton",
          "country": "England"
      },
      {
          "formatted_address": [
              "Ground Floor Flat",
              "8 Watkin Terrace",
              "",
              "Northampton",
              "Northamptonshire"
          ],
          "thoroughfare": "Watkin Terrace",
          "building_name": "",
          "sub_building_name": "Ground Floor Flat",
          "sub_building_number": "",
          "building_number": "8",
          "line_1": "Ground Floor Flat",
          "line_2": "8 Watkin Terrace",
          "line_3": "",
          "line_4": "",
          "locality": "",
          "town_or_city": "Northampton",
          "county": "Northamptonshire",
          "district": "Northampton",
          "country": "England"
      },
      {
          "formatted_address": [
              "Second Floor Flat",
              "8 Watkin Terrace",
              "",
              "Northampton",
              "Northamptonshire"
          ],
          "thoroughfare": "Watkin Terrace",
          "building_name": "",
          "sub_building_name": "Second Floor Flat",
          "sub_building_number": "",
          "building_number": "8",
          "line_1": "Second Floor Flat",
          "line_2": "8 Watkin Terrace",
          "line_3": "",
          "line_4": "",
          "locality": "",
          "town_or_city": "Northampton",
          "county": "Northamptonshire",
          "district": "Northampton",
          "country": "England"
      }
  ]
}

export const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}
