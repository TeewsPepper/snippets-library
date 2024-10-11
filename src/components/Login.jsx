

const Login = () => {
  return (
    <>
      <div>
        <form>
          <label htmlFor="username">User:</label>
          <input type="text" id="username" name="username" />

          <label className="label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
          />

          <button type="submit">
            Entrar
          </button>
        </form>
        <div>
          <p>
            Registrarse
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
