import Users from "../dao/dbManagers/users.js";
import Courses from '../dao/dbManagers/courses.js';

import UserRepository from "./UserRepository.js";
import CoursesRepository from "./CoursesRepository.js";

const usersDao = new Users();
const coursesDao = new Courses();

export const userService = new UserRepository(usersDao);
export const coursesService = new CoursesRepository(coursesDao);