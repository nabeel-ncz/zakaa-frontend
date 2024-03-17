interface LessonProgress {
    lessonId: string;
    totalTimeWatched: number;
}

export interface EnrollmentEntity {
    _id?: string;
    userId: string;
    courseId: string;
    enrolledAt?: Date | string;
    progress?: {
        completedLessons?: string[] | [] | null;
        completedAssessments?: string[] | [] | null;
        currentLesson?: string | string;
        lessonProgress?: LessonProgress[] | null;
    };
};

enum Role {
    student = 'student',
    instructor = 'instructor',
    admin = 'admin'
}

enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

interface SocialMedia {
    instagram?: string;
    linkedIn?: string;
    github?: string;
}

interface Contact {
    additionalEmail?: string;
    phone?: string;
    socialMedia?: SocialMedia;
}

interface Profile {
    avatar?: string;
    dob?: Date;
    gender?: Gender;
}

export interface UserEntity {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    role: Role;
    profile?: Profile;
    contact?: Contact;
    isBlocked: boolean;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    otp?: string;
    profession?: string;
}

interface Comment {
    userRef: string;
    comment: string;
}

export interface AnnouncementEntity {
    _id?: string;
    userRef: string;
    title: string;
    description: string;
    content: string;
    likes: string[];
    dislikes: string[];
    comments: Comment[];
    isBlocked: boolean;
}