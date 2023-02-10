module.exports = function(req, res, next) {
  const { id, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    console.log(!id.length);
    if (![id, password].every(Boolean)) {
      return res.json("Missing Credentials");
    }// } else if (!validEmail(id)) {
    //   return res.json("Invalid Email");
    // }
  } else if (req.path === "/login") {
    if (![id, password].every(Boolean)) {
      return res.json("Missing Credentials");
    }// } else if (!validEmail(email)) {
    //   return res.json("Invalid Email");
    // }
  }

  next();
};
