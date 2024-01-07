/* eslint-disable prettier/prettier */
import LogoIcon from "@/images/Logo.png"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Wave4 from "@/images/wave4.png"

const Footer = ({ specailities }) => {
    const { i18n } = useTranslation();
    const { t } = useTranslation('common')

    return (
      
      <footer class="bg-blue-light">
          <Image src={Wave4} alt="" class="w-full " />
        <div class="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto w-full">
            <div class="w-full">
                <div class="pl-[64px] py-10 text-left md:text-center md:text-left border-b-[1px] border-pink-light">
                    <div class="flex flex-col md:flex-row justify-between md:grid-cols-2 lg:grid-cols-4 gap-y-[77px]">
                        <div class="">
                            <Image src={LogoIcon} alt="footer logo" />
                            <p className="my-[30px] text-[16px] leading-[32px] text-brown-main capitalize">
                                {t("footer_content_1")}<br /> {t("footer_content_2")}
                            </p>
                              <div class="flex">
                                  <a href="#!" class="mr-[13px] text-brown-main text-[16px] bg-blue-semilight w-[50px] h-[50px] rounded-full flex justify-center items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                        <g clip-path="url(#clip0_105_319)">
                                        <path d="M14.8684 10.587L24.1689 0H21.9658L13.8867 9.19064L7.43878 0H0L9.75267 13.8992L0 24.9999H2.20316L10.7294 15.2922L17.5403 24.9999H24.9791M2.99832 1.62697H6.38299L21.9641 23.4529H18.5786" fill="#523432"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_105_319">
                                        <rect width="24.9791" height="25" fill="white"/>
                                        </clipPath>
                                        </defs>
                                        </svg>
                                  </a>
                                  <a href="#!" class="mr-[13px] text-brown-main text-[16px] bg-blue-semilight w-[50px] h-[50px] rounded-full flex justify-center items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
<path d="M18.3169 14.0625L19.0112 9.53809H14.6699V6.60205C14.6699 5.36426 15.2764 4.15771 17.2207 4.15771H19.1943V0.305664C19.1943 0.305664 17.4033 0 15.6909 0C12.1157 0 9.77881 2.16699 9.77881 6.08984V9.53809H5.80469V14.0625H9.77881V25H14.6699V14.0625H18.3169Z" fill="#523432"/>
</svg>
                                  </a>
                                  <a href="#!" class="mr-[13px] text-brown-main text-[16px] bg-blue-semilight w-[50px] h-[50px] rounded-full flex justify-center items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
<path d="M23.8569 6.77378C23.5842 5.74731 22.781 4.93889 21.7612 4.66454C19.9127 4.16602 12.5003 4.16602 12.5003 4.16602C12.5003 4.16602 5.08798 4.16602 3.23941 4.66454C2.21957 4.93893 1.41636 5.74731 1.14375 6.77378C0.648438 8.63433 0.648438 12.5162 0.648438 12.5162C0.648438 12.5162 0.648438 16.398 1.14375 18.2586C1.41636 19.2851 2.21957 20.0598 3.23941 20.3342C5.08798 20.8327 12.5003 20.8327 12.5003 20.8327C12.5003 20.8327 19.9126 20.8327 21.7612 20.3342C22.781 20.0598 23.5842 19.2851 23.8569 18.2586C24.3522 16.398 24.3522 12.5162 24.3522 12.5162C24.3522 12.5162 24.3522 8.63433 23.8569 6.77378ZM10.076 16.0406V8.99175L16.2713 12.5163L10.076 16.0406Z" fill="#523432"/>
</svg>
                                  </a>
                                  <a href="#!" class="mr-[13px] text-brown-main text-[16px] bg-blue-semilight w-[50px] h-[50px] rounded-full flex justify-center items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
<path d="M12.5046 6.8855C9.39917 6.8855 6.89429 9.39038 6.89429 12.4958C6.89429 15.6013 9.39917 18.1062 12.5046 18.1062C15.6101 18.1062 18.115 15.6013 18.115 12.4958C18.115 9.39038 15.6101 6.8855 12.5046 6.8855ZM12.5046 16.1433C10.4978 16.1433 8.85718 14.5076 8.85718 12.4958C8.85718 10.4841 10.4929 8.84839 12.5046 8.84839C14.5164 8.84839 16.1521 10.4841 16.1521 12.4958C16.1521 14.5076 14.5115 16.1433 12.5046 16.1433ZM19.6531 6.65601C19.6531 7.38354 19.0671 7.9646 18.3445 7.9646C17.6169 7.9646 17.0359 7.37866 17.0359 6.65601C17.0359 5.93335 17.6218 5.34741 18.3445 5.34741C19.0671 5.34741 19.6531 5.93335 19.6531 6.65601ZM23.3689 7.98413C23.2859 6.2312 22.8855 4.67847 21.6013 3.39917C20.322 2.11987 18.7693 1.71948 17.0164 1.63159C15.2097 1.52905 9.79468 1.52905 7.98804 1.63159C6.23999 1.7146 4.68726 2.11499 3.40308 3.39429C2.1189 4.67358 1.72339 6.22632 1.6355 7.97925C1.53296 9.78589 1.53296 15.2009 1.6355 17.0076C1.71851 18.7605 2.1189 20.3132 3.40308 21.5925C4.68726 22.8718 6.23511 23.2722 7.98804 23.3601C9.79468 23.4626 15.2097 23.4626 17.0164 23.3601C18.7693 23.2771 20.322 22.8767 21.6013 21.5925C22.8806 20.3132 23.281 18.7605 23.3689 17.0076C23.4714 15.2009 23.4714 9.79077 23.3689 7.98413ZM21.0349 18.946C20.6541 19.9031 19.9167 20.6404 18.9548 21.0261C17.5144 21.5974 14.0964 21.4656 12.5046 21.4656C10.9128 21.4656 7.48999 21.5925 6.05444 21.0261C5.09741 20.6453 4.36011 19.908 3.97437 18.946C3.40308 17.5056 3.53491 14.0876 3.53491 12.4958C3.53491 10.9041 3.40796 7.4812 3.97437 6.04565C4.35522 5.08862 5.09253 4.35132 6.05444 3.96558C7.49487 3.39429 10.9128 3.52612 12.5046 3.52612C14.0964 3.52612 17.5193 3.39917 18.9548 3.96558C19.9119 4.34644 20.6492 5.08374 21.0349 6.04565C21.6062 7.48608 21.4744 10.9041 21.4744 12.4958C21.4744 14.0876 21.6062 17.5105 21.0349 18.946Z" fill="#523432"/>
</svg>
                                </a>
                              </div>  
                        </div>
                        <div class="">
                          {i18n.language === 'ar' ? (
                            // Layout for Arabic
                            <h6
                            class="mb-4 text-right font-semibold text-[24px] text-black-light md:justify-start">
                            {t("services")}
                            </h6>
                            ):(
                            // Layout for other languages
                            <h6
                            class="mb-4 flex font-semibold text-[24px] text-black-light md:justify-start">
                            {t("services")}
                            </h6>
                          )}
                            
                            <p class="mb-4">
                                  <a href="#!" class="text-brown-main text-[16px]">{t("online_therapy")}</a>
                            </p>
                            <p class="mb-4">
                                <a href="#!" class="text-brown-main text-[16px]">{t("couples_therapy")}</a>
                            </p>
                            <p class="mb-4">
                                <a href="#!" class="text-brown-main text-[16px]">{t("psychiatry")}</a>
                            </p>
                            <p class="mb-4">
                                <a href="#!" class="text-brown-main text-[16px]">{t("teen_therapy")}</a>
                            </p>
                            <p class="mb-4">
                                <a href="#!" class="text-brown-main text-[16px]">{t("iclamyou_for_business")}</a>
                            </p>
                        </div>
                        <div class="">
                          {i18n.language === 'ar' ? (
                            // Layout for Arabic
                            <h6
                            class="mb-4 text-right font-semibold text-[24px] text-black-light md:justify-start">
                            {t("useful_links")}
                            </h6>
                            ):(
                            // Layout for other languages
                            <h6
                            class="mb-4 flex font-semibold text-[24px] text-black-light md:justify-start">
                            {t("useful_links")}
                            </h6>
                          )}
                            
                            <p class="mb-4">
                                <a href="#!" class="text-brown-main text-[16px]">{t("find_a_therapist")}</a>
                            </p>
                            <p class="mb-4">
                                <a href="#!" class="text-brown-main text-[16px]">{t("mental_health_library")}</a>
                            </p>
                            <p class="mb-4">
                                <a href="#!" class="text-brown-main text-[16px]">{t("free_mental_health_tests")}</a>
                            </p>
                            <p class="mb-4">
                                <a href="#!" class="text-brown-main text-[16px]">{t("anxiety_test")}</a>
                            </p>
                            <p class="mb-4">
                                <a href="#!" class="text-brown-main text-[16px]">{t("depression_test")}</a>
                            </p>
                        </div>
                        <div>
                          {i18n.language === 'ar' ? (
                            // Layout for Arabic
                            <h6
                            class="mb-4 text-right font-semibold text-[24px] text-black-light md:justify-start">
                            {t("contact")}
                            </h6>
                            ):(
                            // Layout for other languages
                            <h6
                            class="mb-4 flex font-semibold text-[24px] text-black-light md:justify-start">
                            {t("contact")}
                            </h6>
                          )}
                            
                            <p class="mb-4 flex items-center md:justify-start text-brown-main">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#FC6EAC"
                                class="mr-3 h-5 w-5">
                                <path
                                d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                <path
                                d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                            {t("footer_contact_info_email")}
                            </p>
                            
                            <p class="mb-4 flex items-center md:justify-start text-brown-main">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#FC6EAC"
                                viewBox="0 0 395.71 395.71"
                                class="mr-3 h-5 w-5"
                                >
                                <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
                                    c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
                                    C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
                                    c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
                            </svg>
                            {t("footer_contact_info_address")}
                            </p>
                              
                            <p class="flex items-center md:justify-start text-brown-main">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#FC6EAC"
                                class="mr-3 h-5 w-5">
                                <path
                                fill-rule="evenodd"
                                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                clip-rule="evenodd" />
                            </svg>
                            {t("footer_contact_info_phone")}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="p-6 text-center">
                    <span class="text-[14px] text-brown-main uppercase">{t("copyright")}</span>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
