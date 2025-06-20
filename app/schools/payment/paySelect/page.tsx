// "use client";
// import { useState } from "react";

// export function ManualPaymentForm() {
//   const [phone, setPhone] = useState("");
//   const [confirmationCode, setConfirmationCode] = useState("");

//   const handleSubmit = () => {
//     // Replace with API call
//     console.log("Phone:", phone);
//     console.log("Confirmation Code:", confirmationCode);
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-6 mt-6">
//       <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>
//       <p className="text-sm text-gray-600 mb-4">
//         To activate your plan, pay ₹999 to the admin via UPI/Bank. Contact admin
//         at <strong>+91-9876543210</strong> to receive payment instructions.
//         After payment, enter the confirmation code below.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <div>
//           <label
//             htmlFor="phone"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Your Phone Number
//           </label>
//           <input
//             id="phone"
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//             placeholder="Enter your number"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="confirmation"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Confirmation Code
//           </label>
//           <input
//             id="confirmation"
//             value={confirmationCode}
//             onChange={(e) => setConfirmationCode(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//             placeholder="Code from admin"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//       >
//         Submit and Activate Plan
//       </button>
//     </div>
//   );
// }

import React from "react";

const page = () => {
  return <div>he</div>;
};

export default page;
