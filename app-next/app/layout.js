import './globals.css';

export const metadata = {
  title: 'Meal Sharing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
