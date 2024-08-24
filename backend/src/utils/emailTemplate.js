
export const genEmailTemplate = (name, token, userID) => {
    const link = `http://localhost:3000/users/confirm/${token}/${userID}`;
    return `
    Hi ${name}!

    Thank you for joining us! Please click the link below to confirm your Email and activate your account:

    <a href="${link}">${link}</a>

    KEEP HAMMERING!
    `
}