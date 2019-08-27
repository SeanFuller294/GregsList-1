import House from "../Models/House.js";

// @ts-ignore
let _houseApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/houses'
})

let _state = {
  houses: []
}

let _subscribers = {
  houses: []
}

function _setState(propName, data) {
  _state[propName] = data
  _subscribers[propName].forEach(element => element());
}



export default class HouseService {
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get Houses() {
    return _state.houses.map(house => new House(house))
  }

  getApiHouses() {
    _houseApi.get()
      .then(result => {
        let housesData = result.data.data.map(house => new House(house))
        _setState('houses', housesData)
      })
      .catch(err => {
        console.error(err)
      })
  }

  addHouse(data) {
    _houseApi.post('', data)
      .then(response => {
        _state.houses.push(response.data.data)
        _setState('houses', _state.houses)
      })
      .catch(err => {
        console.error(err)
      })
  }

  deleteHouse(id) {
    _houseApi.delete(id)
      .then(res => {
        let index = _state.houses.findIndex(house => house._id == id)
        _state.houses.splice(index, 1)
        _setState('houses', _state.houses)
      })
      .catch(err => {
        console.error(err)
      })
  }



}