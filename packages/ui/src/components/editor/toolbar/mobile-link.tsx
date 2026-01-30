"use client";
import { EditorToolbarProp } from "./index";
import { useEffect, useState } from "react";
import { LinkForm } from "./link";
import { Button } from "../../button";
import { ArrowLeft, Link } from "lucide-react";

const MobileLink: React.FC<
  Pick<EditorToolbarProp, "editor"> & {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({ editor, setOpen }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const updateLinkState = () => {
      const { href } = editor.getAttributes("link");
      setUrl(href || "");
    };

    editor.on("selectionUpdate", updateLinkState);
    return () => {
      editor.off("selectionUpdate", updateLinkState);
    };
  }, [editor]);

  return (
    <div className="border-t flex items-center justify-center mx-auto">
      <Button
        type="button"
        variant="ghost"
        className={`!p-0 !size-8 rounded-lg group box-border`}
        onClick={() => setOpen(false)}
      >
        <ArrowLeft
          size={4}
          className={`text-muted-foreground group-hover:text-foreground `}
        />
      </Button>

      <Button
        type="button"
        variant="ghost"
        className={`!p-0 !size-8 rounded-lg group box-border`}
        onClick={() => setOpen(false)}
      >
        <Link
          size={4}
          className={`text-muted-foreground group-hover:text-foreground `}
        />
      </Button>

      <LinkForm editor={editor} url={url} setOpen={setOpen} />
    </div>
  );
};
export { MobileLink };
