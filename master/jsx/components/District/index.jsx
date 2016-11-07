import React, { Component } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import province from './../../../json/province.json'
import city from './../../../json/city.json'
import district from './../../../json/district.json'
import idplace from './../../../json/idplace.json'
import ID from './../IDNumber/ID'
import Last from './Last'


const STRAIGHT_PROVINCE = ['北京市', '天津市', '上海市', '重庆市']
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
      citys: citys,
      districts: districts,
      currentProvince: provinces[0],
      currentCity: citys[0],
      currentDistrict: districts[0]
    })
  }

  // 省改变时
  handleProvinceChange(thisProvince) {

    let citys = city.filter((value, key) => {
      return value.parent == thisProvince.code
    })

    this.setState({
      currentProvince: thisProvince,
      citys: citys
    })

    this.handleCityChange(citys[0])
  }


  // 市改变时
  handleCityChange(thisCity) {

    let districts = district.filter((value, key) => {
      return value.parent == thisCity.code
    })

    this.setState({
      currentCity: thisCity,
      districts: districts
    })

    this.handleDistrictChange(districts[0])
  }


  // 区改变时
  handleDistrictChange(thisDistrict) {

    this.setState({
      currentDistrict: thisDistrict
    })
  }


  // 测试按钮
  handleClick(e) {
    this.checkError()

    // let province = this.state.currentProvince.name
    // let city = this.state.currentCity.name
    // let position
    //
    // const straightProvince = ['北京市', '天津市', '上海市', '重庆市']
    // const specialProvince = ['香港特别行政区', '澳门特别行政区', '台湾省']
    //
    // if (straightProvince.indexOf(province) >= 0) {
    //   position = city + this.state.currentDistrict.name
    // } else if (specialProvince.indexOf(province) >= 0) {
    //   position = '暂不支持该地区的身份证生成'
    // } else {
    //   position = province + city + this.state.currentDistrict.name
    // }
    //
    // let id = new ID()
    // let positionCode = id.getCodeByPosition(position)
    // alert(positionCode)


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
        <FormControl componentClass="select" onChange={(e) => {this.handleProvinceChange(JSON.parse(e.target.value))}}>
          {this.state.provinces.map((value, key) => {
            return (
              <option value={JSON.stringify(value)} key={value.code}>{value.name}</option>
            )
          })}
        </FormControl>

        <FormControl componentClass="select" onChange={(e) => {this.handleCityChange(JSON.parse(e.target.value))}}>
          {this.state.citys.map((value, key) => {
            return (
              <option value={JSON.stringify(value)} key={value.code}>{value.name}</option>
            )
          })}
        </FormControl>

        <FormControl componentClass="select" onChange={(e) => {this.handleDistrictChange(JSON.parse(e.target.value))}}>
          {this.state.districts.map((value, key) => {
            return (
              <option value={JSON.stringify(value)} key={value.code}>{value.name}</option>
            )
          })}
        </FormControl>

        <Button bsStyle="primary" onClick={this.handleClick}>测试</Button>

        <Last />
      </FormGroup>
    )
  }
}
