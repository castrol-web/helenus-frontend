import {
    FaInstagram,
    FaWhatsapp,
    FaTiktok
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <div className="relative bottom-0 left-0 w-full bg-gray-900 text-gray-300 z-50">
            <div className="max-w-7xl mx-auto px-4 pb-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Navigation */}
                <div>
                    <h2 className="text-lg font-bold text-white mb-3">Navigation</h2>
                    <ul className="space-y-1">
                        <li><a href="/" className="hover:text-orange-400">Home</a></li>
                        <li><a href="/about" className="hover:text-orange-400">About</a></li>
                        <li><a href="/blogs" className="hover:text-orange-400">Blogs</a></li>
                        <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-lg font-bold text-white mb-3">Helenus Travel</h2>
                    <p><span className="pr-4">LOCATION:</span>Utalii street Kenya Complex House Building Office No T14 third floor</p>
                    <p className="mt-1">Phone: +254113368527</p>
                    <p>
                        Email:{" "}
                        <a href="mailto:helenusagency@travel.com" className="text-blue-400 hover:underline">
                            helenusagency@travel.com
                        </a>
                    </p>
                </div>

                {/* Socials */}
                <div>
                    <h2 className="text-lg font-bold text-white mb-3">Follow Us</h2>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="https://wa.me/+254113368527" aria-label="Whatsapp">
                            <FaWhatsapp className="text-2xl hover:text-green-700 text-green-800" />
                        </a>
                        <a href="https://www.tiktok.com/@helenusfirm?is_from_webapp=1&sender_device=pc" aria-label="TikTok">
                            <FaTiktok className="text-2xl hover:text-slate-50" />
                        </a>
                        <div className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-lg p-1">
                            <a href="https://www.instagram.com/helenus_firm?igsh=MXFqaHN4eHp1bnNjZg==" aria-label="Instagram">
                                <FaInstagram className="text-xl text-white hover:text-slate-50" />
                            </a>
                        </div>
                    </div>

                    <Link to="/application-roadmap" className="text-sm text-gray-400 hover:text-white">
                        Application Roadmap <span className="font-bold">?</span>
                    </Link>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700 text-sm text-center text-gray-400 py-3 px-4 bg-gray-800">
                <p>Privacy Policy • Helenus © {year} • All Rights Reserved</p>
                <Link to="https://castrol-banda.onrender.com" className="text-xs">@Richkid Solutions</Link>
            </div>
        </div>
    );
}

export default Footer;
