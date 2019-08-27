import Job from "../Models/Job.js";

// @ts-ignore
let _jobApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/jobs'
})


let _state = {
  jobs: []
}

let _subscribers = {
  jobs: []
}

function _setState(propName, data) {
  _state[propName] = data

  _subscribers[propName].forEach(element => element())
}






export default class JobService {

  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get Jobs() {
    return _state.jobs.map(job => new Job(job))
  }

  getApiJobs() {
    _jobApi.get()
      .then(result => {
        let jobData = result.data.data.map(job => new Job(job))
        _setState('jobs', jobData)
      })
      .catch(err => {
        console.log(err)
      })
  }

  addJob(data) {
    _jobApi.post('', data)
      .then(result => {
        _state.jobs.push(result.data.data)
        _setState('jobs', _state.jobs)
      })
      .catch(err => {
        console.error(err)
      })
  }

  deleteJob(id) {
    _jobApi.delete(id)
      .then(result => {
        let index = _state.jobs.findIndex(job => job._id == id)
        _state.jobs.splice(index, 1)
        _setState('jobs', _state.jobs)
      })
      .catch(err => {
        console.error(err)
      })
  }

}