const router = require("express").Router();
const authorize = require("../middleware/authorize");
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  getStudentInfo,
  getDepartments,
  getAllCourses,
  getDepartmentCourses,
  getAllInstructors,
  getInstructorInfo,
  getCourseInfo,
  registerCourse,
} = require('../controllers/auth')

router.get('/', getUsers)
router.get('/departments', getDepartments)
router.get('/departments/:dept_name/courses', getDepartmentCourses)
router.get('/courses', getAllCourses)
router.get('/instructor', getAllInstructors)
router.get('/instructor/:id', getInstructorInfo)
router.get('/courses/:course_id', getCourseInfo)
router.get('/get-users', getUsers)
router.get('/protected', protected)
router.post("/home",authorize, getStudentInfo)
router.get('/home/registration/',authorize, getStudentInfo)
router.post('/home/registration/:course_id', registerCourse)

module.exports = router;