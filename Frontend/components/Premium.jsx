import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);
  
  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };
  const handleBuy = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { type },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }

    //It should open the razorpay dialoge box

    // Open Razorpay Checkout, this options should come from API call.
    const options = {
      key: "YOUR_KEY_ID", // Replace with your Razorpay key_id
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Dev Tinder",
      description: "Test Transaction",
      order_id: "order_IluGWxBm9U8zJ8", // This is the order_id created in the backend
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser(),
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (isUserPremium) {
    return <h1>You are already a premium member!</h1>;
  }
  return (
    <div className="flex w-full flex-col lg:flex-row mt-10">
      <div className="card bg-gray-900 rounded-box grid h-32 grow place-items-center text-white">
        <h1 className="font-bold">Standard 💫</h1>
        <button
          className="bg-yellow-300 px-2 rounded font-bold border-none"
          onClick={() => handleBuy("standard")}
        >
          Buy
        </button>
      </div>
      <div className="divider lg:divider-horizontal">OR</div>
      <div className="card bg-gray-900 rounded-box grid h-32 grow place-items-center text-white">
        <h1 className="font-bold">Premium ⭐</h1>
        <button
          className="bg-pink-300 px-2 rounded font-bold border-none"
          onClick={() => handleBuy("premium")}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Premium;
