import "./dropdown.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "../link/link";

const Dropdown = ({ label, dopdownItems, className = "", labelClassName , eventType="mouseover"}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const labelRef = useRef(null);

  const closeDropdown = useCallback ((e) => {
    if (!ref?.current?.contains(e.target) && isOpen) {
      setIsOpen(false)
    }
  }, [ref, isOpen]);

  const openDropdown = useCallback ((e) => {
    if (labelRef?.current?.contains(e.target)) {
      setIsOpen(!isOpen)
    }
  }, [labelRef, isOpen]);

  useEffect(() => {
    window.addEventListener(eventType, closeDropdown, false)
    return () => {
      window.removeEventListener(eventType, closeDropdown)
    }
  },[closeDropdown, eventType]);

  useEffect(() => {
    let el = labelRef?.current;
    el?.addEventListener(eventType, openDropdown, false)
    return () => {
      el?.removeEventListener(eventType, openDropdown)
    }
  },[labelRef, openDropdown, eventType]);

  return (
    <div ref={ref} className={`dropdown ${className} ${isOpen ? "open" : "close"}`}>
      <div
      ref={labelRef}
        className={`label ${labelClassName}`}
      >
        {label}
      </div>
      <ul className="dropdown-items">
        {dopdownItems.map((el, i) => (
          <li className="nav-item" key={i}>
            <Link className="nav-link" {...el}>
              {el.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
