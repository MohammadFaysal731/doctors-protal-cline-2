import React from 'react';
import { Link } from 'react-router-dom';
import footer from '../../../assets/images/footer.png';
const Footer = () => {
  return (
    <footer
      className=" p-10"
      style={{ background: `url(${footer})`, backgroundSize: "cover" }}
    >
      <div className="footer">
        <div>
          <span className="footer-title">Services</span>
          <Link to="" className="link link-hover">Branding</Link>
          <Link to="" className="link link-hover">Design</Link>
          <Link to="" className="link link-hover">Marketing</Link>
          <Link to="" className="link link-hover">Advertisement</Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link to="" className="link link-hover">About us</Link>
          <Link to="" className="link link-hover">Contact</Link>
          <Link to="" className="link link-hover">Jobs</Link>
          <Link to="" className="link link-hover">Press kit</Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <Link to="" className="link link-hover">Terms of use</Link>
          <Link to="" className="link link-hover">Privacy policy</Link>
          <Link to="" className="link link-hover">Cookie policy</Link>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <Link to="" className="link link-hover">Twitter</Link>
          <Link to="" className="link link-hover">Instagram</Link>
          <Link to="" className="link link-hover">Facebook</Link>
          <Link to="" className="link link-hover">Github</Link>
        </div>
        <div>
          <span className="footer-title">Explore</span>
          <Link to="" className="link link-hover">Features</Link>
          <Link to="" className="link link-hover">Enterprise</Link>
          <Link to="" className="link link-hover">Security</Link>
          <Link to="" className="link link-hover">Pricing</Link>
        </div>
        <div>
          <span className="footer-title">Apps</span>
          <Link to="" className="link link-hover">Mac</Link>
          <Link to="" className="link link-hover">Windows</Link>
          <Link to="" className="link link-hover">iPhone</Link>
          <Link to="" className="link link-hover">Android</Link>
        </div>
      </div>
      <div className="my-10 text-center">
        <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  );
};

export default Footer;