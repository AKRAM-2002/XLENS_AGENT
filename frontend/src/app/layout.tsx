import Navbar from '@/components/Navbar';
import '../index.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}