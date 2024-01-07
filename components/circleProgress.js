/* eslint-disable prettier/prettier */
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';

const CircleProgress = ({percent, content}) => {
  return (
    <>
      <div class="w-[311px] text-center mx-auto">
        <div class="w-[200px] h-[200px] mx-auto mb-[22px]">
          <CircularProgressbar value={percent} text={`${percent}%`} strokeWidth="5"
            styles={buildStyles({
              pathColor: '#75B8EE',
              textColor: '#75B8EE',
              trailColor: '#C1E3DE',
              backgroundColor: '#75B8EE',
            })}
          />;
        </div>
        <p class="text-brown-main text-[18px]">{content} </p>
      </div>
    </>
  )
}

export default CircleProgress;