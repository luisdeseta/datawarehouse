//bench

const validateLogin = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
  
    let validPassword = false;
    if (user) {
      validPassword = await bcrypt.compare(req.body.password, user.password);
    }
    // console.log('LOGIN:', user, validPassword);
    if (!user || !validPassword)
      return res.status(200).json({
        error: true,
        message: 'Credenciales no validas... Por favor verifique los datos',
      });
  
    req.user = user;
    next();
  };


  // ? Login de Usuario
router.post('/login', validateLogin, async (req, res) => {
    try {
      const { user } = req;
      // crear token
      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          id: user.id,
        },
        process.env.TOKEN_SECRET
      );
  
      const { id, name, lastname, email, role } = user;
      res.json({
        error: false,
        message: 'Usuario logueado correctamente',
        user: { id, name, lastname, email, role },
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: error || 'Error al devolver el usuario logueado' });
    }
  });

  //buscar esto en el front

  