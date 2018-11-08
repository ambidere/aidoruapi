import _ from 'lodash'

export function objectToArray (obj) {
  var result = _.map(obj, function (value, prop) {
    let newObj = {...value}
    newObj['key'] = prop
    return newObj
  })
  return result
}

export const BloodTypes = [ 'A+', 'A-', 'A', 'B+', 'B-', 'B', 'AB+', 'AB-', 'AB', 'O+', 'O-', 'O', '?' ]

export const ZodiacSigns = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']
