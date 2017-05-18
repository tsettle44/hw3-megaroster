$(document).foundation()

const megaroster = {
  students: [],

  init(listSelector) {
    this.studentList = document.querySelector(listSelector)
    this.max = 0
    this.setupEventListeners() 
    this.load() 
  },

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addStudentViaForm.bind(this))
  },

  save() {
     localStorage.setItem('student', JSON.stringify(this.students))
  },

  load() {
    const studentStr = localStorage.getItem('student')
    const studentArr = JSON.parse(studentStr)

    studentArr.map(this.addStudent.bind(this))
  },

  removeStudent(ev) {
    const btn = ev.target
    const id = btn.closest('.student')

    for(let i = 0; i < this.students.length; i++) {
      if(this.students[i].id.toString() === id.dataset.id) {
        this.students.splice(i, 1)
        break
      }
    }

    id.remove()
    this.save()
  },

  addStudentViaForm(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: this.max + 1,
      name: f.studentName.value,
    }
    this.addStudent(student)
    f.reset()
  },

  promoteStudent(ev) {
    const btn = ev.target
    const li = btn.closest('.student')
    li.style.backgroundColor = 'yellow'
  },

  moveUp(ev) {
    const btn = ev.target
    const li = btn.closest('.student')

    const before = li.previousSibling
    if (before === null) {

    } else {
      li.remove()
      studentList.insertBefore(li, before)
    }
    
  },

  moveDown(ev) {
    const btn = ev.target
    const li = btn.closest('.student')

    const after = li.nextSibling
    const spot = after.nextSibling
    if (after.value === studentList.length) {

    } else {
      li.remove()

      studentList.insertBefore(li, spot)
    }
    
  },

  addStudent(student) {
    this.students.unshift(student)

    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)

     if (student.id > this.max) {
      this.max = student.id
    }
    this.save()
  },

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem(student) {
    const template = document.querySelector('.student.template')
    const li = template.cloneNode(true)
    this.removeClassName(li, 'template')   
    li.querySelector('.student-name').textContent = student.name
    li.dataset.id = student.id

    li.querySelector('button.success')
      .addEventListener('click', this.promoteStudent.bind(this))
    li
      .querySelector('button.remove')
      .addEventListener('click', this.removeStudent.bind(this))
    li
      .querySelector('button.moveUp')
      .addEventListener('click', this.moveUp.bind(this))
    li
      .querySelector('button.moveDown')
      .addEventListener('click', this.moveDown.bind(this))
    return li
  },

  removeClassName(el, className){
    el.className = el.className.replace(className, '').trim()
  }
}
megaroster.init('#studentList')

