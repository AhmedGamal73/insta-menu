// import jwt from "jsonwebtoken";

// function checkRole(role) {
//   return function (req, res, next) {
//     // get the token from the request headers
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       // if there's no token, return an error
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     try {
//       // verify the token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // check the user's role
//       if (decoded.role !== role) {
//         // if the user's role doesn't match, return an error
//         return res.status(403).json({ error: "Forbidden" });
//       }

//       // if everything is ok, call the next middleware
//       next();
//     } catch (err) {
//       // if the token is invalid, return an error
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//   };
// }

// module.exports = checkRole;
