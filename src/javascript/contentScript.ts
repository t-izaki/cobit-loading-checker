/* eslint-disable no-await-in-loop */
import { LOADING_CHECK_INTERVAL_SECOND } from './const'
import { sleep, getIsEnabled } from './util'

const checkIsLoading = (): boolean => {
  const loadingElement = document.querySelector('div[class^="circleLoader"]')

  return !!loadingElement
}

const isFinishLoading = (oldIsLoading: boolean, newIsLoading: boolean): boolean => {
  return oldIsLoading && newIsLoading === false
}

const notifyWhenFinishLoading = async (): Promise<void> => {
  let isEnabled
  let newIsLoading
  let isLoading = false

  while (true) {
    isEnabled = await getIsEnabled()

    await sleep(LOADING_CHECK_INTERVAL_SECOND)

    newIsLoading = checkIsLoading()
    if (isEnabled && isFinishLoading(isLoading, newIsLoading)) {
      // getURLの引数は、distフォルダでの相対パスを指定している
      const myAudio = new Audio(chrome.runtime.getURL('finish.mp3'))
      myAudio.play()
    }
    isLoading = newIsLoading
  }
}
;(async (): Promise<void> => {
  console.log(`cobit Loading Checker is installed`)
  await notifyWhenFinishLoading()
})()
