/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import LinkPageButton from "@/components/buttons/LinkPageBtn"
import SubtractBG from "@/images/Subtract.png"
import Therapy1 from "@/images/therapy1.png"
import Therapy2 from "@/images/therapy2.png"
import Therapy3 from "@/images/therapy3.png"
import AboutUs from "@/images/about-us.png"
import IconCalc from "@/images/icon-calc.png"
import IconUser from "@/images/icon-user.png"
import IconDoc from "@/images/icon-doc.png"
import Dots from "@/images/dots.png"
import Blog1 from "@/images/blog1.png"
import Blog2 from "@/images/blog2.png"
import Blog3 from "@/images/blog3.png"
import TherapyImg1 from "@/images/therapy-1.png"
import TherapyImg2 from "@/images/therapy-2.png"
import TherapyImg3 from "@/images/therapy-3.png"
import HowItWorks from "@/images/how-it-works.png"
import Leaf1 from "@/images/leaf1.png"
import Leaf2 from "@/images/leaf2.png"
import Corner1 from "@/images/corner1.png"
import Corner2 from "@/images/corner2.png"
import HeroBottom from "@/images/home_hero_bottom.png"
import AboutUsBottom from "@/images/home_aboutus_bottom.png"
import OurTherapyBottom from "@/images/home_ourtherapy_bottom.png"
import OffersBottom from "@/images/home_offers_bottom.png"
import Wave2 from "@/images/wave2.png"
import Wave3 from "@/images/wave3.png"

import SectionTitle from "@/components/SectionTitle"
import SectionBigTitle from "@/components/SectionBigTitle"
import FaqCollapse from "@/components/faqCollapse";
import BlogItem from "@/components/blogItem";
import CircleProgress from "@/components/circleProgress";
import HowItWorksItem from "@/components/howItWorksItem";
import TherapySlider from '@/components/therapySlider';
import TherapySliderItem from "@/components/therapySliderItem"

const Home = () => {
  const { t } = useTranslation();
  
  const therapys = [
    {
      image: TherapyImg1, title: t("therapys_title_1"), description: t("therapys_description_1")
    },
    {
      image: TherapyImg2, title: t("therapys_title_2"), description: t("therapys_description_2")
    },
    {
      image: TherapyImg3, title: t("therapys_title_3"), description: t("therapys_description_3")
    }
  ];

  return (
    <>
      <section class="relative">
        
        <div class="bg-pink-semilight md:pb-[218px] relative">
          <Image src={Leaf1} alt="" class="absolute top-4 md:top-2 left-0 z-10 w-[150px] md:w-[238px]" />
          <Image src={Leaf2} alt="" class="absolute bottom-[240px] right-0 z-10 w-[150px] md:w-[238px]" />
          <Image src={Corner1} alt="" class="absolute top-0 left-0 z-1" />
          <Image src={Corner2} alt="" class="absolute bottom-0 right-0 z-1" />

          <div class="pt-[114px] pb-[222px] md:pb-0 mx-auto max-w-screen-xl text-center relative z-[20]">
            <div class="flex justify-center gap-[30px] md:gap-[80px] mb-[34px] md:mb-[45px]">
              <span class="text-[20px] md:text-[24px] text-black-light">{t("anywhere")}</span>
              <span class="text-[20px] md:text-[24px] text-black-light">{t("anytime")}</span>
              <span class="text-[20px] md:text-[24px] text-black-light">{t("confidential")}</span>
            </div>

            <h1 class="mb-[50px] text-[48px] md:text-[80px] mx-auto text-white font-extrabold tracking-tight leading-none font-soleSerifHeadlineBold capitalize">
              {t("home_hero_text1")}<br/>{t("home_hero_text2")}
            </h1>
            
            <div class="mb-8 space-y-4 md-[50px] md:mb-[73px]">
              <div class="relative inline-flex justify-center items-center">
                <LinkPageButton text={t("booking_now")} href="#" /> 
                  <Image src={SubtractBG} alt="subtrack" class="absolute -right-[16px]" />
              </div>
            </div>

            <p class="font-soleSerifHeadlineBold text-[24px] md:text-[32px] text-semilight">{t("home_therapy_quest")}</p>
          </div>
        </div>
        <div class="hero-bottom-bg relative">
          <div class="mx-auto max-w-screen-xl text-center grid grid-cols-1 md:grid-cols-3 gap-y-[85px] md:gap-[56px] pb-[42px] md:pb-[115px]">
            <div class="pt-[18px] text-center therapy-card bg-blue-400 w-[350px] mx-auto -mt-[170px]">
              <p class="text-gray-600 mb-[12px] text-[16px]">{t("therapy_for_me")}</p>
              <p class="font-soleSerifHeadlineBold text-[32px] text-black-light mb-[31px]">{t("individual")}</p>
              <a class="text-brown-dark inline-flex justify-center items-center">
                <span class="underline font-semibold">{t("get_started")}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="#BC6B67" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <Image src={Therapy1} alt="therapy card" class="mx-auto" />
            </div>

            <div class="pt-[18px] text-center therapy-card bg-pink-400 w-[350px] mx-auto md:-mt-[170px]">
              <p class="text-gray-600 mb-[12px] text-[16px]">{t("therapy_for_us")}</p>
              <p class="font-soleSerifHeadlineBold text-[32px] text-black-light mb-[31px]">{t("couples")}</p> 
              <a class="text-brown-dark inline-flex justify-center items-center">
                <span class="underline font-semibold">{t("get_started")}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="#BC6B67" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <Image src={Therapy2} alt="therapy card" class="mx-auto" />
            </div>

            <div class="pt-[18px] text-center therapy-card bg-yellow-400 w-[350px] mx-auto md:-mt-[170px]">
              <p class="text-gray-600 mb-[12px] text-[16px]">{t("for_my_child")}</p>
              <p class="font-soleSerifHeadlineBold text-[32px] text-black-light mb-[31px]">{t("teen")}</p>
              <a class="text-brown-dark inline-flex justify-center items-center">
                <span class="underline font-semibold">{t("get_started")}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="#BC6B67" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <Image src={Therapy3} alt="therapy card" class="mx-auto" />
            </div>
          </div>
        </div>
        <Image src={HeroBottom} alt="" class="w-full " />
      </section>
      
      <section class="about-us bg-blue-light px-2">
        <div class="mx-auto max-w-screen-xl px-2 md:py-[90px]">
          <SectionTitle title={t("about_us")} />
          <div class="flex flex-col md:flex-row md:justify-between md:gap-[70px]">
            <div class="w-full">
              <p class="font-soleSerifHeadlineBold text-[30px] md:text-[40px] text-black-main mb-[30px] md:mb-[60px] font-bold leading-none capitalize">{t("home_about_us_title")}</p>
              <p class="font-poppinsRegular text-[18px] md:text-[20px] text-brown-main">
              {t("home_about_us_1")} <br/><br/>

              {t("home_about_us_2")} <br/><br/>

              {t("home_about_us_3")}
              </p>
              <div class="my-[50px] flex">
                <div class="flex items-center text-brown-main text-[16px] md:text-[20px] font-bold mr-[18px] md:mr-[30px]">
                  <span class="display rounded-full w-[20px] h-[20px] md:w-[34px] md:h-[34px] flex justify-center items-center bg-blue-500 mr-2">
                    <Image src={IconDoc} alt="about us" class="w-[15px] h-[15px] md:w-[24px] md:h-[24px]"/>
                  </span>
                  {t("licensed")}
                </div>
                <div class="flex items-center text-brown-main text-[16px] md:text-[20px] font-bold mr-[18px] md:mr-[30px]">
                  <span class="display rounded-full w-[20px] h-[20px] md:w-[34px] md:h-[34px] flex justify-center items-center bg-pink-500 mr-2">
                    <Image src={IconCalc} alt="about us" class="w-[15px] h-[15px] md:w-[24px] md:h-[24px]"/>
                  </span>
                  {t("available")}
                </div>
                <div class="flex items-center text-brown-main text-[16px] md:text-[20px] font-bold mr-[18px] md:mr-[30px]">
                  <span class="display rounded-full w-[20px] h-[20px] md:w-[34px] md:h-[34px] flex justify-center items-center bg-yellow-500 mr-2">
                    <Image src={IconUser} alt="about us" class="w-[15px] h-[15px] md:w-[24px] md:h-[24px]"/>
                  </span>
                  {t("personalized")}
                </div>
              </div>
              <LinkPageButton text={t("get_matched_therapist")} href="#" />
            </div>
            <div class="w-full relative mt-[80px] md:mt-0">
              <Image src={Dots} alt="about" class="absolute top-0 left-0"/>
              <Image src={AboutUs} alt="about" class="relative z-10 w-full"/>
              <Image src={Dots} alt="about" class="absolute bottom-0 right-0"/>
            </div>
          </div>
        </div>
        <Image src={AboutUsBottom} alt="" class="w-full " />
      </section>

      <section class="our-therapy bg-pink-600 px-2">
        <div class="mx-auto max-w-screen-xl text-center py-[40px] md:py-[90px]">
          <SectionTitle title={t("what_our_services")} />
          <SectionBigTitle title={t("our_therapy")} />
          <div class="hidden md:block">
            <TherapySlider items={therapys} />
          </div>
          <div class="md:hidden grid grid-cols-1 gap-y-[95px] my-10">
            {therapys.map((item, index) => {
              return (
                <TherapySliderItem key={index} image={item.image} title={item.title} description={item.description} />
              )
            })}
          </div>
          <LinkPageButton text={t("find_more")} href="#" />
        </div>
        <Image src={OurTherapyBottom} alt="" class="w-full " />
      </section>

      <section class="faq bg-white px-2">
        <div class="mx-auto max-w-screen-xl text-center py-[40px] md:py-[90px]">
          <SectionTitle title={t("what_we_offer")} />
          <SectionBigTitle title={t("how_it_works")} />
          <div class="flex flex-col md:flex-row md:justify-between md:gap-[70px]">
            <div class="w-full">
              <Image src={HowItWorks} alt="how it works" />
            </div>
            <div class="w-full grid grid-cols-1 gap-y-[20px]">
              <HowItWorksItem number="1" title={t("home_guide_title_1")} detail={t("home_guide_detail_1")} />
              <HowItWorksItem number="2" title={t("home_guide_title_2")} detail={t("home_guide_detail_2")} />
              <HowItWorksItem number="3" title={t("home_guide_title_3")} detail={t("home_guide_detail_3")} />
              <HowItWorksItem number="4" title={t("home_guide_title_4")} detail={t("home_guide_detail_4")} />
            </div>
          </div>
        </div>
        
      </section>

      <section class="bg-blue-light px-2">
        <Image src={OffersBottom} alt="" class="w-full " />
        <div class="mx-auto max-w-screen-xl text-center py-[40px] md:py-[90px]">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-y-[95px]">
            <CircleProgress percent="70" content={t("home_usage_percent1")} />
            <CircleProgress percent="80" content={t("home_usage_percent2")} />
            <CircleProgress percent="98" content={t("home_usage_percent3")} />
          </div>
        </div>
      </section>

      <section class="faq bg-white px-2">
       <Image src={Wave2} alt="" class="w-full " />
        <div class="mx-auto max-w-screen-xl text-center py-[40px] md:py-[90px]">
          <SectionTitle title={t("home_blog_title")} />
          <SectionBigTitle title={t("home_blog_big_title")} />
          <div class="grid grid-cols-1 md:grid-cols-3 gap-y-[95px] mt-10 md:mt-0">
            <BlogItem image={Blog1} text={t("blog_description_1")} />
            <BlogItem image={Blog2} text={t("blog_description_2")} />
            <BlogItem image={Blog3} text={t("blog_description_3")} />
          </div>
        </div>
      </section>

      <section class="faq bg-pink-600 px-2">
        <Image src={Wave3} alt="" class="w-full " />
        <div class="mx-auto max-w-screen-xl text-center py-[40px] md:py-[90px]">
          <SectionTitle title={t("home_faq_title")} />
          <SectionBigTitle title={t("home_faq_big_title")} />
          <div class="gap-y-[11px] md:gap-y-[24px] grid grid-cols-1 mt-[60px] md:mt-0">
            <FaqCollapse title={t("home_faq_item1_title")} content={t("home_faq_item1_content")} />
            <FaqCollapse title={t("home_faq_item2_title")} content={t("home_faq_item2_content")} />
            <FaqCollapse title={t("home_faq_item3_title")} content={t("home_faq_item3_content")} />
            <FaqCollapse title={t("home_faq_item4_title")} content={t("home_faq_item4_content")} />
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
}

export default Home
