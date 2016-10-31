import React, { Component } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import province from './../../../json/province.json'
import city from './../../../json/city.json'
import district from './../../../json/district.json'
import idplace from './../../../json/idplace.json'

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
    let position = this.state.currentProvince.name + this.state.currentCity.name + this.state.currentDistrict.name
    alert(position)
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
      </FormGroup>
    )
  }
}
