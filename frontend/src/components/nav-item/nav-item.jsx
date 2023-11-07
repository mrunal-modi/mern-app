import "./nav-item.scss";
import Dropdown from "../dropdown/dropdown";
import { nav } from "../../config/component-config-navbar";
import { Fragment } from "react";
import Link from "../link/link";
const NavItem = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav ml-auto">
        {nav.map((el, i) => (
          <Fragment key={i}>
            {el.dropdownItems ? (
              <Dropdown
                className="nav-item"
                label={el.label}
                dopdownItems={el.dropdownItems}
                labelClassName="nav-link"
                // eventType="click"
              />
            ) : (
              <li className="nav-item" key={i}>
                <Link className="nav-link" {...el}>
                  {el.label}
                </Link>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default NavItem;
