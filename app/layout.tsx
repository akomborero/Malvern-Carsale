import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './components/AuthProvider';

// Configuring the font with a CSS variable and swap display
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // This helps Next.js map the font correctly
});

export const metadata: Metadata = {
  title: ' Qaulity import cars| Premium Dealership',
  description: "South Africa's Most Trusted Car Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Using inter.className on the body. 
        antialiased makes the white text on dark backgrounds look much cleaner.
      */}
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}