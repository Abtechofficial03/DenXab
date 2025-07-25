// 📂 checkout.js
// 💡 Include this in your checkout.html
// <script type="module" src="js/checkout.js"></script>

const payBtn = document.getElementById('payBtn');

payBtn.addEventListener('click', async () => {
  try {
    const response = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 499,  // ₹4.99 (in rupees)
        currency: "INR"
      })
    });

    const data = await response.json();

    if (!data.success) {
      alert("❌ Payment server error");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // 💥 Use your Razorpay PUBLIC key here
      amount: data.order.amount,
      currency: data.order.currency,
      name: "DenXAB",
      description: "Website Template Purchase",
      order_id: data.order.id,
      handler: function (response) {
        alert("✅ Payment successful!");
        console.log(response);

        // TODO: Optional - send email/invoice here
        window.location.href = "success.html"; // Or your final link page
      },
      prefill: {
        name: "Client",
        email: "client@email.com"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("❌ Error:", error);
    alert("Payment error");
  }
});