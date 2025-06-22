export enum Role {
    DIRECTOR = "DIRECTOR",
    MANAGER = "MANAGER",
    ASSISTANT = "ASSISTANT",
    CATALOGER = "CATALOGER",
    REFERENCE_LIBRARIAN = "REFERENCE_LIBRARIAN",
    CIRCULATION_LIBRARIAN = "CIRCULATION_LIBRARIAN",
    ARCHIVIST = "ARCHIVIST",
    DIGITAL_LIBRARIAN = "DIGITAL_LIBRARIAN",
    ACQUISITIONS_LIBRARIAN = "ACQUISITIONS_LIBRARIAN",
    YOUTH_LIBRARIAN = "YOUTH_LIBRARIAN",
    LAW_LIBRARIAN = "LAW_LIBRARIAN",
    MEDICAL_LIBRARIAN = "MEDICAL_LIBRARIAN",
    SCHOOL_LIBRARIAN = "SCHOOL_LIBRARIAN",
    PUBLIC_SERVICES_LIBRARIAN = "PUBLIC_SERVICES_LIBRARIAN",
    INTERLIBRARY_LOAN_LIBRARIAN = "INTERLIBRARY_LOAN_LIBRARIAN",
    RESEARCH_LIBRARIAN = "RESEARCH_LIBRARIAN",
    SERIALS_LIBRARIAN = "SERIALS_LIBRARIAN",
    SPECIAL_COLLECTIONS_LIBRARIAN = "SPECIAL_COLLECTIONS_LIBRARIAN",
    TECHNICAL_LIBRARIAN = "TECHNICAL_LIBRARIAN",
    EVENTS_COORDINATOR = "EVENTS_COORDINATOR",
    VOLUNTEER_COORDINATOR = "VOLUNTEER_COORDINATOR",
}

export enum Permission {
    READ = "READ",
    WRITE = "WRITE",
    DELETE = "DELETE",
    MANAGE_USERS = "MANAGE_USERS",
    SYSTEM_ADMIN = "SYSTEM_ADMIN",
    UPDATE = "UPDATE",
}

export enum Gender {
    F = "F",
    M = "M",
    O = "O",
}

export enum LibrarianStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED",
    ON_LEAVE = "ON_LEAVE",
    RETIRED = "RETIRED",
    TERMINATED = "TERMINATED",
    PENDING = "PENDING",
    PROBATION = "PROBATION",
    RESIGNED = "RESIGNED",
    TRANSFERRED = "TRANSFERRED",
    REJECTED = "REJECTED",
    DECEASED = "DECEASED",
}

export interface Librarian {
    librarianId: string;
    institutionId?: string | null;
    libraryId?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    profile?: string | null;
    status: LibrarianStatus;
    gender: Gender;
    phone: string;
    password: string;
    role?: Role | null;
    permissions: Permission[];
    createdAt: Date;
    updatedAt: Date;
    token: string;
}
