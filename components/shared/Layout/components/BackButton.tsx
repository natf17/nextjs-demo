import React from 'react';
import { useRouter } from 'next/router';
import { KeyboardBackspace } from '@material-ui/icons';


export default function BackButton() {
  const router = useRouter();

  return (
    <button className='text-indigo-300' type='button' onClick={() => router.back()}>
      <KeyboardBackspace color='inherit' />
    </button>
  )
}
