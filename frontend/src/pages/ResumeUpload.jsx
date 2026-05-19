import { AlertCircle, CheckCircle2, FileUp, Loader2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../hooks/usePageTitle";
import { uploadResume } from "../services/resumeService";

export default function ResumeUpload() {
  usePageTitle("Resume Upload");
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  function handleFileChange(event) {
    setError("");
    setUploadResult(null);
    setSelectedFile(event.target.files?.[0] ?? null);
  }

  async function handleUpload() {
    if (!selectedFile) {
      setError("Choose a PDF or DOCX resume first.");
      return;
    }

    setError("");
    setIsUploading(true);
    try {
      const result = await uploadResume(selectedFile);
      setUploadResult(result.resume);
    } catch (apiError) {
      setError(apiError.response?.data?.detail ?? "Resume upload failed. Try another file.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Resume"
        title="Upload resume"
        description="Phase 3 will connect this screen to PDF and DOCX parsing. The interface is ready for file intake and analysis history."
      />
      <section className="panel p-6">
        <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-mist p-8 text-center">
          <FileUp size={42} className="text-signal" aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-semibold text-ink">Drop your PDF or DOCX resume</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-graphite">
            Upload a resume to extract text, detect technical skills, and store structured resume sections.
          </p>
          <input
            ref={inputRef}
            className="hidden"
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" type="button" onClick={() => inputRef.current?.click()}>
              <UploadCloud size={18} aria-hidden="true" />
              Choose file
            </Button>
            <Button variant="signal" type="button" onClick={handleUpload} disabled={isUploading}>
              {isUploading ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : null}
              Parse resume
            </Button>
          </div>
          {selectedFile && <p className="mt-4 text-sm font-semibold text-graphite">{selectedFile.name}</p>}
        </div>
      </section>

      {error && (
        <div className="mt-5 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertCircle size={19} aria-hidden="true" />
          {error}
        </div>
      )}

      {uploadResult && (
        <section className="panel mt-6 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-mint" size={24} aria-hidden="true" />
            <div>
              <h2 className="text-xl font-semibold text-ink">Parsed successfully</h2>
              <p className="mt-1 text-sm text-graphite">{uploadResult.original_filename}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-mist p-4">
              <p className="text-sm font-semibold text-ink">Detected skills</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(uploadResult.extracted_skills?.length ? uploadResult.extracted_skills : ["No skills detected yet"]).map((skill) => (
                  <span key={skill} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-graphite">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-mist p-4">
              <p className="text-sm font-semibold text-ink">Parsed text preview</p>
              <p className="mt-3 line-clamp-5 text-sm leading-6 text-graphite">
                {uploadResult.parsed_text || "No text extracted."}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
