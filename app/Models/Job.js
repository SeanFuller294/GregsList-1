export default class Job {
  constructor(data) {
    this._id = data._id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
  }
  get Template() {
    return `
    <div class="col-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${this.jobTitle} at ${this.company}</h5>
                    <p class="card-text">${this.description}</p>
                    <p><sm>${this.hours}hrs/week</sm></p>
                    <p><sm>$${this.rate}/year</sm></p>
                    <button class="btn btn-danger" onclick="app.controllers.jobController.delete('${this._id}')">Delete Job</button>
                </div >
            </div >
        </div >
    `
  }
}