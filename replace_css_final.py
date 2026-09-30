with open("assets/css/style.css", "r", encoding="utf-8") as f:
    css = f.read()

# Locate from HEADER & NAVBAR up to HERO SECTION
header_start_marker = "/* ========================================================\n   2-TIER LUXURY ROYAL HEADER & NAVIGATION (WORLD-CLASS DESIGN)"
hero_marker = "/* ========================================================\n   HERO SECTION"

pos_start = css.find(header_start_marker)
pos_end = css.find(hero_marker)

new_header_and_drawer_css = """/* ========================================================
   2-TIER LUXURY ROYAL HEADER & NAVIGATION (WORLD-CLASS DESIGN)
   ======================================================== */

/* 1. TOP ANNOUNCEMENT & CONTACT STRIP */
.header-top-bar {
  background: linear-gradient(90deg, #1A0205 0%, #2E050B 50%, #1A0205 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.28);
  color: var(--gold-300);
  font-size: 0.82rem;
  font-weight: 500;
  position: relative;
  z-index: 1001;
  width: 100%;
  box-sizing: border-box;
}

.top-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 14px;
  box-sizing: border-box;
}

.top-bar-left {
  display: flex;
  align-items: center;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.top-loc-badge {
  color: var(--gold-400);
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.top-slogan-desk {
  color: var(--cream-200);
  font-weight: 500;
  margin-left: 8px;
  white-space: nowrap;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
  flex-shrink: 0;
}

.top-contact-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--gold-300);
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.2s ease, transform 0.2s ease;
}

.top-contact-item:hover {
  color: #FFF;
  transform: translateY(-1px);
}

.top-dot-sep {
  color: rgba(212, 175, 55, 0.4);
  margin-right: 4px;
}

/* 2. MAIN STICKY LUXURY NAVBAR */
.site-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 1000;
  background: linear-gradient(180deg, rgba(28, 3, 7, 0.98) 0%, rgba(18, 2, 5, 0.96) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 2px solid rgba(212, 175, 55, 0.45);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.08) inset;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.header-container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 14px;
  box-sizing: border-box;
}

.site-header.scrolled {
  background: rgba(14, 1, 3, 0.98);
  border-bottom-color: rgba(212, 175, 55, 0.65);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.3);
}

.site-header.scrolled .navbar {
  height: 70px;
}

.site-header.scrolled .crest-logo-img {
  width: 44px;
  height: 44px;
}

.site-header.scrolled .crest-frame {
  width: 46px;
  height: 46px;
}

.site-header.scrolled .crest-title-gold {
  font-size: 1.35rem;
}

.site-header.scrolled .crest-title-white {
  font-size: 1.05rem;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 82px;
  gap: 8px;
  box-sizing: border-box;
  transition: height 0.35s ease;
}

/* Brand Crest Layout */
.brand-crest {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}

.crest-frame {
  position: relative;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.crest-logo-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--gold-500);
  box-shadow: 0 0 18px rgba(212, 175, 55, 0.55), 0 4px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 2;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
}

.crest-shimmer {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0%, rgba(212, 175, 55, 0.8) 25%, transparent 50%);
  animation: crestSpin 4s linear infinite;
  z-index: 1;
  opacity: 0.65;
  transition: opacity 0.3s ease;
}

@keyframes crestSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.brand-crest:hover .crest-logo-img {
  transform: scale(1.08) rotate(4deg);
  box-shadow: 0 0 28px rgba(212, 175, 55, 0.9);
}

.crest-text-block {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  gap: 2px;
}

.crest-title-wrap {
  display: flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
}

.crest-title-gold {
  font-family: 'Playfair Display', serif;
  font-size: 1.55rem;
  font-weight: 900;
  letter-spacing: 1.5px;
  background: linear-gradient(135deg, #FFFFFF 0%, #FFF4CC 30%, #F5D77F 60%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(212, 175, 55, 0.35));
  text-transform: uppercase;
  white-space: nowrap;
  transition: font-size 0.35s ease;
}

.crest-title-white {
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #FFFFFF;
  text-transform: uppercase;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  white-space: nowrap;
  transition: font-size 0.35s ease;
}

.crest-subtitle-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--gold-300);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.crest-star {
  color: var(--gold-400);
  font-size: 0.7rem;
  flex-shrink: 0;
}

.crest-tamil-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Right Nav Actions (Desktop + Mobile) */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  margin-left: auto;
  box-sizing: border-box;
}

.nav-btn-icon {
  flex-shrink: 0;
}

.btn-vip-ig {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: #FFF;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 0.86rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(225, 48, 108, 0.38);
  transition: var(--transition);
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-vip-ig:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 25px rgba(225, 48, 108, 0.6);
  color: #FFF;
}

.btn-vip-wa {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: linear-gradient(135deg, #25D366 0%, #1DA851 100%);
  color: #FFF;
  padding: 9px 20px;
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 800;
  box-shadow: 0 4px 18px rgba(37, 211, 102, 0.4), 0 0 0 1.5px rgba(212, 175, 55, 0.4);
  transition: var(--transition);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.wa-dot-live {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #FFF;
  box-shadow: 0 0 8px #FFF;
  animation: dotBlink 1.4s infinite ease-in-out;
}

.btn-vip-wa:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 26px rgba(37, 211, 102, 0.6), 0 0 0 2px var(--gold-500);
}

/* Mobile Quick WhatsApp Button */
.btn-mobile-wa {
  display: none;
}

/* Animated Hamburger Button */
.menu-toggle {
  display: none;
  background: rgba(212, 175, 55, 0.14);
  border: 1.5px solid var(--gold-500);
  border-radius: 10px;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  transition: var(--transition);
}

.menu-toggle:hover {
  background: rgba(212, 175, 55, 0.28);
  border-color: var(--gold-400);
}

.hamburger-box {
  width: 22px;
  height: 16px;
  display: inline-block;
  position: relative;
}

.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 22px;
  height: 2.2px;
  background-color: var(--gold-400);
  border-radius: 4px;
  position: absolute;
  transition: transform 0.25s ease, background-color 0.25s ease;
}

.hamburger-inner {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-inner::before {
  content: '';
  top: -6px;
}

.hamburger-inner::after {
  content: '';
  bottom: -6px;
}

.menu-toggle.open .hamburger-inner {
  background-color: transparent;
}

.menu-toggle.open .hamburger-inner::before {
  transform: translateY(6px) rotate(45deg);
  background-color: #FFF;
}

.menu-toggle.open .hamburger-inner::after {
  transform: translateY(-6px) rotate(-45deg);
  background-color: #FFF;
}

/* 3. DESKTOP NAVIGATION MENU */
.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 3px;
  background: rgba(0, 0, 0, 0.32);
  padding: 4px 6px;
  border-radius: 35px;
  border: 1.5px solid rgba(212, 175, 55, 0.25);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3) inset;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  padding: 7px 13px;
  border-radius: 20px;
  color: #ECE0DB;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.nav-link:hover {
  color: #FFF;
  background: rgba(212, 175, 55, 0.18);
  transform: translateY(-1px);
}

.nav-link.active {
  color: #FFECA8;
  background: linear-gradient(135deg, #640F1E 0%, #3D0711 100%);
  border: 1px solid rgba(212, 175, 55, 0.6);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba(212, 175, 55, 0.35);
}

.nav-link-icon,
.nav-link-arrow {
  display: none;
}

.drawer-header,
.drawer-footer-actions {
  display: none;
}

.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}

.drawer-backdrop.active {
  opacity: 1;
  pointer-events: auto;
}

/* ========================================================
   MOBILE & TABLET RESPONSIVE OVERRIDES (<= 1024px)
   ======================================================== */
@media (max-width: 1024px) {
  /* Hide desktop buttons */
  .btn-vip-ig,
  .btn-vip-wa {
    display: none !important;
  }

  /* Show mobile WA quick button */
  .btn-mobile-wa {
    display: inline-flex !important;
    align-items: center;
    gap: 5px;
    background: var(--whatsapp);
    color: #FFF;
    padding: 7px 12px;
    border-radius: var(--radius-full);
    font-size: 0.8rem;
    font-weight: 800;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.45);
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .btn-mobile-wa:hover {
    background: var(--whatsapp-hover);
  }

  /* Show hamburger button */
  .menu-toggle {
    display: flex !important;
  }

  /* Transform #navMenu into Luxury Slide-in Drawer */
  .nav-menu {
    position: fixed !important;
    top: 0 !important;
    right: 0 !important;
    left: auto !important;
    width: 86% !important;
    max-width: 340px !important;
    height: 100vh !important;
    height: 100dvh !important;
    background: linear-gradient(180deg, #180206 0%, #100103 100%) !important;
    border-left: 2px solid var(--gold-500) !important;
    border-top: none !important;
    border-radius: 0 !important;
    box-shadow: -15px 0 45px rgba(0, 0, 0, 0.9) !important;
    z-index: 2005 !important;
    transform: translateX(110%) !important;
    opacity: 0 !important;
    pointer-events: none !important;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease !important;
    display: flex !important;
    flex-direction: column !important;
    padding: 22px 18px 28px !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    gap: 6px !important;
    box-sizing: border-box !important;
  }

  .nav-menu.open {
    transform: translateX(0) !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  /* Drawer Top Bar */
  .drawer-header {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 14px;
    margin-bottom: 12px;
    border-bottom: 1.5px solid rgba(212, 175, 55, 0.3);
    width: 100%;
    box-sizing: border-box;
    list-style: none;
  }

  .drawer-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .drawer-logo-img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid var(--gold-500);
    object-fit: cover;
    box-shadow: 0 0 12px rgba(212, 175, 55, 0.5);
  }

  .drawer-title-group {
    display: flex;
    flex-direction: column;
  }

  .drawer-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.12rem;
    font-weight: 900;
    color: #FFF;
    letter-spacing: 1px;
    background: var(--gold-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .drawer-brand-sub {
    font-size: 0.72rem;
    color: var(--gold-300);
    font-weight: 500;
  }

  .drawer-close {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1.5px solid var(--gold-500);
    color: var(--gold-300);
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .drawer-close:hover {
    background: var(--gold-500);
    color: var(--maroon-900);
    transform: rotate(90deg);
  }

  /* Drawer Navigation Links with Touch Emojis & Arrows */
  .nav-menu li {
    list-style: none;
    width: 100%;
    box-sizing: border-box;
  }

  .nav-menu .nav-link {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 100% !important;
    padding: 12px 16px !important;
    font-size: 1.02rem !important;
    font-weight: 600 !important;
    color: #F0E6E2 !important;
    border-radius: 12px !important;
    background: rgba(255, 255, 255, 0.04) !important;
    border: 1px solid rgba(212, 175, 55, 0.16) !important;
    transition: all 0.2s ease !important;
    box-sizing: border-box !important;
    white-space: normal !important;
  }

  .nav-link-icon {
    display: inline-block !important;
    font-size: 1.15rem;
    margin-right: 10px;
    flex-shrink: 0;
  }

  .nav-link-text {
    flex: 1;
    text-align: left;
  }

  .nav-link-arrow {
    display: inline-block !important;
    color: var(--gold-400);
    font-size: 1.25rem;
    line-height: 1;
    font-weight: 700;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .nav-menu .nav-link:hover,
  .nav-menu .nav-link.active {
    background: rgba(212, 175, 55, 0.18) !important;
    border-color: rgba(212, 175, 55, 0.5) !important;
    color: #FFECA8 !important;
    transform: translateX(4px);
  }

  .nav-menu .nav-link:hover .nav-link-arrow,
  .nav-menu .nav-link.active .nav-link-arrow {
    transform: translateX(3px);
    color: #FFF;
  }

  /* Drawer Footer CTAs */
  .drawer-footer-actions {
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    margin-top: auto !important;
    padding-top: 16px !important;
    border-top: 1.5px solid rgba(212, 175, 55, 0.25) !important;
    width: 100% !important;
    box-sizing: border-box;
    list-style: none;
  }

  .drawer-cta-btn {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    padding: 12px 18px !important;
    border-radius: 10px !important;
    font-size: 0.92rem !important;
    font-weight: 700 !important;
    text-decoration: none !important;
    transition: transform 0.2s, box-shadow 0.2s !important;
    box-sizing: border-box !important;
  }

  .drawer-call-btn {
    background: rgba(212, 175, 55, 0.12) !important;
    border: 1.5px solid var(--gold-500) !important;
    color: var(--gold-300) !important;
  }

  .drawer-ig-btn {
    background: linear-gradient(45deg, #f09433, #dc2743, #bc1888) !important;
    color: #FFF !important;
    box-shadow: 0 4px 15px rgba(225, 48, 108, 0.35) !important;
  }

  .drawer-wa-btn {
    background: var(--whatsapp) !important;
    color: #FFF !important;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35) !important;
  }
}

/* Mobile Screens (<= 768px) */
@media (max-width: 768px) {
  .top-slogan-desk,
  .top-ig-desk {
    display: none !important;
  }

  .top-bar-container {
    height: 32px;
  }

  .navbar {
    height: 72px;
    padding: 0;
  }

  .brand-crest {
    gap: 10px;
  }

  .crest-frame {
    width: 44px;
    height: 44px;
  }

  .crest-logo-img {
    width: 42px;
    height: 42px;
  }

  .crest-title-gold {
    font-size: 1.25rem;
  }

  .crest-title-white {
    font-size: 0.95rem;
  }

  .crest-subtitle-bar {
    font-size: 0.68rem;
  }

  .btn-mobile-wa {
    padding: 6px 11px;
    font-size: 0.78rem;
  }

  .menu-toggle {
    width: 38px;
    height: 38px;
  }
}

/* Small Phones (<= 400px) */
@media (max-width: 400px) {
  .crest-frame {
    width: 40px;
    height: 40px;
  }

  .crest-logo-img {
    width: 38px;
    height: 38px;
  }

  .crest-title-gold {
    font-size: 1.12rem;
    letter-spacing: 0.8px;
  }

  .crest-title-white {
    font-size: 0.85rem;
    letter-spacing: 1px;
  }

  .crest-subtitle-bar {
    font-size: 0.64rem;
  }

  .btn-mobile-wa span {
    display: none;
  }

  .btn-mobile-wa {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 0;
    justify-content: center;
  }

  .menu-toggle {
    width: 36px;
    height: 36px;
  }
}
"""

if pos_start != -1 and pos_end != -1:
    css = css[:pos_start] + new_header_and_drawer_css + css[pos_end:]
    with open("assets/css/style.css", "w", encoding="utf-8") as f:
        f.write(css)
    print("SUCCESS: assets/css/style.css updated with clean bulletproof mobile header & luxury drawer!")
else:
    print("SEARCH FAILED:", pos_start, pos_end)
