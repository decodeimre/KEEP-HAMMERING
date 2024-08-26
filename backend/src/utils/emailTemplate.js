
export const genEmailTemplate = (name, token, userID) => {
    const link = `http://localhost:5000/users/confirm/${token}/${userID}`;
    return `
    Hi ${name}!
    <br/><br/>
    Thank you for joining us! Please click the link below to confirm your Email and activate your account:
    <br/>
    <a href="${link}">${link}</a>
    <br/><br/>
    KEEP HAMMERING!
    `
}