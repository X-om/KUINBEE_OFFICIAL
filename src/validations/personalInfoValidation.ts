import { PersonalInfoInput } from '../utility/common/interfaces/customeInterfaces';


export const adminPersonalInfoValidation = (personalInfo: PersonalInfoInput): string | null => {
    const requiredFields: (keyof PersonalInfoInput)[] = ["address", "fatherName", "motherName", "gender", "dob", "city", "state", "country", "pinCode", "nationality"];

    for (const field of requiredFields) {
        if (personalInfo[field] === undefined || personalInfo[field] === null || personalInfo[field] === "") return field;
    }
    return null;
};
