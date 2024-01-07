/* eslint-disable prettier/prettier */
import { useState } from 'react';
import Collapsible from 'react-collapsible';
import { useTranslation } from 'next-i18next';

const FaqCollapse = ({ title, content }) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <>
      {i18n.language === 'ar' ? (
        // Layout for Arabic
        <div>
          <div className='bg-white md:w-[840px] flex justify-between items-center cursor-pointer mx-auto px-[16px] py-[10px] rounded-[6px]' onClick={() => setOpen(!open)}>
            
            <span className='icon-up active rounded-2xl w-[46px] h-[46px] flex justify-center items-center shrink-0'>
              {!open && (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M14.0029 20.6416L6.03418 12.6729C5.4834 12.1221 5.4834 11.2314 6.03418 10.6865L7.3584 9.3623C7.90918 8.81152 8.7998 8.81152 9.34473 9.3623L14.9932 15.0107L20.6416 9.3623C21.1924 8.81152 22.083 8.81152 22.6279 9.3623L23.9521 10.6865C24.5029 11.2373 24.5029 12.1279 23.9521 12.6729L15.9834 20.6416C15.4443 21.1924 14.5537 21.1924 14.0029 20.6416Z" fill="#A05956"/>
                </svg>
              )}
              {open && (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M14.0029 20.6416L6.03418 12.6729C5.4834 12.1221 5.4834 11.2314 6.03418 10.6865L7.3584 9.3623C7.90918 8.81152 8.7998 8.81152 9.34473 9.3623L14.9932 15.0107L20.6416 9.3623C21.1924 8.81152 22.083 8.81152 22.6279 9.3623L23.9521 10.6865C24.5029 11.2373 24.5029 12.1279 23.9521 12.6729L15.9834 20.6416C15.4443 21.1924 14.5537 21.1924 14.0029 20.6416Z" fill="#A05956"/>
                </svg>
              )}
            </span>
            <p className='text-[16px] flex md:text-[24px] font-semibold capitalize text-black-light'>{title}</p>
          </div>
          <Collapsible open={open} trigger="">
            <div className="content-wrapper bg-white md:w-[840px] mx-auto">
              <p className='text-[24px] text-right font-semibold capitalize text-left p-[16px]'>{content}</p>
            </div>
          </Collapsible>

        </div>
      ):(
        // Layout for other languages
        <div>
          <div className='bg-white md:w-[840px] flex justify-between items-center cursor-pointer mx-auto px-[16px] py-[10px] rounded-[6px]' onClick={() => setOpen(!open)}>
            <p className='text-[16px] flex md:text-[24px] font-semibold capitalize text-black-light'>{title}</p>
            <span className='icon-up active rounded-2xl w-[46px] h-[46px] flex justify-center items-center shrink-0'>
              {!open && (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M14.0029 20.6416L6.03418 12.6729C5.4834 12.1221 5.4834 11.2314 6.03418 10.6865L7.3584 9.3623C7.90918 8.81152 8.7998 8.81152 9.34473 9.3623L14.9932 15.0107L20.6416 9.3623C21.1924 8.81152 22.083 8.81152 22.6279 9.3623L23.9521 10.6865C24.5029 11.2373 24.5029 12.1279 23.9521 12.6729L15.9834 20.6416C15.4443 21.1924 14.5537 21.1924 14.0029 20.6416Z" fill="#A05956"/>
                </svg>
              )}
              {open && (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M14.0029 20.6416L6.03418 12.6729C5.4834 12.1221 5.4834 11.2314 6.03418 10.6865L7.3584 9.3623C7.90918 8.81152 8.7998 8.81152 9.34473 9.3623L14.9932 15.0107L20.6416 9.3623C21.1924 8.81152 22.083 8.81152 22.6279 9.3623L23.9521 10.6865C24.5029 11.2373 24.5029 12.1279 23.9521 12.6729L15.9834 20.6416C15.4443 21.1924 14.5537 21.1924 14.0029 20.6416Z" fill="#A05956"/>
                </svg>
              )}
            </span>
          </div>
          <Collapsible open={open} trigger="">
            <div className="content-wrapper bg-white md:w-[840px] mx-auto">
              <p className='text-[24px] font-semibold capitalize text-left p-[16px]'>{content}</p>
            </div>
          </Collapsible>

        </div>
      )}
      
    </>
  )
}

export default FaqCollapse;