const SetLogin = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login Page</h1>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Username:
          </label>
          <input style={{ margin: '0 10px' }} type="text" name="username" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Password:
          </label>
          <input style={{ margin: '0 10px' }} type="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SetLogin;

