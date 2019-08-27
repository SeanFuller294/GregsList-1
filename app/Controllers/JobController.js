import JobService from "../Services/JobService.js";

let _jobService = new JobService()

function _draw() {
  let jobs = _jobService.Jobs
  let template = ""
  jobs.forEach(job => template += job.Template)
  document.getElementById('jobs-cards').innerHTML = template
}




export default class JobController {
  constructor() {
    _jobService.addSubscriber('jobs', _draw)
    _jobService.getApiJobs()
  }

  addJob(event) {
    event.preventDefault()
    let form = event.target
    let data = {
      company: form.company.value,
      jobTitle: form.jobTitle.value,
      hours: form.hours.value,
      rate: form.rate.value,
      description: form.description.value
    }
    _jobService.addJob(data)
    form.reset()
  }

  delete(id) {
    if (window.confirm("Are you sure?")) {
      _jobService.deleteJob(id)
    }
  }

}