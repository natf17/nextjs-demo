import React from 'react';
import Link from 'next/link';
import { Translate as LanguageIcon } from '@material-ui/icons';
import { useRouter } from 'next/router';



export default function LanguagePicker() {
  const router = useRouter();
  const {locale, locales} = router;

  // Check that locales are configured
  if (!locale || !locales) {
    return null;
  }

  const currentLocaleIndex = locales.findIndex((i) => i === locale);
  const otherLocales = [...locales];
  otherLocales.splice(currentLocaleIndex, 1);

  return (
    <>
      {/* 1 locale: show simple toggle */}
      { locales.length === 2 &&        
        <div className='text-green-700 flex items-center'>          
          <Link href={router.pathname} locale={otherLocales[0]}>
            <a><LanguageIcon fontSize='inherit' /> {otherLocales[0]}</a>
          </Link>
        </div>        
      }

      {/* 2 locales: show dropdown */}
      {
        locales.length > 2 &&
        // TODO: BUILD OUT CUSTOM DROPDOWN COMPONENT
        <div>
          <LanguageIcon fontSize='inherit' />
        </div>
      }
    </>
  )
}
