"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);

  const onSelectTab = (idx: number) => {
    setActive(propTabs[idx]);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col sm:flex-row items-center justify-between [perspective:640px] sm:[perspective:1000px] relative overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        <div>
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => onSelectTab(idx)}
            className={cn(
              "relative rounded-full px-4 py-2 transition-colors",
              tabClassName,
              active.value === tab.value
                ? cn("bg-zinc-800 text-white", activeTabClassName)
                : "text-white/60 hover:text-white"
            )}
          >
            <span className="text-xs md:text-base font-bold">{tab.title}</span>
          </button>
        ))}
        </div>

      </div>
      <FadeInDiv
        tabs={propTabs}
        active={active}
        className={cn("mt-6", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
}) => {
  return (
    <div className={cn("relative w-full", className)}>
      {tabs.map((tab) => (
        <div
          key={tab.value}
          className={cn(
            "rounded-2xl border border-white/10 bg-black/20 p-6 text-left",
            tab.value === active.value ? "block" : "hidden"
          )}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
