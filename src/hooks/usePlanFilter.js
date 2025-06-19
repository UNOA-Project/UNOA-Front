import { useMemo, useState } from 'react'
import { planData } from '../data/planData'

const usePlanFilter = () => {
  //초기값을 먼저 정의
  const initialFilters = {
    category: '5GLTE',
    network: '5G/LTE',
    dataPrice: '',
    dataType: '',
    selectedApps: [],
  }

  const [appliedFilters, setAppliedFilters] = useState(initialFilters)
  const [tempFilters, setTempFilters] = useState(initialFilters)

  const getCurrentCategoryData = () => {
    return planData[0][appliedFilters.category] || []
  }

  const filteredPlans = useMemo(() => {
    const currentData = getCurrentCategoryData()

    return currentData.filter(plan => {
      const networkMatch =
        appliedFilters.network === '5G/LTE' ||
        (appliedFilters.network === '5G' &&
          (plan.title.includes('5G') || plan.description.includes('5G'))) ||
        (appliedFilters.network === 'LTE' &&
          (plan.title.includes('LTE') || plan.description.includes('LTE')))

      const dataPriceMatch = (() => {
        if (!appliedFilters.dataPrice) return true

        const price = parseInt(plan.price)
        switch (appliedFilters.dataPrice) {
          case '~5만원대':
            return price <= 50000
          case '6~8만원대':
            return price >= 60000 && price <= 80000
          case '9만원대~':
            return price >= 90000
          case '상관 없어요':
            return true
          default:
            return true
        }
      })()

      const dataTypeMatch = (() => {
        if (!appliedFilters.dataType) return true

        switch (appliedFilters.dataType) {
          case '다쓰면 속도제한':
            return (
              plan.postExhaustionDataSpeed &&
              plan.postExhaustionDataSpeed.includes('Mbps' || 'Kbps')
            )
          case '완전 무제한':
            return plan.data === '무제한' || plan.data.includes('무제한')
          case '상관 없어요':
            return true
          default:
            return true
        }
      })()

      const appMatch = (() => {
        if (appliedFilters.selectedApps.length === 0) return true

        const allBenefits = [
          ...(plan.basicBenefit ? [plan.basicBenefit] : []),
          ...(Array.isArray(plan.premiumBenefit)
            ? plan.premiumBenefit
            : plan.premiumBenefit
              ? [plan.premiumBenefit]
              : []),
          ...(Array.isArray(plan.mediaBenefit)
            ? plan.mediaBenefit
            : plan.mediaBenefit
              ? [plan.mediaBenefit]
              : []),
        ]

        return appliedFilters.selectedApps.some(selectedApp =>
          allBenefits.some(
            benefit => benefit && benefit.toLowerCase().includes(selectedApp.toLowerCase())
          )
        )
      })()

      return networkMatch && dataPriceMatch && dataTypeMatch && appMatch
    })
  }, [appliedFilters])

  const applyFilters = () => {
    setAppliedFilters(tempFilters)
  }

  const resetFilters = () => {
    const initialFilters = {
      category: appliedFilters.category,
      network: '5G/LTE',
      dataPrice: '',
      dataType: '',
      selectedApps: [],
    }
    setTempFilters(initialFilters)
    setAppliedFilters(initialFilters)
  }

  const toggleApp = appName => {
    setTempFilters(prev => ({
      ...prev,
      selectedApps: prev.selectedApps.includes(appName)
        ? prev.selectedApps.filter(name => name !== appName)
        : [...prev.selectedApps, appName],
    }))
  }

  const changeCategory = category => {
    setAppliedFilters(prev => ({
      ...prev,
      category: category,
    }))
    setTempFilters(prev => ({
      ...prev,
      category: category,
    }))
  }

  return {
    appliedFilters,
    tempFilters,
    filteredPlans,
    setTempFilters,
    applyFilters,
    resetFilters,
    toggleApp,
    changeCategory,
    getCurrentCategoryData,
  }
}

export default usePlanFilter
