"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function FuncToastExample() {
  const t = useTranslations("admin");


  //Implementar custom hook con useRef
  /*
    function useToastOnce(message: string) {
  const shown = useRef(false);

  if (!shown.current) {
    toast(message);
    shown.current = true;
  }
}

export default function FuncToastExample() {
  const t = useTranslations("admin");
  useToastOnce("Some toast func here!");

  return <div>{t("projects.empty")}</div>;
}

  */
  useEffect(() => {
    toast("Some toast func here!");
  }, []);

  return (
    <div className="rounded-xl border border-border/40 bg-card/30 px-6 py-8 text-sm text-muted-foreground">
      {t("projects.empty")}
    </div>
  );
}
