import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  title: 'Muhammad Ali | Software Engineer Portfolio',
  description:
    'Portfolio of Muhammad Ali — a motivated Software Engineering student at the University of Gujrat. Specializing in frontend development, responsive web applications, and modern JavaScript technologies.',
  keywords: [
    'Muhammad Ali',
    'Software Engineer',
    'Frontend Developer',
    'Portfolio',
    'Web Developer',
    'React',
    'JavaScript',
    'University of Gujrat',
  ],
  authors: [{ name: 'Muhammad Ali' }],
  openGraph: {
    title: 'Muhammad Ali | Software Engineer Portfolio',
    description:
      'Motivated Software Engineering student specializing in frontend development and responsive web applications.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
