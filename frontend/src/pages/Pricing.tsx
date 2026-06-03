import React from 'react'

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({title, price, features, buttonText, highlight = false}) => {
  return (<div
      className={`flex flex-col border rounded-2xl shadow-md p-6 w-full md:w-1/4 transition-transform duration-200 hover:scale-105 ${
        highlight ? "border-blue-600 shadow-lg bg-blue-50" : "border-gray-200"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-4xl font-bold mb-4">{price}</p>
      <ul className="flex-1 mb-6 space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-gray-600">
            ✅ <span className="ml-2">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 rounded-lg font-medium ${
          highlight
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {buttonText}
      </button>
    </div>
  )
}

const Pricing:React.FC = () => {
  const plans = [
    {
      title: "Unlimited",
      price: "$7",
      features: ["Basic features", "Access to dashboard", "Email support"],
      buttonText: "Upgrade",
    },
    {
      title: "Business",
      price: "$12",
      features: [
        "All Unlimited features",
        "Advanced analytics",
        "Priority support",
        "Team collaboration",
      ],
      buttonText: "Most Popular",
      highlight: true,
    },
    {
      title: "Business Plus",
      price: "$19",
      features: [
        "All Business features",
        "Custom integrations",
        "Dedicated account manager",
      ],
      buttonText: "Upgrade",
    },
    {
      title: "Enterprise",
      price: "Contact Sales",
      features: [
        "Custom solutions",
        "24/7 Premium support",
        "Scalable infrastructure",
      ],
      buttonText: "Contact Us",
    },
  ];
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Upgrade to unleash everything</h1>
        <p className="text-gray-600 mt-2">
          Choose the plan that fits your business
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {plans.map((plan, idx) => (
          <PricingCard key={idx} {...plan} />
        ))}
      </div>
    </div>
  )
}

export default Pricing