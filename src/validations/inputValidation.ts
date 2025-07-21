const emailInputValidation = (emailId: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailId);
};


export { emailInputValidation }