import React from 'react';

type Props = {
  title: String
}

export default function Header({title}:Props) {
  return (
    <div>
      {/* This actually needs to be localized
      and cannot simply be filled in as currently
      designed at the _app.js level. We need some way
      to refresh this information when site language
      changes, etc. */}
      {title}
    </div>
  )
}