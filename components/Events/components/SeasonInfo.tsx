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
    <div className='border-l-4 p-1 ml-4'>
      <Info color='disabled' />

      <ul className='inline-block'>
        <li className='inline-block'>
          <span className='font-black uppercase'>{eventThemeLabel}:</span>
          <span>{theme}</span>
        </li>

        <li className='inline-block'>
          <span className='font-black uppercase'>{yearsShowingLabel}:</span>
          <span>{seasonYears}</span>
        </li>
        <li className='inline-block'>
          <span className='font-black uppercase'>{durationLabel}:</span>
          <span>{durationDays}</span>
        </li>
      </ul>

    </div>
  )
}
