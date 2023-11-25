import JWT from "jsonwebtoken";
import { getStudent } from "../helpers/student-helpers.js";

export const studentAuth = async (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({ message: 'Invalid token' })
    const jwtToken = req.headers.authorization.split(' ')[1];
    const userId = JWT.decode(jwtToken);

    if (!userId)
        return res.status(401).json({ message: 'Invalid token' })
    const student = await getStudent(userId);
    if (!student)
        return res.status(401).json({ message: 'Invalid student' })
    req.student = student;
    next();
}