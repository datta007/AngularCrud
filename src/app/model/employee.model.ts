export class Employee {
    id: number;
    name: string;
    gender: string;
    email?: string;
    phonenumber?: number;
    contactPreference: string;
    dateOfBirth: Date;
    department: string;
    isActive: boolean;
    photoPath?: string;
    password: string;
    confirmPassword: string;
}

// ngOnChanges
// We get all the changes instead of just the changes related to a single property
// Useful when multiple properties change
// Property Setter
// Property setter is specific to a given property, so we only get changes of that specific property
// Useful when you want to keep track of a single property
