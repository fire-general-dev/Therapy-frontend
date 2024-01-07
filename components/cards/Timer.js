import { checkLessTen, isAftereNow } from "@/utils/helpers"
import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import alarmIcon from "@/images/icons/alarm-icon.svg"
import Image from "next/image"
import moment from "moment"
import { useRef } from "react"

const Timer = ({ appointmentDate, onMeetingActive }) => {
  const { t } = useTranslation()
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const snapshotIntervalRef = useRef()

  const getTime = () => {
    const time = Date.parse(appointmentDate) - Date.now()

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)))
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
    setMinutes(Math.floor((time / 1000 / 60) % 60))
    setSeconds(Math.floor((time / 1000) % 60))
  }

  useEffect(() => {
    snapshotIntervalRef.current = setInterval(() => getTime(), 1000)

    return () => clearInterval(snapshotIntervalRef.current)
  }, [])

  const getContetn = () => {
    if (!isAftereNow(appointmentDate)) {
      clearInterval(snapshotIntervalRef.current)
      onMeetingActive()
      return (
        <span className="text-[#00930b] text-14pxm md:text-16pxt lg:text-14px">
          {t("join_now")}
        </span>
      )
    } else {
      return (
        <>
          <Image src={alarmIcon} alt="Alarm" />
          <span>
            {checkLessTen(minutes)}:{checkLessTen(seconds)} {t("min_left")}
          </span>
        </>
      )
    }
  }
  return (
    <div className="timer">
      {getContetn()}

      <style jsx>{`
        .timer {
          @apply flex gap-mb8 md:gap-8pxt lg:gap-vw08 justify-center items-center mb-mb16 md:mb-16pxt lg:mb-vw16 text-[#00930b] text-14pxm md:text-16pxt lg:text-14px;
        }
      `}</style>
    </div>
  )
}

export default Timer
