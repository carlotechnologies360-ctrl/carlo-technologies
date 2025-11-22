<<<<<<< HEAD
const ctaButton = document.getElementById("cta-button");
const aboutSection = document.getElementById("about");
const yearSpan = document.getElementById("year");
const contactForm = document.getElementById("contact-form");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const smoothScroll = (target) => {
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

if (ctaButton && aboutSection) {
  ctaButton.addEventListener("click", () => smoothScroll(aboutSection));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    const section = document.querySelector(href);

    if (section) {
      event.preventDefault();
      smoothScroll(section);
    }
  });
});

// const setFormStatus = (message, type = "") => {
//   const statusEl = document.getElementById("form-status");
//   if (!statusEl) return;
//   statusEl.textContent = message;
//   statusEl.className = `form-status ${type}`.trim();
// };

// if (contactForm) {
//   const submitButton = contactForm.querySelector('button[type="submit"]');

//   contactForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const formData = new FormData(contactForm);

//     const payload = {
//       name: formData.get("name")?.trim(),
//       company: formData.get("company")?.trim(),
//       email: formData.get("email")?.trim(),
//       phone: formData.get("phone")?.trim(),
//       message: formData.get("message")?.trim(),
//     };

//     if (Object.values(payload).some((value) => !value)) {
//       setFormStatus("Please fill out all form fields before submitting.", "error");
//       return;
//     }

//     const endpoint = contactForm.dataset.endpoint || "/api/contact";
//     setFormStatus("Sending your message...", "pending");
//     submitButton?.setAttribute("disabled", "disabled");

//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const { error } = await response.json().catch(() => ({}));
//         throw new Error(error || "We couldn't send your message. Please try again.");
//       }

//       setFormStatus("Message sent! We’ll be in touch shortly.", "success");
//       contactForm.reset();
//     } catch (error) {
//       console.error("Contact form error:", error);
//       setFormStatus(error.message || "An unexpected error occurred.", "error");
//     } finally {
//       submitButton?.removeAttribute("disabled");
//     }
//   });
// }

const form = document.getElementById('contact-form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check honeypot field (should be empty)
    const botcheck = form.querySelector('input[name="botcheck"]');
    if (botcheck && botcheck.checked) {
        return; // Bot detected, silently fail
    }

    const formData = new FormData(form);
    
    // Add additional fields for better delivery
    formData.append("from_name", formData.get("name"));
    formData.append("reply_to", formData.get("email"));

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent. We'll get back to you soon!");
            form.reset();
        } else {
            console.error("Form submission error:", data);
            alert("Error: " + (data.message || "Failed to send message. Please try again."));
        }

    } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please check your connection and try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
=======
const ctaButton = document.getElementById("cta-button");
const aboutSection = document.getElementById("about");
const yearSpan = document.getElementById("year");
const contactForm = document.getElementById("contact-form");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const smoothScroll = (target) => {
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

if (ctaButton && aboutSection) {
  ctaButton.addEventListener("click", () => smoothScroll(aboutSection));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    const section = document.querySelector(href);

    if (section) {
      event.preventDefault();
      smoothScroll(section);
    }
  });
});

const setFormStatus = (message, type = "") => {
  const statusEl = document.getElementById("form-status");
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = `form-status ${type}`.trim();
};

if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);

    const payload = {
      name: formData.get("name")?.trim(),
      company: formData.get("company")?.trim(),
      email: formData.get("email")?.trim(),
      phone: formData.get("phone")?.trim(),
      message: formData.get("message")?.trim(),
    };

    if (Object.values(payload).some((value) => !value)) {
      setFormStatus("Please fill out all form fields before submitting.", "error");
      return;
    }

    const endpoint = contactForm.dataset.endpoint || "/api/contact";
    setFormStatus("Sending your message...", "pending");
    submitButton?.setAttribute("disabled", "disabled");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const { error } = await response.json().catch(() => ({}));
        throw new Error(error || "We couldn't send your message. Please try again.");
      }

      setFormStatus("Message sent! We’ll be in touch shortly.", "success");
      contactForm.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      setFormStatus(error.message || "An unexpected error occurred.", "error");
    } finally {
      submitButton?.removeAttribute("disabled");
    }
  });
}

>>>>>>> acd63f24a62efe40b07e3ef248a7499a4bf638ad
