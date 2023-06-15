import React from 'react'
import Logo from '../assets/Logo.png'

// Icons
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="container">

                    <div className="footer-section">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="footer-logo">
                                    <img src={Logo} alt="" />
                                    <div className='footer-logo-title'>TradeTrek</div>
                                </div>
                                <div className="footer-address">
                                    The Capital <br />
                                    A 404/ 405 <br />
                                    Science City Rd <br />
                                    Sola, Ahmedabad, Gujarat - 380060 <br />
                                </div>
                                <div className="footer-icons">
                                    <i className="fa-brands fa-facebook"></i>
                                    <i className="fa-brands fa-twitter"></i>
                                    <i className="fa-brands fa-linkedin"></i>
                                </div>
                            </div>
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </div>
                <div className="container">

                    <div className="copyright-section">

                        &copy;
                        2023-2026 TradeTrek. All rights reserved , Built with <i className="fa-solid fa-heart" style={{ color: "red" }} /> in India

                    </div>

                </div>
            </div >
        </>
    )
}

export default Footer;