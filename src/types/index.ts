export type SignupFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    username?: string;
};

export type LoginFormData = {
    email: string;
    password: string;
}

export type ApplyToTeachFormData = {
    profession: string;
    phone: string;
    profileDescription: string;
    linkedIn: string;
    github: string;
}

export type CreateCourseFormData = {
    courseTitle: string;
    courseCategory: string;
    courseDescription: string;
    numberOfLessons: string;
}

export type CreateLessonFormData = {
    lessonTitle: string;
    lessonDescription: string;
}

