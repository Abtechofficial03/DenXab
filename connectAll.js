(function () {
  console.log("✅ DenXAB | Master JS Loaded");

  const path = window.location.pathname;

  // 🔁 Handle Inquiry Form
  if (path.includes("inquiry.html")) {
    import('./Submit.js')
      .then(() => console.log("📨 Submit.js (inquiry) loaded"))
      .catch((e) => console.error("❌ Inquiry Submit.js load error", e));
  }

  // 💳 Handle Payment
  if (path.includes("checkout.html")) {
    import('./checkout.js')
      .then(() => console.log("💳 Checkout.js loaded"))
      .catch((e) => console.error("❌ Checkout.js load error", e));
  }

  // 📧 After Payment Email Send
  if (path.includes("sucess.html") || path.includes("success.html")) {
    import('./Afterpayment.js')
      .then(() => console.log("📤 Afterpayment.js loaded"))
      .catch((e) => console.error("❌ Afterpayment.js load error", e));
  }

  // 🛠 Auto Website Generator if required
  if (path.includes("RequestReceived.html")) {
    import('./genarateWebsite.js')
      .then(() => console.log("🧠 Website Generator loaded"))
      .catch((e) => console.error("❌ genarateWebsite.js load error", e));
  }

  // 🔗 Common Link sender
  if (path.includes("Thankyou.html")) {
    import('./linksender.js')
      .then(() => console.log("🔗 Link sender loaded"))
      .catch((e) => console.error("❌ linksender.js load error", e));
  }

})();