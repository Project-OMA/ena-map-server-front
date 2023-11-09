import UserTypes from '../constants/UserTypes';

export const isAdmin = (userType: number) => userType === UserTypes.ADMIN;
export const isTeacher = (userType: number) => userType === UserTypes.TEACHER;
export const isStudent = (userType: number) => userType === UserTypes.STUDENT;