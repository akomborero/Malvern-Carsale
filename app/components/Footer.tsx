import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 px-6 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-black text-[#632197] italic tracking-tighter">
               MalvernCarsale<span className="text-gray-400">.com</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Providing Zimbabwe with the best selection of quality vehicles. 
              Your journey to a better drive starts here with transparency and trust.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-gray-200">Contact Us</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="flex items-center gap-3 group">
                <span className="text-[#632197] text-xl"></span>
                <a href="tel: +263 7778336" className="group-hover:text-white transition-colors underline-offset-4 hover:underline">
                  +263 7778336
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-[#632197] text-xl"></span>
                <a href="mailto:  mmfandaedza.tm@gmail.com" className="group-hover:text-white transition-colors break-all">
                mmfandaedza.tm@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-[#632197] text-xl"></span>
                <span className="group-hover:text-white transition-colors">
                 18902, Mutare Road
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-gray-200">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li><Link href="/cars" className="hover:text-[#632197] transition-colors">Cars for Sale</Link></li>
              <li><Link href="#" className="hover:text-[#632197] transition-colors">Recently Added</Link></li>
              <li><Link href="#" className="hover:text-[#632197] transition-colors">Sell Your Car</Link></li>
              <li><Link href="#" className="hover:text-[#632197] transition-colors">Financing Options</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-gray-200">Legal</h4>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li>
  <Link href="/privacy" className="hover:text-[#632197] transition-colors font-bold">
    Privacy Policy
  </Link>
</li>
              <li>
  <Link href="/terms" className="hover:text-[#632197] transition-colors font-bold">
    Terms of Service
  </Link>
</li>
             
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Breezecars Dealership. All Rights Reserved.</p>
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