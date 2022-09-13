import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PrivateHeader = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const salir = () => {
    logout();
    window.location.reload(false);
    navigate("/tienda");
  };

  const displayUserOptions = () => {
    let element1;
    element1 = document.querySelector("#userOptions");

    let noti = document.querySelector("#notificationsUser");
    let setting = document.querySelector("#settingClick");
    if (
      element1.className ===
      "dropdown-menu dropdown-menu-right user-dd animated flipInY"
    ) {
      element1.className =
        "dropdown-menu dropdown-menu-right user-dd animated flipInY show";
      noti.className =
        "dropdown-menu dropdown-menu-left mailbox animated bounceInDown";
      setting.className = "dropdown-menu";
    } else {
      element1.className =
        "dropdown-menu dropdown-menu-right user-dd animated flipInY";
    }
  };

  const displaySettingOptions = () => {
    let element1;
    element1 = document.querySelector("#settingClick");

    let options;
    options = document.querySelector("#userOptions");

    let user = document.querySelector("#notificationsUser");

    if (element1.className === "dropdown-menu") {
      element1.className = "dropdown-menu show";
      options.className =
        "dropdown-menu dropdown-menu-right user-dd animated flipInY";
      user.className =
        "dropdown-menu dropdown-menu-left mailbox animated bounceInDown";
    } else {
      element1.className = "dropdown-menu";
    }
  };

  const displayNotifications = () => {
    let element1;
    element1 = document.querySelector("#notificationsUser");

    let setting = document.querySelector("#settingClick");
    let user = document.querySelector("#userOptions");

    if (
      element1.className ===
      "dropdown-menu dropdown-menu-left mailbox animated bounceInDown"
    ) {
      element1.className =
        "dropdown-menu dropdown-menu-left mailbox animated bounceInDown show";
      setting.className = "dropdown-menu";
      user.className =
        "dropdown-menu dropdown-menu-right user-dd animated flipInY";
    } else {
      element1.className =
        "dropdown-menu dropdown-menu-left mailbox animated bounceInDown";
    }
  };

  const showSideResponsive = () => {
    let side = document.querySelector("#main-wrapper");
    let closeButton = document.querySelector("#iconoCerrar");

    if (side.className === "mini-sidebar") {
      side.className = "mini-sidebar show-sidebar";
      closeButton.className = "ti-close";
    } else {
      side.className = "mini-sidebar";
      closeButton.className = "ti-menu ti-close";
    }
  };

  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md navbar-light">
        <div className="navbar-header" data-logobg="skin6">
          {/* This is for the sidebar toggle which is visible on mobile only */}
          <a
            className="nav-toggler waves-effect waves-light d-block d-md-none"
            href="#/"
            onClick={() => showSideResponsive()}
          >
            <i id="iconoCerrar" className="ti-menu ti-close" />
          </a>
          {/* ============================================================== */}
          {/* Logo */}
          {/* ============================================================== */}
          <div className="navbar-brand">
            {/* Logo icon */}
            <a href="index.html">
              <b className="logo-icon">
                {/* Dark Logo icon */}
                <img
                  src="/images/logo-icon.png"
                  alt="homepage"
                  className="dark-logo"
                />
                {/* Light Logo icon */}
                <img
                  src="/images/logo-icon.png"
                  alt="homepage"
                  className="light-logo"
                />
              </b>
              {/*End Logo icon */}
              {/* Logo text */}
              <span className="logo-text">
                {/* dark Logo text */}
                <img
                  src="/images/logo-text.png"
                  alt="homepage"
                  className="dark-logo"
                />
                {/* Light Logo text */}
                <img
                  src="/images/logo-light-text.png"
                  className="light-logo"
                  alt="homepage"
                />
              </span>
            </a>
          </div>
          {/* ============================================================== */}
          {/* End Logo */}
          {/* ============================================================== */}
          {/* ============================================================== */}
          {/* Toggle which is visible on mobile only */}
          {/* ============================================================== */}
          <a
            className="topbartoggler d-block d-md-none waves-effect waves-light collapsed"
            href="#/"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            // onClick={() => displayUserSettingResponsive()}
            aria-label="Toggle navigation"
          >
            <i className="ti-more" />
          </a>
        </div>
        {/* ============================================================== */}
        {/* End Logo */}
        {/* ============================================================== */}
        <div
          className="navbar-collapse collapse"
          id="navbarSupportedContentResponsive"
        >
          {/* ============================================================== */}
          {/* toggle and nav items */}
          {/* ============================================================== */}
          <ul className="navbar-nav float-left mr-auto ml-3 pl-1">
            {/* Notification */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle pl-md-3 position-relative"
                href="#/"
                id="bell"
                role="button"
                data-toggle="dropdown"
                onClick={() => displayNotifications()}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-bell svg-icon"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </span>
                <span className="badge badge-primary notify-no rounded-circle">
                  5
                </span>
              </a>
              <div
                id="notificationsUser"
                className="dropdown-menu dropdown-menu-left mailbox animated bounceInDown"
              >
                <ul className="list-style-none">
                  <li>
                    <div
                      className="message-center notifications position-relative ps-container ps-theme-default"
                      data-ps-id="8050b164-0d56-ecb4-9b12-0aa0e0fa6e06"
                    >
                      {/* Message */}
                      <a
                        href="#/"
                        className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      >
                        <div className="btn btn-danger rounded-circle btn-circle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-airplay text-white"
                          >
                            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                            <polygon points="12 15 17 21 7 21 12 15" />
                          </svg>
                        </div>
                        <div className="w-75 d-inline-block v-middle pl-2">
                          <h6 className="message-title mb-0 mt-1">
                            Luanch Admin
                          </h6>
                          <span className="font-12 text-nowrap d-block text-muted">
                            Just see the my new admin!
                          </span>
                          <span className="font-12 text-nowrap d-block text-muted">
                            9:30 AM
                          </span>
                        </div>
                      </a>
                      {/* Message */}
                      <a
                        href="#/"
                        className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      >
                        <span className="btn btn-success text-white rounded-circle btn-circle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-calendar text-white"
                          >
                            <rect
                              x={3}
                              y={4}
                              width={18}
                              height={18}
                              rx={2}
                              ry={2}
                            />
                            <line x1={16} y1={2} x2={16} y2={6} />
                            <line x1={8} y1={2} x2={8} y2={6} />
                            <line x1={3} y1={10} x2={21} y2={10} />
                          </svg>
                        </span>
                        <div className="w-75 d-inline-block v-middle pl-2">
                          <h6 className="message-title mb-0 mt-1">
                            Event today
                          </h6>
                          <span className="font-12 text-nowrap d-block text-muted text-truncate">
                            Just a reminder that you have event
                          </span>
                          <span className="font-12 text-nowrap d-block text-muted">
                            9:10 AM
                          </span>
                        </div>
                      </a>
                      {/* Message */}
                      <a
                        href="#/"
                        className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      >
                        <span className="btn btn-info rounded-circle btn-circle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-settings text-white"
                          >
                            <circle cx={12} cy={12} r={3} />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                          </svg>
                        </span>
                        <div className="w-75 d-inline-block v-middle pl-2">
                          <h6 className="message-title mb-0 mt-1">Settings</h6>
                          <span className="font-12 text-nowrap d-block text-muted text-truncate">
                            You can customize this template as you want
                          </span>
                          <span className="font-12 text-nowrap d-block text-muted">
                            9:08 AM
                          </span>
                        </div>
                      </a>
                      {/* Message */}
                      <a
                        href="#/"
                        className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      >
                        <span className="btn btn-primary rounded-circle btn-circle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-box text-white"
                          >
                            <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z" />
                            <polyline points="2.32 6.16 12 11 21.68 6.16" />
                            <line x1={12} y1="22.76" x2={12} y2={11} />
                          </svg>
                        </span>
                        <div className="w-75 d-inline-block v-middle pl-2">
                          <h6 className="message-title mb-0 mt-1">
                            Pavan kumar
                          </h6>{" "}
                          <span className="font-12 text-nowrap d-block text-muted">
                            Just see the my admin!
                          </span>
                          <span className="font-12 text-nowrap d-block text-muted">
                            9:02 AM
                          </span>
                        </div>
                      </a>
                      <div
                        className="ps-scrollbar-x-rail"
                        style={{ left: 0, bottom: 0 }}
                      >
                        <div
                          className="ps-scrollbar-x"
                          tabIndex={0}
                          style={{ left: 0, width: 0 }}
                        />
                      </div>
                      <div
                        className="ps-scrollbar-y-rail"
                        style={{ top: 0, right: 3 }}
                      >
                        <div
                          className="ps-scrollbar-y"
                          tabIndex={0}
                          style={{ top: 0, height: 0 }}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <a
                      className="nav-link pt-3 text-center text-dark"
                      href="#/"
                    >
                      <strong>Check all notifications</strong>
                      <i className="fa fa-angle-right" />
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            {/* End Notification */}
            {/* ============================================================== */}
            {/* create new */}
            {/* ============================================================== */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                onClick={() => navigate("/configurar-cuenta")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-settings svg-icon"
                >
                  <circle cx={12} cy={12} r={3} />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </a>
            </li>
            {/* <li className="nav-item d-none d-md-block">
              <a className="nav-link" href="#/">
                <div className="customize-input">
                  <select className="custom-select form-control bg-white custom-radius custom-shadow border-0">
                    <option selected="">EN</option>
                    <option value={1}>AB</option>
                    <option value={2}>AK</option>
                    <option value={3}>BE</option>
                  </select>
                </div>
              </a>
            </li> */}
          </ul>
          {/* ============================================================== */}
          {/* Right side toggle and nav items */}
          {/* ============================================================== */}
          <ul className="navbar-nav float-right">
            {/* ============================================================== */}
            {/* Search */}
            {/* ============================================================== */}
            {/* <li className="nav-item d-none d-md-block">
              <a className="nav-link" href="#/">
                <form>
                  <div className="customize-input">
                    <input
                      className="form-control custom-shadow custom-radius border-0 bg-white"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-search form-control-icon"
                    >
                      <circle cx={11} cy={11} r={8} />
                      <line x1={21} y1={21} x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </form>
              </a>
            </li> */}
            {/* ============================================================== */}
            {/* User profile and search */}
            {/* ============================================================== */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#/"
                data-toggle="dropdown"
              >
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                  alt="user"
                  className="rounded-circle"
                  width={40}
                />
                <span
                  className="ml-2 d-none d-lg-inline-block"
                  onClick={() => displayUserOptions()}
                >
                  <span>Hola,</span>{" "}
                  <span className="text-dark">{`${currentUser.nombre} ${currentUser.apellidoPaterno}`}</span>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevron-down svg-icon"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </a>
              <div
                id="userOptions"
                className="dropdown-menu dropdown-menu-right user-dd animated flipInY"
              >
                <a className="dropdown-item" href="#/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user svg-icon mr-2 ml-1"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                  My Profile
                </a>
                {/* <a className="dropdown-item" href="#/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-credit-card svg-icon mr-2 ml-1"
                  >
                    <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                    <line x1={1} y1={10} x2={23} y2={10} />
                  </svg>
                  My Balance
                </a>
                <a className="dropdown-item" href="#/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-mail svg-icon mr-2 ml-1"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Inbox
                </a> */}
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-settings svg-icon mr-2 ml-1"
                  >
                    <circle cx={12} cy={12} r={3} />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  Account Setting
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" onClick={() => salir()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-power svg-icon mr-2 ml-1"
                  >
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                    <line x1={12} y1={2} x2={12} y2={12} />
                  </svg>
                  Logout
                </a>
                {/* <div className="dropdown-divider" />
                <div className="pl-4 p-3">
                  <a href="#/" className="btn btn-sm btn-info">
                    View Profile
                  </a>
                </div> */}
              </div>
            </li>
            {/* ============================================================== */}
            {/* User profile and search */}
            {/* ============================================================== */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default PrivateHeader;
