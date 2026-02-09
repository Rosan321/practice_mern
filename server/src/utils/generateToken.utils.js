import jwt from "jsonwebtoken";

// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: "1d",
//     });
// }

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "15m",
    });
}

export const genrateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "7d",
    })
}

export default generateToken;
