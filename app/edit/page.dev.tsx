import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Editor from "./Editor";

export const metadata: Metadata = { title: "Edit the write-ups", robots: { index: false } };

// A local writing tool: only exists while `npm run dev` runs, never on the deployed site.
export default function EditPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <Editor />;
}
