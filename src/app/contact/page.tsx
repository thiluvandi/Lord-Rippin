"use client";

export default function ContactPage() {
  return (
    <div className="max-w-[720px] mx-auto px-6 md:px-10 py-12 md:py-20">
      <h1 className="text-[28px] md:text-[36px] font-light tracking-tight mb-2">
        Contact
      </h1>
      <p className="text-[13px] text-muted mb-10 md:mb-14">
        We typically respond within 24 hours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
          />
          <select
            className="w-full py-3 border-b border-border text-[14px] text-muted bg-transparent focus:border-accent transition-colors appearance-none"
            defaultValue=""
          >
            <option value="" disabled>Subject</option>
            <option>Order Enquiry</option>
            <option>Size Help</option>
            <option>Return / Exchange</option>
            <option>Collaboration</option>
            <option>Other</option>
          </select>
          <div>
            <input
              type="text"
              placeholder="Order ID (if applicable)"
              className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors"
            />
          </div>
          <textarea
            placeholder="Message"
            rows={4}
            required
            className="w-full py-3 border-b border-border text-[14px] placeholder:text-muted/40 focus:border-accent transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full bg-foreground text-white py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted mb-3">
              Email
            </h2>
            <p className="text-[14px]">hello@lordrippin.in</p>
          </div>

          <div>
            <h2 className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted mb-3">
              WhatsApp
            </h2>
            <p className="text-[14px]">+91 98765 43210</p>
          </div>

          <div>
            <h2 className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted mb-3">
              Hours
            </h2>
            <p className="text-[14px]">Mon&ndash;Sat, 10AM&ndash;7PM IST</p>
          </div>

          <div>
            <h2 className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted mb-3">
              Social
            </h2>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[13px] hover:text-accent transition-colors">
                Instagram
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-[13px] hover:text-accent transition-colors">
                Pinterest
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted mb-3">
              Location
            </h2>
            <p className="text-[14px]">Studio</p>
          </div>
        </div>
      </div>
    </div>
  );
}
