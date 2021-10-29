import React from 'react';
import { Info } from '@material-ui/icons';
import { motion } from 'framer-motion';

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

  const SeasonInfoAnimationVariants = {
    // no animations for now, load with parent
  }

  return (
    <motion.div 
      className='text-blue-50 p-2 ml-10 w-96'
      variants={ SeasonInfoAnimationVariants }
    >      
      {/* <Info color='disabled' /> */}

      <ul className='border-l-2 mt-2 p-2 bg-gray-800'>
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

    </motion.div>
  )
}
