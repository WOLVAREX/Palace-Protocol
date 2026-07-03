import { useRef, useState } from "react";

interface ImageUploadProps {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  label?: string;
  hint?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export function ImageUpload({
  value,
  onChange,
  label = "Photo",
  hint = "Click to upload. JPG, PNG or WebP.",
  aspectRatio = "square",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const aspectClass =
    aspectRatio === "portrait"
      ? "aspect-[3/4]"
      : aspectRatio === "landscape"
      ? "aspect-[4/3]"
      : "aspect-square";

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-ink opacity-70">{label}</p>
      <div
        className={`relative ${aspectClass} bg-[#14202E] border-2 border-dashed border-[rgba(166,124,61,0.35)] cursor-pointer overflow-hidden group hover:border-[#A67C3D] transition-colors`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        data-testid="image-upload-zone"
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-mono text-xs uppercase tracking-wider">
                Change photo
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#A67C3D]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span className="font-mono text-[11px] uppercase tracking-wider text-center px-4 opacity-70">
              {hint}
            </span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          data-testid="image-upload-input"
        />
      </div>
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
      {value && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(undefined);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="text-xs font-mono uppercase tracking-wider text-destructive opacity-70 hover:opacity-100"
          data-testid="image-upload-remove"
        >
          Remove photo
        </button>
      )}
    </div>
  );
}
