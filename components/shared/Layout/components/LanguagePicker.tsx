import React from "react";
import Link from "next/link";
import { Translate as LanguageIcon } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function LanguagePicker() {
  const router = useRouter();
  const { locale, locales } = router;

  // Check that at least two locales are configured in Next
  if (!locale || !locales || locales.length < 2) {
    return null;
  }

  // Populate other locales to enable locale switching
  const currentLocaleIndex = locales.findIndex((i) => i === locale);
  const otherLocales = [...locales];
  otherLocales.splice(currentLocaleIndex, 1);

  return (
    <>
      {/* 1 locale: show simple toggle */}
      {locales.length === 2 && (
        <div className="text-indigo-300 flex items-center">
          <Link href={router.pathname} locale={otherLocales[0]}>
            <a>
              <LanguageIcon fontSize="inherit" />{" "}
              {new Intl.DisplayNames(otherLocales[0], { type: "language" }).of(
                otherLocales[0]
              )}
            </a>
          </Link>
        </div>
      )}

      {/* 2 locales: show dropdown */}
      {locales.length > 2 && (
        // TODO: BUILD OUT CUSTOM DROPDOWN COMPONENT
        <div>
          <LanguageIcon fontSize="inherit" />
        </div>
      )}
    </>
  );
}
