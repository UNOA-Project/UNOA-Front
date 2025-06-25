const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* 스피너 */}
      <div className="border-primary-purple h-16 w-16 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>

      {/* 로딩 텍스트 */}
      <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">로딩중...</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">잠시만 기다려 주세요.</p>
    </div>
  )
}

export default LoadingScreen
