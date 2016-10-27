import posArr from './../../../json/idplace.json'

export default class ID {
  constructor(sum) {
    this.id = ''
    this.position = ''
    this.birthday = null
    this.sex = ''
    this.last = ''
    this.ids = []
    this.sum = sum

    this.init()
  }

  init() {
    let s
    s = this.sum ? this.sum : 1
    for (let i = 0; i < s; i++) {
      this.ids.push(this.generateID())
    }
    let lastID = this.ids[this.ids.length - 1]
    this.position = lastID.position
    this.birthday = lastID.birthday
    this.sex = lastID.sex
    this.last = lastID.last
    this.id = lastID.id

    return this.ids;
  }

  generateID() {
    let pos = this.randomPos(),
      birth = this.randomBirthday(),
      sex = this.randomSex(),
      last = this.calcLastCode(pos.code + birth.code + sex.code)

    return {
      position: pos.text,
      birthday: birth.text,
      sex: sex.text,
      last: last.code,
      id: pos.code + birth.code + sex.code + last.code
    }
  }
  randomPos() {
    let  len = posArr.length,
      random = Math.floor(Math.random() * len),
      pos, code, codeStr, proCode, cityCode, disCode

    pos = posArr[random]
    code = pos.code
    codeStr = code.toString()
    proCode = codeStr.substr(0, 2)
    cityCode = codeStr.substr(2, 2)
    disCode = codeStr.substr(4, 2)

    if (cityCode === '00' || disCode === '00') {
      // return arguments.callee()
      return this.randomPos()
    } else {
      return pos
    }
  }

  randomBirthday() {
    let minAge = 18,
      maxAge = 80,
      now = new Date(),
      currentYear = now.getFullYear(),
      minTime, maxTime, deltaTime, randomTime, realTime, resultDate, month, date


    minTime = new Date(currentYear - maxAge, 0, 1).getTime()
    maxTime = new Date(currentYear - minAge, 0, 1).getTime()
    deltaTime = (maxAge - minAge) * 365 * 24 * 3600 * 1000

    randomTime = Math.floor(Math.random() * deltaTime)
    realTime = minTime + randomTime
    resultDate = new Date(realTime)

    month = resultDate.getMonth() + 1
    date = resultDate.getDate()

    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date: date

    return {
      code: resultDate.getFullYear().toString() + month + date,
      date: resultDate,
      text: resultDate.getFullYear() + '年' + (resultDate.getMonth() + 1) + '月' + resultDate.getDate()  + '日'
    }

  }

  randomSex() {
    let random = Math.floor(Math.random() * 1000),
      r, sex

    sex = random % 2 == 0 ? '女': '男'

    if (random < 10) {
      r = '00' + random
    } else if (random < 100)  {
      r = '0' + random;
    } else {
      r = random.toString()
    }

    return {
      code : r,
      text: sex
    }
  }

  // 传入身份证号的前17位，获取最后一位校验码
  calcLastCode(id) {
    let sum = 0,
      i = 0,
      w, c, r, res

    if (!id) return false;

    id = id.toString();

    if (id.length != 17) return false;

    w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    c = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]

    for (i = 0; i < 17; i++) {
        sum += id[i] * w[i]
    }

    r = sum % 11;
    res = c[r]

    return {
      code: res,
      text: res
    }
  }
}
