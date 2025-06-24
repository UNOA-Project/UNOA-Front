import Modal from './Modal'
import GradeCard from '@/components/Benefits/GradeCard'

const membershipGrades = [
  {
    imageSrc: '/rateIcon/VVIP.svg',
    grade: 'VVIP',
    condition: `모바일 요금제 95,000원 이상\n한해 누적 통신요금 2백만원 이상`,
  },
  {
    imageSrc: '/rateIcon/VIP.svg',
    grade: 'VIP',
    condition: `모바일 요금제 74,800원 이상\n한해 누적 통신요금 1백만원 이상`,
  },
  {
    imageSrc: '/rateIcon/우수.svg',
    grade: '우수',
    condition: `모바일 요금제 74,800원 미만\n한해 누적 통신요금 1백만원 미만`,
  },
]

const longTermGrades = [
  {
    imageSrc: '/rateIcon/10년 이상.svg',
    grade: '10년 이상',
    condition: `모바일 사용 기간이 10년 이상`,
  },
  {
    imageSrc: '/rateIcon/5년 이상.svg',
    grade: '5년 이상',
    condition: `모바일 사용 기간이 5년 이상`,
  },
  {
    imageSrc: '/rateIcon/2년 이상.svg',
    grade: '2년 이상',
    condition: `모바일 사용 기간이 2년 이상`,
  },
]

export default function GradeGuideModal({ isOpen, onClose }) {
  return (
    <Modal title="혜택을 받을 수 있는 기준이에요" isOpen={isOpen} onClose={onClose}>
      <div className="mt-5 flex flex-col gap-8">
        {/* 멤버십 섹션 */}
        <section className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">멤버십</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {membershipGrades.map(item => (
              <GradeCard key={item.grade} {...item} />
            ))}
          </div>
          <ul className="list-disc pl-5 text-sm leading-relaxed break-keep whitespace-normal text-gray-700">
            <li>이용 중인 모바일 요금제나 1년 동안 낸 통신 요금에 따라 3가지로 나뉘어요.</li>
            <li>
              VVIP/VIP 등급 기준에 맞는 요금제로 변경 후 정지 없이 다음달 말일까지 이용하시면
              다다음달 1일부터 등급이 올라가요.
              <br />
              <span className="block">
                단, 요금제를 매월 1일에 변경하시면 다음달 1일부터 등급이 올라가요.
              </span>
            </li>
            <li>1년 동안 낸 통신요금은 재작년 11월 1월부터 작년 10월 31일까지 낸 금액을 말해요.</li>
            <li>
              U+모바일 이용 요금과 인터넷, IPTV, 스마트홈, 인터넷 전화 요금을 합한 금액이에요.
            </li>
          </ul>
        </section>

        {/* 장기고객 섹션 */}
        <section className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">장기고객</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {longTermGrades.map(item => (
              <GradeCard key={item.grade} {...item} />
            ))}
          </div>
          <ul className="list-disc pl-5 text-sm leading-relaxed break-keep whitespace-normal text-gray-700">
            <li>작년 11월 30일 기준으로 올해 혜택이 정해져요.</li>
          </ul>
        </section>
      </div>
    </Modal>
  )
}
