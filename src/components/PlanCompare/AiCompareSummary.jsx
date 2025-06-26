import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import NoaThinking from '@/assets/noa-yeah.svg' // 로딩 이미지
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = import.meta.env.VITE_BACK_URL

const preprocessMarkdown = text => {
  if (!text) return ''
  // '**텍스트**단어' 와 같이 닫는 태그가 다음 단어와 붙어있는 경우, 공백을 추가
  return text.replace(/(?<=\S)\*\*(?=\S)/g, '** ')
}

const AiCompareSummary = ({ plans }) => {
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const MotionButton = motion.button

  useEffect(() => {
    // 비교할 요금제가 2개가 아니게 되면
    // 기존의 요약 내용과 오류 메시지를 모두 깨끗하게 초기화
    if (plans.length !== 2) {
      setSummary('')
      setError(null)
      setIsLoading(false) // 로딩 상태도 초기화
    }
  }, [plans])

  const handleCompare = useCallback(async () => {
    if (plans.length !== 2) return

    setIsLoading(true)
    setError(null)
    setSummary('')

    try {
      const response = await axios.post(`${API_URL}/api/plans/compare`, { plans })
      const processedSummary = preprocessMarkdown(response.data.summary)
      setSummary(processedSummary)
    } catch (err) {
      setError('AI 비교 요약을 불러오는 데 실패했어요. 잠시 후 다시 시도해주세요.')
      console.error('AI 비교 API 요청 실패:', err)
    } finally {
      setIsLoading(false)
    }
  }, [plans])

  const canCompare = plans.length === 2

  const customProseStyles = `
    .custom-prose strong {
      color: var(--color-primary-purple, #899df4);
    }
  `

  return (
    <div className="flex flex-col items-center rounded-xl border border-indigo-100 bg-indigo-50 p-6 text-center">
      <style>{customProseStyles}</style>
      <h3 className="text-lg font-bold text-black">
        NOA의 <span style={{ color: 'var(--color-primary-purple, #899df4)' }}>AI</span> 요약 비교
      </h3>
      <p
        style={{ color: 'var(--color-gray-800, #1f2937)' }}
        className="mt-1 text-sm break-keep whitespace-normal"
      >
        두 요금제의{' '}
        <span style={{ color: 'var(--color-primary-purple, #899df4)', fontWeight: '600' }}>
          핵심적인 차이점
        </span>
        을 <br className="hidden max-[410px]:block" /> 한눈에 파악해 보세요!
      </p>

      <button
        onClick={handleCompare}
        disabled={!canCompare || isLoading}
        className="bg-primary-purple mt-4 rounded-full px-6 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {isLoading ? 'NOA가 분석 중...' : 'AI 비교하기'}
      </button>

      <AnimatePresence>
        {(isLoading || error || summary) && (
          <MotionButton
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mt-4 overflow-hidden rounded-lg bg-white p-4 text-left shadow-inner"
          >
            {isLoading && (
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <img src={NoaThinking} alt="생각하는 노아" className="h-8 w-8" />
                <span>열심히 비교 분석 중이에요...</span>
              </div>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {summary && (
              <div className="prose prose-sm custom-prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
              </div>
            )}
          </MotionButton>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AiCompareSummary
