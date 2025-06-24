export default function GradeCard({ imageSrc, grade, condition, color }) {
  const gradeColorMap = {
    VVIP: '#e6007e',
    VIP: '#e062a7',
    우수: '#7d49b0',
    '10년 이상': '#C742F3',
    '5년 이상': '#5459F2',
    '2년 이상': '#3F9DEB',
  }

  return (
    <div className="border-gray-60 flex w-45 flex-col items-center rounded-2xl border bg-white text-center">
      <div className="flex h-23 w-full items-center justify-center rounded-t-2xl bg-[#F7F7F9]">
        <img src={imageSrc} alt={grade} className="h-12 w-12" />
      </div>
      <div className="flex flex-col items-center gap-1 px-3 py-4">
        <p style={{ color: gradeColorMap[grade] }} className="text-sm font-bold">
          {grade}
        </p>
        <p className="text-xs whitespace-pre-line text-gray-600">{condition}</p>
      </div>
    </div>
  )
}
