import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 px-6 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-black text-white italic tracking-tighter">
             Qaulity import cars
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Providing South Africa with the best selection of quality vehicles. 
              Your journey to a better drive starts here with transparency and trust.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-gray-200">Contact Us</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="flex items-center gap-3 group">
                <span className="text-white text-xl"></span>
                <a href="tel:+263771716547" className="group-hover:text-white transition-colors underline-offset-4 hover:underline">
                  +27 78 759 3914
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-white text-xl"></span>
                <a href="mailto:motorssa956@gmail.com" className="group-hover:text-white transition-colors break-all">
                motorssa956@gmail.com
                </a>
              </li>
                <li className="flex items-center gap-3 group">
                <span className="text-white text-xl"></span>
                <span className="group-hover:text-white transition-colors">
                  270 Klip Rd,Lotus River
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-white text-xl"></span>
                <span className="group-hover:text-white transition-colors">
                  Cape Town 7805,South Africa
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-gray-200">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li><Link href="/cars" className="hover:text-white transition-colors">Cars for Sale</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Recently Added</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sell Your Car</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Financing Options</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-gray-200">Legal</h4>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li>
  <Link href="/privacy" className="hover:text-white transition-colors font-bold">
    Privacy Policy
  </Link>
</li>
              <li>
  <Link href="/terms" className="hover:text-white transition-colors font-bold">
    Terms of Service
  </Link>
</li>
             
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} quality-import Cars . All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="https://facebook.com" className="hover:text-white transition-colors">Facebook</a>
            <a href="https://instagram.com" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://whatsapp.com" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}