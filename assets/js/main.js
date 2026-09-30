/**
 * ANBU CATERING SERVICE - Main Application Scripts
 * Mobile navigation, Gallery filters, Lightbox Modal,
 * Interactive WhatsApp Quote Engine, and Scroll Reveal Animations.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Drawer & Hamburger Toggle
  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const drawerClose = document.getElementById("drawerClose");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const navLinks = document.querySelectorAll(".nav-link");

  function openMobileDrawer() {
    if (navMenu) navMenu.classList.add("open");
    if (drawerBackdrop) drawerBackdrop.classList.add("active");
    if (menuToggle) menuToggle.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileDrawer() {
    if (navMenu) navMenu.classList.remove("open");
    if (drawerBackdrop) drawerBackdrop.classList.remove("active");
    if (menuToggle) menuToggle.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (navMenu && navMenu.classList.contains("open")) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMobileDrawer();
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", closeMobileDrawer);
  }

  // Universal Smooth Scroll Handler for all Anchor Links (#)
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  allAnchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        closeMobileDrawer();

        setTimeout(() => {
          const headerHeight = siteHeader ? siteHeader.offsetHeight : 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 10);

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }, 50);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileDrawer();
  });

  // Header Scroll State & Shrink Transition
  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 45) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ScrollSpy: Active Section Navigation Highlight
  const sections = document.querySelectorAll("section[id]");
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  // 2. Scroll Reveal Animations & Instant Fallback (Guarantees No Blank Screen)
  const reveals = document.querySelectorAll(".reveal");
  
  function activateAllReveals() {
    reveals.forEach((el) => el.classList.add("active"));
  }

  // Immediately activate all reveals so page is 100% visible on load
  activateAllReveals();

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.02,
      rootMargin: "100px 0px 100px 0px"
    });

    reveals.forEach((el) => revealObserver.observe(el));
  }

  // 3. Gallery Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filterVal === "all" || category === filterVal || (category && category.includes(filterVal))) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 20);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.92)";
          setTimeout(() => {
            item.style.display = "none";
          }, 250);
        }
      });
    });
  });

  // 4. Lightbox Modal
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxWaBtn = document.getElementById("lightboxWaBtn");

  const allLightboxTriggers = document.querySelectorAll(".gallery-item, .lightbox-trigger");

  allLightboxTriggers.forEach((item) => {
    item.addEventListener("click", (e) => {
      // Prevent trigger if clicking directly on a contact pill link inside
      if (e.target.closest("a")) return;

      const img = item.querySelector("img");
      const title = item.getAttribute("data-title") || "Anbu Catering Service";
      const desc = item.getAttribute("data-desc") || "நேர்த்தியான உணவு உபசரிப்பு காட்சி";
      const src = img ? img.src : "";

      if (lightboxImg) lightboxImg.src = src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxDesc) lightboxDesc.textContent = desc;

      if (lightboxWaBtn) {
        const text = encodeURIComponent(`வணக்கம் Anbu Catering! உங்கள் "${title}" விபரங்களை அறிய விரும்புகிறேன்.`);
        lightboxWaBtn.href = `https://wa.me/917695811153?text=${text}`;
      }

      if (lightboxModal) {
        lightboxModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // 5. Interactive WhatsApp Booking Generator
  const sendBookingBtn = document.getElementById("sendBookingBtn");
  if (sendBookingBtn) {
    sendBookingBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const eventType = document.getElementById("bookEventType")?.value || "திருமணம் / விழா";
      const guestCount = document.getElementById("bookGuests")?.value || "200";
      const servingStyle = document.getElementById("bookServingStyle")?.value || "வாழை இலை Traditional Serving";
      const eventDate = document.getElementById("bookDate")?.value || "விரைவில்";
      const location = document.getElementById("bookLocation")?.value || "துவரங்குறிச்சி / மணப்பாறை";

      const message = `வணக்கம் Anbu Catering Service! ❤️\n\nநாங்கள் எங்கள் விழாவிற்கு Catering & Food Serving புக் செய்ய விரும்புகிறோம்:\n\n` +
        `🎉 விசேஷம்: ${eventType}\n` +
        `👥 விருந்தினர்கள்: ${guestCount} நபர்கள்\n` +
        `🍽️ பரிமாறும் முறை: ${servingStyle}\n` +
        `📅 தேதி: ${eventDate}\n` +
        `📍 இடம்: ${location}\n\n` +
        `தயவுசெய்து விபரங்கள் மற்றும் முன்பதிவை உறுதிசெய்யவும். நன்றி!`;

      const waUrl = `https://wa.me/917695811153?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
    });
  }

  // ========================================================
  // 6. INTERACTIVE PARALLAX ENGINE (SCROLL + MOUSE DEPTH)
  // ========================================================
  const heroBg = document.getElementById("heroParallaxBg");
  const floatElements = document.querySelectorAll(".parallax-float");
  const heroSection = document.getElementById("home");

  let latestScrollY = 0;
  let ticking = false;

  function updateParallaxScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Background subtle scroll parallax
    if (heroBg) {
      heroBg.style.transform = `translate3d(0, ${(scrollY * 0.35).toFixed(1)}px, 0)`;
    }

    // Floating badges & emojis parallax
    floatElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-speed")) || 0.15;
      el.style.transform = `translate3d(0, ${(scrollY * speed).toFixed(1)}px, 0)`;
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    latestScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateParallaxScroll);
      ticking = true;
    }
  }, { passive: true });

  // Mouse move depth parallax on Hero section
  if (heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      floatElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed")) || 0.2;
        const moveX = x * speed * 60;
        const moveY = y * speed * 60;
        el.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0)`;
      });
    });

    heroSection.addEventListener("mouseleave", () => {
      floatElements.forEach((el) => {
        el.style.transform = `translate3d(0, 0, 0)`;
      });
    });
  }

  // ========================================================
  // 7. 3D CARD TILT ON MOUSE HOVER
  // ========================================================
  const cards3D = document.querySelectorAll(".hover-3d");

  cards3D.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = -((y - centerY) / centerY) * 7;
      const rotY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  // ========================================================
  // 8. STATS COUNTER ANIMATION
  // ========================================================
  const statNumbers = document.querySelectorAll(".counter-val");
  let counted = false;

  function runStatsCounter() {
    statNumbers.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const isPercent = counter.textContent.includes("%");
      const isPlus = counter.textContent.includes("+");
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 45));

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        counter.textContent = count + (isPercent ? "%" : (isPlus ? "+" : ""));
      }, 35);
    });
  }

  const whySection = document.getElementById("why-us");
  if (whySection && "IntersectionObserver" in window) {
    const statObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        runStatsCounter();
      }
    }, { threshold: 0.3 });

    statObserver.observe(whySection);
  }

  // ========================================================
  // 9. BILINGUAL LANGUAGE SWITCHER SYSTEM (TAMIL & ENGLISH)
  // ========================================================
  const i18nDict = {
    ta: {
      "top-loc": "📍 துவரங்குறிச்சி & மணப்பாறை",
      "top-slogan": "• அன்புடன் சமைத்து அக்கறையுடன் பரிமாறுகிறோம் ❤️",
      "crest-sub": "அன்புடன் பரிமாறுகிறோம்",
      "nav-home": "முகப்பு",
      "nav-services": "சேவைகள்",
      "nav-experience": "பரிமாறுதல் சிறப்பு",
      "nav-styles": "பாணிகள்",
      "nav-gallery": "கேலரி",
      "nav-why": "ஏன் அன்பு?",
      "nav-location": "இருப்பிடம்",
      "nav-booking": "முன்பதிவு",
      "btn-call": "நேரடி அழைப்பு: 7695811153",

      "hero-region": "துவரங்குறிச்சி & மணப்பாறை மண்டலம்",
      "hero-tagline": "அன்புடன் சமைத்து அக்கறையுடன் பரிமாறுகிறோம்...",
      "hero-tag-wedding": "💍 திருமணம்",
      "hero-tag-birthday": "🎂 பிறந்தநாள்",
      "hero-tag-ear": "👂 காதுகுத்து",
      "hero-tag-food": "🌿 சுவையான உணவு",
      "hero-desc": "உங்கள் சுபநிகழ்ச்சிகளுக்கு சுவையான உணவும், நேர்த்தியான Catering Service-உம். விருந்தினர்களை இன்முகத்துடன் வரவேற்று உபசரிக்கும் நம்பகமான Anbu Catering Service குழு.",
      "btn-wa-book": "🟢 WhatsApp Booking",
      "card-badge": "அதிகாரப்பூர்வ Visiting Card",
      "card-zoom": "பெரிதாக்கிப் பார்க்க கிளிக் செய்யவும்",

      "strip-trad": "Traditional & Buffet",
      "strip-trad-sub": "வாழை இலை & பஃபே முறை",
      "strip-staff": "Professional Staff",
      "strip-staff-sub": "பயிற்சி பெற்ற உபசரிப்பு குழு",
      "strip-clean": "Clean & Hygienic",
      "strip-clean-sub": "சுத்தமான நேர்த்தியான பரிமாறுதல்",

      "sec-serv-sub": "எங்கள் சிறப்பு சேவைகள்",
      "sec-serv-title": "🎉 எங்கள் Catering Services",
      "sec-serv-lead": "எல்லா வகையான சுபநிகழ்ச்சிகளுக்கும் உங்கள் விருந்தினர்கள் மெச்சும் வண்ணம் சிறப்பான உணவு உபசரிப்பு.",
      "serv-wed-title": "திருமண Catering",
      "serv-wed-desc": "திருமண விழாக்களுக்கு நிறைவான Catering & Serving Service. விருந்தினர்கள் ரசிக்கும் பாரம்பரிய உபசரிப்பு.",
      "serv-bday-title": "பிறந்தநாள் விழா",
      "serv-bday-desc": "Birthday & Small Functions-களுக்கு ஏற்ற சுவையான உணவு வகைகள் மற்றும் துடிப்பான பஃபே பரிமாறுதல்.",
      "serv-fam-title": "Family Functions",
      "serv-fam-desc": "காதுகுத்து, சீமந்தம், புதுமனை புகுவிழா போன்ற அனைத்து குடும்ப விழாக்களுக்கும் முறையான பரிமாறுதல்.",
      "serv-evt-title": "Event Catering",
      "serv-evt-desc": "அனைத்து வகையான பொது மற்றும் பெருவிழாக்களுக்கு பெரிய அளவில் நேர்த்தியான Catering Service.",

      "sec-exp-sub": "முக்கிய சிறப்பு",
      "sec-exp-title": "🍛 உங்கள் விருந்தினர்களுக்கு சிறப்பான உணவு பரிமாறுதல்",
      "sec-exp-lead": "சுவையான உணவை மட்டும் தருவதோடு நில்லாமல், விருந்தினர்களின் மனமும் வயிறும் குளிரும் வகையில் கண்ணியமான மற்றும் நேர்த்தியான Food Serving அனுபவத்தை உறுதிசெய்கிறோம்.",
      "exp-item1-title": "அழகான Food Presentation",
      "exp-item1-desc": "உணவு கவுண்ட்டர்கள் மற்றும் பரிமாறும் பாத்திரங்கள் கவர்ச்சிகரமான அலங்காரத்துடன் ஏற்பாடு.",
      "exp-item2-title": "முறையான Table Serving",
      "exp-item2-desc": "விருந்தினர்கள் அமர்ந்திருக்கும் இடத்திற்கே சென்று வரிசையாக இன்முகத்துடன் பரிமாறுதல்.",
      "exp-item3-title": "சுத்தமான பரிமாறுதல்",
      "exp-item3-desc": "கையுறைகள், சுத்தமான உடைகள் மற்றும் அதீத சுகாதாரத்துடன் கூடிய தரமான சேவை.",
      "exp-item4-title": "Event-க்கு ஏற்ற Service",
      "exp-item4-desc": "விசேஷத்தின் தன்மை, விருந்தினர் எண்ணிக்கைக்கு ஏற்ப திட்டமிட்டு தடங்கலின்றி வழங்குதல்.",
      "exp-item5-title": "Professional Catering Team",
      "exp-item5-desc": "விருந்தினர்களை அன்புடன் கவனிக்கும் பொறுப்பான மற்றும் அனுபவம் வாய்ந்த சர்விங் பணியாளர்கள்.",

      "sec-styles-sub": "பரிமாறும் பாணிகள்",
      "sec-styles-title": "🍽️ Catering Serving Styles",
      "sec-styles-lead": "உங்கள் விருப்பத்திற்கும் விசேஷத்தின் சூழலுக்கும் உகந்த பல்வேறு வகையான உணவு பரிமாறும் முறைகள்.",
      "style-trad-title": "🍛 Traditional Serving",
      "style-trad-desc": "வாழை இலையில் பாரம்பரிய முறைப்படி சாம்பார், ரசம், பாயாசம், நெய் மணக்க மணக்க வரிசையாக பரிமாறுதல்.",
      "style-buffet-title": "🥘 Buffet Service",
      "style-buffet-desc": "நிகழ்ச்சிகளுக்கான கவர்ச்சிகரமான Buffet Arrangement. சூடான உணவுகள் மற்றும் உடனடி Refill வசதி.",
      "style-evt-title": "🍽️ Event Serving",
      "style-evt-desc": "பெரிய வரவேற்பு மண்டபங்களில் விருந்தினர்களுக்கு முறையான மற்றும் துரிதமான Food Service மேலாண்மை.",
      "style-guest-title": "👥 Guest Service",
      "style-guest-desc": "வந்திருக்கும் ஒவ்வொரு விருந்தினரையும் இன்முகத்தோடு கவனித்து, கேட்டவற்றை உடனுக்குடன் வழங்குதல்.",

      "sec-gal-sub": "நிகழ்ச்சி தொகுப்பு",
      "sec-gal-title": "📸 Our Events Gallery",
      "sec-gal-lead": "நாங்கள் பெருமையுடன் பரிமாறிய சுபநிகழ்ச்சிகள் மற்றும் விருந்து உபசரிப்புகளின் புகைப்படங்கள்.",

      "sec-why-sub": "நம்பகத்தன்மை",
      "sec-why-title": "❤️ Why Choose Anbu?",
      "sec-why-lead": "உங்கள் விழா மிகச்சிறப்பாக அமைய நாங்கள் வழங்கும் 5 உறுதிமொழிகள்.",
      "why-card1-title": "சுவையான உணவு",
      "why-card1-desc": "விருந்தினர்களின் நாவில் என்றும் நிலைத்து நிற்கும் சுவையும் தரமும் நிறைந்த உணவுகள்.",
      "why-card2-title": "நேர்த்தியான பரிமாறுதல்",
      "why-card2-desc": "கண்ணியமாகவும், அழகாகவும், ஒழுங்காகவும் உணவு பரிமாறும் முறையான பயிற்சி.",
      "why-card3-title": "சுத்தமான Service",
      "why-card3-desc": "பாத்திரங்கள், மேஜைகள் மற்றும் பணியாளர்களின் அதீத சுகாதாரம் மற்றும் தூய்மை.",
      "why-card4-title": "Professional Team",
      "why-card4-desc": "விருந்தினர்களை சொந்த பந்தம் போல் அன்புடன் கவனிக்கும் அர்ப்பணிப்புள்ள குழு.",
      "why-card5-title": "Event-friendly Service",
      "why-card5-desc": "குறித்த நேரத்தில் தொடங்குதல் மற்றும் விசேஷத்தின் போக்கிற்கு ஏற்ப நெகிழ்வான சேவை.",
      "stat-1-lbl": "நிறைவேற்றிய சுபநிகழ்ச்சிகள்",
      "stat-2-lbl": "வாடிக்கையாளர் திருப்தி",
      "stat-3-lbl": "அனுபவமிக்க சர்விங் பணியாளர்கள்",
      "stat-4-lbl": "நேரந்தவறா உணவு உபசரிப்பு",

      "sec-loc-sub": "📍 சேவை மையம்",
      "sec-loc-title": "எங்கள் நேரடி சேவை",
      "sec-loc-cities": "துவரங்குறிச்சி & மணப்பாறை",
      "sec-loc-desc": "துவரங்குறிச்சி, மணப்பாறை மற்றும் அதன் சுற்றுவட்டாரப் பகுதிகளில் நடைபெறும் அனைத்து சுப நிகழ்வுகளுக்கும் சிறப்பான உணவு உபசரிப்பு மற்றும் Catering சேவை வழங்குகிறோம்.",
      "btn-loc-wa": "உங்கள் ஊரில் சேவை அறிய",

      "sec-book-sub": "முன்பதிவு செய்ய",
      "sec-book-title": "உங்கள் அடுத்த விழாவிற்கு Anbu Catering Service-ஐ தேர்வு செய்யுங்கள் ❤️",
      "sec-book-lead": "கீழே உங்கள் நிகழ்ச்சி விபரங்களை தேர்வு செய்து, ஒரே கிளிக்கில் WhatsApp மூலம் உடனடி தகவல் மற்றும் முன்பதிவு செய்தி அனுப்புங்கள்!",
      "lbl-evt-type": "விழாவின் வகை (Event Type)",
      "lbl-guests": "விருந்தினர்கள் எண்ணிக்கை (Guest Count)",
      "lbl-style": "பரிமாறும் முறை (Serving Style)",
      "lbl-date": "விழா தேதி (Approx Date)",
      "lbl-loc": "விழா நடைபெறும் இடம் (Event Location)",
      "btn-book-wa": "Book on WhatsApp (7695811153)",

      "mascot-msg": "வணக்கம்! உங்கள் விசேஷத்துக்கு Catering புக் பண்ணலாமா? ❤️",
      "footer-tagline": "சுவையான உணவு • நேர்த்தியான பரிமாறுதல் • சிறப்பான விழா ❤️"
    },
    en: {
      "top-loc": "📍 Thuvarankurichi & Manapparai",
      "top-slogan": "• Serving Delicious Food with Warm Hospitality ❤️",
      "crest-sub": "Serving with Love & Care",
      "nav-home": "Home",
      "nav-services": "Services",
      "nav-experience": "Serving Experience",
      "nav-styles": "Serving Styles",
      "nav-gallery": "Gallery",
      "nav-why": "Why Anbu?",
      "nav-location": "Location",
      "nav-booking": "Booking",
      "btn-call": "Direct Call: 7695811153",

      "hero-region": "Thuvarankurichi & Manapparai Region",
      "hero-tagline": "Cooked with Love, Served with Care...",
      "hero-tag-wedding": "💍 Wedding",
      "hero-tag-birthday": "🎂 Birthday",
      "hero-tag-ear": "👂 Ear Piercing",
      "hero-tag-food": "🌿 Delicious Food",
      "hero-desc": "Delicious food and elegant Catering & Food Serving for all your special occasions. Trustworthy hospitality team welcoming your guests with warmth.",
      "btn-wa-book": "🟢 WhatsApp Booking",
      "card-badge": "Official Visiting Card",
      "card-zoom": "Click to View Full Size",

      "strip-trad": "Traditional & Buffet",
      "strip-trad-sub": "Banana Leaf & Buffet Styles",
      "strip-staff": "Professional Staff",
      "strip-staff-sub": "Trained Hospitality Crew",
      "strip-clean": "Clean & Hygienic",
      "strip-clean-sub": "Pristine & Elegant Service",

      "sec-serv-sub": "Our Special Services",
      "sec-serv-title": "🎉 Our Catering Services",
      "sec-serv-lead": "Exceptional food serving and hospitality tailored for all your grand celebrations.",
      "serv-wed-title": "Wedding Catering",
      "serv-wed-desc": "Complete Catering & Serving Service for weddings and receptions with traditional hospitality.",
      "serv-bday-title": "Birthday Parties",
      "serv-bday-desc": "Delicious food arrangements and vibrant buffet setup for birthday and small family functions.",
      "serv-fam-title": "Family Functions",
      "serv-fam-desc": "Dedicated food serving for ear piercing, housewarming, baby shower and family ceremonies.",
      "serv-evt-title": "Event Catering",
      "serv-evt-desc": "Grand scale catering and professional food service management for public & corporate events.",

      "sec-exp-sub": "Key Highlights",
      "sec-exp-title": "🍛 Premium Food Serving Experience for Your Guests",
      "sec-exp-lead": "Beyond delivering delicious food, we ensure a warm, respectful and elegant serving experience that delights all guests.",
      "exp-item1-title": "Beautiful Food Presentation",
      "exp-item1-desc": "Attractive decoration and setup for food counters and serving dishes.",
      "exp-item2-title": "Orderly Table Serving",
      "exp-item2-desc": "Courteous serving staff catering directly to guests at their dining tables.",
      "exp-item3-title": "Hygienic Standards",
      "exp-item3-desc": "Clean uniforms, gloves, and strict hygiene maintained throughout service.",
      "exp-item4-title": "Event-friendly Service",
      "exp-item4-desc": "Carefully planned setup according to guest strength and event timeline.",
      "exp-item5-title": "Professional Catering Team",
      "exp-item5-desc": "Responsible and experienced hospitality crew caring for guests like family.",

      "sec-styles-sub": "Serving Formats",
      "sec-styles-title": "🍽️ Catering Serving Styles",
      "sec-styles-lead": "Diverse food serving methods to suit your preference and venue environment.",
      "style-trad-title": "Traditional Serving",
      "style-trad-desc": "Traditional banana leaf feast serving sambar, rasam, payasam and ghee with warmth.",
      "style-buffet-title": "Buffet Service",
      "style-buffet-desc": "Attractive buffet counters with hot chafing dishes and instant food refills.",
      "style-evt-title": "Event Serving",
      "style-evt-desc": "Fast, organized food flow management for large wedding halls and public venues.",
      "style-guest-title": "Guest Service",
      "style-guest-desc": "Attentive guest care ensuring every guest receives prompt attention.",

      "sec-gal-sub": "Event Gallery",
      "sec-gal-title": "📸 Our Events Gallery",
      "sec-gal-lead": "Moments from grand celebrations and feasts we proudly served.",

      "sec-why-sub": "Why Trust Us",
      "sec-why-title": "❤️ Why Choose Anbu?",
      "sec-why-lead": "Our 5 promises to make your occasion grand and memorable.",
      "why-card1-title": "Delicious Food",
      "why-card1-desc": "Mouthwatering dishes prepared with pure quality ingredients.",
      "why-card2-title": "Elegant Serving",
      "why-card2-desc": "Well-trained crew presenting and serving food gracefully.",
      "why-card3-title": "Clean & Hygienic",
      "why-card3-desc": "Pristine cleanliness of utensils, counters, and serving personnel.",
      "why-card4-title": "Professional Team",
      "why-card4-desc": "Dedicated staff treating your guests with love and respect.",
      "why-card5-title": "Event-friendly Service",
      "why-card5-desc": "Punctual execution and flexible management to match your event flow.",
      "stat-1-lbl": "Grand Events Served",
      "stat-2-lbl": "Customer Satisfaction",
      "stat-3-lbl": "Experienced Staff",
      "stat-4-lbl": "Punctual Service",

      "sec-loc-sub": "📍 Service Hub",
      "sec-loc-title": "Our Direct Service Area",
      "sec-loc-cities": "Thuvarankurichi & Manapparai",
      "sec-loc-desc": "We offer premium Catering & Food Serving services for all celebrations in Thuvarankurichi, Manapparai, and surrounding areas.",
      "btn-loc-wa": "Check Service in Your Location",

      "sec-book-sub": "Book Your Event",
      "sec-book-title": "Choose Anbu Catering Service for Your Next Occasion ❤️",
      "sec-book-lead": "Select your event details below to send an instant WhatsApp booking request with 1 click!",
      "lbl-evt-type": "Event Type",
      "lbl-guests": "Guest Count",
      "lbl-style": "Serving Style",
      "lbl-date": "Event Date",
      "lbl-loc": "Event Location",
      "btn-book-wa": "Book on WhatsApp (7695811153)",

      "mascot-msg": "Welcome! Shall we book Catering for your special event? ❤️",
      "footer-tagline": "Delicious Food • Elegant Serving • Memorable Celebration ❤️"
    }
  };

  const savedLang = localStorage.getItem("anbu_lang") || "ta";
  if (savedLang !== "ta") {
    setLanguage(savedLang);
  }
});