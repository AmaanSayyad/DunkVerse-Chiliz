import { FiSearch } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';

import clsxm from '@/lib/clsxm';

type Props = {
  startAdornment?: React.ReactNode | 'search';
  endAdornment?: React.ReactNode;
  placeHolder?: string;
  className?: string;
  inputClassName?: string;

  endAdornmentClassName?: string;
} & JSX.IntrinsicElements['input'];

const TextField = ({
  startAdornment,
  endAdornment,
  endAdornmentClassName,
  className,
  inputClassName,
  placeHolder,
  ...props
}: Props) => {
  return (
    <div className={clsxm(className, 'relative w-full')}>
      <div
        className={clsxm(
          startAdornment ? 'pl-4' : '',
          'pointer-events-none absolute inset-y-0 left-0 flex items-center'
        )}
      >
        {startAdornment === 'search' ? (
          <span className='text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200'>
            <IoSearch size={20} />
          </span>
        ) : (
          startAdornment
        )}
      </div>
      <input
        type='text'
        id='main-search'
        className={clsxm(
          startAdornment ? '!pl-12' : '',
          'w-full rounded-xl border-0 bg-transparent p-4 text-sm text-white placeholder-gray-400',
          'focus:outline-none focus:ring-0 focus:border-0',
          'transition-all duration-200',
          inputClassName
        )}
        placeholder={placeHolder}
        required
        {...props}
      />
      <div
        className={clsxm(
          startAdornment ? 'pl-4' : '',
          'pointer-events-none absolute inset-y-0 right-5 flex items-center',
          endAdornmentClassName
        )}
      >
        {endAdornment && endAdornment}
      </div>
    </div>
  );
};

export default TextField;
