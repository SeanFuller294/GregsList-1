import Job from "../Models/Job.js";

// @ts-ignore
let _jobApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/jobs'
})


let _steve = {
  jobs: []
}

let _subscribers = {
  jobs: []
}

function _setState(propName, data) {
  _steve[propName] = data

  _subscribers[propName].forEach(element => element())
}






export default class JobService {

  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get Jobs() {
    return _steve.jobs.map(job => new Job(job))
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
        _steve.jobs.push(new Job(result.data.data))
        _setState('jobs', _steve.jobs)
      })
      .catch(err => {
        console.error(err)
      })
  }

  deleteJob(id) {
    _jobApi.delete(id)
      .then(result => {
        let index = _steve.jobs.findIndex(job => job._id == id)
        _steve.jobs.splice(index, 1)
        _setState('jobs', _steve.jobs)
      })
      .catch(err => {
        console.error(err)
      })
  }

}