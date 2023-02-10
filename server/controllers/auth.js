const db = require('../db')

exports.getUsers = async (req, res) => {
  try {
    console.log("hello")
    const { rows } = await db.query('select id from user_password')

    console.log(rows)
    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getDepartments = async (req, res) => {
  try {

    const { rows } = await db.query('select dept_name from department')

    console.log(rows)
    return res.status(200).json({
      success: true,
      departments: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getStudentInfo = async (req, res) => {
  
  try {
    studentId = req.user.id
    const { rows } = await db.query("select * from takes natural join course where  takes.id = $1 and (semester, year) in (select max(section.semester), max(section.year) from section, reg_dates where section.semester = reg_dates.semester and section.year = reg_dates.year and reg_dates.start_time <= CURRENT_TIMESTAMP) ORDER BY (takes.semester, takes.year) DESC", [studentId])
    const current_courses = rows
    const previous_courses = (await db.query("select * from takes natural join course where takes.id = $1 and (semester, year) in ((select section.semester, section.year from section, reg_dates where section.semester = reg_dates.semester and section.year = reg_dates.year and reg_dates.start_time <= CURRENT_TIMESTAMP) except (select max(section.semester), max(section.year) from section, reg_dates where section.semester = reg_dates.semester and section.year = reg_dates.year and reg_dates.start_time <= CURRENT_TIMESTAMP)) ORDER BY (takes.semester, takes.year) DESC", [studentId])).rows
    const info  = (await db.query("select * from student where student.id = $1", [studentId])).rows[0]
    res.json({
      success: true,
      current_courses: current_courses,
      previous_courses: previous_courses,
      information: info,
    })
    console.log(current_courses)
    console.log(previous_courses)
  } catch (error) {
    console.log(error.message)
  }
}

exports.getDepartmentCourses = async (req, res) => {
  
  try {
    dept = req.params.dept_name
    const { rows } = await db.query('select * from course where course.dept_name = $1', [dept])

    console.log(rows)
    return res.status(200).json({
      success: true,
      courses: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getAllCourses = async (req, res) => {
  
  try {
    const { rows } = await db.query('select * from course')

    console.log(rows)
    return res.status(200).json({
      success: true,
      courses: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getAllInstructors = async (req, res) => {
  
  try {
    const { rows } = await db.query('select * from instructor')

    console.log(rows)
    return res.status(200).json({
      success: true,
      instructors: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getInstructorInfo = async (req, res) => {
  
  try {
    instructorId = req.params.id
    const { rows } = await db.query("select * from teaches where teaches.id = $1 and (semester, year) in (select max(section.semester), max(section.year) from section, reg_dates where section.semester = reg_dates.semester and section.year = reg_dates.year and reg_dates.start_time <= CURRENT_TIMESTAMP) ORDER BY (teaches.semester, teaches.year) DESC", [instructorId])
    const current_courses = rows
    const previous_courses = (await db.query("select * from teaches where teaches.id = $1 and (semester, year) in ((select section.semester, section.year from section, reg_dates where section.semester = reg_dates.semester and section.year = reg_dates.year and reg_dates.start_time <= CURRENT_TIMESTAMP) except (select max(section.semester), max(section.year) from section, reg_dates where section.semester = reg_dates.semester and section.year = reg_dates.year and reg_dates.start_time <= CURRENT_TIMESTAMP)) ORDER BY (teaches.semester, teaches.year) DESC", [instructorId])).rows
    const info  = (await db.query('select * from instructor where instructor.id = $1', [instructorId])).rows[0]
    console.log(rows)
    return res.status(200).json({
      success: true,
      current_courses: current_courses,
      previous_courses: previous_courses,
      information: info,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getCourseInfo = async (req, res) => {
  
  try {
    courseId = req.params.course_id
    const { rows } = await db.query('select * from prereq where prereq.course_id = $1', [courseId])
    const courses = rows
    const info  = (await db.query('select * from course where course.course_id = $1', [courseId])).rows[0]
    console.log(rows)
    return res.status(200).json({
      success: true,
      prereqs: courses,
      cinfo: info,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.registerCourse = async (req, res) => {
  
  try {
    courseId = req.params.course_id
    studentId = req.params.id
    const { rows } = await db.query('INSERT INTO takes values ($1, $2, 1, $3, 2009, null)', [studentId, courseId, "Summer"])
    return res.status(200).json({
      success: true,
      message:"registered",
    })
  } catch (error) {
    console.log(error.message)
  }
}