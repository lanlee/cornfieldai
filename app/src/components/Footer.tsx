export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Copyright */}
        <div className="text-sm text-gray-500">
          © 2025 Cornfield.ai
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            Behance
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a
            href="mailto:hello@cornfield.ai"
            className="hover:text-black transition-colors"
          >
            hello@cornfield.ai
          </a>
          <span className="tabular-nums">+1 (555) 123-4567</span>
        </div>
      </div>
    </footer>
  );
}
