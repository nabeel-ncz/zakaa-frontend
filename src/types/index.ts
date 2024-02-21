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
    courseDescription: string;
    numberOfLessons: string;
}

export type UpdateCourseFormData = {
    courseTitle: string;
    courseDescription: string;
}

export type CreateLessonFormData = {
    lessonTitle: string;
    lessonDescription: string;
}

export type CreateExamFormData = {
    title: string;
    lessonId: string;
    totalNoOfQuestions: string;
    scoreForEachQuestion: string;
    passMark: string;
}

export type CreateQuestionFormData = {
    question: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    answer: string;
}

