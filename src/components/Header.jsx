export function Header() {
  return (
    <div className="container-fluid bg-dark text-white p-3">
      <div className="row">
        <div className="col text-center">
          <h1 className="app-logo">KEEP HAMMERING</h1>
        </div>
      </div>
      {/*navigation with button burger-menu, welcome text, button user-menu*/}
      <div className="row">
        <div className="col-2 text-center">
          <button className="menu-button">☰</button>
        </div>
        <div className="col-8 text-center">
          <h2>Welcome, User!</h2>
        </div>
        <div className="col-2 text-center">
          <button className="user-button">👤</button>
        </div>
      </div>
    </div>
  );
}
