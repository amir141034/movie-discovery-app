import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../hooks/useDebounce'

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 400))
    expect(result.current).toBe('hello')
  })

  it('does not update the debounced value before the delay elapses', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    act(() => vi.advanceTimersByTime(200))

    expect(result.current).toBe('a')
    vi.useRealTimers()
  })

  it('updates the debounced value after the delay elapses', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    act(() => vi.advanceTimersByTime(400))

    expect(result.current).toBe('ab')
    vi.useRealTimers()
  })

  it('resets the timer on rapid successive changes (only latest value wins)', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    act(() => vi.advanceTimersByTime(200))
    rerender({ value: 'abc' })
    act(() => vi.advanceTimersByTime(200))

    // only 200ms since the last change — shouldn't have updated yet
    expect(result.current).toBe('a')

    act(() => vi.advanceTimersByTime(200))
    expect(result.current).toBe('abc')
    vi.useRealTimers()
  })
})