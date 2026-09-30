/**
 * ANBU CATERING SERVICE - Interactive Cartoon Mascot
 * Real-time mouse tracking, eye coordinate vector physics, head 3D tilt,
 * Tamil contextual dialogue engine, and interaction responses.
 */

document.addEventListener("DOMContentLoaded", () => {
  const mascotWrap = document.getElementById("mascotWrap");
  const headStage = document.getElementById("mascotHeadStage");
  const pupilLeft = document.getElementById("pupilLeft");
  const pupilRight = document.getElementById("pupilRight");
  const eyeLeft = document.getElementById("eyeLeft");
  const eyeRight = document.getElementById("eyeRight");
  const speechBubble = document.getElementById("mascotSpeech");
  const toggleBtn = document.getElementById("mascotToggle");
  const container = document.getElementById("mascotContainer");

  if (!mascotWrap || !pupilLeft || !pupilRight) return;

  let isMinimized = false;
  let speechTimeout = null;

  // Toggle Minimize / Expand
  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isMinimized = !isMinimized;
      if (isMinimized) {
        container.classList.add("minimized");
        toggleBtn.innerHTML = "▲";
        toggleBtn.title = "Show Mascot";
      } else {
        container.classList.remove("minimized");
        toggleBtn.innerHTML = "▼";
        toggleBtn.title = "Minimize";
      }
    });
  }

  // Dynamic Tamil Dialogue Engine
  const dialogueBank = {
    default: "வணக்கம்! உங்கள் விசேஷத்துக்கு Catering புக் பண்ணலாமா? ❤️",
    heroBtn: "வாங்க! WhatsApp-ல ஈஸியா புக் பண்ணலாம்! 📲",
    services: "திருமணம், பிறந்தநாள், குடும்ப விழாக்கள்... சிறப்பா செய்வோம்! 🎊",
    traditional: "வாழை இலை சாப்பாடு... நெய் மணக்க மணக்க பரிமாறுவோம்! 🍛",
    buffet: "நவீன பஃபே செட்அப்! சுடச்சுட நேர்த்தியா பரிமாறுதல்! ✨",
    eventServing: "ஒவ்வொரு விருந்தினரையும் கவனமா உபசரிப்போம்! 🍽️",
    gallery: "எங்க முந்தைய சுபநிகழ்ச்சிகளை இங்கே பாருங்க! 📸",
    whyUs: "சுவையான உணவு + சுத்தமான Service தான் எங்க அடையாளம்! 💯",
    booking: "துவரங்குறிச்சி & மணப்பாறை பகுதிகளில் சிறந்த சேவை! 📍",
    click: "அன்புடன் பரிமாறுகிறோம்! நன்றி! 🙏❤️"
  };

  function setMascotSpeech(text, isTemporary = false) {
    if (!speechBubble) return;
    if (speechTimeout) clearTimeout(speechTimeout);

    speechBubble.style.opacity = "0";
    speechBubble.style.transform = "scale(0.85)";

    setTimeout(() => {
      speechBubble.textContent = text;
      speechBubble.style.opacity = "1";
      speechBubble.style.transform = "scale(1)";
    }, 180);

    if (isTemporary) {
      speechTimeout = setTimeout(() => {
        setMascotSpeech(dialogueBank.default, false);
      }, 4500);
    }
  }

  // Mouse coordinate tracking
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentPupilLx = 0, currentPupilLy = 0;
  let currentPupilRx = 0, currentPupilRy = 0;
  let currentTiltX = 0, currentTiltY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Touch tracking for mobile
  window.addEventListener("touchmove", (e) => {
    if (e.touches && e.touches[0]) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  // Smooth animation frame loop
  function updateMascotTracking() {
    if (!isMinimized && eyeLeft && eyeRight) {
      // Calculate Eye Center Positions
      const rectL = eyeLeft.getBoundingClientRect();
      const centerLx = rectL.left + rectL.width / 2;
      const centerLy = rectL.top + rectL.height / 2;

      const rectR = eyeRight.getBoundingClientRect();
      const centerRx = rectR.left + rectR.width / 2;
      const centerRy = rectR.top + rectR.height / 2;

      // Left Eye Vector
      const dxL = mouseX - centerLx;
      const dyL = mouseY - centerLy;
      const angleL = Math.atan2(dyL, dxL);
      const distL = Math.hypot(dxL, dyL);
      const maxRadius = 6.5; // SVG coordinate units limit
      const targetPupilLx = Math.cos(angleL) * Math.min(distL * 0.04, maxRadius);
      const targetPupilLy = Math.sin(angleL) * Math.min(distL * 0.04, maxRadius);

      // Right Eye Vector
      const dxR = mouseX - centerRx;
      const dyR = mouseY - centerRy;
      const angleR = Math.atan2(dyR, dxR);
      const distR = Math.hypot(dxR, dyR);
      const targetPupilRx = Math.cos(angleR) * Math.min(distR * 0.04, maxRadius);
      const targetPupilRy = Math.sin(angleR) * Math.min(distR * 0.04, maxRadius);

      // Linear interpolation (lerp) for smooth fluid motion
      currentPupilLx += (targetPupilLx - currentPupilLx) * 0.22;
      currentPupilLy += (targetPupilLy - currentPupilLy) * 0.22;
      currentPupilRx += (targetPupilRx - currentPupilRx) * 0.22;
      currentPupilRy += (targetPupilRy - currentPupilRy) * 0.22;

      pupilLeft.setAttribute("cx", (42 + currentPupilLx).toFixed(2));
      pupilLeft.setAttribute("cy", (44 + currentPupilLy).toFixed(2));
      pupilRight.setAttribute("cx", (68 + currentPupilRx).toFixed(2));
      pupilRight.setAttribute("cy", (44 + currentPupilRy).toFixed(2));

      // Pupils highlight shine reflection tracking
      const shineL = document.getElementById("pupilShineLeft");
      const shineR = document.getElementById("pupilShineRight");
      if (shineL) {
        shineL.setAttribute("cx", (40 + currentPupilLx * 0.8).toFixed(2));
        shineL.setAttribute("cy", (42 + currentPupilLy * 0.8).toFixed(2));
      }
      if (shineR) {
        shineR.setAttribute("cx", (66 + currentPupilRx * 0.8).toFixed(2));
        shineR.setAttribute("cy", (42 + currentPupilRy * 0.8).toFixed(2));
      }

      // Head 3D subtle tilt towards mouse
      if (headStage) {
        const wrapRect = mascotWrap.getBoundingClientRect();
        const wrapCenterX = wrapRect.left + wrapRect.width / 2;
        const wrapCenterY = wrapRect.top + wrapRect.height / 2;
        
        const tiltXTarget = -Math.max(-14, Math.min(14, (mouseY - wrapCenterY) * 0.035));
        const tiltYTarget = Math.max(-18, Math.min(18, (mouseX - wrapCenterX) * 0.045));

        currentTiltX += (tiltXTarget - currentTiltX) * 0.15;
        currentTiltY += (tiltYTarget - currentTiltY) * 0.15;

        headStage.style.transform = `perspective(600px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
      }
    }

    requestAnimationFrame(updateMascotTracking);
  }

  requestAnimationFrame(updateMascotTracking);

  // Click Mascot Cheer Action & Heart Pop
  mascotWrap.addEventListener("click", () => {
    mascotWrap.classList.add("cheering", "excited");
    setMascotSpeech(dialogueBank.click, true);
    spawnCheerHeart(mascotWrap);

    setTimeout(() => {
      mascotWrap.classList.remove("cheering", "excited");
    }, 700);
  });

  function spawnCheerHeart(parent) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "absolute";
    heart.style.top = "10px";
    heart.style.left = "50%";
    heart.style.transform = "translateX(-50%)";
    heart.style.fontSize = "24px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "100";
    heart.style.transition = "all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)";
    parent.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = "translateX(-50%) translateY(-65px) scale(1.4)";
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 950);
  }

  // Interactive Context Triggers when user hovers key sections & elements
  const triggers = [
    { selector: ".btn-whatsapp, #heroBookBtn", message: dialogueBank.heroBtn },
    { selector: "#services", message: dialogueBank.services },
    { selector: "[data-serving='traditional']", message: dialogueBank.traditional },
    { selector: "[data-serving='buffet']", message: dialogueBank.buffet },
    { selector: "[data-serving='event']", message: dialogueBank.eventServing },
    { selector: "#gallery", message: dialogueBank.gallery },
    { selector: "#why-us", message: dialogueBank.whyUs },
    { selector: "#booking", message: dialogueBank.booking }
  ];

  triggers.forEach(({ selector, message }) => {
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        mascotWrap.classList.add("excited");
        setMascotSpeech(message, true);
      });
      el.addEventListener("mouseleave", () => {
        mascotWrap.classList.remove("excited");
      });
    });
  });
});
