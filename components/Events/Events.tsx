import { motion } from 'framer-motion';

// types
import { Props } from '../../pages/events';



export default function Events({ strings }: Props) {


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='self-stretch w-full'
    >
      
      <main className='bg-green-100 h-full'>
        <h1 className='text-4xl text-center p-2'>{strings.pageTitle}</h1>

        <div>{strings.eventLangPickerLabel}</div>

        <article>
          <h2>{strings.sectionRegCo.title}</h2>
        </article>

        <article>
          <h2>{strings.sectionCACO.title}</h2>
        </article>

        <article>
          <h2>{strings.sectionRegCo.title}</h2>
        </article>

        <article>
          <h2>{strings.sectionOtherEvents.title}</h2>
        </article>


      </main>
    </motion.div>
  )
}
