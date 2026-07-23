/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, ShieldCheck, Cpu, Terminal, AlertTriangle, CheckCircle } from "lucide-react";

interface FormPayload {
  identifier: string;
  returnAddress: string;
  payload: string;
}

interface TransmissionReport {
  receiptId: string;
  timestamp: string;
  metadata: {
    classification: string;
    threatLevel: string;
    sentiment: string;
    priority: string;
  };
  message: string;
}

export default function SecureForm() {
  const [formData, setFormData] = useState<FormPayload>({
    identifier: "",
    returnAddress: "",
    payload: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [report, setReport] = useState<TransmissionReport | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorText(null);
    setReport(null);

    if (!formData.identifier || !formData.returnAddress || !formData.payload) {
      setErrorText("All parameters (IDENTIFIER, RETURN_ADDRESS, PAYLOAD) must be fully populated.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP gateway error: ${response.status}`);
      }

      setReport({
        receiptId: data.receiptId,
        timestamp: data.timestamp,
        metadata: data.metadata,
        message: data.message
      });

      // Purge inputs upon success
      setFormData({
        identifier: "",
        returnAddress: "",
        payload: ""
      });

    } catch (err: any) {
      setErrorText(err.message || "An unresolved multiplex spillover error has occurred during dispatch.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="secure-channel" className="w-full max-w-4xl mx-auto py-12 px-4 relative z-10">
      <div id="contact" className="text-center mb-12">
         <div className="inline-flex px-4 py-1.5 rounded-full mb-4 pill-badge">
           <span className="font-sans font-semibold tracking-wider text-xs flex items-center gap-2">
             SECURE LINK <Cpu size={12} className="text-white" />
           </span>
         </div>
        <h2 className="font-sans text-3xl md:text-4xl font-extrabold mb-4 text-gradient">
          Initialize Secure Channel
        </h2>
        <p className="font-sans text-sm md:text-base text-zinc-400 max-w-xl mx-auto">
          Establish a direct connection for collaboration, system audits, or core deployment inquiries.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 md:p-10 border border-white/10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
        
        {/* Left Side: Interactive multiplex settings & instructions */}
        <div className="lg:col-span-4 flex flex-col justify-between text-left space-y-6">
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <ShieldCheck size={14} /> TRANSMISSION_GUIDE
            </h3>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              Your transmission is parsed by <strong className="text-zinc-200">AI Agent Alpha</strong> to automatically classify threat levels, prioritize inquiries, and securely route dispatch vectors.
            </p>
          </div>

          <div className="space-y-3 font-mono text-[11px] text-zinc-500">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span>CIPHER:</span>
              <span className="text-emerald-400">AES-256-GCM</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span>STATUS:</span>
              <span className="text-zinc-300">LISTENING</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span>DISPATCH CAP:</span>
              <span className="text-white">SERVERLESS_PROXY</span>
            </div>
            <div className="flex items-center justify-between">
              <span>SEC CLEARANCE:</span>
              <span className="text-white">LEVEL_5</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive input grid */}
        <div className="lg:col-span-8">
          <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-[11px] font-bold tracking-widest text-zinc-400 mb-2">
                  IDENTIFIER (NAME)
                </label>
                <input
                  name="identifier"
                  type="text"
                  required
                  value={formData.identifier}
                  onChange={handleInputChange}
                  placeholder="Your Name / Organization"
                  className="w-full bg-[#010826] border border-white/10 rounded-xl focus:border-white/50 text-white focus:ring-0 px-4 py-3 transition-colors font-sans text-sm outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] font-bold tracking-widest text-zinc-400 mb-2">
                  RETURN_ADDRESS (EMAIL)
                </label>
                <input
                  name="returnAddress"
                  type="email"
                  required
                  value={formData.returnAddress}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full bg-[#010826] border border-white/10 rounded-xl focus:border-white/50 text-white focus:ring-0 px-4 py-3 transition-colors font-sans text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold tracking-widest text-zinc-400 mb-2">
                PAYLOAD (MESSAGE PARAMETERS)
              </label>
              <textarea
                name="payload"
                required
                value={formData.payload}
                onChange={handleInputChange}
                placeholder="Enter encrypted message parameters here..."
                className="w-full bg-[#010826] border border-white/10 rounded-xl focus:border-white/50 text-white focus:ring-0 px-4 py-3.5 transition-colors font-sans text-sm h-32 resize-none outline-none"
              />
            </div>

            {errorText && (
              <div className="text-xs font-mono text-red-400 flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl">
                <AlertTriangle size={14} className="shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-white hover:bg-zinc-200 text-[#02155a] px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    Transmitting Packets...
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-r-transparent border-white animate-spin" />
                  </>
                ) : (
                  <>
                    Transmit Data <Send size={15} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Embedded Real-time Telemetry Report Section */}
      {report && (
        <div className="mt-8 transition-all duration-500 transform translate-y-0 scale-100 text-left">
          <div className="glass-card rounded-2xl border border-emerald-500/20 bg-emerald-950/5 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-400">
                <CheckCircle size={24} />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h4 className="font-sans font-bold text-lg text-white">Transmission Telemetry Logged</h4>
                  <p className="font-mono text-xs text-emerald-400 mt-1">RECEIPT_SECURE_ID: {report.receiptId}</p>
                </div>
                
                <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                  {report.message}
                </p>

                {/* Cognitive analytics payload block */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-1.5">
                    <Terminal size={12} className="text-emerald-400" /> COGNITIVE TRIAGE REPORT (AGENT_ALPHA)
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                      <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Classification</div>
                      <div className="font-sans font-semibold text-xs text-white uppercase mt-1 tracking-wide">
                        {report.metadata.classification}
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                      <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Sentiment ID</div>
                      <div className="font-sans font-semibold text-xs text-emerald-400 mt-1">
                        {report.metadata.sentiment}
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                      <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Threat Factor</div>
                      <div className="font-sans font-semibold text-xs text-red-400 mt-1">
                        {report.metadata.threatLevel}
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                      <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Priority Dispatch</div>
                      <span className={`inline-block font-sans font-bold text-[10px] uppercase mt-1 tracking-wider px-2 py-0.5 rounded ${
                        report.metadata.priority === "HIGH" || report.metadata.priority === "CRITICAL"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-white/10 text-white border border-white/20"
                      }`}>
                        {report.metadata.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
