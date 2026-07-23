/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

interface TerminalHistory {
  id: string;
  type: "input" | "output" | "system" | "error";
  text: string;
}

export default function NexusTerminal() {
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Staggered initialization boot lines
  useEffect(() => {
    const bootLines: { text: string; type: "system"; delay: number }[] = [
      { text: "> Initialize core_modules...", type: "system", delay: 100 },
      { text: "> Loading AI_agent_alpha [OK]", type: "system", delay: 500 },
      { text: "> Establishing secure tunnel... ESTABLISHED", type: "system", delay: 900 },
      { text: "> Scanning for vulnerabilities... SECURED (0 critical hazards found)", type: "system", delay: 1300 },
      { text: "NEXUS Core Terminal v3.5 Online. Operator Clearance Granted. Type 'help' for protocols.", type: "system", delay: 1700 }
    ];

    bootLines.forEach((item, index) => {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            id: `boot-${index}`,
            type: item.type,
            text: item.text
          }
        ]);
      }, item.delay);
    });
  }, []);

  // Securely auto-scroll when new items arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim();
    if (!command) return;

    // Append user input
    const userEntryId = `user-${Date.now()}`;
    setHistory((prev) => [
      ...prev,
      {
        id: userEntryId,
        type: "input",
        text: `NEXUS_CORE@SECURE_NODE_0:~# ${command}`
      }
    ]);
    setInputValue("");
    setIsProcessing(true);

    // If input is clear, do not compile over network
    if (command.toLowerCase() === "clear") {
      setHistory([]);
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch("/api/terminal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ command })
      });

      if (!response.ok) {
        throw new Error(`HTTP transaction status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        setHistory((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            type: "error",
            text: `[SYSTEM_FATAL] ${data.error}`
          }
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            id: `out-${Date.now()}`,
            type: "output",
            text: data.output || "EMPTY TRANSMISSION REPORT"
          }
        ]);
      }
    } catch (err: any) {
      setHistory((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: "error",
          text: `[MULTIPLEX_ERR] Buffer drop: Could not complete protocol channel link. Verify connectivity. (${err.message})`
        }
      ]);
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  const focusTerminalInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={focusTerminalInput}
      id="nexus-terminal-container"
      className="glass-card rounded-2xl border border-white/10 p-2 shadow-2xl relative overflow-hidden transition-all duration-300 w-full max-w-[1000px] mx-auto cursor-text text-left"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/2 to-transparent pointer-events-none" />
      
      {/* OS window decoration toolbar */}
      <div className="bg-[#0a0c10] rounded-xl overflow-hidden border border-white/5 h-[420px] relative flex flex-col">
        <div className="h-10 bg-black/40 border-b border-white/5 flex items-center px-4 justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/20" />
            <span className="ml-3 font-mono text-xs text-zinc-500 font-medium tracking-tight">
              nexus_terminal.exe
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-650 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            <Terminal size={12} className="text-white" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white font-bold">Node: Active</span>
          </div>
        </div>

        {/* Scrollable diagnostic panel output */}
        <div
          ref={containerRef}
          id="terminal-history-scroll"
          className="p-5 font-mono text-xs md:text-sm text-zinc-300 flex-1 overflow-y-auto space-y-3 scrollbar"
        >
          {history.map((entry) => {
            if (entry.type === "input") {
              return (
                <div key={entry.id} className="text-white font-medium">
                  {entry.text}
                </div>
              );
            }
            if (entry.type === "error") {
              return (
                <pre key={entry.id} className="text-red-400 font-medium leading-relaxed whitespace-pre-wrap break-all">
                  {entry.text}
                </pre>
              );
            }
            if (entry.type === "system") {
              return (
                <div key={entry.id} className="text-white/95 font-bold tracking-wide">
                  {entry.text}
                </div>
              );
            }
            return (
              <pre
                key={entry.id}
                className="text-white font-semibold leading-normal pl-2 border-l border-white/20 whitespace-pre-wrap font-mono"
              >
                {entry.text}
              </pre>
            );
          })}

          {isProcessing && (
            <div className="flex items-center gap-2 text-zinc-400 animate-pulse pl-2 border-l border-white/20">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>Querying encrypted AI core node over secure gateway proxy...</span>
            </div>
          )}
        </div>

        {/* Interactive layout input console */}
        <form
          onSubmit={handleTerminalSubmit}
          className="h-12 bg-black/60 border-t border-white/5 flex items-center px-4 text-xs font-mono"
        >
          <span className="text-white mr-2 font-bold select-none">
            NEXUS_CORE@SECURE_NODE_0:~#
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isProcessing}
            placeholder={isProcessing ? "Processing protocol thread..." : "Type custom parameters or query <msg>..."}
            className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 p-0 font-mono text-xs md:text-sm placeholder-zinc-650 disabled:opacity-50"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {!isProcessing && (
            <span className="inline-block w-2 h-4 bg-white/80 ml-1 terminal-cursor pointer-events-none" />
          )}
        </form>
      </div>
    </div>
  );
}
