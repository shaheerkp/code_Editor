import React, { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";
import Preview from "./preview";
import { CodeEditor } from "./CodeEditor";
import Resizable from "./Resizable";

const EsBuild = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        let result1 = await esbuild.build({
          entryPoints: ["index.js"],
          bundle: true,
          write: false,
          plugins: [unpkgPathPlugin(), fetchPlugin(input)],
          define: {
            "process.env.NODE_ENV": '"production"',
            global: "window",
          },
        });
        setCode(result1.outputFiles[0].text);
        setErr("");
      } catch (error: any) {
        setErr(error.message);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  useEffect(() => {
    startServices();
  }, []);

  const startServices = async () => {
    ref.current = await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  const onChange = (newValue: any) => {
    setInput(newValue);
  };

  return (
    <div>
      <Resizable direction="vertical">
        <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
          <Resizable direction="horizontal">
            <CodeEditor input={input} onChange={onChange} />
          </Resizable>
          <Preview code={code} bundlingStatus={err} />
        </div>
      </Resizable>
    </div>
  );
};

export default EsBuild;
