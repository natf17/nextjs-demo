import React from 'react';
import { Info } from '@material-ui/icons';

type Props = {
  eventThemeLabel: string,
  yearsShowingLabel: string,
  durationLabel: string,
  theme: string,
  seasonYears: string,
  durationDays: number
}

export default function SeasonInfo({
  eventThemeLabel, theme,
  yearsShowingLabel, seasonYears,
  durationLabel, durationDays
}: Props) {
  return (
    <div className='text-blue-50 p-2 ml-10 w-96'>
      {/* Position somewhere in bg (absolute? or bg img) */}
      {/* <Info color='disabled' /> */}

      <ul className='text-lg border mt-2 p-2 bg-gray-900 rounded-lg'>
        <li className=''>
          <span className='font-black '>{eventThemeLabel}: </span>
          <span>{theme}</span>
        </li>

        <li className=''>
          <span className='font-black '>{yearsShowingLabel}: </span>
          <span>{seasonYears}</span> 
          <span className='font-black '> {durationLabel}: </span>
          <span>{durationDays}</span>
        </li>
      </ul>

    </div>
  )
}
