import React, { Component } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import province from './../../../json/province.json'
import city from './../../../json/city.json'
import district from './../../../json/district.json'
import idplace from './../../../json/idplace.json'
import ID from './../IDNumber/ID'
import Last from './Last'


const STRAIGHT_PROVINCE = ['北京市', '天津市', '上海市', '重庆市']
const TAIWAN = '台湾省'
const SPECIAL_PROVINCE = ['香港特别行政区', '澳门特别行政区']

export default class District extends Component {
  constructor(props) {
    super(props)
    this.handleProvinceChange = this.handleProvinceChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleDistrictChange = this.handleDistrictChange.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
    }
  }

  componentWillMount() {
    let provinces = province.map((value, key) => {
      return value
    })

    let citys = city.filter((value, key) => {
      return value.parent == provinces[0].code
    })

    let districts = district.filter((value, key) => {
      return value.parent == citys[0].code
    })

    this.setState({
      provinces: provinces,
      citys: [],
      districts: [],
      currentProvince: '',
      currentCity: '',
      currentDistrict: ''
    })
  }

  // 省改变时
  handleProvinceChange(thisProvince) {

    // 请选择
    if (!thisProvince) {
      this.setState({
        currentProvince: '',
        currentCity: '',
        currentDistrict: '',
        citys: [],
        districts: []
      })
      return
    }

    let citys = city.filter((value, key) => {
      return value.parent == thisProvince
    })

    let districts = []
    // 如果是直辖市
    if (STRAIGHT_PROVINCE.indexOf(citys[0].name) >= 0) {
      districts = district.filter((value, key) => {
        return value.parent === citys[0].code
      })
    }

    this.setState({
      currentProvince: thisProvince,
      currentCity: '',
      currentDistrict: '',
      citys: citys,
      districts: districts
    })

  }


  // 市改变时
  handleCityChange(thisCity) {

    // 请选择
    if (!thisCity) {
      this.setState({
        currentCity: '',
        currentDistrict: ''
      })
      return
    }

    let districts = district.filter((value, key) => {
      return value.parent == thisCity
    })

    this.setState({
      currentCity: thisCity,
      currentDistrict: '',
      districts: districts
    })

  }


  // 区改变时
  handleDistrictChange(thisDistrict) {

    // 请选择
    if (!thisDistrict) {
      this.setState({
        currentDistrict: ''
      })
      return
    }

    this.setState({
      currentDistrict: thisDistrict
    })
  }


  // 测试按钮
  handleClick(e) {
    // this.checkError()

    let province = this.state.currentProvince.name
    let city = this.state.currentCity.name
    let position

    if (STRAIGHT_PROVINCE.indexOf(province) >= 0) {
      position = city + this.state.currentDistrict.name
    } else if (SPECIAL_PROVINCE.indexOf(province) >= 0) {
      position = '暂不支持该地区的身份证生成'
    } else {
      position = province + city + this.state.currentDistrict.name
    }

    let id = new ID()
    let positionCode = id.getCodeByPosition(position)
    alert(positionCode)


  }


  checkError() {
    let pos = []
    let id = new ID()
    let count = 0


    for(let _district of district) {
      let _city

      if (_district.parent === city[_district['parent'] - 1].code) {
        _city = city[_district['parent'] - 1]

        let _province
        if (_city.parent === province[_city['parent'] - 1].code) {
          _province = province[_city['parent'] - 1]

          if (STRAIGHT_PROVINCE.indexOf(_province.name) >= 0) {
            if (!id.getCodeByPosition(_city.name + _district.name)) {
              console.log(_city.name + _district.name)
              count ++
            }
            pos.push(_city.name + _district.name)
          } else if (SPECIAL_PROVINCE.indexOf(_province.name) >= 0) {
            continue;
          } else {
            if (!id.getCodeByPosition(_province.name + _city.name + _district.name)) {
              console.log(_province.name + _city.name + _district.name)
              count ++
            }
            pos.push(_province.name + _city.name + _district.name)
          }
        } else {
          console.log(_city.code + '_市有误')
          break
        }
      } else {
        console.log(_district.code + '_区有误')
        break
      }
    }

    // console.log(pos)
    console.log(count)
  }

  render() {
    return (
      <FormGroup>
        筛选：{' '}
        <FormControl componentClass="select" value={this.state.currentProvince} onChange={(e) => {this.handleProvinceChange(e.target.value)}}>
          <option>请选择</option>
          {this.state.provinces.map((value) => {
            return (
              <option value={value.code} key={value.code}>{value.name}</option>
            )
          })}
        </FormControl>

        { this.state.citys.length > 0 &&
          <FormControl componentClass="select" value={this.state.currentCity} onChange={(e) => {this.handleCityChange(e.target.value)}}>
            <option>请选择</option>
            {this.state.citys.map((value) => {
              return (
                <option value={value.code} key={value.code}>{value.name}</option>
              )
            })}
          </FormControl>
        }

        { this.state.districts.length > 0 &&
          <FormControl componentClass="select" value={this.state.currentDistrict} onChange={(e) => {this.handleDistrictChange(e.target.value)}}>
            <option>请选择</option>
            {this.state.districts.map((value) => {
              return (
                <option value={value.code} key={value.code}>{value.name}</option>
              )
            })}
          </FormControl>
        }

        <Button bsStyle="primary" onClick={this.handleClick}>测试</Button>

        {/*<Last />*/}
      </FormGroup>
    )
  }
}
