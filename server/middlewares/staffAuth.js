import JWT from "jsonwebtoken";
import { getStaff } from "../helpers/staff-helpers.js";

export const staffAuth = async (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({ message: 'Invalid token' })

    const jwtToken = req.headers.authorization;
    const userId = JWT.decode(jwtToken);

    if (!userId)
        return res.status(401).json({ message: 'Invalid token' })
    const staff = await getStaff(userId);
    if (!staff)
        return res.status(401).json({ message: 'Invalid student' })
    req.staff = staff;
    next();
}