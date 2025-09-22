import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"encode"|"decode">("encode");
  const [urlsafe, setUrlsafe] = useState(false);

  async function submit() {
    const path = mode === "encode" ? "/api/encode" : "/api/decode";
    const body = mode === "encode" ? { input, variant: urlsafe ? "urlsafe":"standard" } : { input };
    const res = await fetch(path, { method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify(body) });
    const json = await res.json();
    setResult(mode === "encode" ? json.encoded : json.decoded ?? JSON.stringify(json));
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Base64 Encoder / Decoder</h1>
      <div className="mb-3">
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="w-full p-2 border"/>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => setMode("encode")} className={mode==="encode" ? "font-bold":"opacity-70"}>Encode</button>
        <button onClick={() => setMode("decode")} className={mode==="decode" ? "font-bold":"opacity-70"}>Decode</button>
        <label style={{marginLeft:20}}>
          <input type="checkbox" checked={urlsafe} onChange={e=>setUrlsafe(e.target.checked)} /> URL-safe
        </label>
        <button onClick={submit} style={{marginLeft:"auto"}}>Run</button>
      </div>
      <h2 className="font-semibold">Result</h2>
      <pre className="p-3 border rounded bg-gray-50">{result}</pre>
    </main>
  );
}
