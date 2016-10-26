import posArr from './../../../json/idplace.json'

function ID() {
  this.id = '';
  this.position = '';
  this.birthday = null;
  this.sex = '';
  this.last = '';

  if (typeof this.init !== 'function') {

    ID.prototype.init = function () {
      var pos = this.randomPos(),
        birth = this.randomBirthday(),
        sex = this.randomSex(),
        last = this.calcLastCode(pos.code + birth.code + sex.code)

      this.position = pos.text
      this.birthday = birth.text
      this.sex = sex.text
      this.last = last.text

      this.id = pos.code + birth.code + sex.code + last.code

      return this.id
    }


    ID.prototype.randomPos = function () {
      var  len = posArr.length,
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

    ID.prototype.randomBirthday = function () {
      var minAge = 18,
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

    ID.prototype.randomSex = function () {
      var random = Math.floor(Math.random() * 1000),
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
    ID.prototype.calcLastCode = function (id) {
      var sum = 0,
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

  this.init();
}

export default ID
