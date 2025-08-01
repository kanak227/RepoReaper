
import React from 'react';

const Footer = () => (
  <footer
    className="absolute w-full py-3 text-center text-sm text-blue-200 bg-transparent bottom-0 left-0 z-50"
    style={{}}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute  left-0 top-0 w-full h-[2px]"
      style={{
        background: 'linear-gradient(90deg, rgba(29,78,216,0) 0%, rgba(29,78,216,0.4) 50%, rgba(29,78,216,0) 100%)',
        opacity: 0.7,
        content: '""',
      }}
    />
    Made with <span className="inline-block mx-1" role="img" aria-label="blue heart">💙</span> by Kanak
  </footer>
);

export default Footer;
