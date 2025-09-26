import { defineManifest } from "@crxjs/vite-plugin";
import { version } from "./package.json";

export default defineManifest(async (env) => ({
  
  name: "Lens",
  manifest_version: 3,
  version,
  description: "Lens is a Chrome extension that acts as your AI-powered reading companion. It helps users instantly summarize, translate, proofread, and rewrite content directly on any webpage — no copy-paste required.",
  action: {
    default_popup: "src/pages/popup/index.html",
  },
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  permissions: ["scripting", "activeTab"],
  host_permissions: ["<all_urls>"],
  trial_tokens: ["AnlT7gRo/750gGKtoI/A3D2rL5yAQA9wISlLqHGE6vJQinPfk0HiIij5LhWs+iuB7mTeotXmEXkvdpOAC1YjAgAAAG97Im9yaWdpbiI6ImNocm9tZS1leHRlbnNpb246Ly9sampoamFha21uY2lib25uanBhb2dsYmhjamVvbGhrayIsImZlYXR1cmUiOiJJQ2Fubm9VdGViZWxpZXZlWW91V2FzdGVkWW91clRpbWVEZWNvZGluZ1RoaXMiLCJleHBpcnkiOjU3MjU0MDc5OTl9"],
  icons: {
    "16": "src/assets/icons/16x16.png",
    "32": "src/assets/icons/32x32.png",
    "48": "src/assets/icons/48x48.png",
    "128": "src/assets/icons/128x128.png",
  },
}));
