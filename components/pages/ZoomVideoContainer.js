console.log("hi")
import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
import { useRouter } from "next/router"
import { useEffect } from "react"

const ZoomVideoContainer = ({ meetingData, user, isDoctor }) => {
  const { push } = useRouter()
  function startMeeting(client) {
    const sdkKey = process.env.NEXT_PUBLIC_ZOOM_SDK_KEY
    const meetingNumber = meetingData.meetingId
    const passWord = meetingData.meetingPass
    const userName = user.firstname || isDoctor ? "doctor" : "patient"
    const userEmail = user.email
    const registrantToken = ""
    const zakToken = ""
    const leaveUrl = window.origin

    // document.getElementById("zmmtg-root").style.display = "block"

    // ZoomMtg.init({
    //   leaveUrl: leaveUrl,
    //   success: (success) => {
    client.join({
      sdkKey: sdkKey,
      signature: meetingData.signature,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      // tk: registrantToken,
      // zak: zakToken,
      success: (success) => {
        console.log("success ===>", success)
      },
      error: (error) => {
        console.log("error ===>", error)
      },
    })
    // },
    // error: (error) => {
    //   console.log("error ===>", error)
    // },
    // })
  }
  useEffect(() => {
    const dunamicImports = async () => {
      // const ZoomMtgEmbedded = (await import("@zoomus/websdk/embedded")).default
      const client = ZoomMtgEmbedded.createClient()
      let meetingSDKElement = document.getElementById("meetingSDKElement")
      let height = 300
      let width = 300
      if (typeof window !== undefined) {
        width = window.innerWidth * 0.7
        height = window.innerHeight * 0.7
      }

      //TODO: pation redirect to feadbak page
      //TODO: doctor redirect EMR note page
      client.init({
        zoomAppRoot: meetingSDKElement,
        language: "en-US",
        customize: {
          video: {
            viewSizes: {
              default: {
                height: height,
                width: width,
              },
              ribbon: {
                width,
              },
            },
            // defaultViewType: "active",
          },
          chat: {
            popper: {
              placement: "right",
            },
            notificationCls: {
              right: 0,
            },
          },
        },
      })

      startMeeting(client)
    }
    if (typeof window !== "undefined") dunamicImports()
    return () => {
      // document.getElementById("zmmtg-root").style.display = "none"
      if (typeof window !== "undefined") window.location.reload()
    }
  }, [])

  return (
    <>
      {/* Add meta tags for SEO*/}
      <div className="container">
        <button onClick={() => push("/dashboard")}>Back to dahsboard</button>
        <div className="meetinStyle" id="meetingSDKElement"></div>
      </div>
      <style jsx>{`
        .container {
          @apply h-80vh w-[80vw];
        }
        .meetinStyle {
          @apply relative h-full w-full flex justify-center items-center;
        }
        .divider {
          @apply h-200pxm md:h-200pxt lg:h-200px;
        }
        .content_wrapper {
          @apply absolute  bottom-0 translate-y-[35%] lg:translate-y-[55%];
        }
        .image_wrapper {
          @apply rounded-2xl px-mb40 max-h-[50vw] lg:px-vw510 lg:max-h-vw705;
        }
        #zoom-container {
          position: fixed;
          top: 0;
          right: 0;
          width: 400px; /* Or the desired width */
          height: 300px; /* Or the desired height */
          z-index: 1000; /* Or another value to ensure it's above other elements */
        }
        :global(#transition-popper) {
          @apply !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2;
        }
      `}</style>
    </>
  )
}

export default ZoomVideoContainer
