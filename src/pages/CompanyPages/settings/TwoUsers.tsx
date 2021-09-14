import React from 'react';
import { Text } from '../../../styles/CustomStyles';

interface ITwoUsers {
  name1?: any;
  name2?: any;
  name3?: any;
}

const TwoUsers: React.FC<ITwoUsers> = ({ name1, name2, name3 }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div className='arrow' style={{ alignSelf: 'center' }}>
        {!name3 ? (
          <svg
            width='55'
            height='15'
            viewBox='0 0 55 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.40353 13.5177C1.43058 14.2209 2.02256 14.769 2.72575 14.742L14.185 14.3013C14.8882 14.2742 15.4364 13.6822 15.4093 12.979C15.3823 12.2758 14.7903 11.7277 14.0871 11.7548L3.90107 12.1465L3.5093 1.96051C3.48225 1.25731 2.89027 0.709183 2.18707 0.736229C1.48388 0.763275 0.935745 1.35525 0.962791 2.05845L1.40353 13.5177ZM53.6445 13.4688C54.6145 12.6425 54.6142 12.6421 54.6138 12.6416C54.6136 12.6414 54.6132 12.6409 54.6128 12.6405C54.6121 12.6396 54.6112 12.6386 54.6102 12.6375C54.6082 12.6351 54.6055 12.632 54.6023 12.6283C54.5958 12.6208 54.587 12.6105 54.5758 12.5977C54.5533 12.572 54.5213 12.5357 54.4799 12.4895C54.3972 12.3972 54.2769 12.2654 54.12 12.0998C53.8064 11.7687 53.3461 11.3017 52.7475 10.7443C51.5512 9.63051 49.7966 8.15043 47.5496 6.67071C43.0616 3.71515 36.5551 0.726814 28.5854 0.726814V3.2752C35.906 3.2752 41.9291 6.02073 46.148 8.79905C48.2546 10.1863 49.8978 11.5731 51.011 12.6095C51.5671 13.1272 51.9895 13.5562 52.2698 13.8522C52.4099 14.0001 52.5144 14.1147 52.5822 14.1904C52.6162 14.2282 52.6409 14.2564 52.6563 14.274C52.664 14.2829 52.6694 14.2891 52.6725 14.2926C52.674 14.2944 52.6749 14.2955 52.6753 14.2959C52.6755 14.2961 52.6755 14.2961 52.6754 14.296C52.6753 14.2959 52.6751 14.2957 52.6751 14.2956C52.6748 14.2953 52.6746 14.295 53.6445 13.4688ZM28.5854 0.726814C20.6213 0.726814 13.909 3.71132 9.21964 6.65578C6.87024 8.13099 5.01207 9.60634 3.73794 10.7161C3.10039 11.2714 2.60767 11.7363 2.2714 12.0656C2.10322 12.2303 1.97404 12.3612 1.88533 12.4526C1.84097 12.4983 1.80671 12.5342 1.78274 12.5595C1.77075 12.5722 1.76133 12.5822 1.75451 12.5895C1.75109 12.5931 1.74833 12.5961 1.74622 12.5983C1.74516 12.5995 1.74427 12.6004 1.74353 12.6012C1.74317 12.6016 1.74274 12.6021 1.74256 12.6023C1.74218 12.6027 1.74183 12.6031 2.67678 13.4688C3.61174 14.3344 3.61147 14.3347 3.61125 14.335C3.61123 14.335 3.61105 14.3352 3.611 14.3352C3.61092 14.3353 3.611 14.3352 3.61124 14.335C3.61171 14.3345 3.61282 14.3333 3.61457 14.3314C3.61807 14.3277 3.62411 14.3212 3.63269 14.3122C3.64983 14.2941 3.67706 14.2656 3.7142 14.2273C3.78849 14.1507 3.90238 14.0352 4.05441 13.8864C4.35855 13.5885 4.81484 13.1576 5.41167 12.6378C6.60629 11.5973 8.35834 10.2057 10.5748 8.81398C15.0172 6.02457 21.2591 3.2752 28.5854 3.2752V0.726814Z'
              fill='#223367'
            />
          </svg>
        ) : (
          <svg
            width='121'
            height='19'
            viewBox='0 0 121 19'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.809593 12.5456C0.558624 13.203 0.888138 13.9394 1.54558 14.1904L12.2593 18.2802C12.9167 18.5311 13.6531 18.2016 13.9041 17.5442C14.1551 16.8867 13.8255 16.1503 13.1681 15.8994L3.64483 12.264L7.28017 2.74074C7.53114 2.0833 7.20163 1.34688 6.54418 1.09591C5.88674 0.844944 5.15033 1.17446 4.89936 1.8319L0.809593 12.5456ZM120 13C120.557 11.8541 120.557 11.8539 120.556 11.8537C120.556 11.8535 120.555 11.8533 120.555 11.853C120.554 11.8524 120.552 11.8517 120.55 11.8508C120.547 11.849 120.542 11.8466 120.535 11.8435C120.522 11.8373 120.504 11.8285 120.48 11.8172C120.433 11.7946 120.363 11.7619 120.272 11.7199C120.09 11.6357 119.822 11.5139 119.47 11.36C118.766 11.052 117.727 10.6151 116.372 10.0924C113.662 9.0471 109.687 7.65815 104.602 6.27074C94.4327 3.49613 79.8149 0.725806 61.9833 0.725806V3.27419C79.5518 3.27419 93.9423 6.00387 103.931 8.72926C108.925 10.0918 112.818 11.4529 115.454 12.4701C116.773 12.9786 117.777 13.4011 118.448 13.6947C118.784 13.8415 119.036 13.9561 119.203 14.0331C119.286 14.0716 119.348 14.1006 119.388 14.1197C119.408 14.1292 119.423 14.1362 119.432 14.1406C119.436 14.1428 119.439 14.1443 119.441 14.1452C119.442 14.1456 119.443 14.1459 119.443 14.146C119.443 14.1461 119.443 14.146 119.443 14.1461C119.443 14.146 119.443 14.1459 120 13ZM61.9833 0.725806C44.1533 0.725806 29.0481 3.49569 18.3959 6.26685C13.0688 7.65269 8.85225 9.03967 5.96178 10.0827C4.51643 10.6043 3.40234 11.0399 2.64641 11.3466C2.26843 11.5 1.97997 11.6211 1.78439 11.7046C1.68659 11.7464 1.61201 11.7787 1.56107 11.801C1.53561 11.8121 1.51604 11.8208 1.50244 11.8268C1.49564 11.8298 1.49033 11.8321 1.48652 11.8338C1.48461 11.8347 1.48308 11.8354 1.48193 11.8359C1.48135 11.8361 1.48076 11.8364 1.48047 11.8365C1.47997 11.8368 1.47958 11.8369 2 13C2.52042 14.1631 2.52021 14.1632 2.5201 14.1632C2.52018 14.1632 2.52016 14.1632 2.52032 14.1631C2.52067 14.163 2.52139 14.1626 2.52247 14.1622C2.52464 14.1612 2.52831 14.1596 2.53346 14.1573C2.54376 14.1527 2.56001 14.1456 2.58213 14.1359C2.62637 14.1165 2.69416 14.0871 2.78506 14.0483C2.96687 13.9707 3.24113 13.8555 3.6045 13.7081C4.33125 13.4132 5.4143 12.9895 6.82677 12.4798C9.65192 11.4603 13.7937 10.0973 19.0375 8.73315C29.5269 6.00431 44.4134 3.27419 61.9833 3.27419V0.725806Z'
              fill='#223367'
            />
          </svg>
        )}
      </div>
      <div
        className='users'
        style={{
          width: name3 ? '190px' : '120px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div className='user1'>
          <svg
            width='43'
            height='44'
            viewBox='0 0 43 44'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0)'>
              <path
                d='M29.2009 16.4657C29.2009 18.5778 28.3618 20.6034 26.8683 22.0969C25.3749 23.5903 23.3493 24.4294 21.2371 24.4294C19.125 24.4294 17.0994 23.5903 15.606 22.0969C14.1125 20.6034 13.2734 18.5778 13.2734 16.4657C13.2734 14.3536 14.1125 12.328 15.606 10.8345C17.0994 9.34098 19.125 8.50195 21.2371 8.50195C23.3493 8.50195 25.3749 9.34098 26.8683 10.8345C28.3618 12.328 29.2009 14.3536 29.2009 16.4657Z'
                fill='#606EEA'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M0 21.7756C0 16.1433 2.23742 10.7417 6.22004 6.75911C10.2027 2.77648 15.6043 0.539063 21.2366 0.539062C26.8688 0.539063 32.2704 2.77648 36.2531 6.75911C40.2357 10.7417 42.4731 16.1433 42.4731 21.7756C42.4731 27.4079 40.2357 32.8095 36.2531 36.7921C32.2704 40.7748 26.8688 43.0122 21.2366 43.0122C15.6043 43.0122 10.2027 40.7748 6.22004 36.7921C2.23742 32.8095 0 27.4079 0 21.7756ZM21.2366 3.19363C17.7372 3.19382 14.3091 4.1821 11.3467 6.04471C8.3843 7.90733 6.00804 10.5686 4.49144 13.7222C2.97483 16.8758 2.37952 20.3935 2.77402 23.8705C3.16852 27.3475 4.5368 30.6424 6.72137 33.3761C8.60612 30.3393 12.7552 27.0848 21.2366 27.0848C29.7179 27.0848 33.8643 30.3366 35.7517 33.3761C37.9363 30.6424 39.3046 27.3475 39.6991 23.8705C40.0936 20.3935 39.4983 16.8758 37.9817 13.7222C36.4651 10.5686 34.0888 7.90733 31.1264 6.04471C28.164 4.1821 24.7359 3.19382 21.2366 3.19363Z'
                fill='#606EEA'
              />
            </g>
            <defs>
              <clipPath id='clip0'>
                <rect
                  width='42.4731'
                  height='42.4731'
                  fill='white'
                  transform='translate(0 0.539062)'
                />
              </clipPath>
            </defs>
          </svg>
          <div style={{ width: 'max-content', textAlign: 'center' }}>
            <Text fontSize='12px' color='rgba(96, 110, 234, 1)'>
              {name1}
            </Text>
          </div>
        </div>
        <div className='miniArrow' style={{ marginBottom: '35%' }}>
          <svg
            width='8'
            height='8'
            viewBox='0 0 8 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M0 4.00063C0 3.86802 0.0526785 3.74085 0.146447 3.64708C0.240215 3.55331 0.367392 3.50063 0.5 3.50063H6.293L4.146 1.35463C4.05211 1.26075 3.99937 1.13341 3.99937 1.00063C3.99937 0.867856 4.05211 0.740518 4.146 0.646632C4.23989 0.552745 4.36722 0.5 4.5 0.5C4.63278 0.5 4.76011 0.552745 4.854 0.646632L7.854 3.64663C7.90056 3.69308 7.93751 3.74825 7.96271 3.809C7.98792 3.86974 8.00089 3.93486 8.00089 4.00063C8.00089 4.0664 7.98792 4.13152 7.96271 4.19227C7.93751 4.25301 7.90056 4.30819 7.854 4.35463L4.854 7.35463C4.76011 7.44852 4.63278 7.50126 4.5 7.50126C4.36722 7.50126 4.23989 7.44852 4.146 7.35463C4.05211 7.26075 3.99937 7.13341 3.99937 7.00063C3.99937 6.86786 4.05211 6.74052 4.146 6.64663L6.293 4.50063H0.5C0.367392 4.50063 0.240215 4.44795 0.146447 4.35419C0.0526785 4.26042 0 4.13324 0 4.00063Z'
              fill='#C2C2C2'
            />
          </svg>
        </div>
        {name3 && (
          <div className='user3' style={{ alignSelf: 'center' }}>
            <svg
              width='39'
              height='39'
              viewBox='0 0 39 39'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M26.7253 14.4212C26.7253 16.3221 25.9702 18.1452 24.626 19.4893C23.2819 20.8335 21.4589 21.5886 19.558 21.5886C17.6571 21.5886 15.834 20.8335 14.4899 19.4893C13.1458 18.1452 12.3906 16.3221 12.3906 14.4212C12.3906 12.5203 13.1458 10.6973 14.4899 9.35317C15.834 8.00903 17.6571 7.25391 19.558 7.25391C21.4589 7.25391 23.2819 8.00903 24.626 9.35317C25.9702 10.6973 26.7253 12.5203 26.7253 14.4212Z'
                fill='#C2C2C2'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M0.445312 19.1988C0.445313 14.1298 2.45899 9.26834 6.04335 5.68398C9.62772 2.09961 14.4892 0.0859375 19.5582 0.0859375C24.6273 0.0859375 29.4887 2.09961 33.0731 5.68398C36.6574 9.26834 38.6711 14.1298 38.6711 19.1988C38.6711 24.2679 36.6574 29.1293 33.0731 32.7137C29.4887 36.2981 24.6273 38.3117 19.5582 38.3117C14.4892 38.3117 9.62772 36.2981 6.04335 32.7137C2.45899 29.1293 0.445313 24.2679 0.445312 19.1988ZM19.5582 2.47505C16.4088 2.47522 13.3235 3.36467 10.6573 5.04102C7.99118 6.71738 5.85255 9.11251 4.48761 11.9507C3.12266 14.789 2.58688 17.9549 2.94193 21.0842C3.29698 24.2135 4.52843 27.179 6.49455 29.6393C8.19082 26.9061 11.925 23.9771 19.5582 23.9771C27.1914 23.9771 30.9232 26.9037 32.6219 29.6393C34.588 27.179 35.8195 24.2135 36.1745 21.0842C36.5296 17.9549 35.9938 14.789 34.6288 11.9507C33.2639 9.11251 31.1253 6.71738 28.4591 5.04102C25.7929 3.36467 22.7076 2.47522 19.5582 2.47505Z'
                fill='#C2C2C2'
              />
            </svg>
            <div>
              <Text fontSize='12px' color='rgba(194, 194, 194, 1)'>
                {name3}
              </Text>
            </div>
          </div>
        )}
        {name3 && (
          <div className='miniArrow' style={{ marginBottom: '35%' }}>
            <svg
              width='8'
              height='8'
              viewBox='0 0 8 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M0 4.00063C0 3.86802 0.0526785 3.74085 0.146447 3.64708C0.240215 3.55331 0.367392 3.50063 0.5 3.50063H6.293L4.146 1.35463C4.05211 1.26075 3.99937 1.13341 3.99937 1.00063C3.99937 0.867856 4.05211 0.740518 4.146 0.646632C4.23989 0.552745 4.36722 0.5 4.5 0.5C4.63278 0.5 4.76011 0.552745 4.854 0.646632L7.854 3.64663C7.90056 3.69308 7.93751 3.74825 7.96271 3.809C7.98792 3.86974 8.00089 3.93486 8.00089 4.00063C8.00089 4.0664 7.98792 4.13152 7.96271 4.19227C7.93751 4.25301 7.90056 4.30819 7.854 4.35463L4.854 7.35463C4.76011 7.44852 4.63278 7.50126 4.5 7.50126C4.36722 7.50126 4.23989 7.44852 4.146 7.35463C4.05211 7.26075 3.99937 7.13341 3.99937 7.00063C3.99937 6.86786 4.05211 6.74052 4.146 6.64663L6.293 4.50063H0.5C0.367392 4.50063 0.240215 4.44795 0.146447 4.35419C0.0526785 4.26042 0 4.13324 0 4.00063Z'
                fill='#C2C2C2'
              />
            </svg>
          </div>
        )}

        <div className='withpercent'>
          <svg
            width='44'
            height='40'
            viewBox='0 0 44 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0)'>
              <path
                d='M26.7253 15.4212C26.7253 17.3221 25.9702 19.1452 24.626 20.4893C23.2819 21.8335 21.4589 22.5886 19.558 22.5886C17.6571 22.5886 15.834 21.8335 14.4899 20.4893C13.1458 19.1452 12.3906 17.3221 12.3906 15.4212C12.3906 13.5203 13.1458 11.6973 14.4899 10.3532C15.834 9.00903 17.6571 8.25391 19.558 8.25391C21.4589 8.25391 23.2819 9.00903 24.626 10.3532C25.9702 11.6973 26.7253 13.5203 26.7253 15.4212Z'
                fill='#223367'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M0 20.1988C0 15.1298 2.01368 10.2683 5.59804 6.68398C9.1824 3.09961 14.0438 1.08594 19.1129 1.08594C24.182 1.08594 29.0434 3.09961 32.6278 6.68398C36.2121 10.2683 38.2258 15.1298 38.2258 20.1988C38.2258 25.2679 36.2121 30.1293 32.6278 33.7137C29.0434 37.2981 24.182 39.3117 19.1129 39.3117C14.0438 39.3117 9.1824 37.2981 5.59804 33.7137C2.01368 30.1293 0 25.2679 0 20.1988ZM19.1129 3.47505C15.9635 3.47522 12.8782 4.36467 10.212 6.04102C7.54587 7.71738 5.40724 10.1125 4.04229 12.9507C2.67735 15.789 2.14157 18.9549 2.49662 22.0842C2.85167 25.2135 4.08312 28.179 6.04923 30.6393C7.7455 27.9061 11.4797 24.9771 19.1129 24.9771C26.7461 24.9771 30.4779 27.9037 32.1766 30.6393C34.1427 28.179 35.3741 25.2135 35.7292 22.0842C36.0842 18.9549 35.5485 15.789 34.1835 12.9507C32.8186 10.1125 30.6799 7.71738 28.0138 6.04102C25.3476 4.36467 22.2623 3.47522 19.1129 3.47505Z'
                fill='#223367'
              />
              <path
                d='M43.3437 8.30607C43.3437 10.559 42.4487 12.7196 40.8556 14.3127C39.2626 15.9057 37.102 16.8007 34.849 16.8007C32.5961 16.8007 30.4355 15.9057 28.8424 14.3127C27.2494 12.7196 26.3544 10.559 26.3544 8.30607C26.3544 6.05316 27.2494 3.89252 28.8424 2.29947C30.4355 0.706417 32.5961 -0.18855 34.849 -0.18855C37.102 -0.18855 39.2626 0.706417 40.8556 2.29947C42.4487 3.89252 43.3437 6.05316 43.3437 8.30607Z'
                fill='#223367'
                stroke='white'
                stroke-width='0.849462'
              />
              <path
                d='M30.8101 4.98072C30.8101 4.38787 31.0026 3.90783 31.3875 3.54062C31.7724 3.16898 32.2768 2.98316 32.9006 2.98316C33.5333 2.98316 34.0421 3.16677 34.427 3.53398C34.8119 3.89677 35.0044 4.39008 35.0044 5.0139V5.49173C35.0044 6.089 34.8119 6.56904 34.427 6.93183C34.0421 7.29462 33.5377 7.47602 32.9139 7.47602C32.2856 7.47602 31.7769 7.29462 31.3875 6.93183C31.0026 6.56461 30.8101 6.07131 30.8101 5.45191V4.98072ZM32.0843 5.49173C32.0843 5.75718 32.1596 5.97176 32.31 6.13546C32.4648 6.29473 32.6661 6.37437 32.9139 6.37437C33.1617 6.37437 33.3585 6.29252 33.5045 6.12882C33.6505 5.96512 33.7235 5.74612 33.7235 5.47182V4.98072C33.7235 4.71526 33.6505 4.50069 33.5045 4.33699C33.3585 4.17329 33.1572 4.09144 32.9006 4.09144C32.6573 4.09144 32.4604 4.17329 32.31 4.33699C32.1596 4.49626 32.0843 4.71969 32.0843 5.00727V5.49173ZM35.4291 10.416C35.4291 9.81867 35.6238 9.33864 36.0131 8.97585C36.4024 8.60863 36.9068 8.42503 37.5262 8.42503C38.1545 8.42503 38.661 8.60642 39.046 8.96921C39.4353 9.32758 39.63 9.8231 39.63 10.4558V10.9336C39.63 11.5264 39.4397 12.0065 39.0592 12.3737C38.6787 12.7365 38.1722 12.9179 37.5395 12.9179C36.9024 12.9179 36.3914 12.7343 36.0065 12.3671C35.6216 11.9998 35.4291 11.5132 35.4291 10.907V10.416ZM36.7033 10.9336C36.7033 11.1769 36.7829 11.3849 36.9422 11.5574C37.1015 11.73 37.3006 11.8162 37.5395 11.8162C38.0792 11.8162 38.3491 11.5176 38.3491 10.9203V10.416C38.3491 10.1505 38.2739 9.93813 38.1235 9.77886C37.9731 9.61516 37.774 9.53331 37.5262 9.53331C37.2784 9.53331 37.0794 9.61516 36.9289 9.77886C36.7785 9.93813 36.7033 10.1571 36.7033 10.4359V10.9336ZM33.2922 12.0618L32.3564 11.5574L37.0749 4.00517L38.0107 4.50953L33.2922 12.0618Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0'>
                <rect
                  width='43.3226'
                  height='39.0753'
                  fill='white'
                  transform='translate(0.449219 0.236328)'
                />
              </clipPath>
            </defs>
          </svg>
          <div style={{ width: 'max-content', textAlign: 'center' }}>
            <Text fontSize='12px'>{name2}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoUsers;
