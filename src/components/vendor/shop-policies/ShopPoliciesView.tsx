"use client";

import React, { useState, useRef } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import RichTextEditorToolbar from "@/components/admin/dashboard/add-product/RichTextEditorToolbar";

const defaultPolicyContent = `<p>Welcome to <strong>Trendshop</strong> store! As a vendor, establishing clear shop policies is essential to building trust with your customers and ensuring a smooth and transparent transaction process. This guide will help you create effective shop policies tailored to your unique business needs on the Modesy platform.</p>
<br/>
<p><strong>1. Shipping Policy</strong></p>
<p><strong>Processing Time:</strong> Clearly state the time it takes to prepare and ship orders. This might vary depending on the product type and availability. For example, "All orders are processed within 2-3 business days."</p>
<p><strong>Shipping Methods:</strong> Outline the available shipping options, including standard, express, and any international shipping services you offer. Include estimated delivery times and the carriers used (e.g., USPS, FedEx, DHL).</p>
<p><strong>Shipping Fees:</strong> Specify if you offer free shipping or if fees apply. If applicable, include details about flat-rate shipping, weight-based pricing, or any other shipping fee structure.</p>
<p><strong>International Shipping:</strong> If you ship internationally, mention any restrictions, additional fees, or customs duties that may apply.</p>
<br/>
<p><strong>2. Returns and Exchanges</strong></p>
<p><strong>Return Eligibility:</strong> Define the conditions under which items can be returned, such as within a specific time frame (e.g., "Items can be returned within 14 days of receipt"). Specify which products are non-returnable, like perishable goods, custom-made items, or digital downloads.</p>
<p><strong>Return Process:</strong> Explain the steps customers need to take to initiate a return or exchange. Include instructions for contacting customer support, returning the product, and any required documentation (e.g., receipt or proof of purchase).</p>
<p><strong>Refunds:</strong> State how and when refunds will be issued (e.g., "Refunds will be processed within 5 business days of receiving the returned item"). Indicate whether the original shipping fee will be refunded and how the customer will receive their refund (e.g., original payment method, store credit).</p>
<p><strong>Exchanges:</strong> If you offer exchanges, detail the process and any conditions. For example, "Exchanges are only available for items of equal or lesser value."</p>
<br/>
<p><strong>3. Payment Policy</strong></p>
<p><strong>Accepted Payment Methods:</strong> List all payment methods you accept, such as credit/debit cards, PayPal, bank transfers, or other payment gateways supported by Modesy.</p>
<p><strong>Payment Terms:</strong> Clarify when payment is due, especially for custom or made-to-order items. For example, "Full payment is required at the time of purchase."</p>
<p><strong>Payment Security:</strong> Reassure customers by highlighting the security measures you take to protect their payment information, such as encryption or secure payment gateways.</p>
<br/>
<p><strong>4. Cancellation Policy</strong></p>
<p><strong>Order Cancellations:</strong> Outline the conditions under which customers can cancel their orders. Include a time frame, such as "Orders can be canceled within 24 hours of purchase."</p>
<p><strong>Non-Cancellable Orders:</strong> Specify any circumstances in which orders cannot be canceled, such as custom or personalized items.</p>
<p><strong>Refunds for Cancellations:</strong> Explain if and how refunds will be processed for canceled orders, and whether any fees will be deducted.</p>
<br/>
<p><strong>5. Privacy Policy</strong></p>
<p><strong>Customer Information:</strong> Ensure customers that their personal information is handled with care. Mention what data is collected (e.g., name, address, payment details) and how it is used (e.g., order processing, marketing).</p>
<p><strong>Data Protection:</strong> Describe the measures you take to protect customer data, such as encryption, secure servers, and compliance with data protection regulations.</p>
<p><strong>Third-Party Sharing:</strong> Clearly state if and when customer data might be shared with third parties, such as for shipping or payment processing.</p>
<br/>
<p><strong>6. Customer Service</strong></p>
<p><strong>Contact Information:</strong> Provide clear instructions on how customers can contact you with questions or concerns. Include your preferred communication channels, such as email, phone, or a contact form on your Modesy store page.</p>
<p><strong>Response Time:</strong> Set expectations for when customers can expect a response. For example, "We aim to respond to all inquiries within 24 hours."</p>
<p><strong>Dispute Resolution:</strong> Explain your approach to resolving disputes, including how customers can escalate issues if they are not satisfied with the initial resolution.</p>
<br/>
<p><strong>7. Store Rules</strong></p>
<p><strong>Behavioral Expectations:</strong> Define any specific rules for customers interacting with your store, such as respectful communication or adherence to community guidelines.</p>
<p><strong>Prohibited Actions:</strong> List any actions that are not allowed, such as fraudulent transactions or abusive behavior. Explain the consequences of violating these rules, such as order cancellation or account suspension.</p>
<br/>
<p><strong>8. Custom Orders</strong></p>
<p><strong>Process for Custom Orders:</strong> Detail how customers can request custom orders, including the required information, design approval process, and payment terms.</p>
<p><strong>Lead Time:</strong> Clearly state the time frame for creating and delivering custom orders, which may be longer than standard items.</p>
<p><strong>No Returns on Custom Orders:</strong> If applicable, inform customers that custom orders are non-returnable and non-refundable unless defective.</p>
<br/>
<p><strong>9. Digital Products (If Applicable)</strong></p>
<p><strong>Delivery of Digital Products:</strong> Specify how and when digital products will be delivered, such as via email or download link, immediately upon payment confirmation.</p>
<p><strong>Usage Rights:</strong> Clarify the rights customers have regarding the use of digital products, such as personal use only or restrictions on sharing.</p>
<p><strong>No Returns on Digital Products:</strong> Explain that digital products are non-returnable and non-refundable due to the nature of the product.</p>
<br/>
<p><strong>10. Legal Compliance</strong></p>
<p><strong>Consumer Rights:</strong> Ensure your policies comply with relevant consumer protection laws, including rights to return items, warranties, and data protection regulations.</p>
<p><strong>Jurisdiction:</strong> If necessary, state the legal jurisdiction under which your shop operates, particularly for resolving disputes.</p>
<br/>
<p>Establishing clear and concise shop policies on your Modesy store is crucial for creating a trustworthy and professional shopping experience. Regularly review and update your policies to reflect any changes in your business practices or legal requirements. By doing so, you’ll not only protect your business but also enhance customer satisfaction and loyalty.</p>`;

export default function ShopPoliciesView() {
  const [status, setStatus] = useState<"enable" | "disable">("enable");
  const [content, setContent] = useState<string>(defaultPolicyContent);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);

  const handleToolbarFormat = (command: string) => {
    if (typeof document === "undefined") return;

    if (command.startsWith("insertImage:")) {
      const url = command.split(":")[1];
      document.execCommand("insertImage", false, url);
    } else if (command.startsWith("createLink:")) {
      const url = command.split(":")[1];
      document.execCommand("createLink", false, url);
    } else {
      document.execCommand(command, false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("Shop policies updated successfully!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-xs font-medium px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Title */}
        <h1 className="text-[17px] font-semibold text-gray-800 mb-6">
          Shop Policies
        </h1>

        <form onSubmit={handleSave}>
          {/* Status Section */}
          <div className="mb-6">
            <label className="block text-[13px] text-gray-700 font-medium mb-3">
              Status
            </label>
            <div className="flex items-center gap-10">
              {/* Enable Radio */}
              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
                <input
                  type="radio"
                  name="policy_status"
                  value="enable"
                  checked={status === "enable"}
                  onChange={() => setStatus("enable")}
                  className="sr-only"
                />
                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                    status === "enable"
                      ? "bg-[#20c997] border border-[#20c997]"
                      : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
                  }`}
                >
                  {status === "enable" && (
                    <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                  )}
                </div>
                <span>Enable</span>
              </label>

              {/* Disable Radio */}
              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
                <input
                  type="radio"
                  name="policy_status"
                  value="disable"
                  checked={status === "disable"}
                  onChange={() => setStatus("disable")}
                  className="sr-only"
                />
                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                    status === "disable"
                      ? "bg-[#20c997] border border-[#20c997]"
                      : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
                  }`}
                >
                  {status === "disable" && (
                    <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                  )}
                </div>
                <span>Disable</span>
              </label>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-6">
            <label className="block text-[13px] text-gray-700 font-medium mb-3">
              Content
            </label>

            {/* TinyMCE-style Editor Container */}
            <div className="border border-[#ced4da] rounded-[3px] overflow-hidden bg-white shadow-xs focus-within:border-[#20c997] transition-colors">
              {/* Toolbar */}
              <RichTextEditorToolbar onFormat={handleToolbarFormat} />

              {/* Content Editable Area */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                dangerouslySetInnerHTML={{ __html: content }}
                className="p-5 min-h-[380px] text-[13px] text-[#333] outline-none leading-relaxed overflow-y-auto max-h-[500px]"
              />

              {/* Tiny Status Footer Bar */}
              <div className="px-3 py-1.5 border-t border-gray-200 bg-gray-50/70 flex items-center justify-between text-[11px] text-gray-400 select-none">
                <span className="font-mono">p</span>
                <span className="flex items-center gap-1 text-[11px] font-sans text-gray-500">
                  <span className="font-medium">tiny</span>
                  <span className="text-[10px] text-gray-400">◢</span>
                </span>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded transition-colors shadow-sm cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
